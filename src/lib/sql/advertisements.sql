-- Create advertisements table
CREATE TABLE IF NOT EXISTS advertisements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT status_check CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Create advertisement_images table
CREATE TABLE IF NOT EXISTS advertisement_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  advertisement_id UUID REFERENCES advertisements(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_advertisement_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_advertisements_updated_at
    BEFORE UPDATE ON advertisements
    FOR EACH ROW
    EXECUTE FUNCTION update_advertisement_updated_at();

-- Create RLS policies
ALTER TABLE advertisements ENABLE ROW LEVEL SECURITY;
ALTER TABLE advertisement_images ENABLE ROW LEVEL SECURITY;

-- Policies for advertisements
CREATE POLICY "Users can view approved advertisements"
ON advertisements FOR SELECT
USING (status = 'approved' OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own advertisements"
ON advertisements FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own advertisements"
ON advertisements FOR UPDATE
USING (auth.uid() = user_id);

-- Policies for advertisement_images
CREATE POLICY "Users can view images of approved advertisements"
ON advertisement_images FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM advertisements
    WHERE id = advertisement_images.advertisement_id
    AND (status = 'approved' OR auth.uid() = user_id)
  )
);

CREATE POLICY "Users can insert images for their own advertisements"
ON advertisement_images FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM advertisements
    WHERE id = advertisement_images.advertisement_id
    AND auth.uid() = user_id
  )
);

CREATE POLICY "Users can delete their own advertisement images"
ON advertisement_images FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM advertisements
    WHERE id = advertisement_images.advertisement_id
    AND auth.uid() = user_id
  )
);