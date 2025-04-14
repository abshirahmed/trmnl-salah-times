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

## Production Considerations

In a production environment, you would:

1. Ensure proper error handling for database operations
2. Consider implementing a soft delete instead of a hard delete
3. Add additional security measures to verify the webhook source
4. Implement retry logic for failed database operations
