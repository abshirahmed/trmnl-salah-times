import { getPrayerTimesByCity } from '@/services/prayer-times';
import {
  calculateNextPrayer,
  formatHijriDate,
  formatTime24h,
  parsePrayerTimes,
} from '@/utils/dateUtils';
import { handleError } from '@/utils/errorHandler';
import { logger } from '@/utils/logger';

/**
 * Interface for prayer times calculation parameters
 */
export interface PrayerTimesCalculationParams {
  city: string;
  country: string;
  method: number;
}

/**
 * Calculate prayer times and related information
 * @param params Parameters for prayer times calculation
 * @returns Calculated prayer times and related information
 */
export const calculatePrayerTimes = async (
  params: PrayerTimesCalculationParams,
) => {
  try {
    const { city, country, method } = params;

    // Get prayer times from service
    const prayerTimesResponse = await getPrayerTimesByCity({
      city,
      country,
      method,
    });

    logger.info('Prayer times fetched successfully', {
      city,
      country,
      method,
    });

    // Extract relevant data
    const prayerTimes = prayerTimesResponse.data.timings;
    const hijriDate = prayerTimesResponse.data.date.hijri;
    const timezone = prayerTimesResponse.data.meta.timezone;

    // Get current time
    const now = new Date();

    // Parse prayer times into Date objects
    const prayerTimesObjects = parsePrayerTimes({
      prayerTimesResponse,
      timezone,
      date: now,
    });

    // Calculate next prayer and time until
    const { nextPrayer, nextPrayerTime, timeUntilNextPrayer, isTomorrow } =
      calculateNextPrayer({
        currentDate: now,
        prayerTimes: prayerTimesObjects,
        timezone,
      });

    // Format current time
    const formattedCurrentTime = formatTime24h({
      date: now,
      timezone,
    });

    // Format Hijri date
    const hijriDateFormatted = formatHijriDate(hijriDate);

    return {
      rawData: prayerTimesResponse.data,
      prayerTimes,
      prayerTimesObjects,
      nextPrayer,
      nextPrayerTime,
      timeUntilNextPrayer,
      hijriDateFormatted,
      currentTime: formattedCurrentTime,
      isTomorrow,
    };
  } catch (error) {
    return handleError('Error calculating prayer times', {
      error,
      context: {
        city: params.city,
        country: params.country,
        method: params.method,
      },
    });
  }
};
