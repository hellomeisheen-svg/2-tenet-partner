import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { HeroEditor } from '../../components/admin/HeroEditor';

export const Route = createFileRoute('/admin/hero')({
  component: () => (
    <AdminLayout>
      <HeroEditor />
    </AdminLayout>
  ),
});
