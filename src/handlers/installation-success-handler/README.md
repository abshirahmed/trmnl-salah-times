# Installation Success Handler

This handler is responsible for receiving the TRMNL plugin installation success webhook.

## Files

- `index.ts` - Main handler implementation
- `schema.ts` - Validation schema for request body

## Functionality

- Receives the installation success webhook from TRMNL
- Verifies the authorization header
- Extracts the user information from the request body
- Stores the user information in the database

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

## Implementation Notes

This handler includes:

1. Authorization verification
2. Input validation using Zod schema
3. Error handling for database operations
4. Logging for tracking installation success
