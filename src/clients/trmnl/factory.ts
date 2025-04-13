import { TrmnlClient } from '@/clients/trmnl/client';
import { logger } from '@/utils/logger';

/**
 * Create a TRMNL client using environment variables
 * @returns TRMNL client instance
 */
export const createTrmnlClient = (): TrmnlClient => {
  const clientId = process.env.TRMNL_CLIENT_ID;
  const clientSecret = process.env.TRMNL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    logger.error('Missing TRMNL client credentials');
    throw new Error('Missing TRMNL client credentials');
  }

  return new TrmnlClient({
    clientId,
    clientSecret,
  });
};
