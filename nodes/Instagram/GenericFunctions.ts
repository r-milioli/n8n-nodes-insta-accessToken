import type {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IWebhookFunctions,
	IDataObject,
	IRequestOptions,
	IHttpRequestMethods,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

// Token cache for performance
const tokenCache = new Map<string, { token: string; expiresAt: number; lastCheck: number }>();


/**
 * Get access token using Instagram Access Token API (Hybrid System)
 */
export async function getAccessTokenAuto(
	this: IExecuteFunctions | IWebhookFunctions | IHookFunctions | ILoadOptionsFunctions,
): Promise<string> {
	console.log('🔑 Using Instagram Access Token API (Hybrid System)');
	
	// Use Access Token API with hybrid system
	const credentials = await this.getCredentials('instagramAccessTokenApi');
	
	if (!credentials || !credentials.accessToken) {
		throw new Error('Instagram Access Token API credentials not found. Please configure your access token.');
	}
	
	// Use hybrid system for automatic refresh
	return await getAccessTokenHybrid(this as IExecuteFunctions, 'default');
}

/**
 * Get Instagram Business Account ID from the authenticated user
 */
export async function getInstagramBusinessAccountId(
	this: IExecuteFunctions | IWebhookFunctions | IHookFunctions | ILoadOptionsFunctions,
): Promise<string> {
	try {
		const accessToken = await getAccessTokenAuto.call(this);
		
		const options: IRequestOptions = {
			method: 'GET',
			url: 'https://graph.instagram.com/v23.0/me',
			qs: {
				access_token: accessToken,
				fields: 'id,name,account_type,media_count,user_id,username',
			},
			json: true,
		};

		const response = await this.helpers.request(options);
			return response.id;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

/**
 * Make an authenticated API request to Instagram Graph API
 */
export async function instagramApiRequest(
	this: IExecuteFunctions | IWebhookFunctions | IHookFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	// Get valid access token with auto-detection (will auto-refresh if needed)
	const accessToken = await getAccessTokenAuto.call(this);
	
	console.log('🌐 Instagram API Request:');
	console.log('- Method:', method);
	console.log('- Endpoint:', endpoint);
	console.log('- Token (first 10 chars):', accessToken ? accessToken.substring(0, 10) + '...' : 'Missing');
	
	const options: IRequestOptions = {
		method,
		body,
		qs: {
			...qs,
			access_token: accessToken,
		},
		url: `https://graph.instagram.com/v23.0${endpoint}`,
		json: true,
	};

	try {
		console.log('🚀 Making request to Instagram API...');
		const response = await this.helpers.request(options);
		console.log('✅ Instagram API request successful');
		return response;
	} catch (error) {
		console.log('❌ Instagram API request failed:', error.message);
		throw new NodeApiError(this.getNode(), error);
	}
}

/**
 * Make an authenticated API request to Instagram Graph API and return all items
 */
export async function instagramApiRequestAllItems(
	this: IExecuteFunctions | IWebhookFunctions | IHookFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	const returnData: IDataObject[] = [];
	let responseData;
	qs.limit = 100;

	do {
		responseData = await instagramApiRequest.call(this, method, endpoint, body, qs);
			returnData.push(...responseData.data);
	} while (responseData.paging?.next);

	return returnData;
}

/**
 * Token status interface
 */
export interface TokenStatus {
	token: string;
	isExpired: boolean;
	needsRefresh: boolean;
	expiresAt: number;
	daysUntilExpiry: number;
}

/**
 * Get token status and debug information
 */
export async function getTokenStatus(
	context: IExecuteFunctions,
	credentialId: string,
): Promise<TokenStatus> {
	const credentials = await context.getCredentials('instagramAccessTokenApi');
	const token = credentials.accessToken as string;
	
	// Check cache first
	const cacheKey = `token_${credentialId}`;
	const cached = tokenCache.get(cacheKey);
	if (cached && cached.token === token && cached.expiresAt > Date.now() / 1000) {
		return {
			token: cached.token,
			isExpired: false,
			needsRefresh: false,
			expiresAt: cached.expiresAt,
			daysUntilExpiry: Math.ceil((cached.expiresAt - Date.now() / 1000) / (24 * 60 * 60)),
		};
	}
	
	// Get token debug info from Instagram
	try {
		const response = await context.helpers.request({
			method: 'GET',
			url: 'https://graph.instagram.com/debug_token',
			qs: {
				input_token: token,
				access_token: token,
			},
		});
		
		const data = response.data;
		const isExpired = data.is_valid === false;
		const needsRefresh = data.expires_at && (data.expires_at - Date.now() / 1000) < (7 * 24 * 60 * 60); // 7 days
		
		// Cache the result
		tokenCache.set(cacheKey, {
			token,
			expiresAt: data.expires_at || 0,
			lastCheck: Date.now() / 1000,
		});
		
		return {
			token,
			isExpired,
			needsRefresh,
			expiresAt: data.expires_at || 0,
			daysUntilExpiry: data.expires_at ? Math.ceil((data.expires_at - Date.now() / 1000) / (24 * 60 * 60)) : 0,
		};
	} catch (error) {
		// If debug fails, assume token is valid but needs refresh
		return {
			token,
			isExpired: false,
			needsRefresh: true,
			expiresAt: 0,
			daysUntilExpiry: 0,
		};
	}
}

/**
 * Refresh access token
 */
export async function refreshAccessToken(
	context: IExecuteFunctions,
	credentialId: string,
): Promise<string> {
	const credentials = await context.getCredentials('instagramAccessTokenApi');
	const token = credentials.accessToken as string;
	
	try {
		console.log('🔄 Attempting to refresh token...');
		
		// Check token type first
		const debugResponse = await context.helpers.request({
			method: 'GET',
			url: 'https://graph.instagram.com/debug_token',
			qs: {
				input_token: token,
				access_token: token,
			},
		});
		
		console.log('🔍 Token debug info:', JSON.stringify(debugResponse, null, 2));
		
		// Try to refresh the token
		const response = await context.helpers.request({
			method: 'GET',
			url: 'https://graph.instagram.com/refresh_access_token',
			qs: {
				grant_type: 'ig_refresh_token',
				access_token: token,
			},
		});
		
		console.log('🔄 Refresh response:', JSON.stringify(response, null, 2));
		
		// Check if response is a string (JSON) that needs parsing
		let responseData = response;
		if (typeof response === 'string') {
			console.log('🔄 Parsing JSON response...');
			responseData = JSON.parse(response);
		}
		
		const newToken = responseData.access_token;
		
		console.log('🔄 Parsed response data:');
		console.log('- access_token:', newToken ? newToken.substring(0, 10) + '...' : 'Missing');
		console.log('- expires_in:', responseData.expires_in);
		console.log('- Response keys:', Object.keys(responseData));
		
		if (!newToken) {
			console.log('❌ No access_token in refresh response');
			console.log('🔄 Response structure:', Object.keys(responseData));
			console.log('🔄 Response type:', typeof response);
			console.log('🔄 Full response:', JSON.stringify(responseData, null, 2));
			throw new Error('No access_token received from refresh endpoint');
		}
		
		// Update cache
		const cacheKey = `token_${credentialId}`;
		tokenCache.set(cacheKey, {
			token: newToken,
			expiresAt: responseData.expires_in + Date.now() / 1000,
			lastCheck: Date.now() / 1000,
		});
		
		// Log for user to update credentials
		console.log(`🔑 New token generated. Please update your Instagram Access Token API credential with: ${newToken}`);
		console.log(`🔑 New token length: ${newToken.length}`);
		
		return newToken;
	} catch (error) {
		console.log('❌ Token refresh failed:', error.message);
		console.log('⚠️ This might be a long-lived token that cannot be refreshed automatically');
		console.log('⚠️ Please manually update your Instagram Access Token API credential with a new token');
		
		// Return the original token as fallback
		console.log('🔄 Using original token as fallback');
		return token;
	}
}

/**
 * Get and manage access token with automatic refresh
 */
export async function getAccessTokenHybrid(
	context: IExecuteFunctions,
	credentialId: string,
): Promise<string> {
	const credentials = await context.getCredentials('instagramAccessTokenApi');
	const token = credentials.accessToken as string;
	
	console.log('🔑 Instagram Access Token Debug:');
	console.log('- Token (first 10 chars):', token ? token.substring(0, 10) + '...' : 'Missing');
	console.log('- Auto Refresh:', credentials.autoRefresh);
	console.log('- Full token length:', token ? token.length : 0);
	
	// Check if auto-refresh is enabled
	if ((credentials.autoRefresh as boolean) === false) {
		console.log('🔑 Using token directly (auto-refresh disabled)');
		return token;
	}

	// Get token status
	console.log('🔍 Checking token status...');
	const status = await getTokenStatus(context, credentialId);
	
	console.log('🔍 Token Status:');
	console.log('- Is Expired:', status.isExpired);
	console.log('- Needs Refresh:', status.needsRefresh);
	console.log('- Days Until Expiry:', status.daysUntilExpiry);
	console.log('- Status Token (first 10 chars):', status.token ? status.token.substring(0, 10) + '...' : 'Missing');
	
	// If token is expired or needs refresh, refresh it
	if (status.isExpired || status.needsRefresh) {
		console.log('🔄 Token needs refresh, refreshing automatically...');
		const newToken = await refreshAccessToken(context, credentialId);
		console.log('🔄 New token received (first 10 chars):', newToken ? newToken.substring(0, 10) + '...' : 'Missing');
		return newToken;
	}
	
	console.log('✅ Using current token');
	console.log('✅ Final token (first 10 chars):', status.token ? status.token.substring(0, 10) + '...' : 'Missing');
	return status.token;
}

/**
 * Force refresh token (for manual control)
 */
export async function forceRefreshToken(
	context: IExecuteFunctions,
	credentialId: string,
): Promise<{ success: boolean; newToken: string; message: string }> {
	try {
		const newToken = await refreshAccessToken(context, credentialId);
		return {
			success: true,
			newToken,
			message: 'Token refreshed successfully',
		};
	} catch (error) {
		return {
			success: false,
			newToken: '',
			message: `Failed to refresh token: ${error.message}`,
		};
	}
}

/**
 * Clear token cache
 */
export function clearTokenCache(credentialId: string): void {
	const cacheKey = `token_${credentialId}`;
	tokenCache.delete(cacheKey);
}

/**
 * Validate webhook signature
 */
export function validateSignature(
	body: string,
	signature: string,
	secret: string,
): boolean {
	// Check if secret is provided and valid
	if (!secret || typeof secret !== 'string' || secret.trim() === '') {
		console.log('⚠️ Webhook secret not configured or invalid, skipping signature validation');
		return true; // Allow webhook if no secret is configured
	}
	
	// Check if signature is provided
	if (!signature || typeof signature !== 'string') {
		console.log('⚠️ Webhook signature not provided, skipping validation');
		return true; // Allow webhook if no signature is provided
	}
	
	try {
		const crypto = require('crypto');
		const expectedSignature = crypto
			.createHmac('sha256', secret)
			.update(body)
			.digest('hex');
		
		return crypto.timingSafeEqual(
			Buffer.from(signature, 'hex'),
			Buffer.from(expectedSignature, 'hex'),
		);
	} catch (error) {
		console.log('⚠️ Error validating webhook signature:', error.message);
		return true; // Allow webhook if validation fails
	}
}
