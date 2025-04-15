# Save Settings Handler

This handler is responsible for saving user settings for the TRMNL plugin.

## Files

- `index.ts` - Main handler implementation
- `schema.ts` - Validation schema for request body

## Functionality

- Receives settings form submissions from the management interface
- Validates the query parameters
- Saves the user settings to the database
- Returns a success or error response

## API Endpoint

`GET /save-settings`

### Query Parameters

- `uuid` - User UUID (required)
- `city` - User's city (required)
- `country` - User's country (required)
- `method` - Prayer time calculation method (optional, defaults to 2)
- `timeFormat` - Time format preference (optional, defaults to '24h')

### Example

```
/save-settings?uuid=674c9d99-cea1-4e52-9025-9efbe0e30901&city=London&country=UK&method=2&timeFormat=12h
```

### Response

Returns a JSON response with a success flag and message.

```json
{
  "success": true,
  "message": "Settings saved successfully"
}
```

## Implementation Notes

This handler includes:

1. Parameter validation using Zod schema
2. Error handling for database operations
3. Logging for tracking user settings changes
4. Consistent response format
