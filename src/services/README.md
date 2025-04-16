# Services

This directory contains service modules that implement business logic for the application. Services are responsible for interacting with external APIs, databases, and other resources.

## Current Services

### Prayer Times Services

Located in `src/services/prayer-times/`, these services handle prayer time calculations and API interactions:

- **getPrayerTimesByCity.ts**: Fetches prayer times from the Aladhan API based on city and country
- **calculatePrayerTimes.ts**: Processes prayer times data and calculates next prayer information, including:
  - Next prayer name and time
  - Time until next prayer (hours, minutes, total minutes)
  - Hijri date formatting
  - Current time in timezone
  - Support for next day's Fajr prayer
- **types.ts**: Type definitions for prayer times data and API responses

### User Settings Services

Located in `src/services/user-settings/`, these services handle user preferences and settings:

- **getUserSettings.ts**: Retrieves user settings from Supabase by UUID
- **saveUserSettings.ts**: Creates or updates user settings in Supabase
- **deleteUserSettings.ts**: Deletes user settings when a user uninstalls the plugin
- **types.ts**: Type definitions for user settings

### TRMNL Services

Located in `src/services/trmnl/`, these services handle TRMNL API interactions:

- **exchangeCodeForToken.ts**: Exchanges an authorization code for an access token during plugin installation
- **verifyToken.ts**: Verifies if an access token is valid
- **types.ts**: Type definitions for TRMNL API requests and responses

## Service Design Principles

1. **Single Responsibility**: Each service file focuses on a specific task
2. **Type Safety**: All services use TypeScript types and interfaces
3. **Error Handling**: Services include proper error handling and logging
4. **Timezone Awareness**: Date and time operations are timezone-aware using date-fns-tz
5. **Testability**: Services are designed to be easily testable with clear inputs and outputs
6. **Reusability**: Services are modular and can be reused across different handlers

## Adding New Services

When adding new services:

1. Create a new directory in `src/services/` for the service domain
2. Add implementation files with clear, focused responsibilities
3. Include a `types.ts` file for type definitions
4. Add proper error handling and logging
5. Write unit tests in the corresponding `tests/unit/services/` directory
6. Update this README.md file to document the new service
