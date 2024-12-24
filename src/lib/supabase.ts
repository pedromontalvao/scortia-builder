import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

// For development, use demo mode if Supabase is not configured
const isDevelopment = import.meta.env.DEV;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase configuration missing, using local development setup.');
  
  if (!isDevelopment) {
    console.error('Missing Supabase configuration in production environment.');
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
  global: {
    headers: {
      'x-application-name': 'vivacompanhantes',
    },
  },
});

export const checkSupabaseConnection = async () => {
  try {
    console.log('Checking Supabase connection...');
    console.log('Using URL:', supabaseUrl);
    
    if (isDevelopment && supabaseUrl.includes('localhost')) {
      console.log('Running in local development mode');
    }

    const { data, error } = await supabase.from('companions').select('count', { count: 'exact' });
    
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    
    console.log('Supabase connection successful');
    console.log('Database status:', data ? 'Connected' : 'Empty table');
    
    return true;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
};

// Initialize connection check
checkSupabaseConnection().then(isConnected => {
  console.log('Database connection status:', isConnected ? 'Connected' : 'Failed');
});