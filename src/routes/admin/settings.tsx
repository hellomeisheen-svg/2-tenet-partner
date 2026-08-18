import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';

export const Route = createFileRoute('/admin/settings')({
  component: () => (
    <AdminLayout title="Настройки">
      <div className="text-sm text-graphite/60">Общие настройки системы (вкладки в разработке).</div>
    </AdminLayout>
  ),
});
