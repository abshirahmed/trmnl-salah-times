import { createTrmnlClient } from '@/clients/trmnl';
import { installationQuerySchema } from '@/handlers/installation-handler/schema';
import { logger } from '@/utils/logger';
import { middify } from '@/utils/middify';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { HttpStatusCode } from 'axios';

/**
 * Handler for the TRMNL plugin installation flow
 * Receives the installation request from TRMNL and exchanges the token for an access token
 */
const installationHandler = async (event: APIGatewayProxyEvent) => {
  try {
    // Validate query parameters using Zod schema
    const { data: queryParams, error } = installationQuerySchema.safeParse(
      event.queryStringParameters,
    );

    if (error) {
      logger.error('Invalid installation query parameters', {
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

    const { token, installation_callback_url: installationCallbackUrl } =
      queryParams;

    logger.info('Received installation request', {
      token: token.substring(0, 5) + '...',
      installationCallbackUrl,
    });

    // Exchange token for access token using TRMNL client
    try {
      const trmnlClient = createTrmnlClient();
      const tokenResponse = await trmnlClient.exchangeCodeForToken(token);
      const accessToken = tokenResponse.access_token;

      logger.info('Successfully obtained access token', {
        accessToken: accessToken.substring(0, 5) + '...',
      });

      // Redirect back to TRMNL
      return {
        statusCode: HttpStatusCode.Found,
        headers: {
          Location: installationCallbackUrl,
        },
        body: '',
      };
    } catch (clientError) {
      logger.error('Failed to obtain access token', { error: clientError });

      return {
        statusCode: HttpStatusCode.InternalServerError,
        body: {
          message: 'Failed to obtain access token',
          error:
            clientError instanceof Error
              ? clientError.message
              : 'Unknown error',
        },
      };
    }
  } catch (error) {
    logger.error('Error during installation process', { error });

    return {
      statusCode: HttpStatusCode.InternalServerError,
      body: {
        message: 'Installation process failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
};

export const handler = middify(installationHandler);
