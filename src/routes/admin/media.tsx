import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { MediaLibrary } from '../../components/admin/MediaLibrary';

export const Route = createFileRoute('/admin/media')({
  component: () => (
    <AdminLayout title="Медиабиблиотека">
      <MediaLibrary />
    </AdminLayout>
  ),
});
