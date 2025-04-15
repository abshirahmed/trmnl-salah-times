import { generateManagementInterface } from '@/controllers/user-settings';
import { pluginManagementQuerySchema } from '@/handlers/plugin-management-handler/schema';
import { getUserSettings } from '@/services/user-settings';
import { handleError } from '@/utils/errorHandler';
import { logger } from '@/utils/logger';
import { middify } from '@/utils/middify';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { HttpStatusCode } from 'axios';

/**
 * Handler for the TRMNL plugin management interface
 * Allows users to configure their prayer times settings
 */
const pluginManagementHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const { data, error } = pluginManagementQuerySchema.safeParse(
      event.queryStringParameters,
    );

    if (error) {
      logger.error('Invalid plugin management query parameters', {
        errors: error.flatten(),
      });

      return {
        statusCode: HttpStatusCode.BadRequest,
        message: error.message,
      };
    }

    const { uuid } = data;

    // Get user settings from service
    const { data: userSettings } = await getUserSettings(uuid);

    if (!userSettings) {
      logger.warn('User settings not found', { uuid });
      return {
        statusCode: HttpStatusCode.NotFound,
        body: {
          message: 'User settings not found',
        },
      };
    }

    logger.info('Retrieved user settings for management interface', {
      uuid,
      settings: userSettings,
    });

    // Generate the management interface HTML
    const html = generateManagementInterface(uuid, userSettings);

    return {
      statusCode: HttpStatusCode.Ok,
      headers: {
        'Content-Type': 'text/html',
      },
      body: html,
    };
  } catch (error) {
    return handleError('Error serving plugin management interface', {
      error,
      context: { event },
    });
  }
};

export const handler = middify(pluginManagementHandler);
