import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// For development, use demo mode if Supabase is not configured
const isDevelopment = import.meta.env.DEV;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase configuration missing. Running in demo mode.');
  
  if (!isDevelopment) {
    console.error('Missing Supabase configuration in production environment.');
  }
}

export const supabase = createClient(
  supabaseUrl || 'https://example.supabase.co',
  supabaseAnonKey || 'demo-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
    global: {
      headers: {
        'x-application-name': 'vivacompanhantes',
      },
    },
  }
);

export const checkSupabaseConnection = async () => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('Running in demo mode - no real database connection');
      return true;
    }

    const { data, error } = await supabase.from('companions').select('count', { count: 'exact' });
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
};