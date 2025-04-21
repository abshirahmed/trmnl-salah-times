import { PrayerTimesByCityResponse } from '@/services';
import { parse, setHours, setMinutes } from 'date-fns';
import { formatInTimeZone, fromZonedTime } from 'date-fns-tz';
import { PRAYER_NAMES, PrayerTimes } from './prayerTypes';

/**
 * Parameters for parsePrayerTimes function
 */
export interface ParsePrayerTimesParams {
  /** API response containing prayer times as strings */
  prayerTimesByCity: PrayerTimesByCityResponse;
  /** IANA timezone string */
  timezone: string;
  /** Date to use for calculations */
  date: Date;
}

/**
 * Parse prayer times from API response
 */
export const parsePrayerTimes = ({
  prayerTimesByCity,
  timezone,
  date,
}: ParsePrayerTimesParams): PrayerTimes => {
  const prayerTimesStrings = prayerTimesByCity.data.timings;
  const prayerTimes: PrayerTimes = {};

  // Get midnight in the target timezone
  const midnightInTimezone = formatInTimeZone(
    date,
    timezone,
    "yyyy-MM-dd'T'00:00:00",
  );
  const baseDate = parse(
    midnightInTimezone,
    "yyyy-MM-dd'T'HH:mm:ss",
    new Date(),
  );

  for (const prayer of PRAYER_NAMES) {
    const timeString = prayerTimesStrings[prayer];
    if (!timeString) {
      throw new Error(`Missing time string for prayer: ${prayer}`);
    }

    const [hours, minutes] = timeString.split(':').map(Number);

    // Set the hours and minutes on the base date and convert to UTC
    const localPrayerTime = setMinutes(setHours(baseDate, hours), minutes);
    prayerTimes[prayer] = fromZonedTime(localPrayerTime, timezone);
  }

  return prayerTimes;
};
