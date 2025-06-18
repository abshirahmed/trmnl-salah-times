import { createSupabaseClient } from '@/clients/supabase';
import { TablesInsert } from '@/clients/supabase/database.types';
import { logger } from '@/utils/logger';

type UserSettingsInsert = TablesInsert<'user_settings'>;

/**
 * Save user settings (create or update)
 * @param settings User settings to save
 * @returns Data from the upsert operation
 */
export const saveUserSettings = async (settings: UserSettingsInsert) => {
  logger.info('Saving user settings', { uuid: settings.uuid });
  const supabase = createSupabaseClient();
  return supabase.from('user_settings').upsert(
    {
      uuid: settings.uuid,
      city: settings.city,
      country: settings.country,
      method: settings.method,
      timeformat: settings.timeformat,
      asr_method: settings.asr_method,
      maghrib_offset: settings.maghrib_offset,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'uuid' },
  );
};
