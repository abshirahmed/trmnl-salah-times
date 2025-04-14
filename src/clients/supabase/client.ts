import { SupabaseClientConfig, UserSettings } from '@/clients/supabase/types';
import { logger } from '@/utils/logger';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase client for database operations
 */
export class SupabaseService {
  private readonly client: SupabaseClient;

  /**
   * Create a new Supabase client
   * @param config Client configuration
   */
  constructor(config: SupabaseClientConfig) {
    this.client = createClient(config.url, config.key);
  }

  /**
   * Get user settings by UUID
   * @param uuid User UUID
   * @returns User settings or null if not found
   */
  async getUserSettings(uuid: string): Promise<UserSettings | null> {
    try {
      logger.info('Fetching user settings', { uuid });

      const { data, error } = await this.client
        .from('user_settings')
        .select('*')
        .eq('uuid', uuid)
        .single();

      if (error) {
        logger.error('Error fetching user settings', { error, uuid });
        return null;
      }

      logger.info('Successfully fetched user settings', { uuid });
      return data as UserSettings;
    } catch (error) {
      logger.error('Failed to fetch user settings', { error, uuid });
      return null;
    }
  }

  /**
   * Create or update user settings
   * @param settings User settings to save
   * @returns True if successful, false otherwise
   */
  async saveUserSettings(settings: UserSettings): Promise<boolean> {
    try {
      logger.info('Saving user settings', { uuid: settings.uuid });

      // Check if user settings already exist
      const { data: existingSettings } = await this.client
        .from('user_settings')
        .select('id')
        .eq('uuid', settings.uuid)
        .single();

      let result;

      if (existingSettings) {
        // Update existing settings
        result = await this.client
          .from('user_settings')
          .update({
            city: settings.city,
            country: settings.country,
            method: settings.method,
            timeFormat: settings.timeFormat,
            updated_at: new Date().toISOString(),
          })
          .eq('uuid', settings.uuid);
      } else {
        // Create new settings
        result = await this.client.from('user_settings').insert([
          {
            uuid: settings.uuid,
            city: settings.city,
            country: settings.country,
            method: settings.method,
            timeFormat: settings.timeFormat,
          },
        ]);
      }

      if (result.error) {
        logger.error('Error saving user settings', {
          error: result.error,
          uuid: settings.uuid,
        });
        return false;
      }

      logger.info('Successfully saved user settings', { uuid: settings.uuid });
      return true;
    } catch (error) {
      logger.error('Failed to save user settings', {
        error,
        uuid: settings.uuid,
      });
      return false;
    }
  }
}
