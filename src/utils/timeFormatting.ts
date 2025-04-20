import { formatInTimeZone } from 'date-fns-tz';
import { TimeParams } from './prayerTypes';

/**
 * Format a date in 12-hour format (e.g., "05:30 AM")
 */
export const formatTime12h = ({ date, timezone }: TimeParams): string =>
  formatInTimeZone(date, timezone, 'hh:mm a');

/**
 * Format a date in 24-hour format (e.g., "05:30")
 */
export const formatTime24h = ({ date, timezone }: TimeParams): string =>
  formatInTimeZone(date, timezone, 'HH:mm');
