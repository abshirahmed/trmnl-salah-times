import { z } from 'zod';

/**
 * Validation schema for plugin management query parameters
 *
 * uuid: Required string, must be a valid UUID format
 */
export const pluginManagementQuerySchema = z.object({
  uuid: z
    .string({
      required_error: 'UUID is required',
      invalid_type_error: 'UUID must be a string',
    })
    .uuid({ message: 'Invalid UUID format' })
    .trim(),
});

/**
 * Validation schema for plugin management form submission
 */
export const pluginManagementFormSchema = z.object({
  uuid: z.string().uuid({ message: 'Invalid UUID format' }),
  city: z
    .string({
      required_error: 'City is required',
      invalid_type_error: 'City must be a string',
    })
    .min(1, { message: 'City cannot be empty' })
    .trim(),
  country: z
    .string({
      required_error: 'Country is required',
      invalid_type_error: 'Country must be a string',
    })
    .min(1, { message: 'Country cannot be empty' })
    .trim(),
  method: z
    .number()
    .min(1, {
      message: 'Method must be a number between 1 and 15',
    })
    .max(15, {
      message: 'Method must be a number between 1 and 15',
    })
    .default(2),
  timeFormat: z.enum(['12h', '24h']).default('24h'),
});
