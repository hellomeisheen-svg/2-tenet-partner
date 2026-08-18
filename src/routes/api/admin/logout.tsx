import { createFileRoute } from '@tanstack/react-router';
import { destroySessionCookie } from '../../../lib/auth.server';

export const Route = createFileRoute('/api/admin/logout')({
  server: {
    handlers: {
      POST: async () => {
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': destroySessionCookie(),
          },
        });
      }
    }
  }
});
