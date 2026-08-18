import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { TenetLogo } from '../../components/Logo';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/login')({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        toast.success('Успешный вход');
        navigate({ to: '/admin' });
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
