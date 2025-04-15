import { installationSuccessBodySchema } from '@/handlers/installation-success-handler/schema';
import { verifyAuthHeader } from '@/utils/auth';
import { handleError } from '@/utils/errorHandler';
import { logger } from '@/utils/logger';
import { middify } from '@/utils/middify';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { HttpStatusCode } from 'axios';

/**
 * Handler for the TRMNL plugin installation success webhook
 * Receives notification when a user successfully installs the plugin
 */
const installationSuccessHandler = async (event: APIGatewayProxyEvent) => {
  try {
    // Verify authorization header
    verifyAuthHeader(event);

    const { data, error } = installationSuccessBodySchema.safeParse(event.body);

    if (error) {
      logger.error('Invalid installation success webhook body', {
        errors: error.flatten(),
      });

      return {
        statusCode: HttpStatusCode.BadRequest,
        message: error.message,
      };
    }

    const { name, email, time_zone_iana, plugin_setting_id, uuid } = data.user;

    logger.info('User successfully installed the plugin', {
      name,
      email,
      plugin_setting_id,
      uuid,
      time_zone_iana,
    });

    return {
      statusCode: HttpStatusCode.Ok,
      body: {
        message: 'Installation success received',
      },
    };
  } catch (error) {
    return handleError('Error processing installation success webhook', {
      error,
      context: { event },
    });
  }
};

export const handler = middify(installationSuccessHandler);
