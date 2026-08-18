import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

const MOCK_LEADS = [
  { id: 1, name: 'Александр Иванов', phone: '+7 (900) 123-45-67', status: 'new', date: '2026-08-18 10:15', model: 'TENET T8' },
  { id: 2, name: 'Мария Петрова', phone: '+7 (911) 222-33-44', status: 'processed', date: '2026-08-17 18:30', model: 'TENET T7' },
];

export const Route = createFileRoute('/admin/')({
  component: () => (
    <AdminLayout title="Дашборд">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { title: 'Всего заявок', value: '128', icon: TrendingUp, color: 'blue' },
          { title: 'Новые сегодня', value: '2', icon: Clock, color: 'red' },
          { title: 'Конверсия', value: '84%', icon: CheckCircle2, color: 'green' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-sm border border-graphite/5 shadow-sm">
            <div className="text-2xl font-display mb-1">{stat.value}</div>
            <div className="text-[10px] text-graphite/40 uppercase tracking-widest">{stat.title}</div>
          </div>
        ))}
      </div>
    </AdminLayout>
  ),
});
