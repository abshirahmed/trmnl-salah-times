import { Tables } from '@/clients/supabase/database.types';
import { processTemplate, TemplateData } from '@/controllers';
import { calculatePrayerTimes } from '@/services';
import {
  fullErrorTemplate,
  halfHorizontalErrorTemplate,
  halfVerticalErrorTemplate,
  quadrantErrorTemplate,
} from '@/templates/errors';
import { fullTemplate } from '@/templates/full';
import { halfHorizontalTemplate } from '@/templates/half-horizontal';
import { halfVerticalTemplate } from '@/templates/half-vertical';
import { quadrantTemplate } from '@/templates/quadrant';
import { logger } from '@/utils/logger';
import { calculateCurrentPrayer } from '@/utils/prayerCalculator';
import { formatNextPrayerTime } from '@/utils/prayerTimeUtils';
import { formatInTimeZone } from 'date-fns-tz';

type UserSettings = Tables<'user_settings'>;

/**
 * Generate markup for all view sizes
 * @param userSettings User settings from Supabase
 * @returns Object containing markup for all view sizes
 */
export const generateMarkup = async (userSettings: UserSettings | null) => {
  try {
    logger.info('Generating markup', { userSettings });

    // Use default values if user settings are not available
    const city = userSettings?.city || 'London';
    const country = userSettings?.country || 'UK';
    const method = userSettings?.method || 2;

    // Calculate prayer times using the shared service
    const prayerTimesResult = await calculatePrayerTimes({
      city,
      country,
      method,
    });

    // Format the next prayer time
    const formattedNextPrayerTime = formatNextPrayerTime(
      prayerTimesResult,
      prayerTimesResult.rawData.meta.timezone || 'UTC',
    );

    // Calculate current prayer
    let currentPrayer;
    try {
      currentPrayer = calculateCurrentPrayer(
        prayerTimesResult.prayerTimesObjects,
        prayerTimesResult.rawData.meta.timezone,
      );
    } catch (error) {
      // Handle the case when current time is before Fajr
      if (
        error instanceof Error &&
        error.message.includes('Current time is before Fajr')
      ) {
        logger.info(
          'Current time is before Fajr, setting currentPrayer to "Isha"',
        );
        currentPrayer = 'Isha';
      } else {
        // Re-throw any other errors
        throw error;
      }
    }

    // Format gregorian date
    const now = new Date();
    const gregorianDate = formatInTimeZone(
      now,
      prayerTimesResult.rawData.meta.timezone || 'UTC',
      'EEEE, MMMM d, yyyy',
    );

    // Format last sync time
    const lastSyncTime = formatInTimeZone(
      now,
      prayerTimesResult.rawData.meta.timezone || 'UTC',
      'hh:mma',
    );

    // Prepare data for template rendering
    const templateData: TemplateData = {
      data: prayerTimesResult.rawData,
      enhancedData: {
        nextPrayer: prayerTimesResult.nextPrayer,
        nextPrayerTime: formattedNextPrayerTime,
        timeUntilNextPrayer: prayerTimesResult.timeUntilNextPrayer,
        hijriDateFormatted: prayerTimesResult.hijriDateFormatted,
        currentTime: prayerTimesResult.currentTime,
        gregorianDate,
        lastSyncTime,
        currentPrayer,
      },
    };

    // Process templates for all view sizes
    return {
      markup: await processTemplate(
        fullTemplate,
        templateData,
        prayerTimesResult,
      ),
      markup_half_horizontal: await processTemplate(
        halfHorizontalTemplate,
        templateData,
        prayerTimesResult,
      ),
      markup_half_vertical: await processTemplate(
        halfVerticalTemplate,
        templateData,
        prayerTimesResult,
      ),
      markup_quadrant: await processTemplate(
        quadrantTemplate,
        templateData,
        prayerTimesResult,
      ),
    };
  } catch (error) {
    logger.error('Error generating markup', { error, userSettings });
    // Return a simple markup with error message
    return {
      markup: fullErrorTemplate,
      markup_half_horizontal: halfHorizontalErrorTemplate,
      markup_half_vertical: halfVerticalErrorTemplate,
      markup_quadrant: quadrantErrorTemplate,
    };
  }
};
