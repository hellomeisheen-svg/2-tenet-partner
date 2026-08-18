import { 
  LayoutDashboard, 
  Monitor, 
  Award, 
  Gift, 
  BadgePercent, 
  Camera, 
  ShieldCheck, 
  FileEdit, 
  MapPin, 
  FileText, 
  Scale, 
  Search, 
  Image as ImageIcon,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { TenetLogo } from '../Logo';
import { cn } from '@/lib/utils';

const MENU_ITEMS = [
  { label: 'Обзор', icon: LayoutDashboard, to: '/admin' },
  { label: 'Первый экран', icon: Monitor, to: '/admin/hero' },
  { label: 'Привилегии', icon: Award, to: '/admin/privileges' },
  { label: 'Выбор бонуса', icon: Gift, to: '/admin/bonuses' },
  { label: 'Сертификат на сервис', icon: BadgePercent, to: '/admin/service-certificate' },
  { label: 'Истории клиентов', icon: Camera, to: '/admin/moments' },
  { label: 'Почему выбирают нас', icon: ShieldCheck, to: '/admin/trust' },
  { label: 'Форма заявки', icon: FileEdit, to: '/admin/lead-form' },
  { label: 'Контакты', icon: MapPin, to: '/admin/contacts' },
  { label: 'Политика конфед.', icon: FileText, to: '/admin/privacy-policy' },
  { label: 'Условия акции', icon: Scale, to: '/admin/promotion-terms' },
  { label: 'SEO', icon: Search, to: '/admin/seo' },
  { label: 'Медиафайлы', icon: ImageIcon, to: '/admin/media' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#1a1716] border-r border-white/5 flex flex-col h-screen sticky top-0">
      <div className="p-8 border-b border-white/5">
        <TenetLogo inverted className="h-4 w-auto" />
        <div className="mt-2 text-[10px] text-beige uppercase tracking-[0.2em] font-heading">
          Восток Моторс CMS
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {MENU_ITEMS.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.to}
              to={item.to}
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
          className="w-full flex items-center gap-3 px-4 py-3 text-red/60 hover:text-red transition-colors text-sm font-heading tracking-widest uppercase"
        >
          <LogOut className="w-4 h-4" /> Выйти
        </Link>
      </div>
    </aside>
  );
}
