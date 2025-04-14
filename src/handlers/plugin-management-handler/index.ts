import { createSupabaseClient } from '@/clients/supabase';
import { createUserSettingsController } from '@/controllers/user-settings-controller';
import { pluginManagementQuerySchema } from '@/handlers/plugin-management-handler/schema';
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

    // Get user settings from Supabase
    const supabaseClient = createSupabaseClient();
    const userSettingsController = createUserSettingsController(supabaseClient);
    const userSettings = await userSettingsController.getUserSettings(uuid);

    logger.info('Retrieved user settings for management interface', {
      uuid,
      settings: userSettings,
    });

    // Generate the management interface HTML
    const html = userSettingsController.generateManagementInterface(
      uuid,
      userSettings,
    );

    return {
      statusCode: HttpStatusCode.Ok,
      headers: {
        'Content-Type': 'text/html',
      },
      body: html,
    };
  } catch (error) {
    logger.error('Error serving plugin management interface', { error });

    return {
      statusCode: HttpStatusCode.InternalServerError,
      body: {
        message: 'Error serving plugin management interface',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
};

export const handler = middify(pluginManagementHandler);
