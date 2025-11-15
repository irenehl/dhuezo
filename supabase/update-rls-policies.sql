-- Update RLS Policies for Blog Admin (Password Auth)
-- Run this in Supabase SQL Editor to fix RLS policies for password-based auth

-- Drop old policies that require authentication
DROP POLICY IF EXISTS "Authenticated users can create posts" ON blog_posts;
DROP POLICY IF EXISTS "Users can update their own posts" ON blog_posts;
DROP POLICY IF EXISTS "Users can delete their own posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can insert categories" ON blog_categories;
DROP POLICY IF EXISTS "Authenticated users can update categories" ON blog_categories;
DROP POLICY IF EXISTS "Authenticated users can delete categories" ON blog_categories;
DROP POLICY IF EXISTS "Authenticated users can manage post categories" ON blog_post_categories;
DROP POLICY IF EXISTS "Authenticated users can insert post images" ON blog_post_images;
DROP POLICY IF EXISTS "Authenticated users can update post images" ON blog_post_images;
DROP POLICY IF EXISTS "Authenticated users can delete post images" ON blog_post_images;

-- Create new policies that allow public access (for password-based auth)
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

CREATE POLICY "Public can manage post categories"
  ON blog_post_categories FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

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

-- Update the SELECT policy to remove auth.uid() check
DROP POLICY IF EXISTS "Anyone can view published posts" ON blog_posts;
CREATE POLICY "Anyone can view published posts"
  ON blog_posts FOR SELECT
  USING (published = true);

