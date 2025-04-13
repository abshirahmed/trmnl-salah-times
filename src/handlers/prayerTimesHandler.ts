import {
  calculateTimeUntilNextPrayer,
  convertTo24Hour,
  getPrayerTimes,
} from '@/services/prayer-times';
import { logger } from '@/utils/logger';
import { middify } from '@/utils/middify';
import { APIGatewayProxyEvent } from 'aws-lambda';

const prayerTimesHandler = async (event: APIGatewayProxyEvent) => {
  const { city, country, method } = event.queryStringParameters || {};

  // Validate required parameters
  if (!city || !country) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      message: 'City and country are required parameters.',
    };
  }

  // Get prayer times from service
  const { data } = await getPrayerTimes({
    city,
    country,
    method,
  });

  logger.info('Prayer times fetched successfully', {
    prayerTimesResponse: data,
  });

  // Extract relevant data
  const prayerTimes = data.timings;
  const hijriDate = data.date.hijri;

  // Get current time
  const now = new Date();
  const currentTime = now.getHours() * 100 + now.getMinutes();

  // Convert prayer times to 24-hour format
  const prayerTimesFormatted = {
    Fajr: convertTo24Hour(prayerTimes.Fajr),
    Sunrise: convertTo24Hour(prayerTimes.Sunrise),
    Dhuhr: convertTo24Hour(prayerTimes.Dhuhr),
    Asr: convertTo24Hour(prayerTimes.Asr),
    Maghrib: convertTo24Hour(prayerTimes.Maghrib),
    Isha: convertTo24Hour(prayerTimes.Isha),
  };

  // Determine next prayer
  let nextPrayer = 'Fajr';
  let nextPrayerTime = prayerTimesFormatted.Fajr;
  let isTomorrow = false;

  if (currentTime < prayerTimesFormatted.Fajr) {
    nextPrayer = 'Fajr';
    nextPrayerTime = prayerTimesFormatted.Fajr;
  } else if (currentTime < prayerTimesFormatted.Sunrise) {
    nextPrayer = 'Sunrise';
    nextPrayerTime = prayerTimesFormatted.Sunrise;
  } else if (currentTime < prayerTimesFormatted.Dhuhr) {
    nextPrayer = 'Dhuhr';
    nextPrayerTime = prayerTimesFormatted.Dhuhr;
  } else if (currentTime < prayerTimesFormatted.Asr) {
    nextPrayer = 'Asr';
    nextPrayerTime = prayerTimesFormatted.Asr;
  } else if (currentTime < prayerTimesFormatted.Maghrib) {
    nextPrayer = 'Maghrib';
    nextPrayerTime = prayerTimesFormatted.Maghrib;
  } else if (currentTime < prayerTimesFormatted.Isha) {
    nextPrayer = 'Isha';
    nextPrayerTime = prayerTimesFormatted.Isha;
  } else {
    nextPrayer = 'Fajr (Tomorrow)';
    nextPrayerTime = prayerTimesFormatted.Fajr;
    isTomorrow = true;
  }

  // Calculate time until next prayer
  const minutesUntil = calculateTimeUntilNextPrayer(
    currentTime,
    nextPrayerTime,
    isTomorrow,
  );
  const hoursUntil = Math.floor(minutesUntil / 60);
  const remainingMinutes = minutesUntil % 60;

  // Prepare enhanced response with calculated data
  const enhancedResponse = {
    ...data,
    enhancedData: {
      nextPrayer,
      nextPrayerTime: nextPrayer.includes('Tomorrow')
        ? prayerTimes.Fajr
        : prayerTimes[nextPrayer as keyof typeof prayerTimes],
      timeUntilNextPrayer: {
        hours: hoursUntil,
        minutes: remainingMinutes,
        total_minutes: minutesUntil,
      },
      hijriDateFormatted: `${hijriDate.day} ${hijriDate.month.en} ${hijriDate.year} AH`,
      currentTime: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
    },
  };

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=300', // Cache for 5 minutes
    },
    body: enhancedResponse,
  };
};

export const handler = middify(prayerTimesHandler);
