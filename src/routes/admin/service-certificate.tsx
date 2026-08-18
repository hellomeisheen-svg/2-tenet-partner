import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ServiceCertificateEditor } from '../../components/admin/ServiceCertificateEditor';

export const Route = createFileRoute('/admin/service-certificate')({
  component: () => (
    <AdminLayout>
      <ServiceCertificateEditor />
    </AdminLayout>
  ),
});
