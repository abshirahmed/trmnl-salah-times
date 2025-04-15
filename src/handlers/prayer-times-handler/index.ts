import { getPrayerTimes } from '@/controllers/prayer-times';
import { prayerTimesQuerySchema } from '@/handlers/prayer-times-handler/schema';
import { logger } from '@/utils/logger';
import { middify } from '@/utils/middify';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { HttpStatusCode } from 'axios';

/**
 * Handler for the prayer times API endpoint
 * Validates query parameters, fetches prayer times, and calculates next prayer information
 */
const prayerTimesHandler = async (event: APIGatewayProxyEvent) => {
  const { data, error } = prayerTimesQuerySchema.safeParse(
    event.queryStringParameters,
  );

  if (error) {
    logger.warn('Invalid prayer times query parameters', {
      errors: error.flatten(),
    });

    return {
      statusCode: HttpStatusCode.BadRequest,
      message: error.message,
    };
  }

  // Extract validated parameters
  const { city, country, method } = data;

  // Get prayer times
  const enhancedResponse = await getPrayerTimes({
    city,
    country,
    method,
  });

  return {
    statusCode: HttpStatusCode.Ok,
    body: enhancedResponse,
  };
};

export const handler = middify(prayerTimesHandler);
