import { createClient } from '@supabase/supabase-js';

// These values are automatically injected by Lovable when connected to Supabase
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'your-anon-key';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration. Make sure you have connected your project to Supabase in the Lovable interface.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);