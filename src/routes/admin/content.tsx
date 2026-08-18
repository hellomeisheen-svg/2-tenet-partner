import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';

export const Route = createFileRoute('/admin/content')({
  component: () => (
    <AdminLayout title="Управление контентом">
      <div className="text-sm text-graphite/60">Здесь будут редакторы контента лендинга.</div>
    </AdminLayout>
  ),
});
