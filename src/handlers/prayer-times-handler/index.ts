import { getPrayerTimes } from '@/controllers/prayer-times';
import { prayerTimesQuerySchema } from '@/handlers/prayer-times-handler/schema';
import { getUserSettings } from '@/services/user-settings/getUserSettings';
import { handleError } from '@/utils/errorHandler';
import { logger } from '@/utils/logger';
import { middify } from '@/utils/middify';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { HttpStatusCode } from 'axios';

/**
 * Handler for the prayer times API endpoint
 * Validates query parameters, fetches prayer times, and calculates next prayer information
 */
const prayerTimesHandler = async (event: APIGatewayProxyEvent) => {
  try {
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
    const {
      city,
      country,
      method,
      uuid,
      asr_method: qs_asr_method,
      maghrib_offset: qs_maghrib_offset,
    } = data;

    let asr_method = qs_asr_method || 'standard';
    let maghrib_offset = qs_maghrib_offset || 0;

    if (uuid) {
      // Load user settings if uuid is provided
      const { data: userSettings } = await getUserSettings(uuid);
      if (userSettings) {
        logger.info('Handler fetched user settings:', { userSettings });
        asr_method = userSettings.asr_method || asr_method;
        maghrib_offset = userSettings.maghrib_offset || maghrib_offset;
      } else {
        logger.warn('No user settings found for uuid:', { uuid });
      }
    }

    // Get prayer times
    const enhancedResponse = await getPrayerTimes({
      city,
      country,
      method,
      asr_method,
      maghrib_offset,
    });

    return {
      statusCode: HttpStatusCode.Ok,
      body: enhancedResponse,
    };
  } catch (error) {
    return handleError('Error fetching prayer times', {
      error,
      context: { event },
    });
  }
};

export const handler = middify(prayerTimesHandler);
