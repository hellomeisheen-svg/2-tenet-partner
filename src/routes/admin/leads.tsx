import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  CheckCircle2,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

const MOCK_LEADS = [
  { id: 1, name: 'Александр Иванов', phone: '+7 (900) 123-45-67', status: 'new', date: '2026-08-18 10:15', model: 'TENET T8' },
  { id: 2, name: 'Мария Петрова', phone: '+7 (911) 222-33-44', status: 'processed', date: '2026-08-17 18:30', model: 'TENET T7' },
  { id: 3, name: 'Константин С.', phone: '+7 (922) 555-66-77', status: 'new', date: '2026-08-17 15:45', model: 'TENET T8' },
];

export const Route = createFileRoute('/admin/leads')({
  component: () => (
    <AdminLayout title="Заявки">
      <div className="bg-white rounded-sm border border-graphite/5 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-graphite/5">
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-graphite/40">Клиент</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-graphite/40">Статус</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-graphite/40 text-right">Действие</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_LEADS.map((lead) => (
              <tr key={lead.id} className="border-b border-graphite/5">
                <td className="px-6 py-5">
                  <div className="font-heading text-sm">{lead.name}</div>
                  <div className="text-[10px] text-graphite/40">{lead.phone}</div>
                </td>
                <td className="px-6 py-5">
                  {lead.status === 'new' ? (
                    <span className="text-[10px] uppercase text-red font-heading flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Новая
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase text-graphite/40 font-heading flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Обработана
                    </span>
                  )}
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="text-red font-heading text-[10px] uppercase underline cursor-pointer">Открыть</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  ),
});
