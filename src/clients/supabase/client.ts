import { Database } from '@/clients/supabase/database.types';
import {
  SupabaseClientConfig,
  UserSettingsInsert,
} from '@/clients/supabase/types';
import {
  createClient,
  SupabaseClient as SupabaseSDKClient,
} from '@supabase/supabase-js';

/**
 * Supabase client for database operations
 */
export class SupabaseClient {
  private readonly client: SupabaseSDKClient<Database>;

  /**
   * Create a new Supabase client
   * @param config Client configuration
   */
  constructor(config: SupabaseClientConfig) {
    this.client = createClient<Database>(config.url, config.key);
  }

  /**
   * Get user settings by UUID
   * @param uuid User UUID
   * @returns Supabase response containing user settings data
   */
  async getUserSettings(uuid: string) {
    return this.client.from('user_settings').select().eq('uuid', uuid).single();
  }

  /**
   * Create or update user settings using upsert
   * @param settings User settings to save
   * @returns Supabase response containing the operation result
   */
  async saveUserSettings(settings: UserSettingsInsert) {
    return this.client.from('user_settings').upsert(
      {
        uuid: settings.uuid,
        city: settings.city,
        country: settings.country,
        method: settings.method,
        timeFormat: settings.timeFormat,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'uuid' },
    );
  }

  /**
   * Delete user settings by UUID
   * @param uuid User UUID
   * @returns Supabase response containing the operation result
   */
  async deleteUserSettings(uuid: string) {
    return this.client.from('user_settings').delete().eq('uuid', uuid);
  }
}
