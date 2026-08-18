import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-beige-soft text-graphite flex font-body">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title={title} />
        <main className="flex-1 p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
