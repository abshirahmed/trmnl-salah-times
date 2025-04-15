# Declarative Schemas for TRMNL Salah Times

This directory contains declarative schema files for the TRMNL Salah Times database. Declarative schemas store the final desired state of the database in `.sql` files that can be saved and versioned alongside the project.

## Benefits of Declarative Schemas

- **Single pane of glass**: Maintain your entire database schema in one place, reducing redundancy and potential errors.
- **Versioned migrations**: Automatically generate migration files, ensuring consistent schema updates across environments.
- **Concise code reviews**: Easily review changes to tables, views, and functions without manually repeating complex migration scripts.

## Schema Files

- `user_settings.sql`: User preferences for prayer time calculations including city, country, calculation method, and time format

## How It Works

1. The schema files in this directory define the desired state of the database
2. When you run `supabase db diff`, Supabase compares the current state of the database with the desired state
3. Supabase generates migration files that transform the database from its current state to the desired state
4. You can apply these migrations with `supabase db push`

## Reference

For more information, see the [Supabase documentation on declarative schemas](https://supabase.com/docs/guides/local-development/declarative-database-schemas).
