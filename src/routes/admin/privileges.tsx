import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { PrivilegesEditor } from '../../components/admin/PrivilegesEditor';

export const Route = createFileRoute('/admin/privileges')({
  component: () => (
    <AdminLayout>
      <PrivilegesEditor />
    </AdminLayout>
  ),
});
