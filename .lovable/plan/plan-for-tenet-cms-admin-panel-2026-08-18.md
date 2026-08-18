# Plan for TENET CMS (Admin Panel)

Implement a custom CMS within the existing TanStack Start project to manage landing page content, media, and SEO.

## User Review Required

> [!IMPORTANT]
> The requested implementation uses a local PostgreSQL database (`pg`) and local filesystem storage for media. While this is perfect for your Ubuntu/Timeweb production server, the current Lovable preview environment uses a serverless runtime where the local filesystem is ephemeral (resets on restart). 
> 
> I will proceed with the implementation exactly as requested. To test the CMS in the preview:
> 1. We will need a PostgreSQL database. Since you specified NOT to use the built-in Lovable Cloud (Supabase), I will set up the code to use `DATABASE_URL`.
> 2. For the preview to function, I'll provide a mock mode or use a temporary local DB if available, but for your production, you'll just need to provide the real `DATABASE_URL`.

## Technical Details

### 1. Database Schema
Create tables:
- `admin_users`: Authentication.
- `site_settings`: Global info (phone, social links, SEO).
- `content_blocks`: Main sections (Hero, Benefits, etc.).
- `content_items`: Repeating elements (Happy Clients cards, Benefit cards).
- `media`: Uploaded file registry.
- `audit_log`: Change history.

### 2. Backend Architecture (Server-only)
- **DB Client**: Centralized `pg` Pool helper in `src/lib/db.server.ts`.
- **Auth**: Session-based auth using cookies, Argon2/bcrypt for hashing, and middleware.
- **Media**: Upload handler in `src/routes/api/admin/media.ts` saving to `UPLOADS_DIR`.
- **Public API**: Dynamic content delivery for the landing page.

### 3. Admin UI (Russian Language)
- **Auth**: `/admin/login` page.
- **Layout**: Bento-style dashboard with sidebar navigation.
- **Modules**:
    - **Dashboard**: Stats and quick links.
    - **Content**: Forms for Hero, Project, Benefits sections.
    - **Cards**: Management of Happy Clients and other list items.
    - **Media**: Gallery with upload/delete functionality.
    - **SEO**: Meta tags and OG data management.
    - **Settings**: Contact info and site-wide parameters.

### 4. Integration
- Refactor `src/routes/index.tsx` to fetch data from the DB using a TanStack Router loader.
- Components will use the fetched data with fallbacks to current hardcoded values.

### 5. Deployment & CLI
- `npm run create:admin`: CLI to seed the first user.
- `.env.example`: Template for environment variables.
- `deploy.md`: Step-by-step instructions for Ubuntu/Timeweb.

## Implementation Steps

1. **Analysis**: Extract current content from components to use as initial data.
2. **Infrastructure**: Install `pg`, `bcryptjs`, `cookie`, `zod`. Create DB and Auth helpers.
3. **API Layer**: Implement all `/api/admin/*` handlers.
4. **Admin UI**: Build the login page and the main CMS dashboard.
5. **Content Forms**: Create specific forms for every landing section.
6. **Public Sync**: Connect the frontend to the new data source.
7. **Finalization**: Add CLI script, migration SQL, and documentation.
