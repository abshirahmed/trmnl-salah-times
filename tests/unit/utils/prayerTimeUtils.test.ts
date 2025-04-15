import { formatTime12h } from '@/utils/dateUtils';
import { logger } from '@/utils/logger';
import { formatNextPrayerTime } from '@/utils/prayerTimeUtils';

jest.mock('@/utils/dateUtils');

const mockedFormatTime12h = jest.mocked(formatTime12h);

describe('formatNextPrayerTime', () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2024-03-14T12:00:00Z'));

  it('should format next prayer time using formatTime12h', () => {
    const mockPrayerTimesResult = {
      nextPrayer: 'Asr',
      nextPrayerTime: new Date(),
      prayerTimes: {
        Fajr: '05:30',
        Asr: '15:30',
      },
    };
    const mockTimezone = 'Europe/London';
    const expectedFormattedTime = '3:30 PM';

    mockedFormatTime12h.mockReturnValue(expectedFormattedTime);

    const result = formatNextPrayerTime(mockPrayerTimesResult, mockTimezone);

    expect(result).toBe(expectedFormattedTime);
    expect(mockedFormatTime12h).toHaveBeenCalledWith({
      date: mockPrayerTimesResult.nextPrayerTime,
      timezone: mockTimezone,
    });
  });

  it('should fallback to Fajr time when next prayer is tomorrow', () => {
    const mockPrayerTimesResult = {
      nextPrayer: 'Fajr (Tomorrow)',
      nextPrayerTime: new Date(),
      prayerTimes: {
        Fajr: '05:30',
        Asr: '15:30',
      },
    };
    const mockTimezone = 'Europe/London';

    mockedFormatTime12h.mockImplementation(() => {
      throw new Error('Format error');
    });

    const result = formatNextPrayerTime(mockPrayerTimesResult, mockTimezone);

    expect(result).toBe('05:30');
    expect(logger.warn).toHaveBeenCalledWith(
      'Error formatting next prayer time',
      {
        formatError: expect.any(Error),
      },
    );
  });

  it('should fallback to current prayer time when formatting fails', () => {
    const mockPrayerTimesResult = {
      nextPrayer: 'Asr',
      nextPrayerTime: new Date(),
      prayerTimes: {
        Fajr: '05:30',
        Asr: '15:30',
      },
    };
    const mockTimezone = 'Europe/London';

    mockedFormatTime12h.mockImplementation(() => {
      throw new Error('Format error');
    });

    const result = formatNextPrayerTime(mockPrayerTimesResult, mockTimezone);

    expect(result).toBe('15:30');
    expect(logger.warn).toHaveBeenCalledWith(
      'Error formatting next prayer time',
      {
        formatError: expect.any(Error),
      },
    );
  });
});
