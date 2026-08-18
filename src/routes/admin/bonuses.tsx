import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { BonusesEditor } from '../../components/admin/BonusesEditor';

export const Route = createFileRoute('/admin/bonuses')({
  component: () => (
    <AdminLayout title="Выбор бонуса">
      <BonusesEditor />
    </AdminLayout>
  ),
});
