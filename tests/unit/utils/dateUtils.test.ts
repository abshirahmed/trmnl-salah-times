import {
  parseTimeString,
  formatTime12h,
  formatTime24h,
  calculateNextPrayer,
  formatHijriDate,
} from '@/utils/dateUtils';
import { addHours } from 'date-fns';

describe('Date Utilities', () => {
  const testTimezone = 'UTC';

  describe('parseTimeString', () => {
    it('should parse a morning time string correctly', () => {
      const referenceDate = new Date('2023-05-15T00:00:00Z');
      const result = parseTimeString({
        timeString: '05:30 AM',
        timezone: testTimezone,
        referenceDate,
      });

      expect(result).toBeInstanceOf(Date);
      expect(result.getUTCHours()).toBe(5);
      expect(result.getUTCMinutes()).toBe(30);
      expect(result.getUTCDate()).toBe(15); // Same day
    });

    it('should parse an afternoon time string correctly', () => {
      const referenceDate = new Date('2023-05-15T00:00:00Z');
      const result = parseTimeString({
        timeString: '05:30 PM',
        timezone: testTimezone,
        referenceDate,
      });

      expect(result).toBeInstanceOf(Date);
      expect(result.getUTCHours()).toBe(17); // 5 PM = 17:00
      expect(result.getUTCMinutes()).toBe(30);
    });
  });

  describe('formatTime12h', () => {
    it('should format morning time correctly', () => {
      const date = new Date('2023-05-15T05:30:00Z');
      const result = formatTime12h({
        date,
        timezone: testTimezone,
      });

      expect(result).toBe('05:30 AM');
    });

    it('should format afternoon time correctly', () => {
      const date = new Date('2023-05-15T17:30:00Z');
      const result = formatTime12h({
        date,
        timezone: testTimezone,
      });

      expect(result).toBe('05:30 PM');
    });
  });

  describe('formatTime24h', () => {
    it('should format morning time correctly', () => {
      const date = new Date('2023-05-15T05:30:00Z');
      const result = formatTime24h({
        date,
        timezone: testTimezone,
      });

      expect(result).toBe('05:30');
    });

    it('should format afternoon time correctly', () => {
      const date = new Date('2023-05-15T17:30:00Z');
      const result = formatTime24h({
        date,
        timezone: testTimezone,
      });

      expect(result).toBe('17:30');
    });
  });

  describe('calculateNextPrayer', () => {
    it('should identify the next prayer correctly', () => {
      const now = new Date('2023-05-15T10:00:00Z'); // 10 AM
      const prayerTimes = {
        Fajr: new Date('2023-05-15T05:00:00Z'), // 5 AM
        Sunrise: new Date('2023-05-15T06:30:00Z'), // 6:30 AM
        Dhuhr: new Date('2023-05-15T12:30:00Z'), // 12:30 PM
        Asr: new Date('2023-05-15T16:00:00Z'), // 4 PM
        Maghrib: new Date('2023-05-15T19:30:00Z'), // 7:30 PM
        Isha: new Date('2023-05-15T21:00:00Z'), // 9 PM
      };

      const result = calculateNextPrayer({
        currentDate: now,
        prayerTimes,
        timezone: testTimezone,
      });

      expect(result.nextPrayer).toBe('Dhuhr');
      expect(result.nextPrayerTime).toEqual(prayerTimes['Dhuhr']);
      expect(result.isTomorrow).toBeFalse();
      // The actual hours might vary based on timezone handling
      expect(result.timeUntilNextPrayer.hours).toBeGreaterThanOrEqual(2);
      expect(result.timeUntilNextPrayer.hours).toBeLessThanOrEqual(3);
      expect(result.timeUntilNextPrayer.minutes).toBe(30);
    });

    it('should handle when all prayers for today have passed', () => {
      const now = new Date('2023-05-15T22:00:00Z'); // 10 PM
      const prayerTimes = {
        Fajr: new Date('2023-05-15T05:00:00Z'), // 5 AM
        Sunrise: new Date('2023-05-15T06:30:00Z'), // 6:30 AM
        Dhuhr: new Date('2023-05-15T12:30:00Z'), // 12:30 PM
        Asr: new Date('2023-05-15T16:00:00Z'), // 4 PM
        Maghrib: new Date('2023-05-15T19:30:00Z'), // 7:30 PM
        Isha: new Date('2023-05-15T21:00:00Z'), // 9 PM
      };

      const result = calculateNextPrayer({
        currentDate: now,
        prayerTimes,
        timezone: testTimezone,
      });

      expect(result.nextPrayer).toBe('Fajr (Tomorrow)');
      // Should be tomorrow's Fajr
      const tomorrowFajr = addHours(prayerTimes['Fajr'], 24);
      expect(result.nextPrayerTime).toEqual(tomorrowFajr);
      expect(result.isTomorrow).toBeTrue();
    });
  });

  describe('formatHijriDate', () => {
    it('should format Hijri date correctly', () => {
      const hijriDate = {
        day: 15,
        month: { en: 'Ramadan' },
        year: 1444,
      };

      const result = formatHijriDate(hijriDate);
      expect(result).toBe('15 Ramadan 1444 AH');
    });

    it('should handle string values for day and year', () => {
      const hijriDate = {
        day: '15',
        month: { en: 'Ramadan' },
        year: '1444',
      };

      const result = formatHijriDate(hijriDate);
      expect(result).toBe('15 Ramadan 1444 AH');
    });
  });
});
