# TRMNL Salah Times Settings

This page explains all the settings available in the TRMNL Salah Times plugin and how to configure them.

## Accessing Settings

To access the settings for TRMNL Salah Times:

1. Click on the TRMNL Salah Times plugin in your TRMNL dashboard
2. Click the "Settings" or gear icon in the plugin interface
3. The settings panel will open, allowing you to make changes

## Available Settings

### Location

#### City
- **What it does**: Sets the city for which prayer times will be calculated
- **How to set**: Enter the name of your city (e.g., "London", "New York", "Dubai")
- **Default**: London
- **Tips**: Use the official city name without abbreviations for best results

#### Country
- **What it does**: Sets the country for which prayer times will be calculated
- **How to set**: Enter the name of your country (e.g., "United Kingdom", "United States", "UAE")
- **Default**: UK
- **Tips**: Use the full country name rather than country codes

### Calculation Methods

The calculation method determines how prayer times are calculated based on different scholarly opinions and conventions.

Available methods:

1. **University of Islamic Sciences, Karachi**
   - Used in Pakistan and neighboring countries
   - Fajr angle: 18°, Isha angle: 18°

2. **Islamic Society of North America (ISNA) - Default**
   - Used by ISNA
   - Fajr angle: 15°, Isha angle: 15°
   - Default method for the plugin
   - Popular in North America

3. **Muslim World League**
   - Used by the Muslim World League
   - Fajr angle: 18°, Isha angle: 17°
   - Widely used in Europe, Far East, and parts of America

4. **Umm al-Qura University, Makkah**
   - Used in Saudi Arabia
   - Fajr angle: 18.5°
   - Isha: 90 minutes after Maghrib (120 minutes during Ramadan)

5. **Egyptian General Authority of Survey**
   - Used in Egypt and many African countries
   - Fajr angle: 19.5°, Isha angle: 17.5°

6. **Institute of Geophysics, University of Tehran**
   - Used in Iran and some Shia communities
   - Fajr angle: 17.7°, Isha angle: 14°

7. **Gulf Region**
   - Used in Gulf Cooperation Council regions
   - Similar to Umm al-Qura but with different Isha calculation

8. **Kuwait**
   - Used in Kuwait
   - Fajr angle: 18°, Isha angle: 17.5°

9. **Qatar**
   - Used in Qatar
   - Similar to Gulf Region method with local adjustments

10. **Majlis Ugama Islam Singapura**
    - Used in Singapore
    - Specific to Singapore's geographical position

11. **Union Organization Islamic de France**
    - Used in France
    - Adapted for higher latitudes

12. **Diyanet İşleri Başkanlığı**
    - Used in Turkey and Turkish communities
    - Specific to Turkey's geographical position

13. **Spiritual Administration of Muslims of Russia**
    - Used in Russia and neighboring regions
    - Adapted for high latitudes

14. **Moonsighting Committee Worldwide**
    - Global method based on moon sighting
    - Uses astronomical twilight if sun doesn't reach required angle

### Asr Method
- **What it does**: Sets the juristic method for calculating Asr prayer time.
- **Options**: "Standard" (Shafi'i, Maliki, Hanbali) or "Hanafi"
- **Default**: Standard
- **Tips**: Choose "Hanafi" if you follow the Hanafi school of thought.

### Maghrib Offset
- **What it does**: Adds or subtracts a manual minute adjustment to the Maghrib prayer time.
- **How to set**: Enter a positive or negative integer (e.g., 3, -2)
- **Default**: 0 (no adjustment)
- **Tips**: Use this if your local mosque announces Maghrib a few minutes after sunset.

### Time Format

The plugin uses the following time formats:

- Prayer times: 24-hour format (e.g., "15:30") or 12-hour format (e.g., "3:30 PM")
- Next prayer time: 12-hour format with AM/PM (e.g., "3:30 PM")
- Time until next prayer: Hours and minutes (e.g., "2 hours 15 minutes")

## Timezone Handling

- Prayer times are automatically adjusted to your local timezone
- The plugin uses the IANA timezone database for accurate calculations
- Timezone is determined from the Aladhan API response based on location

## Saving Your Settings

After making changes to your settings:

1. Click the "Save" button at the bottom of the settings panel
2. Your settings will be saved and the prayer times will update immediately
3. Your settings are stored securely and will be remembered even if you close TRMNL

## Resetting to Default Settings

If you want to reset all settings to their default values:

1. Click the "Reset to Default" button in the settings panel
2. Confirm that you want to reset all settings
3. Your settings will be reset to the default values (ISNA calculation method, 24-hour time format, Standard Asr method, 0 Maghrib offset)

## Settings Synchronization

Your settings are synchronized with your TRMNL account, so they will be available on any device where you use TRMNL with the same account.
