-- Blog Storage Buckets Setup
-- Run this in Supabase SQL Editor after creating buckets in Storage UI

-- First, drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can view blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can view blog PDFs" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload blog PDFs" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update blog PDFs" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete blog PDFs" ON storage.objects;

-- Storage policies for blog-images bucket
-- (Create bucket 'blog-images' in Storage UI first: Public bucket, 10MB limit, image/* MIME types)

-- Allow anyone to view blog images
CREATE POLICY "Anyone can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Allow public uploads for blog images (since we're using password auth, not Supabase auth)
CREATE POLICY "Public can upload blog images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'blog-images');

-- Allow public updates for blog images
CREATE POLICY "Public can update blog images"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'blog-images');

-- Allow public deletes for blog images
CREATE POLICY "Public can delete blog images"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'blog-images');

-- Storage policies for blog-pdfs bucket
-- (Create bucket 'blog-pdfs' in Storage UI: Private bucket, 50MB limit, application/pdf MIME type)

-- Allow public to view blog PDFs (they'll need the URL)
CREATE POLICY "Public can view blog PDFs"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-pdfs');

-- Allow public uploads for blog PDFs (since we're using password auth, not Supabase auth)
CREATE POLICY "Public can upload blog PDFs"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'blog-pdfs');

-- Allow public updates for blog PDFs
CREATE POLICY "Public can update blog PDFs"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'blog-pdfs');

-- Allow public deletes for blog PDFs
CREATE POLICY "Public can delete blog PDFs"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'blog-pdfs');

