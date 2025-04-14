import { uninstallationBodySchema } from '@/handlers/uninstallation-handler/schema';
import { deleteUserSettings } from '@/services/user-settings';
import { verifyAuthHeader } from '@/utils/auth';
import { logger } from '@/utils/logger';
import { middify } from '@/utils/middify';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { HttpStatusCode } from 'axios';

/**
 * Handler for the TRMNL plugin uninstallation webhook
 * Receives notification when a user uninstalls the plugin
 */
const uninstallationHandler = async (event: APIGatewayProxyEvent) => {
  try {
    // Verify authorization header
    verifyAuthHeader(event);

    const parseResult = uninstallationBodySchema.safeParse(event.body);

    if (!parseResult.success) {
      logger.error('Invalid uninstallation webhook body', {
        errors: parseResult.error.flatten(),
      });

      return {
        statusCode: HttpStatusCode.BadRequest,
        body: {
          message: 'Invalid request body',
          errors: parseResult.error.flatten(),
        },
      };
    }

    const { data } = parseResult;

    const { user_uuid } = data;

    logger.info('Received uninstallation webhook', {
      user_uuid,
    });

    // Delete user settings using service
    const { error } = await deleteUserSettings(user_uuid);

    if (error) {
      logger.warn('Failed to delete user settings', {
        error,
        user_uuid,
      });

      return {
        statusCode: HttpStatusCode.InternalServerError,
        body: {
          message: 'Failed to delete user settings',
        },
      };
    }

    logger.info('Successfully deleted user settings', {
      user_uuid,
    });

    return {
      statusCode: HttpStatusCode.Ok,
      body: {
        message: 'Uninstallation successful',
      },
    };
  } catch (error) {
    logger.error('Error processing uninstallation webhook', { error });

    return {
      statusCode: HttpStatusCode.InternalServerError,
      body: {
        message: 'Error processing uninstallation webhook',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
};

export const handler = middify(uninstallationHandler);
