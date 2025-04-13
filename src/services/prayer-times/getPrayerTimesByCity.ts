import { prayerTimesClient } from '@/clients/prayerTimesClient';
import {
  GetPrayerTimesByCityRequest,
  GetPrayerTimesByCityResponse,
} from '@/services/prayer-times';
import { logger } from '@/utils/logger';

export const getPrayerTimesByCity = async (
  params: GetPrayerTimesByCityRequest,
) => {
  const { city, country, method = '2' } = params;

  logger.info('Fetching prayer times from Aladhan API', {
    city,
    country,
    method,
  });

  const { data } = await prayerTimesClient.get<GetPrayerTimesByCityResponse>(
    '/timingsByCity',
    {
      params: {
        city,
        country,
        method,
      },
    },
  );

  return data;
};
