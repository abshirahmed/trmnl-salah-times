import { z } from 'zod';

/**
 * Validation schema for installation query parameters
 *
 * code: Required string, must not be empty
 * installation_callback_url: Required string, must not be empty and must be a valid URL
 */
export const installationQuerySchema = z.object({
  code: z
    .string({
      required_error: 'Code is required',
      invalid_type_error: 'Code must be a string',
    })
    .min(1, { message: 'Code cannot be empty' })
    .trim(),

  installation_callback_url: z
    .string({
      required_error: 'Installation callback URL is required',
      invalid_type_error: 'Installation callback URL must be a string',
    })
    .min(1, { message: 'Installation callback URL cannot be empty' })
    .url({ message: 'Installation callback URL must be a valid URL' })
    .trim(),
});
