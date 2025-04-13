import { calculateTimeUntilNextPrayer } from '@/utils/calculateTimeUntilNextPrayer';
import { convertTo24Hour } from '@/utils/convertTo24Hour';

describe('Time Utility Functions', () => {
  describe('convertTo24Hour', () => {
    it('should convert AM time correctly', () => {
      expect(convertTo24Hour('05:30')).toBe(530);
    });

    it('should convert PM time correctly', () => {
      expect(convertTo24Hour('13:45')).toBe(1345);
    });

    it('should handle midnight correctly', () => {
      expect(convertTo24Hour('00:00')).toBe(0);
    });
  });

  describe('calculateTimeUntilNextPrayer', () => {
    it('should calculate time until next prayer correctly when same day', () => {
      // Current time: 10:30 AM, Next prayer: 1:15 PM
      const minutesUntil = calculateTimeUntilNextPrayer(1030, 1315, false);
      expect(minutesUntil).toBe(165); // 2h 45m = 165 minutes
    });

    it('should calculate time until next prayer correctly when next day', () => {
      // Current time: 11:30 PM, Next prayer: 5:15 AM (tomorrow)
      const minutesUntil = calculateTimeUntilNextPrayer(2330, 515, true);
      expect(minutesUntil).toBe(345); // 5h 45m = 345 minutes
    });
  });
});
