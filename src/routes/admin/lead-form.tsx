import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { LeadFormEditor } from '../../components/admin/LeadFormEditor';

export const Route = createFileRoute('/admin/lead-form')({
  component: () => (
    <AdminLayout>
      <LeadFormEditor />
    </AdminLayout>
  ),
});
