import { saveSettingsQuerySchema } from '@/handlers/save-settings-handler/schema';
import { saveUserSettings } from '@/services/user-settings';
import { handleError } from '@/utils/errorHandler';
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
    const parseResult = saveSettingsQuerySchema.safeParse(
      event.queryStringParameters,
    );

    if (!parseResult.success) {
      logger.error('Invalid save settings query parameters', {
        errors: parseResult.error.flatten(),
      });

      return {
        statusCode: HttpStatusCode.BadRequest,
        body: {
          message: 'Invalid request parameters',
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
      return handleError('Failed to save user settings', {
        error,
        context: { uuid },
      });
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
    return handleError('Error saving user settings', {
      error,
      context: { event },
    });
  }
};

export const handler = middify(saveSettingsHandler);
