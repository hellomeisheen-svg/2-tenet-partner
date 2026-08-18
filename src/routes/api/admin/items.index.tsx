import { createFileRoute } from '@tanstack/react-router';
import { getAuthSession } from '../../../lib/auth.functions';
import { query } from '../../../lib/db.server';

export const Route = createFileRoute('/api/admin/items')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const session = await getAuthSession();
        if (!session) return new Response('Unauthorized', { status: 401 });

        const url = new URL(request.url);
        const section = url.searchParams.get('section');
        
        let sql = 'SELECT * FROM content_items';
        let params: any[] = [];
        
        if (section) {
          sql += ' WHERE section = $1';
          params.push(section);
        }
        
        sql += ' ORDER BY sort_order ASC, created_at DESC';
        
        const res = await query(sql, params);
        return new Response(JSON.stringify(res.rows), {
          headers: { 'Content-Type': 'application/json' }
        });
      },
      POST: async ({ request }) => {
        const session = await getAuthSession();
        if (!session) return new Response('Unauthorized', { status: 401 });

        try {
          const body = await request.json();
          const { section, title, subtitle, body: itemBody, image_url, image_alt, button_text, button_url, sort_order, is_published } = body;

          const res = await query(
            `INSERT INTO content_items 
             (section, title, subtitle, body, image_url, image_alt, button_text, button_url, sort_order, is_published, updated_by) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            [section, title, subtitle, itemBody, image_url, image_alt, button_text, button_url, sort_order || 0, is_published ?? true, session.userId]
          );

          return new Response(JSON.stringify(res.rows[0]), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: 'Ошибка при создании' }), { status: 500 });
        }
      }
    }
  }
});
