# Handlers

This directory contains Lambda function handlers that serve as entry points for the application's API endpoints. Handlers are responsible for processing incoming requests, validating input, delegating business logic to services/controllers, and formatting responses.

## Current Handlers

### Authentication Handlers

Located in `src/handlers/installation-handler/` and related directories:

- **installation-handler**: Handles the OAuth flow when a user installs the plugin
- **installation-success-handler**: Processes successful installations and saves user information
- **uninstallation-handler**: Cleans up when a user uninstalls the plugin by removing user settings

### Prayer Times Handlers

Located in `src/handlers/prayer-times-handler/`:

- **prayer-times-handler**: Serves prayer times data based on location (city, country) and calculation method

### Plugin Handlers

Located in `src/handlers/plugin-markup-handler/` and related directories:

- **plugin-markup-handler**: Generates HTML markup for the TRMNL plugin in various view sizes
- **plugin-management-handler**: Serves the settings management interface for users to configure their preferences
- **save-settings-handler**: Processes settings form submissions and updates user preferences

## Handler Structure

Each handler typically consists of:

1. **index.ts**: Main handler implementation with the AWS Lambda function
2. **schema.ts**: Zod schema for validating input parameters
3. **README.md**: Documentation specific to the handler

## Handler Design Principles

1. **Input Validation**: Each handler validates input using Zod schemas
2. **Error Handling**: Handlers catch and properly format errors for consistent API responses
3. **Separation of Concerns**: Business logic is delegated to controllers and services
4. **Consistent Response Format**: All responses follow a consistent structure with appropriate HTTP status codes
5. **Middleware Usage**: Handlers use middleware for common functionality like logging, error handling, and response formatting
6. **Authorization**: Handlers verify authorization headers where required

## Adding New Handlers

When adding new handlers:

1. Create a new directory in `src/handlers/`
2. Include an `index.ts` file with the handler implementation
3. Include a `schema.ts` file for input validation
4. Add a `README.md` file documenting the handler's purpose and functionality
5. Use the `middify` utility to apply common middleware
6. Update this README.md file to document the new handler

## Handler vs Controller vs Service Responsibilities

- **Handlers**: Process incoming requests, validate input, and format responses
- **Controllers**: Orchestrate the flow of data and operations, handle application logic
- **Services**: Handle external API calls, database operations, and business logic

Handlers are the entry points to the application and should be kept as thin as possible, delegating most logic to controllers and services.
