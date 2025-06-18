import { supabaseClient } from '@/clients/supabase/singleton';
import { logger } from '@/utils/logger';

/**
 * Delete user settings by UUID
 * @param uuid User UUID
 * @returns Data from the delete operation
 */
export const deleteUserSettings = async (uuid: string) => {
  logger.info('Deleting user settings', { uuid });

  return supabaseClient.from('user_settings').delete().eq('uuid', uuid);
};
