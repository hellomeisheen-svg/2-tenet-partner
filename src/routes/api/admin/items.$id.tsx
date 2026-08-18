import { createFileRoute } from '@tanstack/react-router';
import { getAuthSession } from '../../../lib/auth.functions';
import { query } from '../../../lib/db.server';

export const Route = createFileRoute('/api/admin/items/$id')({
  server: {
    handlers: {
      PUT: async ({ params, request }) => {
        const session = await getAuthSession();
        if (!session) return new Response('Unauthorized', { status: 401 });

        try {
          const { id } = params;
          const body = await request.json();
          const { title, subtitle, body: itemBody, image_url, image_alt, button_text, button_url, sort_order, is_published } = body;

          const res = await query(
            `UPDATE content_items 
             SET title = $1, subtitle = $2, body = $3, image_url = $4, image_alt = $5, 
                 button_text = $6, button_url = $7, sort_order = $8, is_published = $9, updated_at = CURRENT_TIMESTAMP, updated_by = $10
             WHERE id = $11 RETURNING *`,
            [title, subtitle, itemBody, image_url, image_alt, button_text, button_url, sort_order, is_published, session.userId, id]
          );

          if (res.rowCount === 0) {
            return new Response(JSON.stringify({ error: 'Элемент не найден' }), { status: 404 });
          }

          return new Response(JSON.stringify(res.rows[0]), {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: 'Ошибка при сохранении' }), { status: 500 });
        }
      },
      DELETE: async ({ params }) => {
        const session = await getAuthSession();
        if (!session) return new Response('Unauthorized', { status: 401 });

        try {
          const { id } = params;
          await query('DELETE FROM content_items WHERE id = $1', [id]);
          return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: 'Ошибка при удалении' }), { status: 500 });
        }
      }
    }
  }
});
