# Technical Architecture

## TRMNL Salah Prayer Times Plugin

This document outlines the technical architecture of the TRMNL Salah Prayer Times Plugin, including the backend services, API integrations, and data flow.

## Architecture Overview

The solution uses a serverless architecture with AWS Lambda and API Gateway to provide prayer times data to TRMNL devices.

### Architecture Diagram

```
+----------------+     +------------------------+     +-----------------+     +----------------+
|                |     |                        |     |                 |     |                |
| TRMNL Device   +---->+ AWS API Gateway        +---->+ Lambda Function +---->+ Supabase       |
| (Polls API)    |     | (Serverless Endpoint)  |     | (TypeScript)    |     | (User Settings)|
|                |     |                        |     |                 |     |                |
+----------------+     +------------------------+     +--------+--------+     +----------------+
                                                              |
                                                              v
                                                      +-------+--------+
                                                      |                |
                                                      | Aladhan API    |
                                                      | (Prayer Times) |
                                                      |                |
                                                      +----------------+
```

## Backend Components

### AWS Lambda Function

The Lambda function is the core of the backend, responsible for:

1. Receiving and validating requests from the API Gateway
2. Fetching prayer times from the Aladhan API
3. Processing the data to calculate next prayer times
4. Formatting the response for the TRMNL device

**Technical Specifications:**
- Runtime: Node.js 20.x
- Memory: 512MB
- Timeout: 30 seconds
- Handler Path: `src/handlers/prayer-times-handler/index.handler`

### API Gateway

The API Gateway provides several HTTP endpoints for the TRMNL plugin lifecycle:

#### Prayer Times Endpoint
**Endpoint:** `/prayer-times`
**Method:** GET
**Parameters:**
- `city` (required): The city name
- `country` (required): The country name
- `method` (optional): The calculation method ID (1-15, default: 2)

#### Installation Endpoint
**Endpoint:** `/install`
**Method:** GET
**Parameters:**
- `token` (required): The token provided by TRMNL
- `installation_callback_url` (required): The URL to redirect back to TRMNL

#### Installation Success Webhook
**Endpoint:** `/installation-success`
**Method:** POST
**Headers:**
- `Authorization`: Bearer token
**Body:** User information in JSON format

#### Plugin Markup Endpoint
**Endpoint:** `/plugin-markup`
**Method:** POST
**Headers:**
- `Authorization`: Bearer token
**Body:** User UUID and view size

#### Plugin Management Endpoint
**Endpoint:** `/manage`
**Method:** GET
**Parameters:**
- `uuid` (required): User UUID

#### Save Settings Endpoint
**Endpoint:** `/save-settings`
**Method:** POST
**Body:** User settings in JSON format

#### Uninstallation Webhook
**Endpoint:** `/uninstall`
**Method:** POST
**Headers:**
- `Authorization`: Bearer token
**Body:** User UUID in JSON format

### External API Integration

The backend integrates with the Aladhan Prayer Times API to fetch accurate prayer times based on location.

**Endpoint:** `https://api.aladhan.com/v1/timingsByCity`
**Parameters:**
- `city`: The city name
- `country`: The country name
- `method`: The calculation method ID

## Data Flows

### Prayer Times Flow

1. TRMNL device polls the API Gateway endpoint with location parameters
2. API Gateway forwards the request to the Lambda function
3. Lambda function validates the parameters
4. If valid, Lambda calls the Aladhan API to fetch prayer times
5. Lambda processes the data to:
   - Determine the next prayer
   - Calculate time until next prayer
   - Format the Hijri date
6. Lambda returns the enhanced response to API Gateway
7. API Gateway returns the data to the TRMNL device
8. TRMNL device renders the data using the plugin template

### Installation Flow

1. User installs the plugin from the TRMNL marketplace
2. TRMNL redirects to the installation endpoint with a token
3. Lambda exchanges the token for an access token
4. Lambda redirects back to TRMNL
5. TRMNL sends a webhook to the installation success endpoint
6. Lambda stores the user information in Supabase

### Uninstallation Flow

1. User uninstalls the plugin from the TRMNL device
2. TRMNL sends a webhook to the uninstallation endpoint
3. Lambda validates the request and extracts the user UUID
4. Lambda deletes the user settings from Supabase
5. Lambda returns a success response to TRMNL

## Code Structure

The codebase follows a modular structure:

```
src/
├── clients/
│   ├── prayer-times/              # Prayer times API client
│   │   └── client.ts              # HTTP client for Aladhan API
│   ├── supabase/                  # Supabase client
│   │   ├── client.ts              # Supabase service implementation
│   │   ├── factory.ts             # Factory function for creating client
│   │   └── types.ts               # Type definitions
│   └── trmnl/                     # TRMNL API client
│       ├── client.ts              # TRMNL client implementation
│       ├── factory.ts             # Factory function for creating client
│       └── types.ts               # Type definitions
├── handlers/
│   ├── prayer-times-handler/      # Prayer times handler module
│   │   ├── index.ts               # Handler implementation
│   │   ├── schema.ts              # Validation schema
│   │   └── README.md              # Handler documentation
│   ├── installation-handler/      # Installation handler module
│   │   ├── index.ts               # Handler implementation
│   │   └── README.md              # Handler documentation
│   ├── installation-success-handler/ # Installation success handler module
│   │   ├── index.ts               # Handler implementation
│   │   └── README.md              # Handler documentation
│   ├── plugin-markup-handler/     # Plugin markup handler module
│   │   ├── index.ts               # Handler implementation
│   │   └── README.md              # Handler documentation
│   ├── plugin-management-handler/ # Plugin management handler module
│   │   ├── index.ts               # Handler implementation
│   │   └── README.md              # Handler documentation
│   ├── save-settings-handler/     # Save settings handler module
│   │   ├── index.ts               # Handler implementation
│   │   └── README.md              # Handler documentation
│   ├── uninstallation-handler/    # Uninstallation handler module
│   │   ├── index.ts               # Handler implementation
│   │   ├── schema.ts              # Validation schema
│   │   └── README.md              # Handler documentation
│   └── index.ts                   # Re-export for backward compatibility
├── controllers/                   # Business logic controllers
│   ├── prayer-times-controller.ts # Prayer times controller
│   ├── plugin-markup-controller.ts # Plugin markup controller
│   └── user-settings-controller.ts # User settings controller
├── services/
│   └── prayer-times/              # Prayer times service
│       └── getPrayerTimesByCity.ts # Service implementation
├── templates/                     # Template files
│   └── trmnl-plugin/              # TRMNL plugin templates
│       ├── markup.html            # Full-screen plugin template
│       ├── half-view-markup.html  # Half-screen plugin template
│       └── quadrant-view-markup.html # Quadrant plugin template
└── utils/
    ├── auth.ts                    # Authentication utilities
    ├── dateUtils.ts               # Date and time utilities using date-fns
    ├── errors.ts                  # Custom error classes
    ├── logger.ts                  # Logging utility
    └── middify.ts                 # Lambda middleware utility
```

## Error Handling

The system implements robust error handling:

1. **Parameter Validation**: Uses Zod schema to validate input parameters
2. **API Errors**: Handles errors from the Aladhan API with appropriate fallbacks
3. **Logging**: Comprehensive logging for debugging and monitoring
4. **HTTP Status Codes**: Returns appropriate HTTP status codes for different error scenarios

## Security Considerations

1. **Authentication**: All webhook endpoints require a valid Bearer token
2. **Input Validation**: All inputs are validated using Zod schemas
3. **Error Handling**: Comprehensive error handling to prevent information leakage
4. **Data Cleanup**: User data is deleted when the plugin is uninstalled

## Future Enhancements

1. **Caching Layer**: Add DynamoDB for caching prayer times to reduce API calls
2. **Multiple Data Sources**: Support alternative prayer times APIs for redundancy
3. **User Preferences**: Expand user preferences for calculation methods and display options
4. **Offline Mode**: Implement fallback data for when API is unavailable
5. **Soft Delete**: Implement soft delete for user settings instead of hard delete
