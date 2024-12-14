-- Create locations table if it doesn't exist
create table if not exists locations (
  id uuid default uuid_generate_v4() primary key,
  state text not null,
  city text not null,
  neighborhood text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Create a unique constraint to prevent duplicates
  unique(state, city, neighborhood)
);

-- Create indexes for faster queries
create index if not exists locations_state_idx on locations(state);
create index if not exists locations_city_idx on locations(city);
create index if not exists locations_state_city_idx on locations(state, city);

-- Insert all Brazilian states with major cities and neighborhoods
-- São Paulo
insert into locations (state, city, neighborhood) values
('São Paulo', 'São Paulo', 'Jardins'),
('São Paulo', 'São Paulo', 'Moema'),
('São Paulo', 'São Paulo', 'Pinheiros'),
('São Paulo', 'São Paulo', 'Vila Mariana'),
('São Paulo', 'São Paulo', 'Itaim Bibi'),
('São Paulo', 'Campinas', 'Centro'),
('São Paulo', 'Campinas', 'Cambuí'),
('São Paulo', 'Santos', 'Gonzaga'),
('São Paulo', 'Santos', 'Boqueirão');

-- Rio de Janeiro
insert into locations (state, city, neighborhood) values
('Rio de Janeiro', 'Rio de Janeiro', 'Copacabana'),
('Rio de Janeiro', 'Rio de Janeiro', 'Ipanema'),
('Rio de Janeiro', 'Rio de Janeiro', 'Leblon'),
('Rio de Janeiro', 'Rio de Janeiro', 'Barra da Tijuca'),
('Rio de Janeiro', 'Niterói', 'Icaraí'),
('Rio de Janeiro', 'Niterói', 'Santa Rosa');

-- Minas Gerais
insert into locations (state, city, neighborhood) values
('Minas Gerais', 'Belo Horizonte', 'Savassi'),
('Minas Gerais', 'Belo Horizonte', 'Lourdes'),
('Minas Gerais', 'Belo Horizonte', 'Funcionários'),
('Minas Gerais', 'Uberlândia', 'Centro'),
('Minas Gerais', 'Uberlândia', 'Santa Mônica');

-- Add more states and cities as needed
-- Note: This is a sample, you should add more locations based on your needs

-- Create a function to get cities by state
create or replace function get_cities_by_state(state_name text)
returns table (city text) as $$
begin
  return query
  select distinct l.city
  from locations l
  where l.state = state_name
  order by l.city;
end;
$$ language plpgsql;

-- Create a function to get neighborhoods by city
create or replace function get_neighborhoods_by_city(city_name text)
returns table (neighborhood text) as $$
begin
  return query
  select distinct l.neighborhood
  from locations l
  where l.city = city_name
  order by l.neighborhood;
end;
$$ language plpgsql;