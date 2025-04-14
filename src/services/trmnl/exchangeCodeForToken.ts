import { createTrmnlClient, TrmnlOAuthTokenResponse } from '@/clients/trmnl';
import { logger } from '@/utils/logger';

/**
 * Exchange an authorization code for an access token
 * @param code Authorization code from TRMNL
 * @returns Access token response
 */
export const exchangeCodeForToken = async (code: string) => {
  try {
    logger.info('Exchanging code for token', {
      code: code.substring(0, 5) + '...',
    });

    const trmnlClient = createTrmnlClient();
    const clientId = process.env.TRMNL_CLIENT_ID;
    const clientSecret = process.env.TRMNL_CLIENT_SECRET;

    const response = await trmnlClient.post<TrmnlOAuthTokenResponse>(
      '/oauth/token',
      {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
      },
    );

    logger.info('Successfully exchanged code for token', {
      accessToken: response.data.access_token.substring(0, 5) + '...',
    });

    return response.data;
  } catch (error) {
    logger.error('Failed to exchange code for token', { error });
    throw error;
  }
};
