import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import { useState } from 'react';
import { ArrowRight, Lock, Loader2 } from 'lucide-react';
import { TenetLogo } from '@/components/Logo';

export const Route = createFileRoute('/admin/login')({
  component: AdminLogin,
});

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email === 'admin@tenet.ru' && password === 'admin123') {
      navigate({ to: '/admin' });
    } else {
      setError('Неверный логин или пароль');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-graphite-dark flex items-center justify-center p-6 font-body">
      <div className="w-full max-w-md space-y-8 animate-fade-up">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <TenetLogo inverted className="h-6 w-auto" />
          </div>
          <h2 className="text-2xl font-display text-white mb-2 uppercase tracking-wider">
            Вход в систему
          </h2>
          <p className="text-white/40 text-sm">
            Введите учетные данные для доступа к панели управления
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 bg-white/5 p-8 rounded-sm border border-white/10 backdrop-blur-sm">
          {error && (
            <div className="bg-red/10 border border-red/20 text-red text-sm p-4 rounded-sm text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-beige">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-beige transition-colors"
              placeholder="admin@tenet.ru"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-beige">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-beige transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red hover:bg-red-dark text-white py-4 rounded-sm font-heading text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Войти
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <div className="text-center">
          <a href="/" className="text-white/20 hover:text-white/40 text-xs transition-colors">
            Вернуться на сайт
          </a>
        </div>
      </div>
    </div>
  );
}
