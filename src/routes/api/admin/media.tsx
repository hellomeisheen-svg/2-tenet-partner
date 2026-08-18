import { createFileRoute } from '@tanstack/react-router';
import { getAuthSession } from '../../../lib/auth.functions';
import { query } from '../../../lib/db.server';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const UPLOADS_DIR = process.env['UPLOADS_DIR'] || path.join(process.cwd(), 'public', 'uploads');

export const Route = createFileRoute('/api/admin/media')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const session = await getAuthSession();
        if (!session) return new Response('Unauthorized', { status: 401 });

        const res = await query('SELECT * FROM media ORDER BY created_at DESC');
        return new Response(JSON.stringify(res.rows), {
          headers: { 'Content-Type': 'application/json' }
        });
      },
      POST: async ({ request }) => {
        const session = await getAuthSession();
        if (!session) return new Response('Unauthorized', { status: 401 });

        try {
          const formData = await request.formData();
          const file = formData.get('file') as File;
          const altText = formData.get('alt_text') as string || '';

          if (!file) {
            return new Response(JSON.stringify({ error: 'Файл не найден' }), { status: 400 });
          }

          // Validate file type
          const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
          if (!allowedTypes.includes(file.type)) {
            return new Response(JSON.stringify({ error: 'Неподдерживаемый тип файла' }), { status: 400 });
          }

          // Validate size (5MB)
          if (file.size > 5 * 1024 * 1024) {
            return new Response(JSON.stringify({ error: 'Файл слишком большой (макс. 5MB)' }), { status: 400 });
          }

          const ext = path.extname(file.name) || '.png';
          const filename = `${uuidv4()}${ext}`;
          const filePath = path.join(UPLOADS_DIR, filename);

          // Ensure directory exists
          await fs.mkdir(UPLOADS_DIR, { recursive: true });

          const arrayBuffer = await file.arrayBuffer();
          await fs.writeFile(filePath, Buffer.from(arrayBuffer));

          const publicUrl = `/api/public/uploads/${filename}`;

          const res = await query(
            'INSERT INTO media (filename, public_url, alt_text, mime_type, size_bytes, uploaded_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [filename, publicUrl, altText, file.type, file.size, session.userId]
          );

          return new Response(JSON.stringify(res.rows[0]), {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (err) {
          console.error('Upload error', err);
          return new Response(JSON.stringify({ error: 'Ошибка при загрузке' }), { status: 500 });
        }
      }
    }
  }
});
