import { Tables } from '@/clients/supabase/database.types';
import { calculatePrayerTimes } from '@/services/prayer-times/calculatePrayerTimes';
import { templates } from '@/templates/trmnl-plugin';
import { formatTime12h } from '@/utils/dateUtils';
import { logger } from '@/utils/logger';
import { processTemplate, TemplateData } from './processTemplate';

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
      markup: processTemplate(templates.full, templateData, prayerTimesResult),
      markup_half_horizontal: processTemplate(
        templates.halfHorizontal,
        templateData,
        prayerTimesResult,
      ),
      markup_half_vertical: processTemplate(
        templates.halfVertical,
        templateData,
        prayerTimesResult,
      ),
      markup_quadrant: processTemplate(
        templates.quadrant,
        templateData,
        prayerTimesResult,
      ),
    };
  } catch (error) {
    logger.error('Error generating markup', { error, userSettings });
    // Return a simple markup with error message
    return {
      markup: `<div class="view view--full"><div class="layout"><div class="columns"><div class="column"><div class="error">Unable to load prayer times. Please try again later.</div></div></div></div></div>`,
      markup_half_horizontal: `<div class="view view--half_horizontal"><div class="error">Unable to load prayer times.</div></div>`,
      markup_half_vertical: `<div class="view view--half_vertical"><div class="error">Unable to load prayer times.</div></div>`,
      markup_quadrant: `<div class="view view--quadrant"><div class="error">Error</div></div>`,
    };
  }
};
