import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { MomentsEditor } from '../../components/admin/MomentsEditor';

export const Route = createFileRoute('/admin/moments')({
  component: () => (
    <AdminLayout title="Истории клиентов">
      <MomentsEditor />
    </AdminLayout>
  ),
});
