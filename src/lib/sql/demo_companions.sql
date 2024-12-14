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
  ethnicity,
  hair_color,
  body_type,
  is_verified,
  is_premium,
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
  ARRAY['Massagem erótica', 'Massagem tântrica', 'Beijo francês'],
  'Latina',
  'Cabelo Castanho',
  'Curvas',
  true,
  true,
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
  ARRAY['Massagem erótica', 'Beijo francês', 'Tratamento de namorados'],
  'Brasileiras',
  'Cabelo Loiro',
  'Magra',
  true,
  false,
  250,
  4.5,
  89
);

-- Add companion photos
INSERT INTO companion_photos (companion_id, url, is_primary) VALUES
('comp-001', '/lovable-uploads/97d88f7a-34f8-450e-a9ac-f3c450dc1cfd.png', true),
('comp-002', '/lovable-uploads/97d88f7a-34f8-450e-a9ac-f3c450dc1cfd.png', true);