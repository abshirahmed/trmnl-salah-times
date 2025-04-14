import { createTrmnlClient } from '@/clients/trmnl';
import { logger } from '@/utils/logger';

/**
 * Verify an access token
 * @param accessToken Access token to verify
 * @returns Whether the token is valid
 */
export const verifyToken = async (accessToken: string) => {
  try {
    logger.info('Verifying access token', {
      accessToken: accessToken.substring(0, 5) + '...',
    });

    const trmnlClient = createTrmnlClient();

    await trmnlClient.get('/api/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    logger.info('Access token is valid');
    return true;
  } catch (error) {
    logger.error('Access token is invalid', { error });
    return false;
  }
};
