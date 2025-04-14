# Troubleshooting TRMNL Salah Times

If you're experiencing issues with the TRMNL Salah Times plugin, this guide will help you identify and resolve common problems.

## Common Issues {#common-issues}

### Plugin Not Showing Up

**Symptoms:**
- The plugin doesn't appear in your TRMNL dashboard after installation
- You can't find the plugin in your installed plugins list

**Solutions:**
1. Refresh your TRMNL dashboard by clicking the refresh button or pressing F5
2. Restart the TRMNL application
3. Check if the plugin is disabled in your TRMNL settings
4. Try reinstalling the plugin from the TRMNL Marketplace

### Incorrect Prayer Times

**Symptoms:**
- Prayer times shown in the plugin don't match your local mosque or other prayer time sources
- Times seem significantly off from what you expect

**Solutions:**
1. Verify your location settings (city and country) are correct
2. Try changing the calculation method to match what's used in your region
3. Compare with other reliable sources like [Aladhan.com](https://aladhan.com) or your local mosque
4. Remember that some variation (a few minutes) between different sources is normal due to different calculation methods

### Location Not Found

**Symptoms:**
- You receive an error message saying "Location not found" or "Invalid location"
- Prayer times don't load after entering your location

**Solutions:**
1. Check the spelling of your city and country
2. Try using a larger nearby city if your town is very small
3. Use the format "City, Country" (e.g., "London, United Kingdom")
4. Avoid using abbreviations or local names that might not be recognized

### Plugin Not Updating

**Symptoms:**
- Prayer times don't change day to day
- The next prayer indicator doesn't update throughout the day

**Solutions:**
1. Check your internet connection
2. Refresh the TRMNL dashboard
3. Restart the TRMNL application
4. Verify that your system time and date are correct

### Settings Not Saving

**Symptoms:**
- Your settings revert to previous values after you change them
- Settings changes don't seem to take effect

**Solutions:**
1. Make sure you're clicking the "Save" button after changing settings
2. Check if you have permission issues with the TRMNL application
3. Verify your internet connection (settings are saved to the cloud)
4. Try clearing the TRMNL cache and restarting the application

## Diagnostic Steps

If you're still experiencing issues, try these general diagnostic steps:

### Check System Requirements

- Ensure your operating system is supported by TRMNL
- Verify you have a stable internet connection
- Check that you have the latest version of TRMNL installed

### Verify Plugin Version

1. Go to the TRMNL Marketplace
2. Find the TRMNL Salah Times plugin
3. Check if there's an update available
4. Update to the latest version if possible

### Clear Cache

1. Close the TRMNL application
2. Navigate to the TRMNL application data folder
   - Windows: `%APPDATA%\TRMNL`
   - macOS: `~/Library/Application Support/TRMNL`
   - Linux: `~/.config/TRMNL`
3. Delete the cache folder
4. Restart TRMNL

### Reinstall the Plugin

1. Uninstall the TRMNL Salah Times plugin
2. Restart TRMNL
3. Reinstall the plugin from the Marketplace

## Getting Additional Help

If you've tried the troubleshooting steps above and are still experiencing issues:

1. Check the [FAQ](faq.md) for answers to common questions
2. Visit the [GitHub repository](https://github.com/abshirahmed/trmnl-salah-times) for the latest information
3. Submit an issue on GitHub with details about your problem
4. Contact support as described in the [Contact & Support](contact-support.md) page
