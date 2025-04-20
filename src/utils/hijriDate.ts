/**
 * Interface for Hijri date format
 */
export interface HijriDate {
  day: string | number;
  month: { en: string };
  year: string | number;
}

/**
 * Format a date in Hijri format (e.g., "15 Ramadan 1444 AH")
 */
export const formatHijriDate = (hijriDate: HijriDate): string =>
  `${hijriDate.day} ${hijriDate.month.en} ${hijriDate.year} AH`;
