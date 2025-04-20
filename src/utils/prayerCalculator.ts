import { addDays, differenceInMinutes } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import {
  PrayerName,
  PRAYER_NAMES,
  PrayerTimes,
  TimeParams,
} from './prayerTypes';

/**
 * Parameters for calculateNextPrayer function
 */
export interface CalculateNextPrayerParams extends TimeParams {
  /** Object containing prayer times as Date objects */
  prayerTimes: PrayerTimes;
}

export interface NextPrayerInfo {
  nextPrayer: string;
  nextPrayerTime: Date;
  timeUntilNextPrayer: {
    hours: number;
    minutes: number;
    total_minutes: number;
  };
  isTomorrow: boolean;
}

/**
 * Calculate the time until the next prayer
 */
export const calculateNextPrayer = ({
  date: currentDate,
  prayerTimes,
  timezone,
}: CalculateNextPrayerParams): NextPrayerInfo => {
  // Convert current date to target timezone
  const currentDateInTimezone = toZonedTime(currentDate, timezone);

  // Find the next prayer
  for (const prayer of PRAYER_NAMES) {
    if (!prayerTimes[prayer]) continue;

    // Convert prayer time to target timezone for comparison
    const prayerTimeInTimezone = toZonedTime(prayerTimes[prayer], timezone);

    if (prayerTimeInTimezone > currentDateInTimezone) {
      const minutesUntil = differenceInMinutes(
        prayerTimes[prayer],
        currentDate,
      );

      return {
        nextPrayer: prayer,
        nextPrayerTime: prayerTimes[prayer],
        timeUntilNextPrayer: {
          hours: Math.floor(minutesUntil / 60),
          minutes: minutesUntil % 60,
          total_minutes: minutesUntil,
        },
        isTomorrow: false,
      };
    }
  }

  // If we reach here, next prayer is tomorrow's Fajr
  const tomorrowFajr = addDays(prayerTimes['Fajr'], 1);
  const minutesUntil = differenceInMinutes(tomorrowFajr, currentDate);

  return {
    nextPrayer: 'Fajr (Tomorrow)',
    nextPrayerTime: tomorrowFajr,
    timeUntilNextPrayer: {
      hours: Math.floor(minutesUntil / 60),
      minutes: minutesUntil % 60,
      total_minutes: minutesUntil,
    },
    isTomorrow: true,
  };
};

/**
 * Calculate the current prayer based on the current time
 * Throws an error if the current time is invalid or prayer times are missing
 */
export const calculateCurrentPrayer = (
  prayerTimes: PrayerTimes,
  timezone: string,
  currentDate: Date = new Date(),
): PrayerName => {
  if (!prayerTimes.Fajr) {
    throw new Error('Fajr prayer time is required');
  }

  const currentDateInTimezone = toZonedTime(currentDate, timezone);

  // Check if we're before Fajr
  const fajrInTimezone = toZonedTime(prayerTimes.Fajr, timezone);
  if (currentDateInTimezone < fajrInTimezone) {
    throw new Error(
      'Current time is before Fajr, cannot determine current prayer',
    );
  }

  // Find the last prayer that has passed
  for (let i = PRAYER_NAMES.length - 1; i >= 0; i--) {
    const prayer = PRAYER_NAMES[i];
    if (prayer === 'Sunrise') continue; // Skip Sunrise as it's not a prayer

    if (!prayerTimes[prayer]) {
      throw new Error(`Missing prayer time for ${prayer}`);
    }

    const prayerTimeInTimezone = toZonedTime(prayerTimes[prayer], timezone);
    if (currentDateInTimezone >= prayerTimeInTimezone) {
      return prayer;
    }
  }

  throw new Error('Could not determine current prayer');
};
