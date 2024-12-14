-- Create companion_services table
CREATE TABLE IF NOT EXISTS companion_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE companion_services ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public services are viewable by everyone"
ON companion_services FOR SELECT
USING (true);

CREATE POLICY "Companions can manage their own services"
ON companion_services FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM companions
    WHERE id = companion_services.companion_id
    AND user_id = auth.uid()
  )
);

-- Create trigger for updated_at
CREATE TRIGGER update_companion_services_updated_at
    BEFORE UPDATE ON companion_services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();