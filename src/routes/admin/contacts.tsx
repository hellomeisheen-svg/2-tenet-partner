import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ContactsEditor } from '../../components/admin/ContactsEditor';

export const Route = createFileRoute('/admin/contacts')({
  component: () => (
    <AdminLayout>
      <ContactsEditor />
    </AdminLayout>
  ),
});
