-- CMS Migration SQL

-- 1. Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Site Settings (Global)
CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    site_name TEXT DEFAULT 'TENET',
    phone TEXT,
    email TEXT,
    address TEXT,
    social_links JSONB DEFAULT '{}',
    seo_title TEXT,
    seo_description TEXT,
    seo_og_title TEXT,
    seo_og_description TEXT,
    seo_og_image TEXT,
    seo_canonical_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES admin_users(id)
);

-- 3. Content Blocks (Single sections)
CREATE TABLE IF NOT EXISTS content_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    block_key TEXT UNIQUE NOT NULL,
    title TEXT,
    subtitle TEXT,
    body TEXT,
    button_text TEXT,
    button_url TEXT,
    image_url TEXT,
    image_alt TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES admin_users(id)
);

-- 4. Content Items (Repeating elements)
CREATE TABLE IF NOT EXISTS content_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section TEXT NOT NULL, -- e.g., 'benefits', 'happy_clients'
    title TEXT,
    subtitle TEXT,
    body TEXT,
    image_url TEXT,
    image_alt TEXT,
    button_text TEXT,
    button_url TEXT,
    sort_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES admin_users(id)
);

-- 5. Media
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename TEXT NOT NULL,
    public_url TEXT NOT NULL,
    alt_text TEXT,
    mime_type TEXT,
    size_bytes BIGINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    uploaded_by UUID REFERENCES admin_users(id)
);

-- 6. Audit Log
CREATE TABLE IF NOT EXISTS audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_user_id UUID REFERENCES admin_users(id),
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Initial site settings row
INSERT INTO site_settings (id, site_name) VALUES (1, 'TENET') ON CONFLICT (id) DO NOTHING;
