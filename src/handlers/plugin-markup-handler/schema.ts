import { z } from 'zod';

/**
 * Validation schema for plugin markup request body
 *
 * user_uuid: Required string, must be a valid UUID format
 */
export const pluginMarkupBodySchema = z.object({
  user_uuid: z
    .string({
      required_error: 'User UUID is required',
      invalid_type_error: 'User UUID must be a string',
    })
    .uuid({ message: 'Invalid UUID format' })
    .trim(),
});
