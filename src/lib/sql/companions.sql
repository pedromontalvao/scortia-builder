-- Update companions table with new fields
alter table companions add column if not exists services text[];
alter table companions add column if not exists service_for text[];
alter table companions add column if not exists service_locations text[];
alter table companions add column if not exists ethnicity text;
alter table companions add column if not exists nationality text;
alter table companions add column if not exists breast_type text;
alter table companions add column if not exists hair_color text;
alter table companions add column if not exists body_type text;
alter table companions add column if not exists availability jsonb;

-- Add some demo data
insert into companions (
  name, description, state, city, neighborhood, whatsapp,
  services, service_for, service_locations, ethnicity,
  nationality, breast_type, hair_color, body_type,
  availability, is_verified, is_premium
) values 
(
  'Isabella Santos',
  'Olá! Sou uma acompanhante de luxo com experiência em proporcionar momentos únicos e inesquecíveis.',
  'São Paulo',
  'São Paulo',
  'Jardins',
  '11999999999',
  ARRAY['Massagem erótica', 'Massagem tântrica', 'Beijo francês'],
  ARRAY['Homens', 'Casais'],
  ARRAY['Hotel / Motel', 'Em casa'],
  'Latina',
  'Brasileira',
  'Seios Natural',
  'Cabelo Castanho',
  'Curvas',
  '{"Segunda": {"start": "10:00", "end": "22:00"}, "Terça": {"start": "10:00", "end": "22:00"}, "Quarta": {"start": "10:00", "end": "22:00"}, "Quinta": {"start": "10:00", "end": "22:00"}, "Sexta": {"start": "10:00", "end": "22:00"}, "Sábado": {"start": "12:00", "end": "20:00"}, "Domingo": {"start": "12:00", "end": "20:00"}}',
  true,
  true
),
(
  'Julia Oliveira',
  'Acompanhante de alto nível, discreta e elegante. Atendimento personalizado para momentos especiais.',
  'Rio de Janeiro',
  'Rio de Janeiro',
  'Copacabana',
  '21999999999',
  ARRAY['Massagem erótica', 'Beijo francês', 'Tratamento de namorados'],
  ARRAY['Homens'],
  ARRAY['Hotel / Motel'],
  'Brasileiras',
  'Brasileira',
  'Com silicone',
  'Cabelo Loiro',
  'Magra',
  '{"Segunda": {"start": "14:00", "end": "23:00"}, "Terça": {"start": "14:00", "end": "23:00"}, "Quarta": {"start": "14:00", "end": "23:00"}, "Quinta": {"start": "14:00", "end": "23:00"}, "Sexta": {"start": "14:00", "end": "23:00"}, "Sábado": {"start": "16:00", "end": "23:00"}}',
  true,
  false
);