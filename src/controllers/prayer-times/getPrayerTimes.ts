import { calculatePrayerTimes } from '@/services/prayer-times/calculatePrayerTimes';
import { formatTime12h } from '@/utils/dateUtils';
import { logger } from '@/utils/logger';

/**
 * Parameters for getPrayerTimes function
 */
export interface GetPrayerTimesParams {
  /** City name */
  city: string;
  /** Country name */
  country: string;
  /** Calculation method */
  method: number;
}

/**
 * Get prayer times and enhanced data for a location
 * @param params Parameters for getting prayer times
 * @returns Enhanced prayer times data
 */
export const getPrayerTimes = async (params: GetPrayerTimesParams) => {
  const { city, country, method } = params;
  try {
    logger.info('Getting prayer times', { city, country, method });

    // Calculate prayer times using the shared service
    const prayerTimesResult = await calculatePrayerTimes({
      city,
      country,
      method,
    });

    // Format the next prayer time as a 12-hour string for display
    let formattedNextPrayerTime = '';
    try {
      const timezone = prayerTimesResult.rawData.meta.timezone || 'UTC';
      formattedNextPrayerTime = formatTime12h({
        date: prayerTimesResult.nextPrayerTime,
        timezone,
      });
    } catch (formatError) {
      logger.warn('Error formatting next prayer time', { formatError });
      // Fallback to raw time string if formatting fails
      formattedNextPrayerTime = prayerTimesResult.nextPrayer.includes(
        'Tomorrow',
      )
        ? prayerTimesResult.prayerTimes.Fajr
        : prayerTimesResult.prayerTimes[
            prayerTimesResult.nextPrayer as keyof typeof prayerTimesResult.prayerTimes
          ] || '';
    }

    // Prepare enhanced response with calculated data
    return {
      city,
      country,
      method,
      enhancedData: {
        nextPrayer: prayerTimesResult.nextPrayer,
        nextPrayerTime: formattedNextPrayerTime,
        timeUntilNextPrayer: prayerTimesResult.timeUntilNextPrayer,
        hijriDateFormatted: prayerTimesResult.hijriDateFormatted,
        currentTime: prayerTimesResult.currentTime,
      },
    };
  } catch (error) {
    logger.error('Error in prayer times controller', {
      error,
      city,
      country,
      method,
    });
    // Return a basic response with default values instead of throwing
    return {
      city,
      country,
      method,
      enhancedData: {
        nextPrayer: 'Unknown',
        nextPrayerTime: 'Unknown',
        timeUntilNextPrayer: {
          hours: 0,
          minutes: 0,
          total_minutes: 0,
        },
        hijriDateFormatted: 'Unknown',
        currentTime: new Date().toISOString(),
      },
    };
  }
};
