import { logger } from '@/utils/logger';
import { Liquid } from 'liquidjs';

/**
 * Template data interface
 */
export interface TemplateData {
  data: {
    timings?: Record<string, string>;
    formattedTimings?: Record<string, string>;
    date?: {
      hijri?: {
        weekday?: { en: string };
        day?: string;
        month?: { en: string };
        year?: string;
        designation?: { abbreviated: string };
        holidays?: string[];
      };
    };
    meta?: {
      method?: {
        name?: string;
        params?: Record<string, number | string>;
      };
    };
  };
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
    gregorianDate?: string;
    lastSyncTime?: string;
    currentPrayer?: string;
  };
}

/**
 * Prayer times result interface
 */
export interface PrayerTimesResult {
  prayerTimes: Record<string, string>;
  rawData: {
    meta: {
      timezone: string;
    };
  };
}

// Initialize Liquid engine with custom options
const engine = new Liquid({
  strictFilters: true,
  strictVariables: false,
  trimTagRight: false,
  trimTagLeft: false,
  trimOutputRight: false,
  trimOutputLeft: false,
});

// Register custom filters
engine.registerFilter('slice', (v: string, start: number, end: number) => {
  return v?.slice(start, end) || '';
});

/**
 * Process a template with data using LiquidJS
 */
export const processTemplate = async (
  template: string,
  templateData: TemplateData,
  prayerTimesResult: PrayerTimesResult,
): Promise<string> => {
  try {
    // Prepare the data for the template
    const context = {
      IDX_0: {
        data: {
          ...templateData.data,
          timings: prayerTimesResult.prayerTimes,
          meta: {
            ...templateData.data.meta,
            timezone: prayerTimesResult.rawData.meta.timezone,
          },
        },
        enhancedData: templateData.enhancedData,
      },
    };

    // Process the template
    return await engine.parseAndRender(template, context);
  } catch (error) {
    logger.error('Error processing template', { error });
    throw error;
  }
};
