export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      user_settings: {
        Row: {
          id?: string;
          uuid: string;
          city: string;
          country: string;
          method: number;
          timeFormat: '12h' | '24h';
          created_at?: string;
          updated_at?: string | null;
        };
        Insert: {
          id?: string;
          uuid: string;
          city: string;
          country: string;
          method: number;
          timeFormat: '12h' | '24h';
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          uuid?: string;
          city?: string;
          country?: string;
          method?: number;
          timeFormat?: '12h' | '24h';
          created_at?: string;
          updated_at?: string | null;
        };
        Relationships: [
          // Define relationships here if needed
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Helper types for Supabase
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

// Supabase type helpers as per documentation
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> =
  T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never;
