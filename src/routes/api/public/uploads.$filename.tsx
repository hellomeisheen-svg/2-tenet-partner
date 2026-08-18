import { createFileRoute } from '@tanstack/react-router';
import fs from 'fs/promises';
import path from 'path';

const UPLOADS_DIR = process.env['UPLOADS_DIR'] || path.join(process.cwd(), 'public', 'uploads');

export const Route = createFileRoute('/api/public/uploads/$filename')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { filename } = params;
        
        // Security check: ensure no path traversal
        if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
          return new Response('Forbidden', { status: 403 });
        }

        const filePath = path.join(UPLOADS_DIR, filename);

        try {
          const file = await fs.readFile(filePath);
          const ext = path.extname(filename).toLowerCase();
          
          let contentType = 'application/octet-stream';
          if (ext === '.png') contentType = 'image/png';
          else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
          else if (ext === '.webp') contentType = 'image/webp';
          else if (ext === '.svg') contentType = 'image/svg+xml';

          return new Response(file, {
            headers: {
              'Content-Type': contentType,
              'Cache-Control': 'public, max-age=31536000, immutable'
            }
          });
        } catch (err) {
          return new Response('Not Found', { status: 404 });
        }
      }
    }
  }
});
