/**
 * Template data interface
 */
export interface TemplateData {
  data: {
    timings?: Record<string, string>;
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
        params?: {
          Fajr?: string;
          Isha?: string;
        };
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

  // Replace Islamic date references
  if (templateData.data.date && typeof templateData.data.date === 'object') {
    const date = templateData.data.date;
    if (date.hijri) {
      // Replace weekday
      if (date.hijri.weekday && date.hijri.weekday.en) {
        processedTemplate = processedTemplate.replace(
          /{{ IDX_0\.data\.date\.hijri\.weekday\.en }}/g,
          date.hijri.weekday.en,
        );
      }

      // Replace day
      if (date.hijri.day) {
        processedTemplate = processedTemplate.replace(
          /{{ IDX_0\.data\.date\.hijri\.day }}/g,
          date.hijri.day,
        );
      }

      // Replace month
      if (date.hijri.month && date.hijri.month.en) {
        processedTemplate = processedTemplate.replace(
          /{{ IDX_0\.data\.date\.hijri\.month\.en }}/g,
          date.hijri.month.en,
        );
      }

      // Replace year
      if (date.hijri.year) {
        processedTemplate = processedTemplate.replace(
          /{{ IDX_0\.data\.date\.hijri\.year }}/g,
          date.hijri.year,
        );
      }

      // Replace designation
      if (date.hijri.designation && date.hijri.designation.abbreviated) {
        processedTemplate = processedTemplate.replace(
          /{{ IDX_0\.data\.date\.hijri\.designation\.abbreviated }}/g,
          date.hijri.designation.abbreviated,
        );
      }

      // Handle holidays array access
      if (
        date.hijri.holidays &&
        Array.isArray(date.hijri.holidays) &&
        date.hijri.holidays.length > 0
      ) {
        processedTemplate = processedTemplate.replace(
          /{{ IDX_0\.data\.date\.hijri\.holidays\[0\] }}/g,
          date.hijri.holidays[0],
        );
      }
    }
  }

  // Replace IDX_0.enhancedData.nextPrayer
  processedTemplate = processedTemplate.replace(
    /{{ IDX_0\.enhancedData\.nextPrayer }}/g,
    templateData.enhancedData.nextPrayer,
  );

  // Replace calculation method references
  if (templateData.data.meta && typeof templateData.data.meta === 'object') {
    const meta = templateData.data.meta;
    if (meta.method) {
      // Replace method name
      if (meta.method.name) {
        processedTemplate = processedTemplate.replace(
          /{{ IDX_0\.data\.meta\.method\.name }}/g,
          meta.method.name,
        );
      }

      // Replace method params
      if (meta.method.params) {
        if (meta.method.params.Fajr) {
          processedTemplate = processedTemplate.replace(
            /{{ IDX_0\.data\.meta\.method\.params\.Fajr }}/g,
            meta.method.params.Fajr,
          );
        }

        if (meta.method.params.Isha) {
          processedTemplate = processedTemplate.replace(
            /{{ IDX_0\.data\.meta\.method\.params\.Isha }}/g,
            meta.method.params.Isha,
          );
        }
      }
    }
  }

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

  // Handle conditional display for holidays
  processedTemplate = processedTemplate.replace(
    /{%\s*if\s+IDX_0\.data\.date\.hijri\.holidays\.length\s*>\s*0\s*%}([\s\S]*?){%\s*endif\s*%}/g,
    (_, content) => {
      if (
        templateData.data.date &&
        typeof templateData.data.date === 'object' &&
        templateData.data.date.hijri &&
        templateData.data.date.hijri.holidays &&
        Array.isArray(templateData.data.date.hijri.holidays) &&
        templateData.data.date.hijri.holidays.length > 0
      ) {
        return content;
      }
      return '';
    },
  );

  return processedTemplate;
};
