import { installationSuccessBodySchema } from '@/handlers/installation-success-handler/schema';
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
    const authHeader =
      event.headers.Authorization || event.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.error('Missing or invalid authorization header');
      return {
        statusCode: HttpStatusCode.Unauthorized,
        body: {
          message: 'Unauthorized',
        },
      };
    }

    // Validate request body (already parsed by middy jsonBodyParser)
    const { data: body, error } = installationSuccessBodySchema.safeParse(
      event.body,
    );

    if (error) {
      logger.error('Invalid installation success webhook body', {
        errors: error.flatten(),
      });

      return {
        statusCode: HttpStatusCode.BadRequest,
        body: {
          message: 'Invalid request body',
          errors: error.flatten(),
        },
      };
    }

    const userData = body.user;

    const { name, email, time_zone_iana, plugin_setting_id, uuid } = userData;

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
    logger.error('Error processing installation success webhook', { error });

    return {
      statusCode: HttpStatusCode.InternalServerError,
      body: {
        message: 'Error processing installation success webhook',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
};

export const handler = middify(installationSuccessHandler);
