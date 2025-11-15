-- Verify Blog Setup
-- Run this in Supabase SQL Editor to check if everything is set up correctly

-- 1. Check if tables exist
SELECT 
  table_name,
  CASE WHEN table_name IN ('blog_categories', 'blog_posts', 'blog_post_categories', 'blog_post_images') 
    THEN '✅ EXISTS' 
    ELSE '❌ MISSING' 
  END as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('blog_categories', 'blog_posts', 'blog_post_categories', 'blog_post_images')
ORDER BY table_name;

-- 2. Check RLS policies on blog_posts
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'blog_posts'
ORDER BY policyname;

-- 3. Check if categories exist
SELECT id, slug, name_en, name_es FROM blog_categories ORDER BY order_index;

-- 4. Test insert (this should work if everything is set up)
-- Uncomment the line below to test:
-- INSERT INTO blog_posts (slug, locale, title, description, content, author_id, published) 
-- VALUES ('test-post', 'en', 'Test Post', 'This is a test', 'Test content', '00000000-0000-0000-0000-000000000000', false)
-- RETURNING id, slug, title;

