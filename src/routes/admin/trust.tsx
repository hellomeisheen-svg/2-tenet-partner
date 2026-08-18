import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { TrustEditor } from '../../components/admin/TrustEditor';

export const Route = createFileRoute('/admin/trust')({
  component: () => (
    <AdminLayout title="Почему выбирают нас">
      <TrustEditor />
    </AdminLayout>
  ),
});
