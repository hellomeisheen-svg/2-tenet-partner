import { createFileRoute } from '@tanstack/react-router';
import { query } from '../../../lib/db.server';
import { verifyPassword, createSessionCookie, destroySessionCookie } from '../../../lib/auth.server';

export const Route = createFileRoute('/api/admin/login')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { email, password } = await request.json();
          
          const res = await query('SELECT * FROM admin_users WHERE email = $1', [email]);
          const user = res.rows[0];

          if (!user || !(await verifyPassword(password, user.password_hash))) {
            return new Response(JSON.stringify({ error: 'Неверный email или пароль' }), { 
              status: 401,
              headers: { 'Content-Type': 'application/json' }
            });
          }

          const session = {
            userId: user.id,
            email: user.email,
            expires: Date.now() + 12 * 60 * 60 * 1000,
          };

          const cookie = createSessionCookie(session);

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Set-Cookie': cookie,
            },
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: 'Внутренняя ошибка сервера' }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    }
  }
});
