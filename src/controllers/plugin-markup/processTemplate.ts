/**
 * Template data interface
 */
export interface TemplateData {
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

/**
 * Process a template with data
 * @param template Template string
 * @param templateData Data for template
 * @param prayerTimesResult Prayer times calculation result
 * @returns Processed template
 */
export const processTemplate = (
  template: string,
  templateData: TemplateData,
  prayerTimesResult: PrayerTimesResult,
): string => {
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

  // Replace IDX_0.enhancedData.currentTime
  processedTemplate = processedTemplate.replace(
    /{{ IDX_0\.enhancedData\.currentTime }}/g,
    templateData.enhancedData.currentTime,
  );

  // Replace IDX_0.enhancedData.gregorianDate
  if (templateData.enhancedData.gregorianDate) {
    processedTemplate = processedTemplate.replace(
      /{{ IDX_0\.enhancedData\.gregorianDate }}/g,
      templateData.enhancedData.gregorianDate,
    );
  }

  // Replace IDX_0.enhancedData.lastSyncTime
  if (templateData.enhancedData.lastSyncTime) {
    processedTemplate = processedTemplate.replace(
      /{{ IDX_0\.enhancedData\.lastSyncTime }}/g,
      templateData.enhancedData.lastSyncTime,
    );
  }

  // Replace IDX_0.enhancedData.nextPrayerTime
  processedTemplate = processedTemplate.replace(
    /{{ IDX_0\.enhancedData\.nextPrayerTime }}/g,
    templateData.enhancedData.nextPrayerTime,
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

  // Handle conditional classes for current prayer background
  processedTemplate = processedTemplate.replace(
    /{%\s*if\s+IDX_0\.enhancedData\.currentPrayer\s*==\s*'([^']+)'\s*%}background--dark{%\s*else\s*%}background--light{%\s*endif\s*%}/g,
    (_, prayer) => {
      if (templateData.enhancedData.currentPrayer === prayer) {
        return 'background--dark';
      }
      return 'background--light';
    },
  );

  // Handle conditional display for current prayer text
  processedTemplate = processedTemplate.replace(
    /{%\s*if\s+IDX_0\.enhancedData\.currentPrayer\s*==\s*'([^']+)'\s*%}([\s\S]*?){%\s*endif\s*%}/g,
    (_, prayer, content) => {
      if (templateData.enhancedData.currentPrayer === prayer) {
        return content;
      }
      return '';
    },
  );

  return processedTemplate;
};
