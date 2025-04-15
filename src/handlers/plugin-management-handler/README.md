# Plugin Management Handler

This handler is responsible for providing a user interface for managing TRMNL plugin settings.

## Files

- `index.ts` - Main handler implementation
- `schema.ts` - Validation schema for query parameters

## Functionality

- Serves an HTML form for users to configure their prayer times settings
- Allows users to set their city, country, calculation method, and time format preferences

## API Endpoint

`GET /manage`

### Query Parameters

- `uuid` - The user's UUID

### Response

Returns an HTML page with a form for configuring prayer times settings.

## Form Fields

- `city` - The user's city
- `country` - The user's country
- `method` - The prayer time calculation method
- `timeFormat` - The time format preference (12h or 24h)

## Implementation Notes

This handler includes:

1. Input validation using Zod schema
2. Retrieval of user settings from the database
3. Pre-population of the form with existing settings
4. Form submission handling to update settings
