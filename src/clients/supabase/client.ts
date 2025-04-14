import { logger } from '@/utils/logger';
import { createClient } from '@supabase/supabase-js';

const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env;

/**
 * Create a Supabase client instance using environment variables
 * @returns Supabase client instance
 */
export const createSupabaseClient = () => {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    logger.error('Missing Supabase credentials');
    throw new Error('Missing Supabase credentials');
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
};
