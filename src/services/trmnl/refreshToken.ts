import { createTrmnlClient, TrmnlOAuthTokenResponse } from '@/clients/trmnl';
import { logger } from '@/utils/logger';

/**
 * Refresh an access token
 * @param refreshToken Refresh token
 * @returns New access token response
 */
export const refreshToken = async (refreshToken: string) => {
  try {
    logger.info('Refreshing access token');

    const trmnlClient = createTrmnlClient();
    const clientId = process.env.TRMNL_CLIENT_ID;
    const clientSecret = process.env.TRMNL_CLIENT_SECRET;

    const response = await trmnlClient.post<TrmnlOAuthTokenResponse>(
      '/oauth/token',
      {
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
      },
    );

    logger.info('Successfully refreshed access token', {
      accessToken: response.data.access_token.substring(0, 5) + '...',
    });

    return response.data;
  } catch (error) {
    logger.error('Failed to refresh access token', { error });
    throw error;
  }
};
