import { prayerTimesClient } from '@/clients/prayer-times';
import {
  GetPrayerTimesByCityRequest,
  GetPrayerTimesByCityResponse,
} from '@/services/prayer-times';
import { logger } from '@/utils/logger';

export const getPrayerTimesByCity = async ({
  city,
  country,
  method = 2,
}: GetPrayerTimesByCityRequest) => {
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
