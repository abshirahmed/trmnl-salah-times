import {
  PrayerTimesRequest,
  PrayerTimesResponse,
} from '@/services/prayer-times';
import { logger } from '@/utils/logger';
import axios from 'axios';

export const getPrayerTimes = async (
  params: PrayerTimesRequest,
): Promise<PrayerTimesResponse> => {
  const { city, country, method = '2' } = params;

  const url = `https://api.aladhan.com/v1/timingsByCity`;

  logger.info('Fetching prayer times from Aladhan API', {
    city,
    country,
    method,
  });

  const { data } = await axios.get<PrayerTimesResponse>(url, {
    params: {
      city,
      country,
      method,
    },
  });

  return data;
};
