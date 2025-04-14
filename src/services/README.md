# Services

This directory contains service modules that implement business logic for the application. Services are responsible for interacting with external APIs, databases, and other resources.

## Current Services

### User Settings Services

Located in `src/services/user-settings/`, these services handle user preferences and settings:

- **getUserSettings.ts**: Retrieves user settings by UUID
- **saveUserSettings.ts**: Creates or updates user settings
- **deleteUserSettings.ts**: Deletes user settings when a user uninstalls the plugin

### Prayer Times Services

Located in `src/services/prayer-times/`, these services handle prayer time calculations and API interactions:

- **getPrayerTimesByCity.ts**: Fetches prayer times from the Aladhan API based on city and country
- **calculatePrayerTimes.ts**: Processes prayer times data and calculates next prayer information
- **types.ts**: Type definitions for prayer times data

### TRMNL Services

Located in `src/services/trmnl/`, these services handle TRMNL API interactions:

- **exchangeCodeForToken.ts**: Exchanges an authorization code for an access token
- **verifyToken.ts**: Verifies if an access token is valid
- **refreshToken.ts**: Refreshes an expired access token

## Future Services

The database schema includes tables for locations and cached prayer times that are not currently used by the application. In the future, these services could be implemented:

### Locations Services

These services would manage user locations:

- **getLocations**: Retrieve all locations for a user
- **getLocation**: Retrieve a specific location by ID
- **saveLocation**: Create or update a location
- **deleteLocation**: Delete a location
- **setDefaultLocation**: Set a location as the default for a user

### Prayer Times Database Services

These services would manage cached prayer times in the database:

- **getCachedPrayerTimes**: Retrieve cached prayer times for a specific location and date
- **cachePrayerTimes**: Store prayer times in the database to reduce API calls
- **deleteCachedPrayerTimes**: Delete cached prayer times

## Service Design Principles

1. **Single Responsibility**: Each service file focuses on a specific task
2. **Reusability**: Services are designed to be reused across different handlers
3. **Error Handling**: Services include proper error handling and logging
4. **Type Safety**: All services use TypeScript types for better code quality
5. **Testability**: Services are designed to be easily testable

## Adding New Services

When adding new services:

1. Create a new file in the appropriate directory
2. Follow the existing pattern for service implementation
3. Include proper TypeScript types
4. Add error handling and logging
5. Export the service from an index.ts file in the directory
6. Update this README.md file to document the new service
