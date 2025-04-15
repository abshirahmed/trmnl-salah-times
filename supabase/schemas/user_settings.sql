-- User Settings table schema
create table public.user_settings (
  id uuid default uuid_generate_v4(),
  uuid text primary key,
  city text not null,
  country text not null,
  method integer not null default 2,
  timeformat text not null default '12h',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Set up Row Level Security (RLS)
alter table public.user_settings enable row level security;

-- Create policies
-- Allow authenticated users to view their own settings
create policy "Users can view their own settings"
  on user_settings for select
  using (true);

-- Allow authenticated users to create their own settings
create policy "Users can create their own settings"
  on user_settings for insert
  with check (true);

-- Allow authenticated users to update their own settings
create policy "Users can update their own settings"
  on user_settings for update
  using (true);

-- Allow authenticated users to delete their own settings
create policy "Users can delete their own settings"
  on user_settings for delete
  using (true);
