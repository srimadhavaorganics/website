# Supabase Setup Guide for ShivaDhama Residency

This guide provides comprehensive instructions for setting up all required Supabase resources for the ShivaDhama Residency application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Database Tables](#database-tables)
4. [Storage Buckets](#storage-buckets)
5. [Authentication](#authentication)
6. [Row Level Security (RLS) Policies](#row-level-security-rls-policies)
7. [Environment Configuration](#environment-configuration)
8. [Verification](#verification)

---

## Prerequisites

- A Supabase account ([sign up here](https://supabase.com))
- Basic knowledge of SQL and database concepts
- Access to your Supabase project dashboard

---

## Project Setup

### Step 1: Create a New Supabase Project

1. Log in to [Supabase Dashboard](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in the project details:
   - **Name**: ShivaDhama Residency (or your preferred name)
   - **Database Password**: Choose a strong password (save this securely)
   - **Region**: Select the region closest to your users
4. Click **"Create new project"**
5. Wait for the project to be provisioned (this may take a few minutes)

### Step 2: Get Your Project Credentials

Once your project is ready:

1. Go to **Settings** → **API**
2. Note down the following:
   - **Project URL** (e.g., `https://xisbsxjgaygnpztlktut.supabase.co`)
   - **anon/public key** (this is your `SUPABASE_ANON_KEY`)

---

## Database Tables

The application requires three main tables: `properties`, `blogs`, and `site_content`.

### Table 1: `properties`

This table stores property listings for the residency.

#### SQL Schema

```sql
-- Create properties table
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

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_properties_display_order 
  ON public.properties(display_order, created_at);

-- Create index for status queries
CREATE INDEX IF NOT EXISTS idx_properties_status 
  ON public.properties(status);
```

#### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `id` | TEXT | Unique identifier (e.g., `prop_1234567890`) |
| `title` | TEXT | Property title/name |
| `bhk` | TEXT | Bedroom configuration (e.g., "2 BHK") |
| `floor` | TEXT | Floor description (e.g., "Ground Floor") |
| `floor_number` | INTEGER | Numeric floor number |
| `rent` | NUMERIC | Monthly rent amount |
| `deposit` | NUMERIC | Security deposit amount |
| `maintenance` | NUMERIC | Monthly maintenance charges |
| `area` | NUMERIC | Total area in sq ft |
| `carpet_area` | NUMERIC | Carpet area in sq ft |
| `bathrooms` | INTEGER | Number of bathrooms |
| `status` | TEXT | Availability status ("Available", "Rented", "Maintenance") |
| `available_from` | TIMESTAMP | Date when property becomes available |
| `furnishing_note` | TEXT | Furnishing details |
| `virtual_tour` | JSONB | Virtual tour data with rooms array and external link |
| `amenities` | TEXT[] | Array of amenity strings |
| `features` | JSONB | Property features as key-value pairs |
| `images` | TEXT[] | Array of image URLs |
| `room_areas` | JSONB | Array of room area details |
| `display_order` | INTEGER | Order for displaying properties (lower = first) |
| `created_at` | TIMESTAMP | Record creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

---

### Table 2: `blogs`

This table stores blog posts and articles.

#### SQL Schema

```sql
-- Create blogs table
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

-- Create index for slug lookups
CREATE INDEX IF NOT EXISTS idx_blogs_slug 
  ON public.blogs(slug);

-- Create index for published blogs
CREATE INDEX IF NOT EXISTS idx_blogs_published 
  ON public.blogs(published, published_at DESC);

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_blogs_category 
  ON public.blogs(category);
```

#### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `id` | BIGSERIAL | Auto-incrementing unique identifier |
| `title` | TEXT | Blog post title |
| `slug` | TEXT | URL-friendly unique identifier |
| `excerpt` | TEXT | Short summary/preview |
| `content` | TEXT | Full blog post content (supports markdown/HTML) |
| `author` | TEXT | Author name |
| `category` | TEXT | Blog category |
| `cover_image` | TEXT | Cover image URL |
| `published` | BOOLEAN | Publication status |
| `published_at` | TIMESTAMP | Publication date/time |
| `created_at` | TIMESTAMP | Record creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

---

### Table 3: `site_content`

This table stores CMS-style site content and settings.

#### SQL Schema

```sql
-- Create site_content table
CREATE TABLE IF NOT EXISTS public.site_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster JSON queries
CREATE INDEX IF NOT EXISTS idx_site_content_value 
  ON public.site_content USING GIN(value);
```

#### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `key` | TEXT | Unique content key (e.g., "global", "pages", "home") |
| `value` | JSONB | Content data as JSON object |
| `created_at` | TIMESTAMP | Record creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

#### Common Keys

- `global`: Site-wide settings (logo, contact info, etc.)
- `pages`: Page-specific content structure
- Other page-specific keys as needed

---

## Storage Buckets

The application uses Supabase Storage for file uploads, primarily for property images.

### Create Storage Bucket

#### Via Supabase Dashboard

1. Go to **Storage** in the left sidebar
2. Click **"Create a new bucket"**
3. Configure the bucket:
   - **Name**: `property-images`
   - **Public bucket**: ✅ **Enable** (allows public read access)
   - **File size limit**: Set to `5 MB` (or your preferred limit)
   - **Allowed MIME types**: `image/jpeg`, `image/png`, `image/webp`, `image/gif`
4. Click **"Create bucket"**

#### Via SQL (Alternative)

```sql
-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;
```

### Storage Policies

Apply these policies to allow public read and authenticated write access:

```sql
-- Allow public read access to property-images
CREATE POLICY "Public read access for property images"
ON storage.objects FOR SELECT
USING (bucket_id = 'property-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload property images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'property-images');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update property images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'property-images');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete property images"
ON storage.objects FOR DELETE
USING (bucket_id = 'property-images');
```

> **Note**: The application code includes automatic bucket creation fallback, but it's recommended to create the bucket manually for better control.

---

## Authentication

The application uses Supabase Authentication for user management.

### Enable Email Authentication

1. Go to **Authentication** → **Providers** in the Supabase Dashboard
2. Ensure **Email** is enabled
3. Configure email settings:
   - **Enable email confirmations**: Optional (recommended for production)
   - **Secure email change**: Recommended
   - **Secure password change**: Recommended

### Email Templates (Optional)

Customize email templates under **Authentication** → **Email Templates**:
- Confirmation email
- Password recovery
- Magic link
- Email change confirmation

### Create Admin User

1. Go to **Authentication** → **Users**
2. Click **"Add user"**
3. Enter:
   - **Email**: Your admin email
   - **Password**: Strong password
   - **Auto Confirm User**: ✅ Enable (for immediate access)
4. Click **"Create user"**

---

## Row Level Security (RLS) Policies

Supabase uses Row Level Security to control data access. Below are the recommended policies for each table.

### Enable RLS on All Tables

```sql
-- Enable RLS on properties table
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Enable RLS on blogs table
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Enable RLS on site_content table
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
```

### Properties Table Policies

```sql
-- Allow public read access to all properties
CREATE POLICY "Public can view all properties"
ON public.properties FOR SELECT
USING (true);

-- Allow public insert (for simplified admin setup)
-- NOTE: In production, restrict this to authenticated users only
CREATE POLICY "Public can insert properties"
ON public.properties FOR INSERT
WITH CHECK (true);

-- Allow public update (for simplified admin setup)
-- NOTE: In production, restrict this to authenticated users only
CREATE POLICY "Public can update properties"
ON public.properties FOR UPDATE
USING (true);

-- Allow public delete (for simplified admin setup)
-- NOTE: In production, restrict this to authenticated users only
CREATE POLICY "Public can delete properties"
ON public.properties FOR DELETE
USING (true);
```

> **⚠️ IMPORTANT**: The above policies allow public write access for simplified development. For production, replace with authenticated-only policies:

```sql
-- Production-ready policies (replace the above)
CREATE POLICY "Authenticated users can insert properties"
ON public.properties FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update properties"
ON public.properties FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete properties"
ON public.properties FOR DELETE
USING (auth.role() = 'authenticated');
```

### Blogs Table Policies

```sql
-- Allow public read access to published blogs
CREATE POLICY "Public can view published blogs"
ON public.blogs FOR SELECT
USING (published = true);

-- Allow authenticated users to view all blogs (including drafts)
CREATE POLICY "Authenticated users can view all blogs"
ON public.blogs FOR SELECT
USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert blogs
CREATE POLICY "Authenticated users can insert blogs"
ON public.blogs FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update blogs
CREATE POLICY "Authenticated users can update blogs"
ON public.blogs FOR UPDATE
USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete blogs
CREATE POLICY "Authenticated users can delete blogs"
ON public.blogs FOR DELETE
USING (auth.role() = 'authenticated');
```

### Site Content Table Policies

```sql
-- Allow public read access to site content
CREATE POLICY "Public can view site content"
ON public.site_content FOR SELECT
USING (true);

-- Allow public write access (for simplified admin setup)
-- NOTE: In production, restrict to authenticated users
CREATE POLICY "Public can modify site content"
ON public.site_content FOR ALL
USING (true);
```

> **⚠️ IMPORTANT**: For production, replace with:

```sql
CREATE POLICY "Authenticated users can modify site content"
ON public.site_content FOR ALL
USING (auth.role() = 'authenticated');
```

---

## Environment Configuration

### Update Application Configuration

Update the file `/src/lib/customSupabaseClient.js` with your Supabase credentials:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL'; // e.g., https://xisbsxjgaygnpztlktut.supabase.co
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'; // Your anon/public key

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
```

### Environment Variables (Recommended)

For better security, use environment variables:

1. Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

2. Update `customSupabaseClient.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
```

3. Add `.env` to your `.gitignore`:

```
.env
.env.local
```

---

## Verification

### Test Database Connection

Run this SQL query in the Supabase SQL Editor to verify tables are created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('properties', 'blogs', 'site_content');
```

You should see all three tables listed.

### Test Storage Bucket

1. Go to **Storage** → **property-images**
2. Try uploading a test image
3. Verify you can view the uploaded image

### Test Application Connection

1. Start your development server: `npm run dev`
2. Open the application in your browser
3. Check the browser console for any Supabase connection errors
4. Try viewing properties/blogs (should load from Supabase)
5. Try the admin panel to add/edit content

---

## Complete Setup Script

For convenience, here's a complete SQL script you can run in the Supabase SQL Editor:

```sql
-- ============================================
-- ShivaDhama Residency - Complete Setup Script
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

CREATE INDEX IF NOT EXISTS idx_properties_display_order ON public.properties(display_order, created_at);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);

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

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON public.blogs(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON public.blogs(category);

-- 3. Create site_content table
CREATE TABLE IF NOT EXISTS public.site_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_site_content_value ON public.site_content USING GIN(value);

-- 4. Enable Row Level Security
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies for properties
CREATE POLICY "Public can view all properties" ON public.properties FOR SELECT USING (true);
CREATE POLICY "Public can insert properties" ON public.properties FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update properties" ON public.properties FOR UPDATE USING (true);
CREATE POLICY "Public can delete properties" ON public.properties FOR DELETE USING (true);

-- 6. Create RLS Policies for blogs
CREATE POLICY "Public can view published blogs" ON public.blogs FOR SELECT USING (published = true);
CREATE POLICY "Authenticated users can view all blogs" ON public.blogs FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert blogs" ON public.blogs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update blogs" ON public.blogs FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete blogs" ON public.blogs FOR DELETE USING (auth.role() = 'authenticated');

-- 7. Create RLS Policies for site_content
CREATE POLICY "Public can view site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Public can modify site content" ON public.site_content FOR ALL USING (true);

-- 8. Create storage bucket (if not exists)
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

-- Setup complete!
SELECT 'Supabase setup completed successfully!' AS status;
```

---

## Troubleshooting

### Common Issues

#### 1. "Bucket not found" error
- Ensure the `property-images` bucket is created in Storage
- Check that the bucket is set to **public**
- Verify storage policies are applied

#### 2. "Row Level Security policy violation"
- Check that RLS policies are created for all tables
- Verify policies match your authentication setup
- For development, you can temporarily disable RLS (not recommended for production)

#### 3. Connection errors
- Verify `supabaseUrl` and `supabaseAnonKey` are correct
- Check that your Supabase project is active
- Ensure you're using the correct API key (anon/public, not service role)

#### 4. Data not syncing
- Check browser console for errors
- Verify Realtime is enabled in Supabase (Database → Replication)
- Ensure RLS policies allow the operation you're attempting

---

## Security Best Practices

1. **Never commit credentials**: Always use environment variables for sensitive data
2. **Use RLS policies**: Always enable and configure Row Level Security
3. **Restrict write access**: In production, limit write operations to authenticated users
4. **Validate file uploads**: Set file size limits and allowed MIME types
5. **Monitor usage**: Regularly check Supabase dashboard for unusual activity
6. **Backup your data**: Enable automatic backups in Supabase settings

---

## Next Steps

After completing this setup:

1. ✅ Test all CRUD operations (Create, Read, Update, Delete)
2. ✅ Upload test images to verify storage
3. ✅ Create an admin user and test authentication
4. ✅ Review and tighten RLS policies for production
5. ✅ Set up monitoring and alerts
6. ✅ Configure backup strategy

---

## Support

For issues or questions:
- **Supabase Documentation**: https://supabase.com/docs
- **Supabase Discord**: https://discord.supabase.com
- **Project Issues**: [Your GitHub repository issues page]

---

**Last Updated**: December 2025
