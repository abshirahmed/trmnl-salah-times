# Plugin Markup Handler

This handler is responsible for serving TRMNL plugin markup templates.

## Files

- `index.ts` - Main handler implementation

## Functionality

- Receives requests for plugin markup from TRMNL
- Verifies the authorization header
- Determines which template to return based on the view size
- Returns the appropriate template

## API Endpoint

`GET /plugin-markup`

### Headers

- `Authorization` - Bearer token with the access token

### Query Parameters

- `view_size` - The size of the view (full, half, quadrant)

### Response

Returns the HTML/Liquid template for the specified view size.

## Templates

The handler serves templates from the `trmnl-plugin` directory:

- `markup.html` - Full-screen view template
- `half-view-markup.html` - Half-screen view template
- `quadrant-view-markup.html` - Quadrant view template

## Production Considerations

In a production environment, you would:

1. Retrieve user preferences from a database using the access token
2. Customize the template based on these preferences
3. Return the customized template
