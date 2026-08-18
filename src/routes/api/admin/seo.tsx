import { createFileRoute } from '@tanstack/react-router';
import { getAuthSession } from '../../../lib/auth.functions';
import { query } from '../../../lib/db.server';

export const Route = createFileRoute('/api/admin/seo')({
  server: {
    handlers: {
      GET: async () => {
        const session = await getAuthSession();
        if (!session) return new Response('Unauthorized', { status: 401 });

        const res = await query('SELECT seo_title, seo_description, seo_og_title, seo_og_description, seo_og_image, seo_canonical_url FROM site_settings LIMIT 1');
        return new Response(JSON.stringify(res.rows[0] || {}), {
          headers: { 'Content-Type': 'application/json' }
        });
      },
      PUT: async ({ request }) => {
        const session = await getAuthSession();
        if (!session) return new Response('Unauthorized', { status: 401 });

        try {
          const body = await request.json();
          const { seo_title, seo_description, seo_og_title, seo_og_description, seo_og_image, seo_canonical_url } = body;

          await query(
            `UPDATE site_settings 
             SET seo_title = $1, seo_description = $2, seo_og_title = $3, 
                 seo_og_description = $4, seo_og_image = $5, seo_canonical_url = $6, 
                 updated_at = CURRENT_TIMESTAMP, updated_by = $7
             WHERE id = 1`,
            [seo_title, seo_description, seo_og_title, seo_og_description, seo_og_image, seo_canonical_url, session.userId]
          );

          return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: 'Ошибка при сохранении' }), { status: 500 });
        }
      }
    }
  }
});
