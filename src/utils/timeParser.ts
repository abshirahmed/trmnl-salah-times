import { parse } from 'date-fns';
import { formatInTimeZone, fromZonedTime } from 'date-fns-tz';
import { TimeParams } from './prayerTypes';

/**
 * Parameters for parseTimeString function
 */
export interface ParseTimeStringParams extends TimeParams {
  /** Time string in 12-hour format (e.g., "05:30 AM") */
  timeString: string;
}

/**
 * Convert a time string in 12-hour format (e.g., "05:30 AM") to a Date object
 */
export const parseTimeString = ({
  timeString,
  timezone,
  date: referenceDate,
}: ParseTimeStringParams): Date => {
  const referenceISODate = formatInTimeZone(
    referenceDate,
    timezone,
    'yyyy-MM-dd',
  );
  const parsedDate = parse(
    `${referenceISODate} ${timeString}`,
    'yyyy-MM-dd hh:mm a',
    referenceDate,
  );
  return fromZonedTime(parsedDate, timezone);
};
