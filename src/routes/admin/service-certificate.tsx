import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ServiceCertificateEditor } from '../../components/admin/ServiceCertificateEditor';

export const Route = createFileRoute('/admin/service-certificate')({
  component: () => (
    <AdminLayout title="Сертификат на сервис">
      <ServiceCertificateEditor />
    </AdminLayout>
  ),
});
