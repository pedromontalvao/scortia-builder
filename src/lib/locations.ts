import { supabase } from './supabase';

export interface Location {
  id: string;
  state: string;
  city: string;
  neighborhood: string;
}

export const getStates = async (): Promise<string[]> => {
  console.log('Fetching states...');
  const { data, error } = await supabase
    .from('locations')
    .select('state')
    .order('state');
    
  if (error) {
    console.error('Error fetching states:', error);
    throw error;
  }
  
  const states = [...new Set(data.map(item => item.state))];
  console.log('States fetched:', states);
  return states;
};

export const getCitiesByState = async (state: string): Promise<string[]> => {
  console.log('Fetching cities for state:', state);
  const { data, error } = await supabase
    .rpc('get_cities_by_state', { state_name: state });
    
  if (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
  
  console.log('Cities fetched:', data);
  return data.map(item => item.city);
};

export const getNeighborhoodsByCity = async (city: string): Promise<string[]> => {
  console.log('Fetching neighborhoods for city:', city);
  const { data, error } = await supabase
    .rpc('get_neighborhoods_by_city', { city_name: city });
    
  if (error) {
    console.error('Error fetching neighborhoods:', error);
    throw error;
  }
  
  console.log('Neighborhoods fetched:', data);
  return data.map(item => item.neighborhood);
};