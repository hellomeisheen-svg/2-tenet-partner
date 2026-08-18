import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { SEOEditor } from '../../components/admin/SEOEditor';

export const Route = createFileRoute('/admin/seo')({
  component: () => (
    <AdminLayout title="SEO">
      <SEOEditor />
    </AdminLayout>
  ),
});
