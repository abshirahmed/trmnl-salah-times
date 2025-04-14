import { createSupabaseClient } from '@/clients/supabase';
import { pluginMarkupController } from '@/controllers/plugin-markup-controller';
import { pluginMarkupBodySchema } from '@/handlers/plugin-markup-handler/schema';
import { verifyAuthHeader } from '@/utils/auth';
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
        body: JSON.stringify({
          message: 'Invalid request body',
          errors: error.flatten(),
        }),
      };
    }

    // Extract the user UUID from the request body
    const { user_uuid } = data;

    logger.info('Received markup generation request', {
      user_uuid,
    });

    // Get user settings from Supabase
    const supabaseClient = createSupabaseClient();
    const { data: userSettings } =
      await supabaseClient.getUserSettings(user_uuid);

    // Generate markup for all view sizes using the controller
    const markup = await pluginMarkupController.generateMarkup(userSettings);

    logger.info('Generated markup for all view sizes');

    return {
      statusCode: HttpStatusCode.Ok,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(markup),
    };
  } catch (error) {
    logger.error('Error serving plugin markup template', { error });

    return {
      statusCode: HttpStatusCode.InternalServerError,
      body: {
        message: 'Error serving plugin markup template',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
};

export const handler = middify(pluginMarkupHandler);
