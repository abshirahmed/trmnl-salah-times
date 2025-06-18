import { z } from 'zod';

/**
 * Validation schema for save settings query parameters
 */
export const saveSettingsQuerySchema = z.object({
  uuid: z
    .string({ required_error: 'UUID is required' })
    .uuid({ message: 'Invalid UUID format' })
    .trim(),
  city: z
    .string({ required_error: 'City is required' })
    .min(1, { message: 'City cannot be empty' })
    .trim(),
  country: z
    .string({ required_error: 'Country is required' })
    .min(1, { message: 'Country cannot be empty' })
    .trim(),
  method: z.coerce
    .number()
    .min(1, { message: 'Method must be a number between 1 and 15' })
    .max(15, { message: 'Method must be a number between 1 and 15' })
    .optional()
    .default(2),
  timeFormat: z.enum(['12h', '24h']).optional().default('24h'),
  asrMethod: z.enum(['standard', 'hanafi']).optional().default('standard'),
  maghribOffset: z.coerce.number().int().optional().default(0),
});
