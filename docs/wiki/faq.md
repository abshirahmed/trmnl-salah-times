# Frequently Asked Questions (FAQ)

## General Questions

### What is TRMNL Salah Times?
TRMNL Salah Times is a plugin for the TRMNL platform that displays Islamic prayer times directly in your terminal. It provides a convenient way to keep track of daily prayer times without leaving your development environment.

### Is TRMNL Salah Times free to use?
Yes, TRMNL Salah Times is completely free to use. It's an open-source project available on GitHub.

### Do I need an internet connection to use TRMNL Salah Times?
Yes, an internet connection is required to fetch prayer times and update the plugin. However, once loaded, the current day's prayer times will remain available even if your connection drops temporarily.

### Which operating systems are supported?
TRMNL Salah Times works on any operating system that supports the TRMNL platform, including:
- Windows
- macOS
- Linux

## Prayer Times Questions

### How accurate are the prayer times?
The prayer times are calculated using the [Aladhan Prayer Times API](https://aladhan.com/prayer-times-api), which is widely used and trusted. The accuracy depends on the calculation method you choose and your location settings.

### Why do the prayer times in the plugin differ from my local mosque?
Mosques may use different calculation methods or make local adjustments based on their specific location or community preferences. Try changing the calculation method in the settings to match what your local mosque uses.

### Does the plugin account for Daylight Saving Time?
Yes, the prayer times automatically adjust for Daylight Saving Time based on your location.

### How often are the prayer times updated?
Prayer times are updated daily. The plugin fetches new times at the beginning of each day or when you change your settings.

### Does the plugin show Sunrise and Midnight times?
Currently, the plugin focuses on the five obligatory prayer times. Sunrise and Midnight times are not displayed in the current version.

## Settings Questions

### How do I change my location?
Click on the settings icon in the plugin interface, then update your city and country in the location settings section.

### Which calculation method should I use?
Choose the calculation method that is commonly used in your region or by your local mosque. If unsure, the Muslim World League method is a good default for many regions.

### Can I use a location that's not my current location?
Yes, you can set any city and country in the settings. This is useful if you want to check prayer times for a different location.

### Are my settings saved if I reinstall the plugin?
Yes, your settings are stored with your TRMNL account and will be restored if you reinstall the plugin.

## Technical Questions

### How does TRMNL Salah Times calculate prayer times?
The plugin uses the [Aladhan Prayer Times API](https://aladhan.com/prayer-times-api), which implements various calculation methods based on astronomical calculations and scholarly opinions.

### Does the plugin collect any personal data?
The plugin only stores the location and calculation method settings you provide. This information is used solely for calculating prayer times. No personal data is collected or shared with third parties.

### Can I contribute to the development of TRMNL Salah Times?
Yes! TRMNL Salah Times is an open-source project. You can contribute by visiting the [GitHub repository](https://github.com/abshirahmed/trmnl-salah-times) and submitting pull requests or reporting issues.

### Is the plugin available in languages other than English?
Currently, the plugin is only available in English. Support for additional languages may be added in future updates.

## Troubleshooting Questions

### The plugin isn't showing up after installation. What should I do?
Try refreshing your TRMNL dashboard, restarting the TRMNL application, or reinstalling the plugin. See the [Troubleshooting](troubleshooting.md) page for more detailed steps.

### Why am I getting a "Location not found" error?
This usually happens if the city or country name isn't recognized. Try using a larger nearby city or check the spelling of your location. Use the format "City, Country" for best results.

### The next prayer indicator isn't updating. How can I fix this?
Try refreshing the TRMNL dashboard or restarting the application. Also, check that your system time and date are correct.

### Where can I report bugs or request features?
You can report bugs or request features by creating an issue on the [GitHub repository](https://github.com/abshirahmed/trmnl-salah-times) or by contacting support as described in the [Contact & Support](contact-support.md) page.
