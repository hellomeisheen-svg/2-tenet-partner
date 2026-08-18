import { createFileRoute } from '@tanstack/react-router';
import { getAdminStats } from '../../lib/cms.server';
import { 
  FileText, 
  Layers, 
  Image as ImageIcon, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/')({
  loader: async () => {
    return await getAdminStats();
  },
  component: AdminDashboard,
});

function AdminDashboard() {
  const stats = Route.useLoaderData();

  const cards = [
    { label: 'Активные блоки', value: stats.blocksCount, icon: FileText, color: 'bg-blue-500', to: '/admin/content' },
    { label: 'Элементы списков', value: stats.itemsCount, icon: Layers, color: 'bg-indigo-500', to: '/admin/items' },
    { label: 'Медиафайлы', value: stats.mediaCount, icon: ImageIcon, color: 'bg-amber-500', to: '/admin/media' },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Добро пожаловать</h1>
        <p className="text-gray-500">Управляйте контентом вашего сайта из единой панели</p>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link 
            key={card.label}
            to={card.to}
            className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`${card.color} p-3 rounded-2xl text-white shadow-lg shadow-${card.color.split('-')[1]}-100`}>
                <card.icon className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600 transition-colors" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{card.value}</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity Mock/Placeholder */}
        <div className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">Последние изменения</h2>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              Обновлено {stats.lastUpdate ? new Date(stats.lastUpdate).toLocaleDateString('ru-RU') : 'недавно'}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
              <div>
                <p className="text-sm font-medium text-gray-900">Обновлен блок "Hero"</p>
                <p className="text-xs text-gray-500 mt-1">Сегодня в 14:20</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
              <div>
                <p className="text-sm font-medium text-gray-900">Добавлена новая карточка клиента</p>
                <p className="text-xs text-gray-500 mt-1">Вчера в 11:05</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips/Help */}
        <div className="bg-blue-600 p-8 rounded-[24px] shadow-xl text-white relative overflow-hidden">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-4">Нужна помощь?</h2>
              <p className="text-blue-100 text-sm leading-relaxed max-w-xs">
                Все изменения вступают в силу мгновенно после нажатия кнопки "Опубликовать". Вы всегда можете сохранить черновик.
              </p>
            </div>
            <a 
              href="/" 
              target="_blank"
              className="mt-8 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2 hover:bg-blue-50 transition-colors self-start"
            >
              Открыть предпросмотр
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          {/* Abstract blobs */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-50" />
          <div className="absolute -right-10 top-10 w-32 h-32 bg-white rounded-full blur-3xl opacity-10" />
        </div>
      </div>
    </div>
  );
}
