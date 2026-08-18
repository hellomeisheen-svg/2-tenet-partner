import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Users
} from 'lucide-react';

const MOCK_LEADS = [
  { id: 1, name: 'Александр Иванов', phone: '+7 (900) 123-45-67', status: 'new', date: '2026-08-18 10:15', model: 'TENET T8' },
  { id: 2, name: 'Мария Петрова', phone: '+7 (911) 222-33-44', status: 'processed', date: '2026-08-17 18:30', model: 'TENET T7' },
  { id: 3, name: 'Константин С.', phone: '+7 (922) 555-66-77', status: 'new', date: '2026-08-17 15:45', model: 'TENET T8' },
];

export const Route = createFileRoute('/admin/leads')({
  component: () => {
    const leads = MOCK_LEADS; // Simulate empty state if needed: []

    return (
      <AdminLayout title="Заявки">
        <div className="bg-white rounded-sm border border-graphite/5 shadow-sm overflow-hidden">
          {leads.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 bg-beige-soft rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-graphite/20" />
              </div>
              <h3 className="font-display text-lg uppercase tracking-widest text-graphite-dark mb-2">Заявок пока нет</h3>
              <p className="text-xs text-graphite/40 max-w-xs mx-auto">Все новые заявки с лендинга будут отображаться здесь автоматически.</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-graphite/5">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-graphite/40">Клиент</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-graphite/40">Модель</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-graphite/40">Статус</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-graphite/40 text-right">Действие</th>
              </tr>
            </thead>
            <tbody>
                {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-graphite/5 hover:bg-beige-soft transition-colors">
                  <td className="px-6 py-5">
                    <div className="font-heading text-sm">{lead.name}</div>
                    <div className="text-[10px] text-graphite/40">{lead.phone}</div>
                  </td>
                  <td className="px-6 py-5 text-sm font-body text-graphite/70">{lead.model}</td>
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
                    <button className="text-red font-heading text-[10px] uppercase underline cursor-pointer hover:text-red-dark">Открыть</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-graphite/10">
            {leads.map((lead) => (
            <div key={lead.id} className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-heading text-sm">{lead.name}</div>
                  <div className="text-xs text-graphite/60">{lead.phone}</div>
                </div>
                {lead.status === 'new' ? (
                  <span className="text-[10px] uppercase text-red font-heading bg-red/5 px-2 py-1 rounded-sm">Новая</span>
                ) : (
                  <span className="text-[10px] uppercase text-graphite/40 font-heading bg-graphite/5 px-2 py-1 rounded-sm">Обработана</span>
                )}
              </div>
              <div className="text-xs text-graphite/60 font-body">{lead.model}</div>
                <button className="w-full py-3 bg-graphite-dark text-[10px] font-heading uppercase tracking-[0.2em] text-white rounded-sm active:bg-red transition-colors shadow-md">
                  Открыть детали
                </button>
            </div>
          ))}
            </div>
          </>
          )}
        </div>
      </AdminLayout>
    );
  },
});
