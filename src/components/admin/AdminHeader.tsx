import { Bell, Search, ExternalLink, User } from 'lucide-react';
import { Link, useNavigate } from '@tanstack/react-router';

interface AdminHeaderProps {
  title: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="h-20 bg-white border-b border-graphite/5 flex items-center justify-between px-10 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-display uppercase tracking-widest text-graphite-dark">{title}</h1>
        <div className="h-4 w-px bg-graphite/10" />
        <a 
          href="/" 
          target="_blank" 
          className="flex items-center gap-2 text-[10px] font-heading uppercase tracking-widest text-graphite/40 hover:text-red transition-colors cursor-pointer"
        >
          Открыть сайт <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-graphite/20" />
          <input 
            type="text" 
            placeholder="Поиск..." 
            className="bg-beige-soft pl-10 pr-4 py-2 rounded-sm text-sm focus:outline-none border border-transparent focus:border-beige-dark/20 w-64 transition-all"
          />
        </div>

        <button 
          onClick={() => navigate({ to: '/admin/notifications' })}
          className="relative text-graphite/40 hover:text-red transition-colors cursor-pointer"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red rounded-full border-2 border-white" />
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-graphite/5 relative group">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-heading text-graphite-dark">Admin User</div>
            <div className="text-[10px] text-graphite/40 uppercase tracking-tighter">Администратор</div>
          </div>
          <div className="w-9 h-9 rounded-sm bg-graphite-dark text-white flex items-center justify-center text-xs font-heading shadow-md cursor-pointer">
            <User className="w-4 h-4" />
          </div>
          
          {/* User Menu */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-graphite/5 shadow-xl py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
            <Link to="/admin/profile" className="block px-4 py-2 text-xs font-heading hover:bg-beige-soft uppercase text-graphite">Профиль</Link>
            <Link to="/admin/settings" className="block px-4 py-2 text-xs font-heading hover:bg-beige-soft uppercase text-graphite">Настройки</Link>
            <Link to="/admin/login" className="block px-4 py-2 text-xs font-heading hover:bg-beige-soft uppercase text-red">Выйти</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
