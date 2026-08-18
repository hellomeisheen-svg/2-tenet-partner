import { createFileRoute } from '@tanstack/react-router';
import { getAuthSession } from '../../../lib/auth.functions';
import { query } from '../../../lib/db.server';

export const Route = createFileRoute('/api/admin/content/$id')({
  server: {
    handlers: {
      PUT: async ({ params, request }) => {
        const session = await getAuthSession();
        if (!session) return new Response('Unauthorized', { status: 401 });

        try {
          const { id } = params;
          const body = await request.json();
          const { title, subtitle, body: contentBody, button_text, button_url, image_url, image_alt, is_published } = body;

          const res = await query(
            `UPDATE content_blocks 
             SET title = $1, subtitle = $2, body = $3, button_text = $4, button_url = $5, 
                 image_url = $6, image_alt = $7, is_published = $8, updated_at = CURRENT_TIMESTAMP, updated_by = $9
             WHERE id = $10 RETURNING *`,
            [title, subtitle, contentBody, button_text, button_url, image_url, image_alt, is_published, session.userId, id]
          );

          if (res.rowCount === 0) {
            return new Response(JSON.stringify({ error: 'Блок не найден' }), { status: 404 });
          }

          // Log audit
          await query(
            'INSERT INTO audit_log (admin_user_id, action, entity_type, entity_id) VALUES ($1, $2, $3, $4)',
            [session.userId, 'UPDATE', 'content_block', id]
          );

          return new Response(JSON.stringify(res.rows[0]), {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: 'Ошибка при сохранении' }), { status: 500 });
        }
      }
    }
  }
});
