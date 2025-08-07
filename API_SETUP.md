# API Configuration

## Overview
This project uses a proxy configuration to avoid exposing API URLs in the client-side bundle, which prevents Netlify's secrets scanning from failing the build.

## Configuration

### Frontend (`src/pages/apiPage.jsx`)
- Uses relative URL `/api` instead of absolute URL
- No environment variables exposed in client bundle

### Netlify Proxy (`netlify.toml`)
- Redirects `/api/*` requests to `https://api-testrigor.onrender.com/*`
- Includes CORS headers for cross-origin requests
- Maintains SPA routing with fallback to `/index.html`

## How it works

1. **Client Request**: `fetch('/api/code')`
2. **Netlify Proxy**: Redirects to `https://api-testrigor.onrender.com/code`
3. **API Response**: Returns data to client

## Benefits

- ✅ No API URLs exposed in client bundle
- ✅ Build passes Netlify secrets scanning
- ✅ CORS handled by proxy
- ✅ Works in development and production
- ✅ No environment variables needed

## API Endpoints

The following endpoints are available through the proxy:

- `GET /api/code` - Get current code
- `POST /api/echo` - Echo POST data
- `PUT /api/update` - Update data
- `PATCH /api/modify` - Modify data
- `DELETE /api/delete` - Delete element
- `GET /api/last-post` - Get last POST data
- `GET /api/last-put` - Get last PUT data
- `GET /api/last-patch` - Get last PATCH data
- `GET /api/last-delete` - Get delete status
- `GET /api/reset-delete` - Reset delete status
