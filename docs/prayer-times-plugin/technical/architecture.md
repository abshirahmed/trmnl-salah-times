# Technical Architecture

## TRMNL Salah Prayer Times Plugin

This document outlines the technical architecture of the TRMNL Salah Prayer Times Plugin, including the backend services, API integrations, and data flow.

## Architecture Overview

The solution uses a serverless architecture with AWS Lambda and API Gateway to provide prayer times data to TRMNL devices.

### Architecture Diagram

```
+----------------+     +------------------------+     +-----------------+
|                |     |                        |     |                 |
| TRMNL Device   +---->+ AWS API Gateway        +---->+ Lambda Function |
| (Polls API)    |     | (Serverless Endpoint)  |     | (TypeScript)    |
|                |     |                        |     |                 |
+----------------+     +------------------------+     +--------+--------+
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

The API Gateway provides the HTTP endpoint that the TRMNL device polls for data.

**Endpoint:** `/prayer-times`
**Method:** GET
**Parameters:**
- `city` (required): The city name
- `country` (required): The country name
- `method` (optional): The calculation method ID (1-15, default: 2)

### External API Integration

The backend integrates with the Aladhan Prayer Times API to fetch accurate prayer times based on location.

**Endpoint:** `https://api.aladhan.com/v1/timingsByCity`
**Parameters:**
- `city`: The city name
- `country`: The country name
- `method`: The calculation method ID

## Data Flow

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

## Code Structure

The codebase follows a modular structure:

```
src/
├── clients/
│   └── prayerTimesClient.ts       # HTTP client for Aladhan API
├── handlers/
│   ├── prayer-times-handler/      # Prayer times handler module
│   │   ├── index.ts               # Handler implementation
│   │   ├── schema.ts              # Validation schema
│   │   └── README.md              # Handler documentation
│   └── index.ts                   # Re-export for backward compatibility
├── services/
│   └── prayer-times/              # Prayer times service
│       └── getPrayerTimesByCity.ts # Service implementation
└── utils/
    ├── dateUtils.ts                     # Date and time utilities using date-fns
    ├── logger.ts                        # Logging utility
    └── middify.ts                       # Lambda middleware utility
```

## Error Handling

The system implements robust error handling:

1. **Parameter Validation**: Uses Zod schema to validate input parameters
2. **API Errors**: Handles errors from the Aladhan API with appropriate fallbacks
3. **Logging**: Comprehensive logging for debugging and monitoring
4. **HTTP Status Codes**: Returns appropriate HTTP status codes for different error scenarios

## Future Enhancements

1. **Caching Layer**: Add DynamoDB for caching prayer times to reduce API calls
2. **Multiple Data Sources**: Support alternative prayer times APIs for redundancy
3. **User Preferences**: Store and apply user preferences for calculation methods
4. **Offline Mode**: Implement fallback data for when API is unavailable
