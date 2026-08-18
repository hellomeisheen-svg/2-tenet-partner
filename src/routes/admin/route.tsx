import { createFileRoute, redirect, Outlet, Link, useNavigate } from '@tanstack/react-router';
import { getSession } from '../../lib/auth.server';
import { TenetLogo } from '../../components/Logo';
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  Image as ImageIcon, 
  Search, 
  Settings, 
  LogOut,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin')({
  loader: async ({ request }) => {
    const session = getSession(request);
    if (!session) {
      throw redirect({ to: '/admin/login' });
    }
    return { session };
  },
  component: AdminLayout,
});

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      toast.success('Вы вышли из системы');
      window.location.href = '/admin/login';
    } catch (err) {
      toast.error('Ошибка при выходе');
    }
  };

  const navItems = [
    { label: 'Главная', icon: LayoutDashboard, to: '/admin' },
    { label: 'Страницы и блоки', icon: FileText, to: '/admin/content' },
    { label: 'Карточки', icon: Layers, to: '/admin/items' },
    { label: 'Медиафайлы', icon: ImageIcon, to: '/admin/media' },
    { label: 'SEO', icon: Search, to: '/admin/seo' },
    { label: 'Настройки', icon: Settings, to: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 lg:relative lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full lg:w-20"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo area */}
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
            <TenetLogo className={cn("h-4 w-auto transition-opacity", !isSidebarOpen && "lg:opacity-0")} />
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: 'bg-blue-50 text-blue-600' }}
                inactiveProps={{ className: 'text-gray-500 hover:bg-gray-50' }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group"
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className={cn("font-medium text-sm transition-opacity", !isSidebarOpen && "lg:opacity-0 lg:hidden")}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Footer actions */}
          <div className="p-3 border-t border-gray-100 space-y-1">
            <a 
              href="/" 
              target="_blank" 
              className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:bg-gray-50 rounded-xl transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              <span className={cn("font-medium text-sm", !isSidebarOpen && "lg:hidden")}>На сайт</span>
            </a>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className={cn("font-medium text-sm", !isSidebarOpen && "lg:hidden")}>Выйти</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
