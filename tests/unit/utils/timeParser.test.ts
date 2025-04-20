import { parseTimeString } from '@/utils/timeParser';

describe('Time Parser', () => {
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
});
