import { createFileRoute, redirect } from '@tanstack/react-router';
import { getSession, verifyPassword, createSessionCookie, destroySessionCookie } from '../../lib/auth.server';
import { query } from '../../lib/db.server';
import { z } from 'zod';

import { getAuthSession } from '../../lib/auth.functions';

export const Route = createFileRoute('/admin/login')({
  component: AdminLoginPage,
  loader: async () => {
    const session = await getAuthSession();
    if (session) {
      throw redirect({ to: '/admin' });
    }
  },
});

// Using server handler for login logic
export const loginHandler = {
  POST: async ({ request }: { request: Request }) => {
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
};

// ... keep existing UI component but use the handler logic via fetch to this route's API or a separate server route
import { useState } from 'react';
import { TenetLogo } from '../../components/Logo';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In TanStack Start, we'd typically use a server function, 
      // but the user requested specific API paths.
      // I'll implement the API route separately to match the request.
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        toast.success('Успешный вход');
        // We'll use window.location for a full refresh to ensure session is picked up
        window.location.href = '/admin';
      } else {
        const data = await res.json();
        toast.error(data.error || 'Ошибка входа');
      }
    } catch (err) {
      toast.error('Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige-soft flex items-center justify-center p-6">
      <div className="w-full max-w-[440px]">
        <div className="bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-10 lg:p-12 border border-beige-dark/10">
          <div className="flex justify-center mb-10">
            <TenetLogo className="h-6 w-auto" />
          </div>

          <div className="text-center mb-10">
            <h1 className="text-graphite font-display font-black text-2xl mb-3">
              Панель управления
            </h1>
            <p className="text-graphite/40 font-body text-sm">
              Введите свои данные для входа в CMS
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-graphite/60 font-heading text-[11px] uppercase tracking-wider ml-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/30" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tenet.ru"
                  className="w-full bg-beige-soft/50 border border-beige-dark/20 rounded-[12px] py-3.5 pl-11 pr-4 font-body text-sm text-graphite placeholder:text-graphite/20 outline-none focus:border-red/30 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-graphite/60 font-heading text-[11px] uppercase tracking-wider ml-1">
                Пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/30" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-beige-soft/50 border border-beige-dark/20 rounded-[12px] py-3.5 pl-11 pr-4 font-body text-sm text-graphite placeholder:text-graphite/20 outline-none focus:border-red/30 transition-colors"
                />
              </div>
            </div>

            <button
              disabled={isLoading}
              className="w-full btn-primary group bg-red hover:bg-red-dark text-white py-4 rounded-[12px] font-heading text-sm tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-red/20 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Загрузка...' : 'Войти в панель'}
              {!isLoading && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-graphite/25 font-body text-xs">
          © 2026 TENET CMS. Все права защищены.
        </p>
      </div>
    </div>
  );
}
