# Installation Success Handler

This handler is responsible for receiving the TRMNL plugin installation success webhook.

## Files

- `index.ts` - Main handler implementation

## Functionality

- Receives the installation success webhook from TRMNL
- Verifies the authorization header
- Extracts the user information from the request body
- Logs the user information for future use

## API Endpoint

`POST /installation-success`

### Headers

- `Authorization` - Bearer token with the access token

### Request Body

```json
{
  "user": {
    "name": "User Name",
    "email": "user@example.com",
    "first_name": "User",
    "last_name": "Name",
    "locale": "en",
    "time_zone": "Pacific Time (US & Canada)",
    "time_zone_iana": "America/Los_Angeles",
    "utc_offset": -28800,
    "plugin_setting_id": 1234,
    "uuid": "674c9d99-cea1-4e52-9025-9efbe0e30901"
  }
}
```

### Response

Returns a 200 OK response if the webhook is processed successfully.

## Production Considerations

In a production environment, you would:

1. Store the user information in a database
2. Associate it with the access token
3. Use this information when generating prayer times for the user
