-- Create user_settings table
-- Stores user preferences for prayer time calculations
CREATE TABLE IF NOT EXISTS public.user_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    uuid TEXT NOT NULL UNIQUE,
    city TEXT NOT NULL DEFAULT 'London',
    country TEXT NOT NULL DEFAULT 'UK',
    method INTEGER NOT NULL DEFAULT 2, -- ISNA is default
    timeformat TEXT NOT NULL DEFAULT '24h',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create RLS policies for user_settings
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own settings"
    ON public.user_settings
    FOR SELECT
    USING (auth.uid()::text = uuid);

CREATE POLICY "Users can insert their own settings"
    ON public.user_settings
    FOR INSERT
    WITH CHECK (auth.uid()::text = uuid);

CREATE POLICY "Users can update their own settings"
    ON public.user_settings
    FOR UPDATE
    USING (auth.uid()::text = uuid);

-- Create indexes for better performance
CREATE INDEX idx_user_settings_uuid ON public.user_settings(uuid);
