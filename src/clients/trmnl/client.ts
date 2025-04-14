import { logger } from '@/utils/logger';
import axios from 'axios';

/**
 * TRMNL OAuth token response
 */
export interface TrmnlOAuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}

const { TRMNL_CLIENT_ID, TRMNL_CLIENT_SECRET } = process.env;

/**
 * Create a TRMNL client using environment variables
 * @returns TRMNL axios client instance
 */
export const createTrmnlClient = () => {
  if (!TRMNL_CLIENT_ID || !TRMNL_CLIENT_SECRET) {
    logger.error('Missing TRMNL client credentials');
    throw new Error('Missing TRMNL client credentials');
  }

  return axios.create({
    baseURL: 'https://usetrmnl.com',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};
