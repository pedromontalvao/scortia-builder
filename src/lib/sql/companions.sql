-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create companions table
CREATE TABLE IF NOT EXISTS companions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES auth.users(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  description TEXT,
  neighborhood VARCHAR(100),
  city VARCHAR(100),
  state VARCHAR(50),
  services TEXT[],
  ethnicity VARCHAR(50),
  body_type VARCHAR(50),
  hair_color VARCHAR(50),
  breast_type VARCHAR(50),
  height INTEGER,
  weight INTEGER,
  measurements VARCHAR(50),
  is_verified BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  price DECIMAL(10,2),
  rating DECIMAL(3,2),
  reviews INTEGER DEFAULT 0,
  service_areas TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create companion_photos table
CREATE TABLE IF NOT EXISTS companion_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create verification_requests table
CREATE TABLE IF NOT EXISTS verification_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
  selfie_url TEXT NOT NULL,
  id_url TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for companions table
CREATE TRIGGER update_companions_updated_at
    BEFORE UPDATE ON companions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for verification_requests table
CREATE TRIGGER update_verification_requests_updated_at
    BEFORE UPDATE ON verification_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create RLS policies
ALTER TABLE companions ENABLE ROW LEVEL SECURITY;
ALTER TABLE companion_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_requests ENABLE ROW LEVEL SECURITY;

-- Policies for companions table
CREATE POLICY "Public companions are viewable by everyone"
ON companions FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own companion profile"
ON companions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own companion profile"
ON companions FOR UPDATE
USING (auth.uid() = user_id);

-- Policies for companion_photos table
CREATE POLICY "Public photos are viewable by everyone"
ON companion_photos FOR SELECT
USING (true);

CREATE POLICY "Companions can insert their own photos"
ON companion_photos FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM companions
    WHERE id = companion_photos.companion_id
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Companions can delete their own photos"
ON companion_photos FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM companions
    WHERE id = companion_photos.companion_id
    AND user_id = auth.uid()
  )
);

-- Policies for verification_requests table
CREATE POLICY "Companions can view their own verification requests"
ON verification_requests FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM companions
    WHERE id = verification_requests.companion_id
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Companions can insert their own verification requests"
ON verification_requests FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM companions
    WHERE id = verification_requests.companion_id
    AND user_id = auth.uid()
  )
);