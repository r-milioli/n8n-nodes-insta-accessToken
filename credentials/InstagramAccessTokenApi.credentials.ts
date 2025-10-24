import type {
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class InstagramAccessTokenApi implements ICredentialType {
	name = 'instagramAccessTokenApi';
	displayName = 'Instagram Access Token API';
	documentationUrl = 'https://developers.facebook.com/docs/instagram-api/getting-started';
	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Instagram access token (long-lived recommended)',
		},
		{
			displayName: 'Instagram Business Account ID',
			name: 'instagramBusinessAccountId',
			type: 'string',
			required: true,
			default: '',
			description: 'Instagram Business Account ID (auto-discovered if not provided)',
		},
		{
			displayName: 'Auto Refresh Token',
			name: 'autoRefresh',
			type: 'boolean',
			default: true,
			description: 'Automatically refresh token when expired (recommended)',
		},
		{
			displayName: 'Refresh Threshold (days)',
			name: 'refreshThreshold',
			type: 'number',
			default: 7,
			description: 'Refresh token when expiring within this many days',
			displayOptions: {
				show: {
					autoRefresh: [true],
				},
			},
		},
		{
			displayName: 'Webhook Verify Token',
			name: 'webhookVerifyToken',
			type: 'string',
			required: false,
			default: '',
			description: 'Optional webhook verification token',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://graph.instagram.com',
			url: '/v23.0/me',
			qs: {
				fields: 'id,username,name,account_type',
				access_token: '={{$credentials.accessToken}}',
			},
		},
	};
}
