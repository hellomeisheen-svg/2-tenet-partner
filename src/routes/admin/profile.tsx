import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';

export const Route = createFileRoute('/admin/profile')({
  component: () => (
    <AdminLayout title="Профиль администратора">
      <div className="bg-white p-6 rounded-sm border border-graphite/5">
        <p className="text-sm text-graphite/60">Email: admin@tenet.ru</p>
        <p className="text-sm text-graphite/60 mt-2">Роль: Администратор</p>
      </div>
    </AdminLayout>
  ),
});
