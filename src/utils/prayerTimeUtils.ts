import { logger } from '@/utils/logger';
import { formatTime12h, formatTime24h } from '@/utils/timeFormatting';

interface PrayerTimesResult {
  nextPrayer: string;
  nextPrayerTime: Date;
  prayerTimes: Record<string, string>;
}

/**
 * Format the next prayer time with fallback handling
 * @param prayerTimesResult Prayer times calculation result
 * @param timezone Timezone for formatting
 * @param timeformat Time format ("12h" or "24h")
 * @returns Formatted next prayer time
 */
export const formatNextPrayerTime = (
  prayerTimesResult: PrayerTimesResult,
  timezone: string,
  timeformat: string = '12h',
): string => {
  try {
    const formatter = timeformat === '24h' ? formatTime24h : formatTime12h;
    return formatter({
      date: prayerTimesResult.nextPrayerTime,
      timezone,
    });
  } catch (formatError) {
    logger.warn('Error formatting next prayer time', { formatError });
    // Fallback to raw time string if formatting fails
    return prayerTimesResult.nextPrayer.includes('Tomorrow')
      ? prayerTimesResult.prayerTimes.Fajr
      : prayerTimesResult.prayerTimes[
          prayerTimesResult.nextPrayer as keyof typeof prayerTimesResult.prayerTimes
        ] || '';
  }
};
