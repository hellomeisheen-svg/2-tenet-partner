import { Bell, Search, ExternalLink, User, Menu } from 'lucide-react';
import { Link, useNavigate } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

interface AdminHeaderProps {
  title: string;
  onMenuClick?: () => void;
}

export function AdminHeader({ title, onMenuClick }: AdminHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="h-16 lg:h-20 bg-white border-b border-graphite/5 flex items-center justify-between px-4 sm:px-6 lg:px-10 sticky top-0 z-40">
      <div className="flex items-center gap-2 sm:gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-graphite/60 hover:text-red transition-colors cursor-pointer"
          aria-label="Открыть меню"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <h1 className="text-sm sm:text-lg lg:text-xl font-display uppercase tracking-widest text-graphite-dark truncate max-w-[120px] sm:max-w-none">
          {title}
        </h1>
        
        <div className="hidden sm:block h-4 w-px bg-graphite/10" />
        
        <a 
          href="/" 
          target="_blank" 
          className="hidden sm:flex items-center gap-2 text-[10px] font-heading uppercase tracking-widest text-graphite/40 hover:text-red transition-colors cursor-pointer"
        >
          Сайт <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      
      <div className="flex items-center gap-3 sm:gap-6">
        <div className="relative hidden lg:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-graphite/20" />
          <input 
            type="text" 
            placeholder="Поиск..." 
            className="bg-beige-soft pl-10 pr-4 py-2 rounded-sm text-sm focus:outline-none border border-transparent focus:border-beige-dark/20 w-64 transition-all"
          />
        </div>

        <button 
          onClick={() => navigate({ to: '/admin/notifications' })}
          className="relative text-graphite/40 hover:text-red transition-colors cursor-pointer p-1"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red rounded-full border-2 border-white" />
        </button>

        <div className="flex items-center gap-2 sm:gap-3 sm:pl-6 sm:border-l sm:border-graphite/5 relative group">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-heading text-graphite-dark">Admin User</div>
            <div className="text-[10px] text-graphite/40 uppercase tracking-tighter">Администратор</div>
          </div>
          <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-sm bg-graphite-dark text-white flex items-center justify-center text-xs font-heading shadow-md cursor-pointer">
            <User className="w-4 h-4" />
          </div>
          
          {/* User Menu */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-graphite/5 shadow-xl py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all transform origin-top-right scale-95 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto z-50">
            <Link to="/admin/profile" className="block px-4 py-2 text-xs font-heading hover:bg-beige-soft uppercase text-graphite transition-colors">Профиль</Link>
            <Link to="/admin/settings" className="block px-4 py-2 text-xs font-heading hover:bg-beige-soft uppercase text-graphite transition-colors">Настройки</Link>
            <div className="h-px bg-graphite/5 my-1" />
            <Link to="/admin/login" className="block px-4 py-2 text-xs font-heading hover:bg-beige-soft uppercase text-red transition-colors">Выйти</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
