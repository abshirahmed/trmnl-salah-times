/**
 * TRMNL API client types
 */

/**
 * TRMNL OAuth token response
 */
export interface TrmnlOAuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}

/**
 * TRMNL user information
 */
export interface TrmnlUser {
  name: string;
  email: string;
  first_name?: string;
  last_name?: string;
  locale?: string;
  time_zone?: string;
  time_zone_iana: string;
  utc_offset?: number;
  plugin_setting_id: number;
  uuid: string;
}

/**
 * TRMNL installation success webhook payload
 */
export interface TrmnlInstallationSuccessPayload {
  user: TrmnlUser;
}

/**
 * TRMNL plugin view size
 */
export enum TrmnlViewSize {
  Full = 'full',
  Half = 'half',
  Quadrant = 'quadrant',
}

/**
 * TRMNL client configuration
 */
export interface TrmnlClientConfig {
  clientId: string;
  clientSecret: string;
  baseUrl?: string;
}
