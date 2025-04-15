# Controllers

This directory contains controller modules that implement application logic and coordinate between handlers and services. Controllers are responsible for orchestrating the flow of data and operations without directly handling external API calls or database interactions.

## Current Controllers

### Prayer Times Controller

Located in `src/controllers/prayer-times/`:

- **getPrayerTimes.ts**: Processes prayer times data and enhances it with additional information like next prayer time and time until next prayer

### Plugin Markup Controller

Located in `src/controllers/plugin-markup/`:

- **generateMarkup.ts**: Generates HTML markup for different view sizes (full, half horizontal, half vertical, quadrant)
- **processTemplate.ts**: Processes templates with dynamic data, replacing placeholders with actual values

### User Settings Controller

Located in `src/controllers/user-settings/`:

- **generateManagementInterface.ts**: Generates the HTML interface for managing user settings including city, country, calculation method, and time format

## Controller Design Principles

1. **Functional Approach**: Controllers use a functional approach rather than classes
2. **Single Responsibility**: Each controller file focuses on a specific task
3. **Orchestration**: Controllers coordinate between handlers and services
4. **No Direct External Calls**: Controllers delegate external API calls and database operations to services
5. **Error Handling**: Controllers include proper error handling and fallback mechanisms
6. **Type Safety**: All controllers use TypeScript types for better code quality

## Adding New Controllers

When adding new controllers:

1. Create a new directory in `src/controllers/` for the controller category
2. Create individual files for each controller function
3. Create an `index.ts` file to export all functions
4. Follow the functional approach established in existing controllers
5. Include proper error handling and logging
6. Update this README.md file to document the new controller

## Controller vs Service Responsibilities

- **Controllers**: Orchestrate the flow of data and operations, handle application logic
- **Services**: Handle external API calls, database operations, and business logic
- **Handlers**: Process incoming requests, validate input, and format responses

Controllers sit between handlers and services, coordinating the flow of data and operations. They take input from handlers, process it using services, and return formatted responses.
