# Installation Handler

This handler is responsible for handling the TRMNL plugin installation flow.

## Files

- `index.ts` - Main handler implementation

## Functionality

- Receives the installation request from TRMNL
- Extracts the token and installation callback URL from the request
- Exchanges the token for an access token using the TRMNL OAuth endpoint
- Redirects the user back to TRMNL using the installation callback URL

## API Endpoint

`GET /install`

### Query Parameters

- `token` - The token provided by TRMNL for the OAuth flow
- `installation_callback_url` - The URL to redirect the user back to TRMNL

### Environment Variables

- `TRMNL_CLIENT_ID` - The client ID for your TRMNL plugin
- `TRMNL_CLIENT_SECRET` - The client secret for your TRMNL plugin

### Response

Redirects the user back to TRMNL using the installation callback URL.

## OAuth Flow

1. TRMNL sends an installation request to this endpoint with a token and callback URL
2. This handler exchanges the token for an access token
3. The handler redirects the user back to TRMNL
4. TRMNL sends a success webhook to the installation success handler
