import { logger } from '@/utils/logger';
import { formatTime12h } from '@/utils/timeFormatting';

interface PrayerTimesResult {
  nextPrayer: string;
  nextPrayerTime: Date;
  prayerTimes: Record<string, string>;
}

/**
 * Format the next prayer time with fallback handling
 * @param prayerTimesResult Prayer times calculation result
 * @param timezone Timezone for formatting
 * @returns Formatted next prayer time
 */
export const formatNextPrayerTime = (
  prayerTimesResult: PrayerTimesResult,
  timezone: string,
): string => {
  try {
    return formatTime12h({
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
