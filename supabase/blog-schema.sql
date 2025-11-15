-- Blog Feature Database Schema
-- Run this in Supabase SQL Editor

-- 1. Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_es TEXT NOT NULL,
  description_en TEXT,
  description_es TEXT,
  icon TEXT,
  color TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'es')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  pdf_url TEXT,
  pdf_preview_images TEXT[] DEFAULT '{}',
  author_id UUID NOT NULL,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(slug, locale)
);

-- 3. Create blog_post_categories junction table
CREATE TABLE IF NOT EXISTS blog_post_categories (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES blog_categories(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (post_id, category_id)
);

-- 4. Create blog_post_images table
CREATE TABLE IF NOT EXISTS blog_post_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  alt_text TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blog_categories (public read/write)
CREATE POLICY "Anyone can view categories"
  ON blog_categories FOR SELECT
  USING (true);

CREATE POLICY "Public can insert categories"
  ON blog_categories FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can update categories"
  ON blog_categories FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can delete categories"
  ON blog_categories FOR DELETE
  TO public
  USING (true);

-- RLS Policies for blog_posts (public read published, public write for blog admin)
-- Note: We're using password-based auth, not Supabase auth, so we allow public writes
CREATE POLICY "Anyone can view published posts"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Public can create posts"
  ON blog_posts FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can update posts"
  ON blog_posts FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can delete posts"
  ON blog_posts FOR DELETE
  TO public
  USING (true);

-- RLS Policies for blog_post_categories (public read/write)
CREATE POLICY "Anyone can view post categories"
  ON blog_post_categories FOR SELECT
  USING (true);

CREATE POLICY "Public can manage post categories"
  ON blog_post_categories FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- RLS Policies for blog_post_images (public read/write)
CREATE POLICY "Anyone can view post images"
  ON blog_post_images FOR SELECT
  USING (true);

CREATE POLICY "Public can insert post images"
  ON blog_post_images FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can update post images"
  ON blog_post_images FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can delete post images"
  ON blog_post_images FOR DELETE
  TO public
  USING (true);

-- Create indexes for performance
CREATE INDEX blog_posts_slug_locale_idx ON blog_posts(slug, locale);
CREATE INDEX blog_posts_published_idx ON blog_posts(published);
CREATE INDEX blog_posts_published_at_idx ON blog_posts(published_at DESC);
CREATE INDEX blog_posts_author_id_idx ON blog_posts(author_id);
CREATE INDEX blog_posts_locale_idx ON blog_posts(locale);
CREATE INDEX blog_post_categories_post_id_idx ON blog_post_categories(post_id);
CREATE INDEX blog_post_categories_category_id_idx ON blog_post_categories(category_id);
CREATE INDEX blog_post_images_post_id_idx ON blog_post_images(post_id);
CREATE INDEX blog_categories_order_index_idx ON blog_categories(order_index);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for blog_posts
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial 3 categories (topics)
INSERT INTO blog_categories (slug, name_en, name_es, description_en, description_es, color, order_index) VALUES
  (
    'prompts',
    'Prompts',
    'Prompts',
    'The art of making good prompts: How to communicate better with Artificial Intelligence.',
    'El arte de hacer buenos prompts: Cómo comunicarse mejor con la Inteligencia Artificial.',
    'orange',
    1
  ),
  (
    'clarity',
    'Clarity',
    'Clarity',
    'From intuition to insight: optimize with Clarity.',
    'De la intuición al insight: optimiza con Clarity.',
    'blue',
    2
  ),
  (
    'seo-analytics',
    'SEO, Analytics & AI Tools',
    'SEO, Analíticas y herramientas de IA',
    'From design to data-driven decisions.',
    'Del diseño a las decisiones basadas en datos.',
    'purple',
    3
  )
ON CONFLICT (slug) DO NOTHING;

