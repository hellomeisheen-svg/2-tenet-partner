import { Bell, Search, ExternalLink, User, Menu, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

interface AdminHeaderProps {
  title: string;
  onMenuClick?: () => void;
}

export function AdminHeader({ title, onMenuClick }: AdminHeaderProps) {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        {/* Search removed as per requirements */}

        <button 
          onClick={() => navigate({ to: '/admin/notifications' })}
          className="relative text-graphite/40 hover:text-red transition-colors cursor-pointer p-1"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red rounded-full border-2 border-white" />
        </button>

        <div 
          ref={profileRef}
          className="flex items-center gap-2 sm:gap-3 sm:pl-6 sm:border-l sm:border-graphite/5 relative"
        >
          <div className="text-right hidden sm:block">
            <div className="text-xs font-heading text-graphite-dark">Admin User</div>
            <div className="text-[10px] text-graphite/50 uppercase tracking-tighter">Администратор</div>
          </div>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={cn(
              "w-8 h-8 lg:w-9 lg:h-9 rounded-sm flex items-center justify-center text-xs font-heading shadow-sm cursor-pointer transition-all",
              isProfileOpen ? "bg-red text-white" : "bg-graphite-dark text-white hover:bg-graphite"
            )}
          >
            <User className="w-4 h-4" />
          </button>
          
          {/* User Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-graphite/10 shadow-2xl py-2 rounded-sm z-50 animate-in fade-in zoom-in-95 duration-200">
              <Link 
                to="/admin/profile" 
                onClick={() => setIsProfileOpen(false)}
                className="block px-4 py-3 text-xs font-heading hover:bg-beige-soft uppercase text-graphite transition-colors border-b border-graphite/5"
              >
                Профиль
              </Link>
              <Link 
                to="/admin/settings" 
                onClick={() => setIsProfileOpen(false)}
                className="block px-4 py-3 text-xs font-heading hover:bg-beige-soft uppercase text-graphite transition-colors border-b border-graphite/5"
              >
                Настройки
              </Link>
              <Link 
                to="/admin/login" 
                className="block px-4 py-3 text-xs font-heading hover:bg-red/5 uppercase text-red transition-colors"
              >
                Выйти
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
