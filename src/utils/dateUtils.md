# Date Utilities

This module provides comprehensive date and time utilities for the TRMNL Salah Times plugin, using the date-fns and date-fns-tz libraries for timezone-aware date operations.

## Functions

### parseTimeString

Converts a time string in 12-hour format (e.g., "05:30 AM") to a Date object.

```typescript
interface ParseTimeStringParams {
  timeString: string;    // Time string in 12-hour format (e.g., "05:30 AM")
  timezone: string;      // IANA timezone string (e.g., "Europe/London")
  referenceDate: Date;   // Reference date to use
}

const parseTimeString = (params: ParseTimeStringParams): Date => { ... }
```

### formatTime12h

Formats a date in 12-hour format.

```typescript
interface FormatTimeParams {
  date: Date;            // Date to format
  timezone: string;      // IANA timezone string
}

const formatTime12h = (params: FormatTimeParams): string => { ... }
```

### formatTime24h

Formats a date in 24-hour format.

```typescript
interface FormatTimeParams {
  date: Date;            // Date to format
  timezone: string;      // IANA timezone string
}

const formatTime24h = (params: FormatTimeParams): string => { ... }
```

### calculateNextPrayer

Calculates the time until the next prayer.

```typescript
interface CalculateNextPrayerParams {
  currentDate: Date;                 // Current date and time
  prayerTimes: Record<string, Date>; // Object containing prayer times as Date objects
  timezone: string;                  // IANA timezone string
}

const calculateNextPrayer = (params: CalculateNextPrayerParams) => { ... }
```

### parsePrayerTimes

Parses prayer times from API response.

```typescript
interface ParsePrayerTimesParams {
  prayerTimesResponse: {            // API response containing prayer times as strings
    data: {
      timings: Record<string, string>;
      meta: { timezone: string };
    };
  };
  timezone: string;                 // IANA timezone string
  date: Date;                       // Date to use for calculations
}

const parsePrayerTimes = (params: ParsePrayerTimesParams): Record<string, Date> => { ... }
```

### formatHijriDate

Formats a Hijri date object into a readable string.

```typescript
const formatHijriDate = (hijriDate: {
  day: number | string;
  month: { en: string };
  year: number | string;
}): string => { ... }
```

## Usage

All functions in this module use object parameters for better readability and maintainability. This approach makes function calls more self-documenting and allows for easier addition or removal of parameters in the future.

Example:

```typescript
import { parseTimeString, formatTime12h, calculateNextPrayer } from '@/utils/dateUtils';

// Parse a time string
const date = parseTimeString({
  timeString: '05:30 AM',
  timezone: 'Europe/London',
  referenceDate: new Date(),
});

// Format a date in 12-hour format
const formattedTime = formatTime12h({
  date,
  timezone: 'Europe/London',
});

// Calculate next prayer
const nextPrayer = calculateNextPrayer({
  currentDate: new Date(),
  prayerTimes: {
    'Fajr': new Date('2023-05-15T05:00:00Z'),
    'Dhuhr': new Date('2023-05-15T12:30:00Z'),
    'Asr': new Date('2023-05-15T16:00:00Z'),
    'Maghrib': new Date('2023-05-15T19:30:00Z'),
    'Isha': new Date('2023-05-15T21:00:00Z'),
  },
  timezone: 'Europe/London',
});
```
