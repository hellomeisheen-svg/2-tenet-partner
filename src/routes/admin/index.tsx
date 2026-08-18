import { createFileRoute, Link } from '@tanstack/react-router';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Search,
  Bell,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { TenetLogo } from '@/components/Logo';
import { useState } from 'react';

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
});

// Mock Data
const MOCK_LEADS = [
  { id: 1, name: 'Александр Иванов', phone: '+7 (900) 123-45-67', status: 'new', date: '2026-08-18 10:15', model: 'TENET T8' },
  { id: 2, name: 'Мария Петрова', phone: '+7 (911) 222-33-44', status: 'processed', date: '2026-08-17 18:30', model: 'TENET T7' },
  { id: 3, name: 'Константин С.', phone: '+7 (922) 555-66-77', status: 'new', date: '2026-08-17 15:45', model: 'TENET T8' },
  { id: 4, name: 'Елена Воронова', phone: '+7 (933) 888-99-00', status: 'rejected', date: '2026-08-16 12:00', model: 'TENET T7' },
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('leads');

  return (
    <div className="min-h-screen bg-[#1a1716] text-white flex font-body">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col">
        <div className="p-8 border-b border-white/5">
          <TenetLogo inverted className="h-4 w-auto" />
          <div className="mt-2 text-[10px] text-beige uppercase tracking-[0.2em] font-heading">Control Panel</div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-colors text-sm ${activeTab === 'dashboard' ? 'bg-white/5 text-white' : 'text-white/40 hover:text-white/60'}`}
          >
            <LayoutDashboard className="w-4 h-4" /> Дашборд
          </button>
          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-sm transition-colors text-sm ${activeTab === 'leads' ? 'bg-white/5 text-white' : 'text-white/40 hover:text-white/60'}`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4" /> Заявки
            </div>
            <span className="bg-red text-[10px] px-1.5 py-0.5 rounded-full">2</span>
          </button>
          <button 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-white/40 hover:text-white/60 transition-colors text-sm"
          >
            <FileText className="w-4 h-4" /> Контент
          </button>
          <button 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-white/40 hover:text-white/60 transition-colors text-sm"
          >
            <Settings className="w-4 h-4" /> Настройки
          </button>
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link to="/admin/login" className="w-full flex items-center gap-3 px-4 py-3 text-red/60 hover:text-red transition-colors text-sm">
            <LogOut className="w-4 h-4" /> Выйти
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-0 top-1/2 -translate-y-1/2 text-white/20" />
            <input 
              type="text" 
              placeholder="Поиск по заявкам..." 
              className="bg-transparent pl-8 pr-4 py-2 text-sm focus:outline-none placeholder:text-white/20"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-white/40 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/5">
              <div className="text-right">
                <div className="text-xs font-heading">Admin User</div>
                <div className="text-[10px] text-white/40">Администратор</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-beige/20 flex items-center justify-center text-xs">A</div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-display mb-2 uppercase tracking-wide">Заявки</h1>
              <p className="text-white/40 text-sm">Управление входящими обращениями с лендинга</p>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-xs uppercase tracking-widest transition-colors rounded-sm">Экспорт CSV</button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/5 p-6 rounded-sm border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-sm">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-green-400 font-heading">+12%</span>
              </div>
              <div className="text-2xl font-display mb-1">128</div>
              <div className="text-xs text-white/40 uppercase tracking-widest">Всего заявок</div>
            </div>
            <div className="bg-white/5 p-6 rounded-sm border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-red/10 text-red rounded-sm">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-display mb-1">2</div>
              <div className="text-xs text-white/40 uppercase tracking-widest">Новые сегодня</div>
            </div>
            <div className="bg-white/5 p-6 rounded-sm border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-green-500/10 text-green-400 rounded-sm">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-display mb-1">84%</div>
              <div className="text-xs text-white/40 uppercase tracking-widest">Конверсия</div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white/5 rounded-sm border border-white/5 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-heading">Клиент</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-heading">Модель</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-heading">Статус</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-heading">Дата</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-heading text-right">Действие</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_LEADS.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-5">
                      <div className="text-sm font-medium">{lead.name}</div>
                      <div className="text-xs text-white/30">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs text-white/60">{lead.model}</span>
                    </td>
                    <td className="px-6 py-5">
                      {lead.status === 'new' ? (
                        <span className="flex items-center gap-1.5 text-xs text-red">
                          <AlertCircle className="w-3 h-3" /> Новая
                        </span>
                      ) : lead.status === 'processed' ? (
                        <span className="flex items-center gap-1.5 text-xs text-green-400">
                          <CheckCircle2 className="w-3 h-3" /> Обработана
                        </span>
                      ) : (
                        <span className="text-xs text-white/20 underline decoration-white/10">Архив</span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs text-white/40">{lead.date}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 hover:bg-white/5 rounded-sm transition-colors text-white/40 hover:text-white">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
