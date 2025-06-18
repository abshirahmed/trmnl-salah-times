import { supabaseClient } from '@/clients/supabase/singleton';
import { logger } from '@/utils/logger';

/**
 * Get user settings by UUID
 * @param uuid User UUID
 * @returns User settings or null if not found
 */
export const getUserSettings = async (uuid: string) => {
  logger.info('Getting user settings', { uuid });
  return supabaseClient
    .from('user_settings')
    .select()
    .eq('uuid', uuid)
    .single();
};
