/**
 * Supabase client types
 */

/**
 * Supabase client configuration
 */
export interface SupabaseClientConfig {
  url: string;
  key: string;
}

/**
 * User settings stored in Supabase
 */
export interface UserSettings {
  id?: string;
  uuid: string;
  city: string;
  country: string;
  method: number;
  timeFormat: '12h' | '24h';
  created_at?: string;
  updated_at?: string;
}
