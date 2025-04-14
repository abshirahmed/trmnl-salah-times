# Plugin Markup Handler

This handler is responsible for serving TRMNL plugin markup templates.

## Files

- `index.ts` - Main handler implementation
- `schema.ts` - Validation schema for request body

## Functionality

- Receives requests for plugin markup from TRMNL
- Verifies the authorization header
- Extracts the user UUID from the request body
- Retrieves user settings from the database
- Generates markup for all view sizes
- Returns the markup as JSON

## API Endpoint

`POST /plugin-markup`

### Headers

- `Authorization` - Bearer token with the access token

### Request Body

```json
{
  "user_uuid": "uuid-of-the-user"
}
```

### Response

Returns a JSON object containing markup for all view sizes:

```json
{
  "full": "<html>...</html>",
  "half": "<html>...</html>",
  "quadrant": "<html>...</html>"
}
```

## Templates

The handler serves templates from the `trmnl-plugin` directory:

- `markup.html` - Full-screen view template
- `half-view-markup.html` - Half-screen view template
- `quadrant-view-markup.html` - Quadrant view template

## Production Considerations

In a production environment, you would:

1. Implement caching for frequently accessed templates
2. Add more robust error handling for database operations
3. Optimize template generation for performance
4. Add monitoring for template generation times
