import { createFileRoute } from '@tanstack/react-router';
import { getAuthSession } from '../../../lib/auth.functions';
import { query } from '../../../lib/db.server';
import { hashPassword, verifyPassword } from '../../../lib/auth.server';

export const Route = createFileRoute('/api/admin/settings/password')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const session = await getAuthSession();
        if (!session) return new Response('Unauthorized', { status: 401 });

        try {
          const { currentPassword, newPassword } = await request.json();

          // 1. Get current user
          const res = await query('SELECT password_hash FROM admin_users WHERE id = $1', [session.userId]);
          if (res.rowCount === 0) return new Response('Not found', { status: 404 });

          // 2. Verify current password
          const isValid = await verifyPassword(currentPassword, res.rows[0].password_hash);
          if (!isValid) {
            return new Response(JSON.stringify({ error: 'Неверный текущий пароль' }), { status: 400 });
          }

          // 3. Hash and save new password
          const newHash = await hashPassword(newPassword);
          await query('UPDATE admin_users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [newHash, session.userId]);

          return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: 'Ошибка сервера' }), { status: 500 });
        }
      }
    }
  }
});
