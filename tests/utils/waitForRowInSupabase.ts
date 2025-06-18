import { createSupabaseClient } from '@/clients/supabase';

export async function waitForRowInSupabase(
  table: string,
  match: Record<string, unknown>,
  maxAttempts = 5,
  delayMs = 100,
) {
  const supabase = createSupabaseClient();
  for (let i = 0; i < maxAttempts; i++) {
    const { data } = await supabase.from(table).select('*').match(match);
    if (data && data.length > 0) return data[0];
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  throw new Error(
    `Row not found in ${table} after insert: ${JSON.stringify(match)}`,
  );
}
