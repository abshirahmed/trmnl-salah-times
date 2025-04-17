import { Tables } from '@/clients/supabase/database.types';
import { ERROR_TEMPLATES, TEMPLATES } from '@/constants/templateConstants';
import { processTemplate, TemplateData } from '@/controllers/plugin-markup';
import { calculatePrayerTimes } from '@/services/prayer-times/calculatePrayerTimes';
import { logger } from '@/utils/logger';
import { formatNextPrayerTime } from '@/utils/prayerTimeUtils';

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

    // Prepare data for template rendering
    const templateData: TemplateData = {
      data: prayerTimesResult.rawData,
      enhancedData: {
        nextPrayer: prayerTimesResult.nextPrayer,
        nextPrayerTime: formattedNextPrayerTime,
        timeUntilNextPrayer: prayerTimesResult.timeUntilNextPrayer,
        hijriDateFormatted: prayerTimesResult.hijriDateFormatted,
        currentTime: prayerTimesResult.currentTime,
      },
    };

    // Process templates for all view sizes
    return {
      markup: processTemplate(TEMPLATES.full, templateData, prayerTimesResult),
      markup_half_horizontal: processTemplate(
        TEMPLATES.halfHorizontal,
        templateData,
        prayerTimesResult,
      ),
      markup_half_vertical: processTemplate(
        TEMPLATES.halfVertical,
        templateData,
        prayerTimesResult,
      ),
      markup_quadrant: processTemplate(
        TEMPLATES.quadrant,
        templateData,
        prayerTimesResult,
      ),
    };
  } catch (error) {
    logger.error('Error generating markup', { error, userSettings });
    // Return a simple markup with error message
    return {
      markup: ERROR_TEMPLATES.FULL,
      markup_half_horizontal: ERROR_TEMPLATES.HALF_HORIZONTAL,
      markup_half_vertical: ERROR_TEMPLATES.HALF_VERTICAL,
      markup_quadrant: ERROR_TEMPLATES.QUADRANT,
    };
  }
};
