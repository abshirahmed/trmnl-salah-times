import { createSupabaseClient } from '@/clients/supabase';
import { createUserSettingsController } from '@/controllers/user-settings-controller';
import { saveSettingsBodySchema } from '@/handlers/save-settings-handler/schema';
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
    const { data, error } = saveSettingsBodySchema.safeParse(event.body);

    if (error) {
      logger.error('Invalid save settings request body', {
        errors: error.flatten(),
      });

      return {
        statusCode: HttpStatusCode.BadRequest,
        body: {
          message: 'Invalid request body',
          errors: error.flatten(),
          success: false,
        },
      };
    }

    const { uuid, city, country, method, timeFormat } = data;

    logger.info('Saving user settings', {
      uuid,
      city,
      country,
      method,
      timeFormat,
    });

    // Save settings to Supabase using the controller
    const supabaseClient = createSupabaseClient();
    const userSettingsController = createUserSettingsController(supabaseClient);
    const success = await userSettingsController.saveUserSettings({
      uuid,
      city,
      country,
      method,
      timeFormat,
    });

    if (!success) {
      logger.error('Failed to save user settings', { uuid });

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
