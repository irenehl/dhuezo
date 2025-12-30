-- Extension to blog schema for Stage section support
-- Run this in Supabase SQL Editor after blog-schema.sql

-- Add Stage-specific columns to blog_posts table
ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS stage_type TEXT CHECK (stage_type IN ('talk', 'article', 'slide')),
  ADD COLUMN IF NOT EXISTS event_location TEXT,
  ADD COLUMN IF NOT EXISTS event_date TEXT,
  ADD COLUMN IF NOT EXISTS cta_label TEXT,
  ADD COLUMN IF NOT EXISTS cta_url TEXT;

-- Create index for stage_type for faster queries
CREATE INDEX IF NOT EXISTS blog_posts_stage_type_idx ON blog_posts(stage_type) WHERE stage_type IS NOT NULL;

-- Create index for event_date for sorting
CREATE INDEX IF NOT EXISTS blog_posts_event_date_idx ON blog_posts(event_date DESC) WHERE event_date IS NOT NULL;

