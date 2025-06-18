import { z } from 'zod';

/**
 * Validation schema for prayer times query parameters
 *
 * city: Required string, must not be empty
 * country: Required string, must not be empty
 * method: Optional string, must be a valid calculation method number (1-15)
 *         Default is 2 (Islamic Society of North America)
 *
 * Valid calculation methods:
 * 1 - University of Islamic Sciences, Karachi
 * 2 - Islamic Society of North America
 * 3 - Muslim World League
 * 4 - Umm Al-Qura University, Makkah
 * 5 - Egyptian General Authority of Survey
 * 7 - Institute of Geophysics, University of Tehran
 * 8 - Gulf Region
 * 9 - Kuwait
 * 10 - Qatar
 * 11 - Majlis Ugama Islam Singapura, Singapore
 * 12 - Union Organization Islamic de France
 * 13 - Diyanet İşleri Başkanlığı, Turkey
 * 14 - Spiritual Administration of Muslims of Russia
 * 15 - Moonsighting Committee Worldwide
 */
export const prayerTimesQuerySchema = z.object({
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
    .optional()
    .default(2),

  uuid: z.string().uuid().optional(),
});
