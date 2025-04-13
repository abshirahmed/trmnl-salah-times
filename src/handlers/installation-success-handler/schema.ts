import { z } from 'zod';

/**
 * Validation schema for installation success webhook request body
 */
export const installationSuccessBodySchema = z.object({
  user: z.object({
    name: z.string(),
    email: z.string().email({ message: 'Invalid email format' }),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    locale: z.string().optional(),
    time_zone: z.string().optional(),
    time_zone_iana: z.string(),
    utc_offset: z.number().optional(),
    plugin_setting_id: z.number(),
    uuid: z.string().uuid({ message: 'Invalid UUID format' }),
  }),
});
