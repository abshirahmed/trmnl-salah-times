# Uninstallation Handler

This handler is responsible for receiving the TRMNL plugin uninstallation webhook.

## Files

- `index.ts` - Main handler implementation
- `schema.ts` - Validation schema for request body

## Functionality

- Receives the uninstallation webhook from TRMNL
- Verifies the authorization header
- Extracts the user UUID from the request body
- Deletes the user settings from the database
- Returns a success response

## API Endpoint

`POST /uninstall`

### Headers

- `Authorization` - Bearer token with the access token

### Request Body

```json
{
  "user_uuid": "uuid-of-the-user"
}
```

### Response

Returns a 200 OK response if the webhook is processed successfully.

## Implementation Notes

This handler includes:

1. Authorization verification
2. Input validation using Zod schema
3. Error handling for database operations
4. Logging for tracking uninstallation events
