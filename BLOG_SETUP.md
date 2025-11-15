# Blog Setup Guide

## Step 1: Create Database Tables

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `agvvnagrviiymgniksce`
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy and paste the contents of `supabase/blog-schema.sql`
6. Click **Run** (or press Cmd/Ctrl + Enter)

This will create:
- `blog_categories` table
- `blog_posts` table
- `blog_post_categories` junction table
- `blog_post_images` table
- All necessary indexes and RLS policies
- Initial 3 categories (Prompts, Clarity, SEO & Analytics)

## Step 2: Create Storage Buckets

1. In Supabase Dashboard, go to **Storage** (left sidebar)
2. Click **New bucket**

### Create `blog-images` bucket:
- **Name**: `blog-images`
- **Public bucket**: ✅ Yes (check this)
- **File size limit**: 10 MB
- **Allowed MIME types**: `image/*`
- Click **Create bucket**

### Create `blog-pdfs` bucket:
- **Name**: `blog-pdfs`
- **Public bucket**: ❌ No (leave unchecked)
- **File size limit**: 50 MB
- **Allowed MIME types**: `application/pdf`
- Click **Create bucket**

## Step 3: Set Storage Policies

1. Go back to **SQL Editor**
2. Copy and paste the contents of `supabase/blog-storage-setup.sql`
3. Click **Run**

This will set up the storage policies so:
- Anyone can view blog images
- Public can upload/update/delete images and PDFs (since we're using password auth, not Supabase auth)

## Step 4: Verify Setup

After running the SQL scripts, verify:

1. **Tables exist**: Go to **Table Editor** → You should see:
   - `blog_categories` (with 3 rows)
   - `blog_posts` (empty)
   - `blog_post_categories` (empty)
   - `blog_post_images` (empty)

2. **Storage buckets exist**: Go to **Storage** → You should see:
   - `blog-images`
   - `blog-pdfs`

## Step 5: Test the Blog Admin

1. Restart your Next.js dev server (if running)
2. Go to `/blog/admin/login`
3. Enter your admin password (from `BLOG_ADMIN_PASSWORD` in `.env`)
4. Try creating a blog post

## Important Note

The blog system uses password-based authentication (not Supabase auth), so:
- The `blog_posts` table uses a system user ID instead of requiring Supabase auth
- The `author_id` column doesn't have a foreign key constraint to `auth.users`
- RLS policies allow `public` (not just `authenticated`) to insert/update/delete posts
- This allows the blog admin to work without Supabase authentication

## Troubleshooting

### "Empty error object" or "Full Supabase response: {}"
- **Cause**: Tables don't exist or RLS policies are blocking
- **Fix**: Run the SQL scripts from Step 1
- **Also check**: Make sure you've run the updated schema (the foreign key constraint has been removed)

### "Supabase not configured"
- **Cause**: Environment variables not set correctly
- **Fix**: Check your `.env` file has:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://agvvnagrviiymgniksce.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
  ```

### "Permission denied" or RLS errors / "Empty error object"
- **Cause**: RLS policies require authentication, but we're using password auth
- **Fix**: Run `supabase/update-rls-policies.sql` in SQL Editor to update policies to allow public access
- **Alternative**: If you already ran the schema, drop and recreate the policies, or run the update script

## Quick Check Commands

You can verify your setup by checking the console logs when creating a post. You should see:
- "Supabase URL check" with valid values
- "Attempting to insert post with data" with your post info
- "Insert result" showing `hasData: true` if successful

If you see `hasError: true` with an empty error object, the tables likely don't exist yet.

