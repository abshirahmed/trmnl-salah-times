# Release Notes

This page contains the release history of TRMNL Salah Times, with details about new features, improvements, and bug fixes in each version.

## Version 1.0.0 (Current)

**Release Date:** June 2023

### Features

- Display of the five daily prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha)
- Next prayer indicator with countdown timer
- Current Hijri date display
- Customizable calculation methods (7 different methods available)
- Adjustable time format (12-hour or 24-hour)
- Responsive design that adapts to different TRMNL view sizes
- Settings management interface
- Location-based prayer times calculation

### Technical Improvements

- Integration with Aladhan Prayer Times API
- Secure storage of user settings in Supabase
- Efficient caching mechanism for prayer times
- Type-safe implementation with TypeScript
- Comprehensive error handling
- Responsive UI built with HTML and CSS

### Known Issues

- Some very small cities or towns may not be recognized
- Hijri date may differ by ±1 day from some local calendars due to moon sighting differences
- The plugin requires an internet connection to update prayer times

## Future Plans

While not yet released, here are some features we're considering for future versions:

### Planned for Version 1.1.0

- Support for additional languages
- Qibla direction indicator
- Optional Adhan (call to prayer) notifications
- Dark/light theme support
- Additional view customization options

### Planned for Version 1.2.0

- Offline mode with pre-downloaded prayer times
- Integration with calendar applications
- Custom adjustments to prayer times
- Ramadan-specific features (Suhoor and Iftar times)
- Community sharing of preferred settings

## Update Process

TRMNL Salah Times is automatically updated through the TRMNL platform. When a new version is available:

1. You'll receive a notification in the TRMNL application
2. The update will be installed automatically or you can manually trigger it
3. Your settings will be preserved during the update process

## Beta Program

Interested in testing new features before they're officially released? Join our beta program:

1. Visit the [GitHub repository](https://github.com/abshirahmed/trmnl-salah-times)
2. Look for the "Beta Testing" section in the README
3. Follow the instructions to join the beta program

Beta versions may contain bugs or incomplete features and are intended for testing purposes only.
