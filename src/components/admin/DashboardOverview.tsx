import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Monitor, 
  Gift, 
  MapPin, 
  FileText,
  ArrowUpRight,
  Layout
} from 'lucide-react';
import { Link } from '@tanstack/react-router';

export function DashboardOverview() {
  return (
    <div className="flex-1 space-y-6 lg:space-y-10">
      <div className="animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display uppercase tracking-wider text-graphite-dark">Обзор</h1>
          <span className="w-fit px-2 py-0.5 bg-beige-dark/30 text-graphite/80 text-[8px] sm:text-[10px] uppercase tracking-widest font-heading rounded-sm border border-graphite/5">
            Прототип — Mock-данные
          </span>
        </div>
        <p className="text-graphite/60 text-xs sm:text-sm font-body">Управление лендингом «ТЕНЕТ для своих» дилерского центра «Восток Моторс»</p>
      </div>

      {/* Project Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard 
          icon={Layout} 
          label="Всего блоков" 
          value="12" 
          color="bg-graphite-dark"
        />
        <StatCard 
          icon={CheckCircle2} 
          label="Опубликовано" 
          value="10" 
          color="bg-green-600"
          trend="+2"
        />
        <StatCard 
          icon={Clock} 
          label="Черновики" 
          value="2" 
          color="bg-beige-dark"
        />
        <StatCard 
          icon={TrendingUp} 
          label="Обновлено" 
          value="Сегодня" 
          color="bg-red"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-[10px] sm:text-xs font-heading uppercase tracking-widest text-graphite/60 mb-4 lg:mb-6 flex items-center gap-3">
          Быстрые действия <div className="h-px flex-1 bg-graphite/10" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <QuickActionCard 
            title="Первый экран" 
            desc="Изменить заголовки и фон"
            to="/admin/hero"
            icon={Monitor}
          />
          <QuickActionCard 
            title="Бонусы" 
            desc="Редактировать спецпредложения"
            to="/admin/bonuses"
            icon={Gift}
          />
          <QuickActionCard 
            title="Контакты" 
            desc="Обновить адрес и телефоны"
            to="/admin/contacts"
            icon={MapPin}
          />
          <QuickActionCard 
            title="Юр. страницы" 
            desc="Проверить политику и условия"
            to="/admin/privacy-policy"
            icon={FileText}
          />
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-graphite-dark p-6 lg:p-8 rounded-sm text-white flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="relative z-10 text-center md:text-left">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-display uppercase tracking-widest mb-2">Проект готов к наполнению</h3>
          <p className="text-white/50 text-xs sm:text-sm max-w-xl leading-relaxed">
            Используйте боковое меню для навигации по разделам лендинга. Каждая страница содержит форму редактирования контента с предпросмотром изменений.
          </p>
        </div>
        <Link 
          to="/" 
          target="_blank"
          className="w-full md:w-auto relative z-10 px-6 lg:px-8 py-3 lg:py-4 bg-red hover:bg-red-dark text-white text-[10px] lg:text-[11px] font-heading uppercase tracking-[0.2em] transition-all rounded-sm flex items-center justify-center gap-3 group whitespace-nowrap"
        >
          Открыть сайт <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, trend }: any) {
  return (
    <div className="bg-graphite-dark p-6 rounded-sm shadow-xl border border-white/5 group hover:bg-black transition-colors duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-2.5 ${color} text-white rounded-sm shadow-lg ring-1 ring-white/10`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && <span className="text-[10px] text-green-400 font-heading bg-green-400/10 px-2 py-0.5 rounded-sm border border-green-400/20">{trend}</span>}
      </div>
      <div className="text-3xl font-display text-white mb-2">{value}</div>
      <div className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-heading group-hover:text-white/70 transition-colors">{label}</div>
    </div>
  );
}

function QuickActionCard({ title, desc, to, icon: Icon }: any) {
  return (
    <Link 
      to={to}
      className="group bg-white p-6 rounded-sm border border-graphite/5 shadow-sm hover:border-red/20 hover:shadow-md transition-all duration-300"
    >
      <div className="w-10 h-10 bg-beige-soft rounded-sm flex items-center justify-center text-graphite-dark mb-4 transition-colors group-hover:bg-red group-hover:text-white">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-display text-base uppercase tracking-widest text-graphite-dark mb-2 group-hover:text-red transition-colors">{title}</h3>
      <p className="text-xs text-graphite/60 leading-relaxed mb-6">{desc}</p>
      <div className="flex items-center gap-2 text-[10px] font-heading uppercase tracking-[0.2em] text-red group-hover:text-red-dark transition-colors">
        Перейти <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
