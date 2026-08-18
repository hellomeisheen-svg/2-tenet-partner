import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { AdminHeader } from './AdminHeader';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-beige-soft text-graphite flex font-body overflow-x-hidden">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-graphite-dark/60 z-40 lg:hidden backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 min-h-screen relative">
        <AdminHeader title={title} onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-10 w-full max-w-[100vw] overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
