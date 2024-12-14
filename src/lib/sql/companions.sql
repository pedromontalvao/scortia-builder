-- Create the companions table with all required fields
CREATE TABLE IF NOT EXISTS companions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name VARCHAR NOT NULL,
  description TEXT,
  state VARCHAR,
  city VARCHAR,
  neighborhood VARCHAR,
  whatsapp VARCHAR,
  services TEXT[],
  service_for TEXT[],
  service_locations TEXT[],
  ethnicity VARCHAR,
  nationality VARCHAR,
  breast_type VARCHAR,
  hair_color VARCHAR,
  body_type VARCHAR,
  availability JSONB,
  is_verified BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  price INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  reviews INTEGER DEFAULT 0
);

-- Create RLS policies
ALTER TABLE companions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public companions are viewable by everyone"
  ON companions FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own companion profile"
  ON companions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own companion profile"
  ON companions FOR UPDATE
  USING (auth.uid() = user_id);

-- Create functions to get cities and neighborhoods
CREATE OR REPLACE FUNCTION get_cities_by_state(state_name TEXT)
RETURNS TABLE (city TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT l.city
  FROM locations l
  WHERE l.state = state_name
  ORDER BY l.city;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_neighborhoods_by_city(city_name TEXT)
RETURNS TABLE (neighborhood TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT l.neighborhood
  FROM locations l
  WHERE l.city = city_name
  ORDER BY l.neighborhood;
END;
$$ LANGUAGE plpgsql;