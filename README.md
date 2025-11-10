# n8n-nodes-instagram-token

![Instagram Banner](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)
[![npm version](https://img.shields.io/npm/v/n8n-nodes-instagram-token.svg)](https://www.npmjs.com/package/n8n-nodes-instagram-token)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n](https://img.shields.io/badge/n8n-community-FF6D5A?logo=n8n)](https://n8n.io)

Professional N8N community nodes for Instagram API integration with **access token authentication**.

> **📌 Fork Notice**: This is a fork of [n8n-nodes-instagram-integrations](https://www.npmjs.com/package/n8n-nodes-instagram-integrations) with enhanced token management and additional features.

[Installation](#installation) • [Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation)

---

## 🔄 What's Different from the Original?

This fork includes several enhancements over the original [n8n-nodes-instagram-integrations](https://www.npmjs.com/package/n8n-nodes-instagram-integrations):

### ✨ **New Features:**
- **Comment Management** - Reply to comments automatically
- **Enhanced Token Management** - Automatic refresh with smart fallback
- **Better Error Handling** - More detailed debugging and logs
- **Format Validation** - Proper audio format support (AAC, M4A, WAV, MP4)
- **Performance Improvements** - Token caching and optimization

### 🔧 **Technical Improvements:**
- **Access Token API** - Simplified authentication method
- **Automatic Token Refresh** - No more "refreshToken is required" errors
- **Smart Fallback** - Uses original token if refresh fails
- **Enhanced Logging** - Better debugging capabilities

---

## 🚀 Features

### 🔐 Access Token Management
- **Automatic token refresh** - Tokens refresh automatically before expiration
- **Smart fallback** - Uses original token if refresh fails
- **No more "refreshToken is required" errors** - Intelligent token lifecycle management
- **Access Token API** - Simple authentication with automatic refresh
- **Auto-discovery** - Automatically fetches Instagram Business Account ID

### 📬 Instagram Messaging
- **Text Messages** - Send formatted text with up to 1000 characters
- **Image Messages** - Share images via public HTTPS URLs
- **Audio Messages** - Send voice messages (AAC, M4A, WAV, MP4 formats)
- **Video Messages** - Share video content
- **Media Upload** - Upload and publish photos, videos, reels, and stories
- **Private Replies** - Send private replies to commenters directly

### 💬 Interactive Templates
- **Button Templates** - Up to 3 action buttons (web links or postbacks)
- **Generic Templates** - Carousel cards with images and buttons
- **Quick Replies** - Up to 13 quick response options

### 📝 Content Management
- **Create Posts** - Single images, videos, and carousel posts
- **Create Reels** - Short-form video content
- **Create Stories** - Temporary 24-hour content
- **Reply to Comments** - Automated comment responses

### 🔔 Webhook Events
- **Message Events** - Incoming messages, postbacks, quick replies
- **Comment Events** - New comments and mentions
- **Opt-in Events** - User subscription confirmations

---

## 📋 Prerequisites

- **n8n** (v1.0.0 or higher)
- **Instagram Business Account** with Messaging API access
- **Facebook App** with Instagram Basic Display API
- **Webhook URL** (for receiving events)

---

## 🚀 Installation

### Method 1: Community Nodes (Recommended)
1. Go to **Settings > Community Nodes** in n8n
2. Click **Install a community node**
3. Enter: `n8n-nodes-instagram-token`
4. Click **Install**

### Method 2: Manual Installation
```bash
npm install n8n-nodes-instagram-token
```

---

## ⚡ Quick Start

### 1. Configure Credentials
1. Create **Instagram Access Token API** credential
2. Enter your **Access Token** (long-lived recommended)
3. Enable **Auto Refresh Token** (recommended)
4. Set **Refresh Threshold** to 7 days

### 2. Create Your First Workflow
1. Add **Instagram** node
2. Select **Resource**: `Message`
3. Select **Operation**: `Send Text`
4. Configure your message
5. **Execute** the workflow

### 3. Set Up Webhooks (Optional)
1. Add **Instagram Trigger** node
2. Configure webhook URL
3. Set up event handling

---

## 📚 Documentation

- **[API Reference](API_REFERENCE.md)** - Complete API documentation
- **[Authentication Guide](AUTHENTICATION_GUIDE.md)** - Setup and configuration
- **[Migration Guide](docs/MIGRATION_HYBRID_TOKEN.md)** - Migrating from OAuth2
- **[Quick Start](docs/QUICKSTART.md)** - Getting started guide

---

## 🔧 Configuration

### Instagram Access Token API
- **Access Token**: Your Instagram access token
- **Instagram Business Account ID**: Auto-discovered if not provided
- **Auto Refresh Token**: Enable automatic token refresh
- **Refresh Threshold**: Days before expiration (default: 7)
- **Webhook Verify Token**: Optional webhook verification

---

# What's New in 2.0.3

- ✅ **Private Replies** - Send private replies to comments directly from the message node
- ✅ **Authentication Updates** - Support `Authorization: Bearer` header for compatible API scenarios

### v2.0.1 Highlights

- ✅ **Comment Management** - Reply to comments automatically
- ✅ **Access Token System** - Simplified authentication
- ✅ **Enhanced Error Handling** - Better debugging and logs
- ✅ **Format Support** - Proper audio format validation
- ✅ **Performance Improvements** - Token caching and optimization

---

## 🤝 Support

- **Issues**: [GitHub Issues](https://github.com/r-milioli/n8n-nodes-insta-accessToken/issues)
- **Documentation**: [GitHub Wiki](https://github.com/r-milioli/n8n-nodes-insta-accessToken/wiki)
- **Community**: [n8n Community Forum](https://community.n8n.io)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

---

## 🙏 Acknowledgments

- **Original Authors** - [n8n-nodes-instagram-integrations](https://www.npmjs.com/package/n8n-nodes-instagram-integrations) for the foundation
- **n8n Team** - For the amazing workflow automation platform
- **Instagram API** - For providing comprehensive messaging capabilities
- **Community** - For feedback and contributions

---

**Made with ❤️ for the n8n community**