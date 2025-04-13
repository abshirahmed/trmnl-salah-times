import { TrmnlViewSize } from '@/clients';
import { z } from 'zod';

// Define the view size values as a constant to ensure type consistency

/**
 * Validation schema for plugin markup query parameters
 *
 * view_size: Optional string, must be one of 'full', 'half', or 'quadrant'
 */
export const pluginMarkupQuerySchema = z.object({
  view_size: z.nativeEnum(TrmnlViewSize).optional().default(TrmnlViewSize.Full),
});
