# Release Notes

This page contains the release history of TRMNL Salah Times, with details about new features, improvements, and bug fixes in each version.

## Version 1.1.0 (Current)

**Release Date:** April 2025

### Features

- Display of the five daily prayer times plus sunrise
- Next prayer indicator with countdown timer
- Current Hijri date display with accurate calculations
- Multiple calculation methods (15 methods supported)
- Adjustable time format (12/24-hour)
- Responsive design for all TRMNL view sizes
- Enhanced settings management interface
- Location-based prayer times with timezone support
- Preview mode for development and testing
- Dark/light theme support
- Additional view customization options

### Technical Improvements

- Upgraded to Node.js 20.x (tested with 22.x)
- Latest TypeScript 5.8.3 with strict mode
- Enhanced build system with esbuild
- Improved testing with Jest and SWC
- ESLint v9 with flat config
- Husky v9 for Git hooks
- AWS Lambda Powertools for logging
- Comprehensive error handling and validation
- Enhanced development tools and preview server

### Bug Fixes

- Fixed timezone handling for daylight saving time
- Improved city and location detection
- Enhanced error messages for better troubleshooting
- Fixed layout issues in different view sizes
- Improved performance and reduced API calls

### Known Issues

- Some very small cities or towns may not be recognized
- Hijri date may differ by ±1 day from some local calendars
- The plugin requires an internet connection to update prayer times

## Future Plans

While not yet released, here are some features we're considering for future versions:

## Update Process

TRMNL Salah Times is automatically updated through the TRMNL platform. When a new version is available:

1. You'll receive a notification in the TRMNL application
2. The update will be installed automatically or you can manually trigger it
3. Your settings will be preserved during the update process

## Development Preview

Want to try out new features during development?

1. Clone the repository: `git clone https://github.com/abshirahmed/trmnl-salah-times`
2. Install dependencies: `yarn install`
3. Start the preview server: `yarn preview`
4. Visit `http://localhost:3001` to see the plugin in action

The preview server provides a development environment where you can test different view sizes and configurations.
