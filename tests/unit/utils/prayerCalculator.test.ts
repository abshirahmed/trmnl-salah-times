import {
  calculateCurrentPrayer,
  calculateNextPrayer,
} from '@/utils/prayerCalculator';
import { PrayerTimes } from '@/utils/prayerTypes';

describe('Prayer Calculator', () => {
  const testTimezone = 'UTC';

  const prayerTimes: PrayerTimes = {
    Fajr: new Date('2023-05-15T05:30:00Z'),
    Sunrise: new Date('2023-05-15T06:30:00Z'),
    Dhuhr: new Date('2023-05-15T12:30:00Z'),
    Asr: new Date('2023-05-15T15:30:00Z'),
    Maghrib: new Date('2023-05-15T18:30:00Z'),
    Isha: new Date('2023-05-15T20:30:00Z'),
  };

  describe('calculateNextPrayer', () => {
    it('should return next prayer when current time is before Fajr', () => {
      const date = new Date('2023-05-15T04:00:00Z'); // 4 AM UTC
      const result = calculateNextPrayer({
        date,
        prayerTimes,
        timezone: testTimezone,
      });

      expect(result.nextPrayer).toBe('Fajr');
      expect(result.nextPrayerTime).toBeInstanceOf(Date);
      expect(result.nextPrayerTime.getUTCHours()).toBe(5);
      expect(result.nextPrayerTime.getUTCMinutes()).toBe(30);
      expect(result.timeUntilNextPrayer.total_minutes).toBe(90); // 1.5 hours = 90 minutes
      expect(result.isTomorrow).toBeFalse();
    });

    it('should return next prayer when between prayers', () => {
      const date = new Date('2023-05-15T13:00:00Z'); // 1 PM UTC
      const result = calculateNextPrayer({
        date,
        prayerTimes,
        timezone: testTimezone,
      });

      expect(result.nextPrayer).toBe('Asr');
      expect(result.nextPrayerTime).toBeInstanceOf(Date);
      expect(result.nextPrayerTime.getUTCHours()).toBe(15);
      expect(result.nextPrayerTime.getUTCMinutes()).toBe(30);
      expect(result.timeUntilNextPrayer.total_minutes).toBe(150); // 2.5 hours = 150 minutes
      expect(result.isTomorrow).toBeFalse();
    });

    it('should return Fajr tomorrow when after Isha', () => {
      const date = new Date('2023-05-15T21:00:00Z'); // 9 PM UTC
      const result = calculateNextPrayer({
        date,
        prayerTimes,
        timezone: testTimezone,
      });

      expect(result.nextPrayer).toBe('Fajr (Tomorrow)');
      expect(result.nextPrayerTime).toBeInstanceOf(Date);
      expect(result.nextPrayerTime.getUTCHours()).toBe(5);
      expect(result.nextPrayerTime.getUTCMinutes()).toBe(30);
      expect(result.isTomorrow).toBeTrue();
    });
  });

  describe('calculateCurrentPrayer', () => {
    it('should throw error when before Fajr', () => {
      const currentDate = new Date('2023-05-15T04:00:00Z'); // 4 AM UTC
      expect(() =>
        calculateCurrentPrayer(prayerTimes, testTimezone, currentDate),
      ).toThrow('Current time is before Fajr');
    });

    it('should return current prayer when during prayer time', () => {
      const currentDate = new Date('2023-05-15T12:45:00Z'); // 12:45 PM UTC
      const result = calculateCurrentPrayer(
        prayerTimes,
        testTimezone,
        currentDate,
      );
      expect(result).toBe('Dhuhr');
    });

    it('should throw error when prayer times are missing', () => {
      const currentDate = new Date('2023-05-15T12:45:00Z');
      const invalidPrayerTimes = { ...prayerTimes };
      delete invalidPrayerTimes.Dhuhr;

      expect(() =>
        calculateCurrentPrayer(invalidPrayerTimes, testTimezone, currentDate),
      ).toThrow('Missing prayer time for Dhuhr');
    });
  });
});
