import { SupabaseService } from '@/clients/supabase/client';
import { logger } from '@/utils/logger';

/**
 * Create a Supabase client using environment variables
 * @returns Supabase client instance
 */
export const createSupabaseClient = (): SupabaseService => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !key) {
    logger.error('Missing Supabase credentials');
    throw new Error('Missing Supabase credentials');
  }

  return new SupabaseService({
    url,
    key,
  });
};
