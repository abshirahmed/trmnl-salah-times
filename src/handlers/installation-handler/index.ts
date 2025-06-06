import { installationQuerySchema } from '@/handlers/installation-handler/schema';
import { exchangeCodeForToken } from '@/services/trmnl';
import { handleError } from '@/utils/errorHandler';
import { logger } from '@/utils/logger';
import { middify } from '@/utils/middify';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { HttpStatusCode } from 'axios';

/**
 * Handler for the TRMNL plugin installation flow
 * Receives the installation request from TRMNL and exchanges the code for an access token
 */
const installationHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const { data, error } = installationQuerySchema.safeParse(
      event.queryStringParameters,
    );

    if (error) {
      logger.error('Invalid installation query parameters', {
        errors: error.flatten(),
      });

      return {
        statusCode: HttpStatusCode.BadRequest,
        message: error.message,
      };
    }

    const { code, installation_callback_url } = data;

    logger.info('Received installation request', {
      code: code.substring(0, 5) + '...',
      installation_callback_url,
    });

    // Exchange code for access token using TRMNL service
    try {
      const tokenResponse = await exchangeCodeForToken(code);
      const accessToken = tokenResponse.access_token;

      logger.info('Successfully obtained access token', {
        accessToken: accessToken.substring(0, 5) + '...',
      });

      // Redirect back to TRMNL
      return {
        statusCode: HttpStatusCode.Found,
        headers: {
          Location: installation_callback_url,
        },
        body: '',
      };
    } catch (clientError) {
      return handleError('Failed to obtain access token', {
        error: clientError,
        context: { code },
      });
    }
  } catch (error) {
    return handleError('Error during installation process', {
      error,
      context: { event },
    });
  }
};

export const handler = middify(installationHandler);
