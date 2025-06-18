-- Migration: Add asr_method and maghrib_offset columns to user_settings
ALTER TABLE public.user_settings
  ADD COLUMN asr_method text NOT NULL DEFAULT 'standard',
  ADD COLUMN maghrib_offset integer NOT NULL DEFAULT 0; 