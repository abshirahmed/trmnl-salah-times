import { createSupabaseClient } from '@/clients/supabase';
import { Tables } from '@/clients/supabase/database.types';
import { logger } from '@/utils/logger';

type UserSettings = Tables<'user_settings'>;

/**
 * Get user settings by UUID
 * @param uuid User UUID
 * @returns User settings or null if not found
 */
export const getUserSettings = async (
  uuid: string,
): Promise<UserSettings | null> => {
  logger.info('Getting user settings', { uuid });
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('user_settings')
    .select()
    .eq('uuid', uuid)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null;
    }
    throw error;
  }

  return data;
};
