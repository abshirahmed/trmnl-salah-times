-- Seed data for user_settings table
INSERT INTO public.user_settings (uuid, city, country, method, timeformat, asr_method, maghrib_offset, created_at, updated_at)
VALUES
  ('example-user-1', 'London', 'United Kingdom', 3, '12h', 'standard', 0, NOW(), NOW()),  -- Muslim World League (common in Europe)
  ('example-user-2', 'New York', 'United States', 2, '12h', 'hanafi', 2, NOW(), NOW()),  -- ISNA (common in North America)
  ('example-user-3', 'Dubai', 'United Arab Emirates', 4, '12h', 'standard', 0, NOW(), NOW()),  -- Umm Al-Qura (common in Middle East)
  ('example-user-4', 'Kuala Lumpur', 'Malaysia', 3, '24h', 'standard', 0, NOW(), NOW()),  -- Muslim World League
  ('example-user-5', 'Istanbul', 'Turkey', 13, '24h', 'hanafi', 0, NOW(), NOW());  -- Diyanet İşleri Başkanlığı (Turkey)

-- Note: In a real application, you would replace the example UUIDs with actual user IDs
-- The method values correspond to different prayer time calculation methods:
-- 1: University of Islamic Sciences, Karachi
-- 2: Islamic Society of North America (default)
-- 3: Muslim World League
-- 4: Umm Al-Qura University, Makkah
-- 5: Egyptian General Authority of Survey
-- 7: Institute of Geophysics, University of Tehran
-- 8: Gulf Region
-- 9: Kuwait
-- 10: Qatar
-- 11: Majlis Ugama Islam Singapura, Singapore
-- 12: Union Organization Islamic de France
-- 13: Diyanet İşleri Başkanlığı, Turkey
-- 14: Spiritual Administration of Muslims of Russia
-- 15: Moonsighting Committee Worldwide
