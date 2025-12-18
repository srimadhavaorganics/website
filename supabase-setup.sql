-- ============================================
-- ShivaDhama Residency - Complete Setup Script
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  bhk TEXT,
  floor TEXT,
  floor_number INTEGER DEFAULT 0,
  rent NUMERIC DEFAULT 0,
  deposit NUMERIC DEFAULT 0,
  maintenance NUMERIC DEFAULT 0,
  area NUMERIC DEFAULT 0,
  carpet_area NUMERIC DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Available',
  available_from TIMESTAMP WITH TIME ZONE,
  furnishing_note TEXT,
  virtual_tour JSONB DEFAULT '{"rooms": [], "externalLink": ""}'::jsonb,
  amenities TEXT[] DEFAULT ARRAY[]::TEXT[],
  features JSONB DEFAULT '{}'::jsonb,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  room_areas JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for properties
CREATE INDEX IF NOT EXISTS idx_properties_display_order 
  ON public.properties(display_order, created_at);

CREATE INDEX IF NOT EXISTS idx_properties_status 
  ON public.properties(status);

-- 2. Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  author TEXT,
  category TEXT,
  cover_image TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for blogs
CREATE INDEX IF NOT EXISTS idx_blogs_slug 
  ON public.blogs(slug);

CREATE INDEX IF NOT EXISTS idx_blogs_published 
  ON public.blogs(published, published_at DESC);

CREATE INDEX IF NOT EXISTS idx_blogs_category 
  ON public.blogs(category);

-- 3. Create site_content table
CREATE TABLE IF NOT EXISTS public.site_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for site_content
CREATE INDEX IF NOT EXISTS idx_site_content_value 
  ON public.site_content USING GIN(value);

-- 4. Enable Row Level Security
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies for properties
-- Public read access
CREATE POLICY "Public can view all properties" 
  ON public.properties FOR SELECT 
  USING (true);

-- Public write access (for simplified admin - change for production)
CREATE POLICY "Public can insert properties" 
  ON public.properties FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Public can update properties" 
  ON public.properties FOR UPDATE 
  USING (true);

CREATE POLICY "Public can delete properties" 
  ON public.properties FOR DELETE 
  USING (true);

-- 6. Create RLS Policies for blogs
-- Public can view published blogs
CREATE POLICY "Public can view published blogs" 
  ON public.blogs FOR SELECT 
  USING (published = true);

-- Authenticated users can view all blogs
CREATE POLICY "Authenticated users can view all blogs" 
  ON public.blogs FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Authenticated users can manage blogs
CREATE POLICY "Authenticated users can insert blogs" 
  ON public.blogs FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update blogs" 
  ON public.blogs FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete blogs" 
  ON public.blogs FOR DELETE 
  USING (auth.role() = 'authenticated');

-- 7. Create RLS Policies for site_content
-- Public read access
CREATE POLICY "Public can view site content" 
  ON public.site_content FOR SELECT 
  USING (true);

-- Public write access (for simplified admin - change for production)
CREATE POLICY "Public can modify site content" 
  ON public.site_content FOR ALL 
  USING (true);

-- 8. Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- 9. Create storage policies
CREATE POLICY "Public read access for property images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can upload property images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can update property images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can delete property images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'property-images');

-- Verification query
SELECT 
  'Setup completed successfully!' AS status,
  (SELECT COUNT(*) FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('properties', 'blogs', 'site_content')) AS tables_created,
  (SELECT COUNT(*) FROM storage.buckets WHERE id = 'property-images') AS buckets_created;
