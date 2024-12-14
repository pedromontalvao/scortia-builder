create table locations (
  id uuid default uuid_generate_v4() primary key,
  state text not null,
  city text not null,
  neighborhood text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Create a unique constraint to prevent duplicates
  unique(state, city, neighborhood)
);

-- Create an index for faster queries
create index locations_state_city_idx on locations(state, city);

-- Insert all Brazilian states (you'll need to add cities and neighborhoods)
insert into locations (state, city, neighborhood) values
  ('Acre', 'Rio Branco', 'Centro'),
  ('Alagoas', 'Maceió', 'Centro'),
  ('Amapá', 'Macapá', 'Centro'),
  ('Amazonas', 'Manaus', 'Centro'),
  ('Bahia', 'Salvador', 'Centro'),
  ('Ceará', 'Fortaleza', 'Centro'),
  ('Distrito Federal', 'Brasília', 'Asa Sul'),
  ('Espírito Santo', 'Vitória', 'Centro'),
  ('Goiás', 'Goiânia', 'Setor Central'),
  ('Maranhão', 'São Luís', 'Centro'),
  ('Mato Grosso', 'Cuiabá', 'Centro'),
  ('Mato Grosso do Sul', 'Campo Grande', 'Centro'),
  ('Minas Gerais', 'Belo Horizonte', 'Centro'),
  ('Pará', 'Belém', 'Centro'),
  ('Paraíba', 'João Pessoa', 'Centro'),
  ('Paraná', 'Curitiba', 'Centro'),
  ('Pernambuco', 'Recife', 'Centro'),
  ('Piauí', 'Teresina', 'Centro'),
  ('Rio de Janeiro', 'Rio de Janeiro', 'Centro'),
  ('Rio Grande do Norte', 'Natal', 'Centro'),
  ('Rio Grande do Sul', 'Porto Alegre', 'Centro'),
  ('Rondônia', 'Porto Velho', 'Centro'),
  ('Roraima', 'Boa Vista', 'Centro'),
  ('Santa Catarina', 'Florianópolis', 'Centro'),
  ('São Paulo', 'São Paulo', 'Centro'),
  ('Sergipe', 'Aracaju', 'Centro'),
  ('Tocantins', 'Palmas', 'Centro');

-- You'll need to add more cities and neighborhoods for each state