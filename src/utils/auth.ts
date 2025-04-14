import { UnauthorizedError } from '@/utils/errors';
import { logger } from '@/utils/logger';
import { APIGatewayProxyEvent } from 'aws-lambda';

/**
 * Verify that the request has a valid Bearer token in the Authorization header
 * @param event API Gateway event
 * @throws UnauthorizedError if the Authorization header is missing or invalid
 */
export const verifyAuthHeader = (event: APIGatewayProxyEvent): void => {
  const authHeader = event.headers.Authorization || event.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.error('Missing or invalid authorization header');
    throw new UnauthorizedError('Missing or invalid authorization header');
  }
};
