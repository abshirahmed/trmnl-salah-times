import { z } from 'zod';

/**
 * Validation schema for uninstallation webhook request body
 *
 * user_uuid: Required string, must be a valid UUID format
 */
export const uninstallationBodySchema = z.object({
  user_uuid: z
    .string({
      required_error: 'User UUID is required',
      invalid_type_error: 'User UUID must be a string',
    })
    .trim()
    .uuid({ message: 'Invalid UUID format' }),
});
