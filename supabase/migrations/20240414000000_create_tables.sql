-- Create locations table
-- This is the core table for storing user locations
CREATE TABLE IF NOT EXISTS public.locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    timezone TEXT NOT NULL,
    is_default BOOLEAN DEFAULT false
);

-- Create RLS policies for locations
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own locations" 
    ON public.locations 
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own locations" 
    ON public.locations 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own locations" 
    ON public.locations 
    FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own locations" 
    ON public.locations 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- Create prayer_times table
-- Cache for prayer times to reduce API calls
CREATE TABLE IF NOT EXISTS public.prayer_times (
    location_id UUID REFERENCES public.locations(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    fajr TIME NOT NULL,
    sunrise TIME NOT NULL,
    dhuhr TIME NOT NULL,
    asr TIME NOT NULL,
    maghrib TIME NOT NULL,
    isha TIME NOT NULL,
    PRIMARY KEY(location_id, date)
);

-- Create RLS policies for prayer_times
ALTER TABLE public.prayer_times ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view prayer times for their locations" 
    ON public.prayer_times 
    FOR SELECT 
    USING (EXISTS (
        SELECT 1 FROM public.locations 
        WHERE locations.id = prayer_times.location_id 
        AND locations.user_id = auth.uid()
    ));

CREATE POLICY "Users can insert prayer times for their locations" 
    ON public.prayer_times 
    FOR INSERT 
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.locations 
        WHERE locations.id = prayer_times.location_id 
        AND locations.user_id = auth.uid()
    ));

CREATE POLICY "Users can update prayer times for their locations" 
    ON public.prayer_times 
    FOR UPDATE 
    USING (EXISTS (
        SELECT 1 FROM public.locations 
        WHERE locations.id = prayer_times.location_id 
        AND locations.user_id = auth.uid()
    ));

-- Create user_settings table
-- Minimal settings needed for prayer time calculations
CREATE TABLE IF NOT EXISTS public.user_settings (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    calculation_method TEXT NOT NULL DEFAULT 'MWL', -- Muslim World League is default
    asr_method TEXT NOT NULL DEFAULT 'Standard' -- Standard (Shafi, Maliki, Hanbali) or Hanafi
);

-- Create RLS policies for user_settings
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own settings" 
    ON public.user_settings 
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings" 
    ON public.user_settings 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings" 
    ON public.user_settings 
    FOR UPDATE 
    USING (auth.uid() = user_id);

-- Create function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert default settings
    INSERT INTO public.user_settings (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_locations_user_id ON public.locations(user_id);
CREATE INDEX idx_prayer_times_location_id ON public.prayer_times(location_id);
CREATE INDEX idx_prayer_times_date ON public.prayer_times(date);
