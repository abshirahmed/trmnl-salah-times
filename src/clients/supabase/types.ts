/**
 * Supabase client types
 */
import {
  Tables,
  InsertTables,
  UpdateTables,
  DbResult,
  DbResultOk,
} from './database.types';

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
export type UserSettings = Tables<'user_settings'>;

/**
 * User settings for insertion
 */
export type UserSettingsInsert = InsertTables<'user_settings'>;

/**
 * User settings for update
 */
export type UserSettingsUpdate = UpdateTables<'user_settings'>;

/**
 * Type helpers for working with Supabase responses
 */
export type UserSettingsResponse = DbResult<
  ReturnType<typeof import('./client').SupabaseClient.prototype.getUserSettings>
>;
export type UserSettingsResponseData = DbResultOk<
  ReturnType<typeof import('./client').SupabaseClient.prototype.getUserSettings>
>;
