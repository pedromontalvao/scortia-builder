import { supabase } from './supabase';

export interface Location {
  id: string;
  state: string;
  city: string;
  neighborhood: string;
}

interface IBGEState {
  id: number;
  sigla: string;
  nome: string;
}

interface IBGECity {
  id: number;
  nome: string;
}

interface IBGEDistrict {
  id: number;
  nome: string;
}

export const getStates = async (): Promise<string[]> => {
  console.log('Fetching states from IBGE API...');
  try {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    const states: IBGEState[] = await response.json();
    const stateNames = states.map(state => state.nome).sort();
    console.log('States fetched:', stateNames);
    return stateNames;
  } catch (error) {
    console.error('Error fetching states:', error);
    return [];
  }
};

export const getCitiesByState = async (state: string): Promise<string[]> => {
  console.log('Fetching cities for state:', state);
  try {
    // First get the state ID
    const statesResponse = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    const states: IBGEState[] = await statesResponse.json();
    const stateData = states.find(s => s.nome === state);
    
    if (!stateData) {
      console.error('State not found:', state);
      return [];
    }

    // Then get cities for that state
    const citiesResponse = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateData.id}/municipios`);
    const cities: IBGECity[] = await citiesResponse.json();
    const cityNames = cities.map(city => city.nome).sort();
    console.log('Cities fetched:', cityNames);
    return cityNames;
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};

export const getNeighborhoodsByCity = async (city: string): Promise<string[]> => {
  console.log('Fetching districts for city:', city);
  try {
    // First get the city ID
    const citiesResponse = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
    const cities: IBGECity[] = await citiesResponse.json();
    const cityData = cities.find(c => c.nome === city);
    
    if (!cityData) {
      console.error('City not found:', city);
      return [];
    }

    // Then get districts for that city
    const districtsResponse = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${cityData.id}/distritos`);
    const districts: IBGEDistrict[] = await districtsResponse.json();
    const districtNames = districts.map(district => district.nome).sort();
    console.log('Districts fetched:', districtNames);
    return districtNames;
  } catch (error) {
    console.error('Error fetching districts:', error);
    return [];
  }
};