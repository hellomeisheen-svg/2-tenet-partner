import { createFileRoute } from '@tanstack/react-router';
import { getAuthSession } from '../../../lib/auth.functions';
import { query } from '../../../lib/db.server';

export const Route = createFileRoute('/api/admin/content/')({
  server: {
    handlers: {
      GET: async () => {
        const session = await getAuthSession();
        if (!session) return new Response('Unauthorized', { status: 401 });

        const res = await query('SELECT * FROM content_blocks ORDER BY block_key ASC');
        return new Response(JSON.stringify(res.rows), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
  }
});
