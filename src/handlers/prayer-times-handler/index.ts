import { prayerTimesController } from '@/controllers/prayer-times-controller';
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
      message: 'Invalid query parameters',
      errors: error.flatten(),
    };
  }

  // Extract validated parameters
  const { city, country, method } = data;

  // Use the controller to get prayer times
  const enhancedResponse = await prayerTimesController.getPrayerTimes({
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
