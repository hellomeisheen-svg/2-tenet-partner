import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-beige-soft text-graphite flex font-body selection:bg-red/10 selection:text-red">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        {children}
      </main>
    </div>
  );
}
