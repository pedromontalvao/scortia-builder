export interface CompanionProfile {
  id?: string;
  user_id: string;
  name?: string;
  description?: string;
  cep?: string;
  street?: string;
  state?: string;
  city?: string;
  neighborhood?: string;
  whatsapp?: string;
  services?: string[];
  ethnicity?: string;
  body_type?: string;
  hair_color?: string;
  breast_type?: string;
  height?: number;
  weight?: number;
  measurements?: string;
  availability?: Record<string, { start: string; end: string }>;
  is_published?: boolean;
  published_at?: string;
  updated_at?: string;
}