import {
  TrmnlClientConfig,
  TrmnlOAuthTokenResponse,
} from '@/clients/trmnl/types';
import { logger } from '@/utils/logger';
import axios, { AxiosInstance } from 'axios';

/**
 * TRMNL API client for interacting with the TRMNL API
 */
export class TrmnlClient {
  private readonly client: AxiosInstance;
  private readonly config: TrmnlClientConfig;

  /**
   * Create a new TRMNL client
   * @param config Client configuration
   */
  constructor(config: TrmnlClientConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseUrl || 'https://usetrmnl.com',
    });
  }

  /**
   * Exchange an authorization code for an access token
   * @param code Authorization code from TRMNL
   * @returns Access token response
   */
  async exchangeCodeForToken(code: string): Promise<TrmnlOAuthTokenResponse> {
    try {
      logger.info('Exchanging code for token', {
        code: code.substring(0, 5) + '...',
      });

      const response = await this.client.post<TrmnlOAuthTokenResponse>(
        '/oauth/token',
        {
          code,
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
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
  }

  /**
   * Verify an access token
   * @param accessToken Access token to verify
   * @returns Whether the token is valid
   */
  async verifyToken(accessToken: string): Promise<boolean> {
    try {
      logger.info('Verifying access token', {
        accessToken: accessToken.substring(0, 5) + '...',
      });

      await this.client.get('/api/v1/me', {
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
  }

  /**
   * Refresh an access token
   * @param refreshToken Refresh token
   * @returns New access token response
   */
  async refreshToken(refreshToken: string): Promise<TrmnlOAuthTokenResponse> {
    try {
      logger.info('Refreshing access token');

      const response = await this.client.post<TrmnlOAuthTokenResponse>(
        '/oauth/token',
        {
          refresh_token: refreshToken,
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
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
  }
}
