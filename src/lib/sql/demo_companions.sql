-- Remove existing companions
DELETE FROM companions;

-- Insert new demo companions
INSERT INTO companions (
  id,
  name,
  description,
  state,
  city,
  neighborhood,
  whatsapp,
  services,
  service_for,
  service_locations,
  ethnicity,
  nationality,
  breast_type,
  hair_color,
  body_type,
  availability,
  is_verified,
  is_premium,
  created_at,
  price,
  rating,
  reviews
) VALUES 
(
  'comp-001',
  'Isabella Santos',
  'Olá! Sou uma acompanhante de luxo com experiência em proporcionar momentos únicos e inesquecíveis.',
  'São Paulo',
  'São Paulo',
  'Jardins',
  '11999999999',
  ARRAY['Massagem erótica', 'Massagem tântrica', 'Beijo francês', 'Oral', 'Anal'],
  ARRAY['Homens', 'Casais'],
  ARRAY['Hotel / Motel', 'Em casa'],
  'Latina',
  'Brasileira',
  'Seios Natural',
  'Cabelo Castanho',
  'Curvas',
  '{"Segunda": {"start": "10:00", "end": "22:00"}, "Terça": {"start": "10:00", "end": "22:00"}, "Quarta": {"start": "10:00", "end": "22:00"}, "Quinta": {"start": "10:00", "end": "22:00"}, "Sexta": {"start": "10:00", "end": "22:00"}, "Sábado": {"start": "12:00", "end": "20:00"}, "Domingo": {"start": "12:00", "end": "20:00"}}',
  true,
  true,
  NOW(),
  300,
  4.8,
  124
),
(
  'comp-002',
  'Julia Oliveira',
  'Acompanhante de alto nível, discreta e elegante. Atendimento personalizado para momentos especiais.',
  'Rio de Janeiro',
  'Rio de Janeiro',
  'Copacabana',
  '21999999999',
  ARRAY['Massagem erótica', 'Beijo francês', 'Tratamento de namorados', 'Oral'],
  ARRAY['Homens'],
  ARRAY['Hotel / Motel'],
  'Brasileiras',
  'Brasileira',
  'Com silicone',
  'Cabelo Loiro',
  'Magra',
  '{"Segunda": {"start": "14:00", "end": "23:00"}, "Terça": {"start": "14:00", "end": "23:00"}, "Quarta": {"start": "14:00", "end": "23:00"}, "Quinta": {"start": "14:00", "end": "23:00"}, "Sexta": {"start": "14:00", "end": "23:00"}, "Sábado": {"start": "16:00", "end": "23:00"}}',
  true,
  false,
  NOW(),
  250,
  4.5,
  89
);

-- Add companion photos
INSERT INTO companion_photos (companion_id, url, is_primary) VALUES
('comp-001', '/lovable-uploads/97d88f7a-34f8-450e-a9ac-f3c450dc1cfd.png', true),
('comp-002', '/lovable-uploads/97d88f7a-34f8-450e-a9ac-f3c450dc1cfd.png', true);