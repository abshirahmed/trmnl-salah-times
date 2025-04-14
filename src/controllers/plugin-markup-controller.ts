import { Tables } from '@/clients/supabase/database.types';
import { calculatePrayerTimes } from '@/services/prayer-times/calculatePrayerTimes';
import { templates } from '@/templates/trmnl-plugin';
import { formatTime12h } from '@/utils/dateUtils';
import { logger } from '@/utils/logger';

type UserSettings = Tables<'user_settings'>;

/**
 * Controller for plugin markup generation
 */
export class PluginMarkupController {
  /**
   * Generate markup for all view sizes
   * @param userSettings User settings from Supabase
   * @returns Object containing markup for all view sizes
   */
  async generateMarkup(
    userSettings: UserSettings | null,
  ): Promise<Record<string, string>> {
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
      const templateData = {
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
        markup: this.processTemplate(
          templates.full,
          templateData,
          prayerTimesResult,
        ),
        markup_half_horizontal: this.processTemplate(
          templates.half,
          templateData,
          prayerTimesResult,
        ),
        markup_half_vertical: this.processTemplate(
          templates.half,
          templateData,
          prayerTimesResult,
        ),
        markup_quadrant: this.processTemplate(
          templates.quadrant,
          templateData,
          prayerTimesResult,
        ),
      };
    } catch (error) {
      logger.error('Error generating markup', { error, userSettings });
      // Return a simple markup with error message
      return {
        markup: `<div class="error">Unable to load prayer times. Please try again later.</div>`,
        markup_half_horizontal: `<div class="error">Unable to load prayer times.</div>`,
        markup_half_vertical: `<div class="error">Unable to load prayer times.</div>`,
        markup_quadrant: `<div class="error">Error</div>`,
      };
    }
  }

  /**
   * Process a template with data
   * @param template Template string
   * @param templateData Data for template
   * @param prayerTimesResult Prayer times calculation result
   * @returns Processed template
   */
  private processTemplate(
    template: string,
    templateData: {
      data: Record<string, unknown>;
      enhancedData: {
        nextPrayer: string;
        nextPrayerTime: string;
        timeUntilNextPrayer: {
          hours: number;
          minutes: number;
          total_minutes: number;
        };
        hijriDateFormatted: string;
        currentTime: string;
      };
    },
    prayerTimesResult: {
      prayerTimes: Record<string, string>;
      rawData: {
        meta: {
          timezone: string;
        };
      };
    },
  ): string {
    let processedTemplate = template;

    // Replace IDX_0.data references
    processedTemplate = processedTemplate.replace(
      /{{ IDX_0\.data\.timings\.([^}]+) \| slice: 0, 5 }}/g,
      (_, prayerName) => {
        return prayerTimesResult.prayerTimes[
          prayerName as keyof typeof prayerTimesResult.prayerTimes
        ].slice(0, 5);
      },
    );

    // Replace IDX_0.data.meta.timezone
    processedTemplate = processedTemplate.replace(
      /{{ IDX_0\.data\.meta\.timezone }}/g,
      prayerTimesResult.rawData.meta.timezone,
    );

    // Replace IDX_0.enhancedData.nextPrayer
    processedTemplate = processedTemplate.replace(
      /{{ IDX_0\.enhancedData\.nextPrayer }}/g,
      templateData.enhancedData.nextPrayer,
    );

    // Replace IDX_0.enhancedData.hijriDateFormatted
    processedTemplate = processedTemplate.replace(
      /{{ IDX_0\.enhancedData\.hijriDateFormatted }}/g,
      templateData.enhancedData.hijriDateFormatted,
    );

    // Replace IDX_0.enhancedData.timeUntilNextPrayer.hours
    processedTemplate = processedTemplate.replace(
      /{{ IDX_0\.enhancedData\.timeUntilNextPrayer\.hours }}/g,
      templateData.enhancedData.timeUntilNextPrayer.hours.toString(),
    );

    // Replace IDX_0.enhancedData.timeUntilNextPrayer.minutes
    processedTemplate = processedTemplate.replace(
      /{{ IDX_0\.enhancedData\.timeUntilNextPrayer\.minutes }}/g,
      templateData.enhancedData.timeUntilNextPrayer.minutes.toString(),
    );

    // Handle conditional classes for highlighting the next prayer
    processedTemplate = processedTemplate.replace(
      /{%\s*if\s+IDX_0\.enhancedData\.nextPrayer\s*==\s*'([^']+)'\s*or\s+IDX_0\.enhancedData\.nextPrayer\s*==\s*'([^']+)'\s*%}item--highlight{%\s*endif\s*%}/g,
      (_, prayer1, prayer2) => {
        if (
          templateData.enhancedData.nextPrayer === prayer1 ||
          templateData.enhancedData.nextPrayer === prayer2
        ) {
          return 'item--highlight';
        }
        return '';
      },
    );

    processedTemplate = processedTemplate.replace(
      /{%\s*if\s+IDX_0\.enhancedData\.nextPrayer\s*==\s*'([^']+)'\s*%}item--highlight{%\s*endif\s*%}/g,
      (_, prayer) => {
        if (templateData.enhancedData.nextPrayer === prayer) {
          return 'item--highlight';
        }
        return '';
      },
    );

    return processedTemplate;
  }
}

// Create a singleton instance
export const pluginMarkupController = new PluginMarkupController();
