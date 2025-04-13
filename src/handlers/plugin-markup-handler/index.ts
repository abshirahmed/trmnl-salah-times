import { pluginMarkupQuerySchema } from '@/handlers/plugin-markup-handler/schema';
import { getTemplateByViewSize } from '@/templates/trmnl-plugin';
import { logger } from '@/utils/logger';
import { middify } from '@/utils/middify';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { HttpStatusCode } from 'axios';

/**
 * Handler for serving TRMNL plugin markup templates
 * Returns the appropriate template based on the view size
 */
const pluginMarkupHandler = async (event: APIGatewayProxyEvent) => {
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

    // Validate and determine which template to return based on the view size
    const { data, error } = pluginMarkupQuerySchema.safeParse(
      event.queryStringParameters,
    );

    if (error) {
      logger.error('Invalid plugin markup query parameters', {
        errors: error.flatten(),
      });

      return {
        statusCode: HttpStatusCode.BadRequest,
        body: {
          message: 'Invalid query parameters',
          errors: error.flatten(),
        },
      };
    }

    // Use the data directly - Zod has already validated it matches our schema
    const viewSize = data.view_size;

    // Get the template for the specified view size
    const template = getTemplateByViewSize(viewSize);

    logger.info('Serving plugin markup template', {
      viewSize,
    });

    return {
      statusCode: HttpStatusCode.Ok,
      headers: {
        'Content-Type': 'text/html',
      },
      body: template,
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
