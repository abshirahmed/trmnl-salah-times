import { formatTime12h, formatTime24h } from '@/utils/timeFormatting';

describe('Time Formatting', () => {
  const testTimezone = 'UTC';

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
});
