import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AlertCircle, CheckCircle2, Trash2 } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Новая заявка от Александра Иванова', status: 'new', type: 'info' },
  { id: 2, title: 'Заявка Марии Петровой обработана', status: 'read', type: 'info' },
  { id: 3, title: 'Необходимо проверить условия акции', status: 'new', type: 'alert' },
];

export const Route = createFileRoute('/admin/notifications')({
  component: () => (
    <AdminLayout title="Уведомления">
      <div className="space-y-2">
        {MOCK_NOTIFICATIONS.map(n => (
          <div key={n.id} className="bg-white p-4 border border-graphite/5 rounded-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              {n.type === 'alert' ? <AlertCircle className="w-4 h-4 text-red" /> : <CheckCircle2 className="w-4 h-4 text-graphite/20" />}
              <span className={`text-sm ${n.status === 'new' ? 'font-heading text-graphite' : 'text-graphite/40'}`}>{n.title}</span>
            </div>
            <button className="text-graphite/20 hover:text-red cursor-pointer"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </AdminLayout>
  ),
});
