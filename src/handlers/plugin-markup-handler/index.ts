import { generateMarkup } from '@/controllers/plugin-markup';
import { pluginMarkupBodySchema } from '@/handlers/plugin-markup-handler/schema';
import { getUserSettings } from '@/services/user-settings';
import { verifyAuthHeader } from '@/utils/auth';
import { handleError } from '@/utils/errorHandler';
import { logger } from '@/utils/logger';
import { middify } from '@/utils/middify';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { HttpStatusCode } from 'axios';

/**
 * Handler for serving TRMNL plugin markup templates
 * Processes POST requests from TRMNL for screen generation
 */
const pluginMarkupHandler = async (event: APIGatewayProxyEvent) => {
  try {
    // Verify authorization header
    verifyAuthHeader(event);

    const { data, error } = pluginMarkupBodySchema.safeParse(event.body);

    if (error) {
      logger.error('Invalid plugin markup request body', {
        errors: error.flatten(),
      });

      return {
        statusCode: HttpStatusCode.BadRequest,
        message: error.message,
      };
    }

    // Extract the user UUID from the request body
    const { user_uuid } = data;

    logger.info('Received markup generation request', {
      user_uuid,
    });

    // Get user settings from service
    const { data: userSettings } = await getUserSettings(user_uuid);

    if (!userSettings) {
      logger.error('User settings not found', { user_uuid });

      return {
        statusCode: HttpStatusCode.NotFound,
        message: 'User settings not found',
      };
    }

    // Generate markup for all view sizes
    const markup = await generateMarkup(userSettings);

    logger.info('Generated markup for all view sizes');

    return {
      statusCode: HttpStatusCode.Ok,
      body: markup,
    };
  } catch (error) {
    return handleError('Error serving plugin markup template', {
      error,
      context: { event },
    });
  }
};

export const handler = middify(pluginMarkupHandler);
