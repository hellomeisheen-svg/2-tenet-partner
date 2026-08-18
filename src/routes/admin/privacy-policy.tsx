import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { LegalEditor } from '../../components/admin/LegalEditor';

export const Route = createFileRoute('/admin/privacy-policy')({
  component: () => (
    <AdminLayout title="Политика конфиденциальности">
      <LegalEditor type="privacy" />
    </AdminLayout>
  ),
});
