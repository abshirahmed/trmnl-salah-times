import { logger } from '@/utils/logger';
import {
  addDays,
  differenceInMinutes,
  format,
  parse,
  setHours,
  setMinutes,
} from 'date-fns';
import { formatInTimeZone, fromZonedTime, toZonedTime } from 'date-fns-tz';

/**
 * Parameters for parseTimeString function
 */
export interface ParseTimeStringParams {
  /** Time string in 12-hour format (e.g., "05:30 AM") */
  timeString: string;
  /** IANA timezone string (e.g., "Europe/London") */
  timezone: string;
  /** Reference date to use */
  referenceDate: Date;
}

/**
 * Convert a time string in 12-hour format (e.g., "05:30 AM") to a Date object
 * @param params Parameters for parsing time string
 * @returns Date object representing the time
 */
export const parseTimeString = ({
  timeString,
  timezone,
  referenceDate,
}: ParseTimeStringParams): Date => {
  try {
    const referenceDateInTimezone = toZonedTime(referenceDate, timezone);
    const referenceISODate = format(referenceDateInTimezone, 'yyyy-MM-dd');
    const parsedDate = parse(
      `${referenceISODate} ${timeString}`,
      'yyyy-MM-dd hh:mm a',
      referenceDate,
    );
    return fromZonedTime(parsedDate, timezone);
  } catch (error) {
    logger.error('Error parsing time string', { timeString, timezone, error });
    throw new Error(`Failed to parse time string: ${timeString}`);
  }
};

/**
 * Parameters for formatTime12h function
 */
export interface FormatTimeParams {
  /** Date to format */
  date: Date;
  /** IANA timezone string */
  timezone: string;
}

/**
 * Format a date in 12-hour format
 * @param params Parameters for formatting time
 * @returns Formatted time string (e.g., "05:30 AM")
 */
export const formatTime12h = ({ date, timezone }: FormatTimeParams): string =>
  formatInTimeZone(date, timezone, 'hh:mm a');

/**
 * Format a date in 24-hour format
 * @param params Parameters for formatting time
 * @returns Formatted time string (e.g., "05:30")
 */
export const formatTime24h = ({ date, timezone }: FormatTimeParams): string =>
  formatInTimeZone(date, timezone, 'HH:mm');

/**
 * Parameters for calculateNextPrayer function
 */
export interface CalculateNextPrayerParams {
  /** Current date and time */
  currentDate: Date;
  /** Object containing prayer times as Date objects */
  prayerTimes: Record<string, Date>;
  /** IANA timezone string */
  timezone: string;
}

/**
 * Calculate the time until the next prayer
 * @param params Parameters for calculating next prayer
 * @returns Object containing the next prayer name, time, and minutes until
 */
export const calculateNextPrayer = ({
  currentDate,
  prayerTimes,
  timezone,
}: CalculateNextPrayerParams) => {
  const currentDateInTimezone = toZonedTime(currentDate, timezone);
  const prayerOrder = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  // Find the next prayer
  let nextPrayer = '';
  let nextPrayerTime: Date | null = null;
  let isTomorrow = false;

  for (const prayer of prayerOrder) {
    if (prayerTimes[prayer] > currentDateInTimezone) {
      nextPrayer = prayer;
      nextPrayerTime = prayerTimes[prayer];
      break;
    }
  }

  // If no prayer is found, the next prayer is Fajr tomorrow
  if (!nextPrayerTime) {
    nextPrayer = 'Fajr (Tomorrow)';
    nextPrayerTime = addDays(prayerTimes['Fajr'], 1);
    isTomorrow = true;
  }

  const minutesUntil = differenceInMinutes(
    nextPrayerTime,
    currentDateInTimezone,
  );

  return {
    nextPrayer,
    nextPrayerTime,
    timeUntilNextPrayer: {
      hours: Math.floor(minutesUntil / 60),
      minutes: minutesUntil % 60,
      total_minutes: minutesUntil,
    },
    isTomorrow,
  };
};

/**
 * Parameters for parsePrayerTimes function
 */
export interface ParsePrayerTimesParams {
  /** API response containing prayer times as strings */
  prayerTimesResponse: {
    data: {
      timings: Record<string, string>;
      meta: { timezone: string };
    };
  };
  /** IANA timezone string */
  timezone: string;
  /** Date to use for calculations */
  date: Date;
}

/**
 * Parse prayer times from API response
 * @param params Parameters for parsing prayer times
 * @returns Object containing prayer times as Date objects
 */
export const parsePrayerTimes = ({
  prayerTimesResponse,
  timezone,
  date,
}: ParsePrayerTimesParams): Record<string, Date> => {
  const prayerTimesStrings = prayerTimesResponse.data.timings;
  const prayerTimes: Record<string, Date> = {};
  const relevantPrayers = [
    'Fajr',
    'Sunrise',
    'Dhuhr',
    'Asr',
    'Maghrib',
    'Isha',
  ];

  const today = (() => {
    try {
      return toZonedTime(date, timezone);
    } catch (error) {
      logger.warn('Error converting to timezone, using provided date', {
        timezone,
        error,
      });
      return date;
    }
  })();

  for (const prayer of relevantPrayers) {
    const timeString = prayerTimesStrings[prayer];
    if (timeString) {
      try {
        const [hours, minutes] = timeString.split(':').map(Number);
        prayerTimes[prayer] = setMinutes(setHours(today, hours), minutes);
      } catch (error) {
        logger.error('Error parsing prayer time', {
          prayer,
          timeString,
          error,
        });
      }
    }
  }

  return prayerTimes;
};

/**
 * Format a date in Hijri format
 * @param hijriDate Hijri date object from API response
 * @returns Formatted Hijri date string
 */
export const formatHijriDate = (hijriDate: {
  day: string | number;
  month: { en: string };
  year: string | number;
}): string => `${hijriDate.day} ${hijriDate.month.en} ${hijriDate.year} AH`;
