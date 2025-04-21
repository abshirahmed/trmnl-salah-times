import { formatHijriDate } from '@/utils/hijriDate';
import {
  calculateCurrentPrayer,
  calculateNextPrayer,
} from '@/utils/prayerCalculator';
import { parsePrayerTimes } from '@/utils/prayerTimeParser';
import { PrayerTimes } from '@/utils/prayerTypes';
import { formatTime12h, formatTime24h } from '@/utils/timeFormatting';
import { parseTimeString } from '@/utils/timeParser';
import { addHours } from 'date-fns';
import { mock } from 'jest-mock-extended';

describe('Date Utilities', () => {
  const testTimezone = 'UTC';

  describe('parseTimeString', () => {
    it('should parse a morning time string correctly', () => {
      const date = new Date('2023-05-15T00:00:00Z');
      const result = parseTimeString({
        timeString: '05:30 AM',
        timezone: testTimezone,
        date,
      });

      expect(result).toBeInstanceOf(Date);
      expect(result.getUTCHours()).toBe(5);
      expect(result.getUTCMinutes()).toBe(30);
      expect(result.getUTCDate()).toBe(15); // Same day
    });

    it('should parse an afternoon time string correctly', () => {
      const date = new Date('2023-05-15T00:00:00Z');
      const result = parseTimeString({
        timeString: '05:30 PM',
        timezone: testTimezone,
        date,
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
      const date = new Date('2023-05-15T10:00:00Z'); // 10 AM
      const prayerTimes = {
        Fajr: new Date('2023-05-15T05:00:00Z'), // 5 AM
        Sunrise: new Date('2023-05-15T06:30:00Z'), // 6:30 AM
        Dhuhr: new Date('2023-05-15T12:30:00Z'), // 12:30 PM
        Asr: new Date('2023-05-15T16:00:00Z'), // 4 PM
        Maghrib: new Date('2023-05-15T19:30:00Z'), // 7:30 PM
        Isha: new Date('2023-05-15T21:00:00Z'), // 9 PM
      };

      const result = calculateNextPrayer({
        date,
        prayerTimes,
        timezone: testTimezone,
      });

      expect(result.nextPrayer).toBe('Dhuhr');
      expect(result.nextPrayerTime).toEqual(prayerTimes['Dhuhr']);
      expect(result.isTomorrow).toBeFalse();
      expect(result.timeUntilNextPrayer.hours).toBe(2);
      expect(result.timeUntilNextPrayer.minutes).toBe(30);
    });

    it('should handle when all prayers for today have passed', () => {
      const date = new Date('2023-05-15T22:00:00Z'); // 10 PM
      const prayerTimes = {
        Fajr: new Date('2023-05-15T05:00:00Z'), // 5 AM
        Sunrise: new Date('2023-05-15T06:30:00Z'), // 6:30 AM
        Dhuhr: new Date('2023-05-15T12:30:00Z'), // 12:30 PM
        Asr: new Date('2023-05-15T16:00:00Z'), // 4 PM
        Maghrib: new Date('2023-05-15T19:30:00Z'), // 7:30 PM
        Isha: new Date('2023-05-15T21:00:00Z'), // 9 PM
      };

      const result = calculateNextPrayer({
        date,
        prayerTimes,
        timezone: testTimezone,
      });

      expect(result.nextPrayer).toBe('Fajr (Tomorrow)');
      const tomorrowFajr = addHours(prayerTimes['Fajr'], 24);
      expect(result.nextPrayerTime).toEqual(tomorrowFajr);
      expect(result.isTomorrow).toBeTrue();
    });

    it('calculateNextPrayer returns correct time until next prayer', () => {
      const currentDate = new Date('2023-05-15T09:00:00Z'); // 9 AM UTC
      const prayerTimes = {
        Fajr: new Date('2023-05-15T05:00:00Z'),
        Dhuhr: new Date('2023-05-15T13:00:00Z'),
        Asr: new Date('2023-05-15T16:30:00Z'),
        Maghrib: new Date('2023-05-15T20:00:00Z'),
        Isha: new Date('2023-05-15T21:30:00Z'),
      };

      const result = calculateNextPrayer({
        date: currentDate,
        prayerTimes,
        timezone: testTimezone,
      });
      expect(result.nextPrayer).toBe('Dhuhr');
      expect(result.timeUntilNextPrayer.hours).toBe(4); // Adjusted to 4 hours since we're comparing UTC times
      expect(result.timeUntilNextPrayer.minutes).toBe(0);
    });

    it('should calculate time until next prayer correctly', () => {
      const currentDate = new Date('2024-03-19T03:00:00.000Z');
      const prayerTimes = parsePrayerTimes({
        prayerTimesByCity: mock({
          data: {
            timings: {
              Fajr: '04:30',
              Sunrise: '06:00',
              Dhuhr: '12:30',
              Asr: '15:45',
              Maghrib: '18:30',
              Isha: '20:00',
            },
            meta: { timezone: 'UTC' },
          },
        }),
        timezone: 'UTC',
        date: currentDate,
      });

      const result = calculateNextPrayer({
        date: currentDate,
        prayerTimes,
        timezone: 'UTC',
      });

      expect(result.nextPrayer).toBe('Fajr');
      expect(result.timeUntilNextPrayer.hours).toBe(1);
      expect(result.timeUntilNextPrayer.minutes).toBe(30);
      expect(result.timeUntilNextPrayer.total_minutes).toBe(90);
      expect(result.isTomorrow).toBeFalse();
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

  describe('calculateCurrentPrayer', () => {
    const validPrayerTimes: PrayerTimes = {
      Fajr: new Date('2023-05-15T05:00:00Z'),
      Sunrise: new Date('2023-05-15T06:30:00Z'),
      Dhuhr: new Date('2023-05-15T12:30:00Z'),
      Asr: new Date('2023-05-15T16:00:00Z'),
      Maghrib: new Date('2023-05-15T19:30:00Z'),
      Isha: new Date('2023-05-15T21:00:00Z'),
    };

    it('should return the current prayer correctly', () => {
      jest.useFakeTimers();
      const currentTime = new Date('2023-05-15T13:00:00Z'); // 13:00 UTC
      jest.setSystemTime(currentTime);

      const prayerTimes = parsePrayerTimes({
        prayerTimesByCity: mock({
          data: {
            timings: {
              Fajr: '04:30',
              Sunrise: '06:00',
              Dhuhr: '12:15',
              Asr: '15:45',
              Maghrib: '19:30',
              Isha: '21:00',
            },
            meta: { timezone: 'UTC' },
          },
        }),
        timezone: testTimezone,
        date: new Date('2023-05-15T00:00:00Z'),
      });

      const result = calculateCurrentPrayer(
        prayerTimes,
        testTimezone,
        currentTime,
      );
      expect(result).toBe('Dhuhr');

      jest.useRealTimers();
    });

    it('should throw error when Fajr time is missing', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { Fajr, ...invalidPrayerTimes } = validPrayerTimes;

      expect(() =>
        calculateCurrentPrayer(invalidPrayerTimes as PrayerTimes, testTimezone),
      ).toThrow('Fajr prayer time is required');
    });

    it('should throw error when current time is before Fajr', () => {
      jest.useFakeTimers();
      const currentTime = new Date('2023-05-15T04:00:00Z'); // Before Fajr
      jest.setSystemTime(currentTime);

      expect(() =>
        calculateCurrentPrayer(validPrayerTimes, testTimezone, currentTime),
      ).toThrow('Current time is before Fajr');

      jest.useRealTimers();
    });

    it('should throw error when a required prayer time is missing', () => {
      jest.useFakeTimers();
      const currentTime = new Date('2023-05-15T13:00:00Z');
      jest.setSystemTime(currentTime);

      const prayerTimes = {
        Fajr: new Date('2023-05-15T04:30:00Z'),
        Sunrise: new Date('2023-05-15T06:00:00Z'),
        Dhuhr: new Date('2023-05-15T12:15:00Z'),
        Maghrib: new Date('2023-05-15T19:30:00Z'),
        Isha: new Date('2023-05-15T21:00:00Z'),
      };

      expect(() =>
        calculateCurrentPrayer(prayerTimes, testTimezone, currentTime),
      ).toThrow('Missing prayer time for Asr');

      jest.useRealTimers();
    });
  });

  describe('parsePrayerTimes', () => {
    const testTimezone = 'UTC';
    const validDate = new Date('2023-05-15T00:00:00Z');
    const validPrayerTimesResponse = {
      data: {
        timings: {
          Fajr: '04:30',
          Sunrise: '06:00',
          Dhuhr: '12:15',
          Asr: '15:45',
          Maghrib: '19:30',
          Isha: '21:00',
        },
        meta: { timezone: 'UTC' },
      },
    };

    it('should parse prayer times correctly from API response', () => {
      const result = parsePrayerTimes({
        prayerTimesByCity: mock(validPrayerTimesResponse),
        timezone: testTimezone,
        date: validDate,
      });

      expect(result.Fajr.getUTCHours()).toBe(4);
      expect(result.Fajr.getUTCMinutes()).toBe(30);
      expect(result.Dhuhr.getUTCHours()).toBe(12);
      expect(result.Dhuhr.getUTCMinutes()).toBe(15);
      expect(result.Isha.getUTCHours()).toBe(21);
      expect(result.Isha.getUTCMinutes()).toBe(0);
    });

    it('should parse prayer times correctly for GMT+5 timezone', () => {
      const result = parsePrayerTimes({
        prayerTimesByCity: mock({
          data: {
            timings: {
              Fajr: '04:30',
              Sunrise: '06:00',
              Dhuhr: '12:15',
              Asr: '15:45',
              Maghrib: '19:30',
              Isha: '21:00',
            },
            meta: { timezone: 'Asia/Karachi' },
          },
        }),
        timezone: 'Asia/Karachi',
        date: validDate,
      });

      // For GMT+5, times should be 5 hours behind the local time
      expect(result.Fajr.getUTCHours()).toBe(23); // Previous day
      expect(result.Fajr.getUTCMinutes()).toBe(30);
      expect(result.Dhuhr.getUTCHours()).toBe(7);
      expect(result.Dhuhr.getUTCMinutes()).toBe(15);
      expect(result.Isha.getUTCHours()).toBe(16);
      expect(result.Isha.getUTCMinutes()).toBe(0);
    });

    it('should parse prayer times correctly for GMT-8 timezone', () => {
      const result = parsePrayerTimes({
        prayerTimesByCity: mock({
          data: {
            timings: {
              Fajr: '04:30',
              Sunrise: '06:00',
              Dhuhr: '12:15',
              Asr: '15:45',
              Maghrib: '19:30',
              Isha: '21:00',
            },
            meta: { timezone: 'America/Los_Angeles' },
          },
        }),
        timezone: 'America/Los_Angeles',
        date: validDate,
      });

      // For GMT-8, when it's 4:30 AM in LA, it's 11:30 UTC
      expect(result.Fajr.getUTCHours()).toBe(11);
      expect(result.Fajr.getUTCMinutes()).toBe(30);
      expect(result.Dhuhr.getUTCHours()).toBe(19);
      expect(result.Dhuhr.getUTCMinutes()).toBe(15);
      expect(result.Isha.getUTCHours()).toBe(4); // Next day
      expect(result.Isha.getUTCMinutes()).toBe(0);
    });
  });
});
