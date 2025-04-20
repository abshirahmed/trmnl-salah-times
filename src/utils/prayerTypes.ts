/**
 * Common prayer names type for better type safety
 */
export type PrayerName =
  | 'Fajr'
  | 'Sunrise'
  | 'Dhuhr'
  | 'Asr'
  | 'Maghrib'
  | 'Isha';

export const PRAYER_NAMES: readonly PrayerName[] = [
  'Fajr',
  'Sunrise',
  'Dhuhr',
  'Asr',
  'Maghrib',
  'Isha',
] as const;

/**
 * Common interface for prayer times
 */
export interface PrayerTimes {
  [key: string]: Date;
}

/**
 * Parameters for time-related functions
 */
export interface TimeParams {
  /** Date to format/parse */
  date: Date;
  /** IANA timezone string (e.g., "Europe/London") */
  timezone: string;
}
