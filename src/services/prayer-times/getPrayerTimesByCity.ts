import { prayerTimesClient } from '@/clients/prayer-times';
import {
  PrayerTimesByCityResponse,
  GetPrayerTimesByCityRequest,
} from '@/services/prayer-times/types';
import { logger } from '@/utils/logger';

export const getPrayerTimesByCity = async ({
  city,
  country,
  method = 2,
  asr_method = 'standard',
  maghrib_offset = 0,
}: GetPrayerTimesByCityRequest) => {
  logger.info('Fetching prayer times from Aladhan API', {
    city,
    country,
    method,
    asr_method,
    maghrib_offset,
  });

  // school: 0 = Shafi'i (standard), 1 = Hanafi
  const school = asr_method === 'hanafi' ? 1 : 0;
  // tune: Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha, Imsak
  // Only Maghrib offset, so: 0,0,0,0,<maghrib_offset>,0,0
  const tune = `0,0,0,0,${maghrib_offset},0,0`;

  logger.info('Aladhan API request params', {
    city,
    country,
    method,
    school,
    tune,
  });

  const { data } = await prayerTimesClient.get<PrayerTimesByCityResponse>(
    '/timingsByCity',
    {
      params: {
        city,
        country,
        method,
        school,
        tune,
      },
    },
  );

  return data;
};
