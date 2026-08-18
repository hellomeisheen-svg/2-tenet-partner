import { createFileRoute } from '@tanstack/react-router';
import { getAuthSession } from '../../../lib/auth.functions';
import { query } from '../../../lib/db.server';
import fs from 'fs/promises';
import path from 'path';

const UPLOADS_DIR = process.env['UPLOADS_DIR'] || path.join(process.cwd(), 'public', 'uploads');

export const Route = createFileRoute('/api/admin/media/$id')({
  server: {
    handlers: {
      DELETE: async ({ params }) => {
        const session = await getAuthSession();
        if (!session) return new Response('Unauthorized', { status: 401 });

        try {
          const { id } = params;
          
          // 1. Check if used in content
          const [blocks, items] = await Promise.all([
            query('SELECT count(*) FROM content_blocks WHERE image_url LIKE $1', [`%${id}%`]),
            query('SELECT count(*) FROM content_items WHERE image_url LIKE $1', [`%${id}%`]),
          ]);

          if (parseInt(blocks.rows[0].count) > 0 || parseInt(items.rows[0].count) > 0) {
            return new Response(JSON.stringify({ error: 'Файл используется в контенте и не может быть удален' }), { status: 400 });
          }

          // 2. Get filename
          const res = await query('SELECT filename FROM media WHERE id = $1', [id]);
          if (res.rowCount === 0) return new Response('Not found', { status: 404 });

          const { filename } = res.rows[0];
          const filePath = path.join(UPLOADS_DIR, filename);

          // 3. Delete from DB
          await query('DELETE FROM media WHERE id = $1', [id]);

          // 4. Delete from FS
          try {
            await fs.unlink(filePath);
          } catch (e) {
            console.error('Failed to delete file from FS', e);
          }

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
