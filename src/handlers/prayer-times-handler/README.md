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

The response includes all data from the Aladhan API plus enhanced data:

```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "timings": { ... },
    "date": { ... },
    "meta": { ... },
    "enhancedData": {
      "nextPrayer": "Asr",
      "nextPrayerTime": "15:30",
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
| 2      | Islamic Society of North America             |
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
