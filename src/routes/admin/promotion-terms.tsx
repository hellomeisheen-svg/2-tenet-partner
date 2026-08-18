import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { LegalEditor } from '../../components/admin/LegalEditor';

export const Route = createFileRoute('/admin/promotion-terms')({
  component: () => (
    <AdminLayout>
      <LegalEditor type="terms" />
    </AdminLayout>
  ),
});
