import { createSupabaseClient } from '@/clients/supabase';
import { logger } from '@/utils/logger';

/**
 * Delete user settings by UUID
 * @param uuid User UUID
 * @returns Data from the delete operation
 */
export const deleteUserSettings = async (uuid: string) => {
  logger.info('Deleting user settings', { uuid });
  const supabase = createSupabaseClient();

  return supabase.from('user_settings').delete().eq('uuid', uuid);
};
