import { saveSettingsBodySchema } from '@/handlers/save-settings-handler/schema';
import { saveUserSettings } from '@/services/user-settings';
import { logger } from '@/utils/logger';
import { middify } from '@/utils/middify';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { HttpStatusCode } from 'axios';

/**
 * Handler for saving user settings
 * Receives settings from the management interface and saves them to Supabase
 */
const saveSettingsHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const parseResult = saveSettingsBodySchema.safeParse(event.body);

    if (!parseResult.success) {
      logger.error('Invalid save settings request body', {
        errors: parseResult.error.flatten(),
      });

      return {
        statusCode: HttpStatusCode.BadRequest,
        body: {
          message: 'Invalid request body',
          errors: parseResult.error.flatten(),
          success: false,
        },
      };
    }

    const { data } = parseResult;

    const { uuid, city, country, method, timeFormat } = data;

    logger.info('Saving user settings', {
      uuid,
      city,
      country,
      method,
      timeFormat,
    });

    // Save settings using service
    const { error } = await saveUserSettings({
      uuid,
      city,
      country,
      method,
      timeformat: timeFormat,
    });

    if (error) {
      logger.error('Failed to save user settings', { uuid, error });

      return {
        statusCode: HttpStatusCode.InternalServerError,
        body: {
          message: 'Failed to save settings',
          success: false,
        },
      };
    }

    logger.info('Successfully saved user settings', { uuid });

    return {
      statusCode: HttpStatusCode.Ok,
      body: {
        message: 'Settings saved successfully',
        success: true,
      },
    };
  } catch (error) {
    logger.error('Error saving user settings', { error });

    return {
      statusCode: HttpStatusCode.InternalServerError,
      body: {
        message: 'Error saving settings',
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      },
    };
  }
};

export const handler = middify(saveSettingsHandler);
