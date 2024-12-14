import { supabase } from './supabase';

export interface Location {
  id: string;
  state: string;
  city: string;
  neighborhood: string;
}

export const getStates = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('locations')
    .select('state')
    .order('state');
    
  if (error) throw error;
  return [...new Set(data.map(item => item.state))];
};

export const getCitiesByState = async (state: string): Promise<string[]> => {
  const { data, error } = await supabase
    .from('locations')
    .select('city')
    .eq('state', state)
    .order('city');
    
  if (error) throw error;
  return [...new Set(data.map(item => item.city))];
};

export const getNeighborhoodsByCity = async (city: string): Promise<string[]> => {
  const { data, error } = await supabase
    .from('locations')
    .select('neighborhood')
    .eq('city', city)
    .order('neighborhood');
    
  if (error) throw error;
  return [...new Set(data.map(item => item.neighborhood))];
};