# Prayer Times Handler

This handler is responsible for retrieving prayer times based on city and country parameters.

## Files

- `index.ts` - Main handler implementation
- `schema.ts` - Validation schema for query parameters

## Functionality

- Validates incoming query parameters (city, country, method)
- Fetches prayer times from the Aladhan API
- Calculates the next prayer and time until next prayer
- Returns enhanced response with additional data

## API Endpoint

`GET /prayer-times`

### Query Parameters

| Parameter | Type   | Required | Description                                                |
|-----------|--------|----------|------------------------------------------------------------|
| city      | string | Yes      | City name                                                  |
| country   | string | Yes      | Country name                                               |
| method    | number | No       | Calculation method (1-15, default: 2)                      |

### Response

The response includes the following data:

```json
{
  "statusCode": 200,
  "body": {
    "city": "London",
    "country": "UK",
    "method": 2,
    "enhancedData": {
      "nextPrayer": "Asr",
      "nextPrayerTime": "3:30 PM",
      "timeUntilNextPrayer": {
        "hours": 2,
        "minutes": 15,
        "total_minutes": 135
      },
      "hijriDateFormatted": "15 Ramadan 1445 AH",
      "currentTime": "13:15"
    }
  }
}
```

## Calculation Methods

| Method | Description                                  |
|--------|----------------------------------------------|
| 1      | University of Islamic Sciences, Karachi      |
| 2      | Islamic Society of North America (Default)   |
| 3      | Muslim World League                          |
| 4      | Umm Al-Qura University, Makkah               |
| 5      | Egyptian General Authority of Survey         |
| 7      | Institute of Geophysics, University of Tehran|
| 8      | Gulf Region                                  |
| 9      | Kuwait                                       |
| 10     | Qatar                                        |
| 11     | Majlis Ugama Islam Singapura, Singapore      |
| 12     | Union Organization Islamic de France         |
| 13     | Diyanet İşleri Başkanlığı, Turkey           |
| 14     | Spiritual Administration of Muslims of Russia|
| 15     | Moonsighting Committee Worldwide             |

## Implementation Notes

This handler includes:

1. Input validation using Zod schema
2. Error handling for API and database operations
3. Logging for tracking prayer times requests
4. Time zone-aware calculations using date-fns-tz
5. 12-hour time format for next prayer time
6. Support for next day's Fajr prayer when all prayers for current day have passed
