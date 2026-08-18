import {
  LayoutDashboard,
  Users,
  FileEdit,
  LogOut,
  ChevronRight,
  Settings,
  X,
} from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { TenetLogo } from '../Logo';
import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';

const MENU_ITEMS = [
  { label: 'Дашборд', icon: LayoutDashboard, to: '/admin' },
  { label: 'Заявки', icon: Users, to: '/admin/leads' },
  { label: 'Контент', icon: FileEdit, to: '/admin/content' },
  { label: 'Настройки', icon: Settings, to: '/admin/settings' },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1716] border-r border-white/5 flex flex-col h-screen transition-transform duration-300 lg:relative lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-6 lg:p-8 border-b border-white/5 flex items-center justify-between">
        <div>
          <TenetLogo inverted className="h-4 w-auto" />
          <div className="mt-2 text-[10px] text-beige uppercase tracking-[0.2em] font-heading">Control Panel</div>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-2 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {MENU_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.to) && (item.to !== '/admin' || location.pathname === '/admin');
          const Icon = item.icon;
          
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={cn(
                "group flex items-center justify-between px-4 py-3 rounded-sm transition-all duration-200 text-sm",
                isActive 
                  ? "bg-red text-white shadow-lg shadow-red/20" 
                  : "text-white/40 hover:text-white/70 hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("w-4 h-4 transition-colors", isActive ? "text-white" : "text-white/30 group-hover:text-white/50")} />
                <span className="font-heading tracking-wide">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-3 h-3 text-white/50" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <Link 
          to="/admin/login" 
          className="w-full flex items-center gap-3 px-4 py-3 text-red/60 hover:text-red transition-colors text-sm font-heading tracking-widest uppercase cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Выйти
        </Link>
      </div>
    </aside>
  );
}
