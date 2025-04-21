# Product Requirements Document (PRD)

## TRMNL Salah Prayer Times Plugin

**Version:** 1.0
**Date:** April 13, 2025

---

## Executive Summary

The TRMNL Salah Prayer Times Plugin provides Islamic prayer time information on TRMNL's e-ink device. Built with AWS Serverless architecture and TypeScript, the solution offers precise daily prayer times, next prayer countdown, and Hijri date information in a clean, minimal interface optimized for TRMNL's unique e-ink display.

This PRD outlines the requirements, technical specifications, and success criteria for creating an effective and beautiful prayer times solution for Muslim users of TRMNL devices.

---

## Product Overview

### Problem Statement
Muslims need to know daily prayer times, which change daily based on location. Current solutions require checking phones or websites, which can be distracting. TRMNL users need a dedicated, always-visible display showing prayer times that aligns with the device's focus on distraction-free information.

### Target Users
- Muslim TRMNL device owners
- Households with multiple Muslim family members
- Mosques and Islamic centers seeking simple prayer time displays
- Muslim professionals who want to maintain prayer schedule awareness without distractions

### Value Proposition
- Provides essential prayer time information in a distraction-free format
- Eliminates need to check phones or websites for prayer times
- Enhances spiritual practice by maintaining prayer time awareness
- Leverages TRMNL's unique e-ink display for low-power, always-on availability
- Seamlessly integrates with existing TRMNL infrastructure

---

## Requirements

### Core Features

1. **Prayer Time Display**
   - Show the five daily prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha)
   - Include Sunrise time
   - Display times in 12-hour or 24-hour format based on user preference
   - Visually highlight the next upcoming prayer

2. **Calculation Methods**
   - Support multiple prayer time calculation methods:
     - Muslim World League
     - Islamic Society of North America (ISNA)
     - Umm Al-Qura University (Mecca)
     - University of Islamic Sciences (Karachi)
     - Egyptian General Authority of Survey
   - Default to ISNA method for North American users

3. **Location-Based Times**
   - Allow users to configure their city and country
   - Support worldwide locations

4. **Hijri Date**
   - Display current Islamic (Hijri) date
   - Include Islamic month name in English
   - Show Hijri year with "AH" designation

5. **Next Prayer Indicator**
   - Clearly indicate which prayer is next
   - Show countdown to next prayer (hours and minutes)

### Technical Requirements

1. **Backend Infrastructure**
   - AWS Serverless architecture using Lambda functions
   - API Gateway endpoint for TRMNL device polling
   - TypeScript implementation for type safety and code quality
   - Error handling and fallback mechanisms
   - Supabase database for user settings storage

2. **TRMNL Integration**
   - Custom plugin utilizing TRMNL's "Private Plugin" capabilities
   - Polling-based strategy for data retrieval
   - Optimized interface for e-ink display (high contrast, minimal imagery)
   - Adherence to TRMNL design guidelines and framework
   - Complete plugin lifecycle implementation (installation, management, uninstallation)

3. **Data Source**
   - Primary: Aladhan Prayer Times API
   - Implement caching to reduce API calls
   - Include fallback data or alternate API support

4. **Refresh Rate**
   - Update prayer times daily at minimum
   - Refresh countdown timer at appropriate intervals
   - Balance accuracy with battery preservation

5. **Security & Privacy**
   - Secure handling of user data
   - Complete data removal upon plugin uninstallation
   - Authentication for all webhook endpoints

### User Experience Requirements

1. **Setup**
   - Simple form fields for location configuration
   - Reasonable defaults for calculation method
   - Clear instructions for configuration changes

2. **Visual Design**
   - High-contrast interface optimized for e-ink display
   - Clear typography with appropriate emphasis hierarchy
   - Utilize TRMNL's design system components

3. **Integration**
   - Support for various TRMNL layout options (full screen, half, quadrant)
   - Ability to be used alongside other TRMNL plugins in playlists

---

## Technical Specifications

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

### AWS Components

1. **Lambda Function**
   - Runtime: Node.js 20.x
   - Memory: 512MB
   - Timeout: 30 seconds
   - Environment variables for configuration

2. **API Gateway**
   - REST API with CORS enabled
   - Required parameters: city, country
   - Optional parameters: method (calculation method)

3. **Future Enhancement: DynamoDB Table**
   - For caching prayer times data (not implemented in current version)
   - Partitioned by location and date
   - TTL for automatic record expiration

### Plugin Interface

1. **View Layout**
   - Support for full-screen, half-screen, and quadrant layouts
   - Responsive design to accommodate all layout options

2. **Content Sections**
   - Header with "Salah Times" title
   - Prayer times list with time values
   - Next prayer countdown section
   - Hijri date display
   - Optional footer with timezone information

---

## Implementation Plan

### Phase 1: Backend Development

1. Set up Serverless Framework project with TypeScript
2. Create Lambda function for prayer times retrieval
3. Implement AlAdhan API integration
4. Add next prayer calculation logic
5. Configure API Gateway endpoint
6. Implement error handling and logging
7. Set up testing environment
8. Deploy to AWS development environment
9. Implement database integration for user settings storage

### Phase 2: TRMNL Plugin Development

1. Purchase TRMNL Developer Edition addon
2. Create Private Plugin configuration
3. Develop plugin UI using TRMNL framework
4. Implement form fields for user configuration
5. Create Liquid templates for data display
6. Test with various locations and calculation methods
7. Optimize layout for various view sizes
8. Implement plugin installation flow
9. Implement plugin management interface
10. Implement plugin uninstallation flow
11. Conduct user testing with Muslim TRMNL users

### Phase 3: Optimization and Launch

1. Address feedback from testing
2. Optimize refresh rates and API calls
3. Implement any caching mechanisms
4. Create documentation for users
5. Finalize design and functionality
6. Deploy to production
7. Share plugin with TRMNL community

---

## Success Criteria

### Functional Criteria

1. Prayer times displayed correctly match authoritative sources
2. Next prayer is accurately identified and highlighted
3. Countdown timer works accurately
4. Hijri date is correctly displayed
5. All calculation methods provide accurate results
6. User location settings are correctly applied

### Performance Criteria

1. API response time under 500ms
2. Device battery impact minimal (no more than other similar plugins)
3. Daily refresh of prayer times occurs reliably
4. Error rate below 0.1% for API calls

### User Criteria

1. Setup requires less than 2 minutes
2. Interface is legible and attractive on e-ink display
3. Information hierarchy makes next prayer time immediately obvious
4. Users report satisfaction with accuracy and usability

---

## Appendix

### API Reference

**Prayer Times Endpoint:**
```
{api-gateway-url}/prayer-times?city={city}&country={country}&method={method}
```

**Installation Endpoint:**
```
{api-gateway-url}/install?token={token}&installation_callback_url={url}
```

**Installation Success Webhook:**
```
POST {api-gateway-url}/installation-success
Authorization: Bearer {access_token}
Body: { "user": { ... } }
```

**Plugin Markup Endpoint:**
```
POST {api-gateway-url}/plugin-markup
Authorization: Bearer {access_token}
Body: { "user_uuid": "..." }
```

**Plugin Management Endpoint:**
```
{api-gateway-url}/manage?uuid={user_uuid}
```

**Save Settings Endpoint:**
```
POST {api-gateway-url}/save-settings
Body: { "uuid": "...", "city": "...", ... }
```

**Uninstallation Webhook:**
```
POST {api-gateway-url}/uninstall
Authorization: Bearer {access_token}
Body: { "user_uuid": "..." }
```

**Aladhan API Endpoint (used by backend):**
```
https://api.aladhan.com/v1/timingsByCity?city={city}&country={country}&method={method}
```

**Sample Response:**
```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "timings": {
      "Fajr": "04:16",
      "Sunrise": "05:52",
      "Dhuhr": "13:00",
      "Asr": "16:49",
      "Sunset": "20:08",
      "Maghrib": "20:08",
      "Isha": "21:44",
      "Imsak": "04:06",
      "Midnight": "01:00",
      "Firstthird": "23:22",
      "Lastthird": "02:37"
    },
    "date": {
      "readable": "13 Apr 2025",
      "timestamp": "1713082800",
      "gregorian": {
        // Gregorian date details
      },
      "hijri": {
        "date": "14-10-1446",
        "format": "DD-MM-YYYY",
        "day": "14",
        "weekday": {
          "en": "Al Athnayn",
          "ar": "الاثنين"
        },
        "month": {
          "number": 10,
          "en": "Shawwal",
          "ar": "شَوّال"
        },
        "year": "1446",
        "designation": {
          "abbreviated": "AH",
          "expanded": "Anno Hegirae"
        },
        "holidays": []
      }
    },
    "meta": {
      // Location and calculation method metadata
    }
  }
}
```

### Calculation Methods

| Method ID | Name | Description |
|-----------|------|-------------|
| 1 | MWL | Muslim World League |
| 2 | ISNA | Islamic Society of North America |
| 3 | Mecca | Umm Al-Qura University, Mecca |
| 4 | Karachi | University of Islamic Sciences, Karachi |
| 5 | Egypt | Egyptian General Authority of Survey |

### TRMNL Design Framework Reference

```html
<!-- Basic structure of the TRMNL plugin -->
<div class="screen screen--no-bleed">
  <div class="view view--full">
    <div class="layout">
      <!-- Content here -->
    </div>
    <div class="title_bar">
      <!-- Title bar content -->
    </div>
  </div>
</div>
```
