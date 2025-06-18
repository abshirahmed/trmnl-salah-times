import { calculatePrayerTimes } from '@/services/prayer-times/calculatePrayerTimes';
import { logger } from '@/utils/logger';
import { formatNextPrayerTime } from '@/utils/prayerTimeUtils';

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
  /** Asr method */
  asr_method?: string;
  /** Maghrib offset */
  maghrib_offset?: number;
}

/**
 * Get prayer times and enhanced data for a location
 * @param params Parameters for getting prayer times
 * @returns Enhanced prayer times data
 */
export const getPrayerTimes = async (params: GetPrayerTimesParams) => {
  const { city, country, method, asr_method, maghrib_offset } = params;
  try {
    logger.info('Getting prayer times', {
      city,
      country,
      method,
      asr_method,
      maghrib_offset,
    });

    // Calculate prayer times using the shared service
    const prayerTimesResult = await calculatePrayerTimes({
      city,
      country,
      method,
      asr_method,
      maghrib_offset,
    });

    // Format the next prayer time
    const formattedNextPrayerTime = formatNextPrayerTime(
      prayerTimesResult,
      prayerTimesResult.rawData.meta.timezone || 'UTC',
    );

    // Prepare enhanced response with calculated data
    return {
      city,
      country,
      method,
      asr_method,
      maghrib_offset,
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
      asr_method,
      maghrib_offset,
    });
    // Return a basic response with default values instead of throwing
    return {
      city,
      country,
      method,
      asr_method,
      maghrib_offset,
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
