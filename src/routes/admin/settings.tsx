import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useState } from 'react';
import { FormSection, InputField } from '../../components/admin/EditorWrapper';
import { 
  Settings, 
  MapPin, 
  Bell, 
  Search, 
  Lock,
  Save,
  RotateCcw
} from 'lucide-react';
import { toast } from 'sonner';

const TABS = [
  { id: 'general', label: 'Общие настройки', icon: Settings },
  { id: 'contacts', label: 'Контакты', icon: MapPin },
  { id: 'notifications', label: 'Уведомления', icon: Bell },
  { id: 'seo', label: 'SEO', icon: Search },
  { id: 'access', label: 'Доступ', icon: Lock },
];

export const Route = createFileRoute('/admin/settings')({
  component: SettingsManager,
});

function SettingsManager() {
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    toast.success('Настройки сохранены в прототипе');
  };

  const handleReset = () => {
    if (confirm('Вы уверены, что хотите сбросить изменения?')) {
      toast.info('Изменения сброшены');
    }
  };

  return (
    <AdminLayout title="Настройки">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Tab Sidebar */}
        <div className="w-full lg:w-64">
          <div className="flex flex-wrap lg:flex-col gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm text-[10px] sm:text-xs font-heading uppercase tracking-widest transition-all cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-red text-white shadow-md' 
                    : 'bg-white text-graphite/40 hover:text-graphite/60 hover:bg-beige-soft border border-graphite/5'
                }`}
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap lg:whitespace-normal">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <FormSection title="Брендинг">
                <InputField label="Название проекта" value="ТЕНЕТ для своих" fullWidth />
                <InputField label="Название дилерского центра" value="Восток Моторс" fullWidth />
                <InputField label="Логотип TENET" value="/assets/tenet-logo.svg" fullWidth />
                <InputField label="Логотип Восток Моторс" value="/assets/vm-logo.svg" fullWidth />
              </FormSection>
              <FormSection title="Системные настройки">
                <InputField label="Цвет акцента" value="#E31E24" />
                <InputField label="Часовой пояс" value="GMT+5 (Tashkent/Tyumen)" />
              </FormSection>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-6">
              <FormSection title="Контактная информация">
                <InputField label="Адрес" value="г. Тюмень, ул. Алебашевская, д. 11" fullWidth />
                <InputField label="Телефон" value="+7 3452 52 10 30" />
                <InputField label="Email" value="info@vostok-motors.ru" />
                <InputField label="Часы работы" value="Пн–Пт: 8:00 – 20:00" />
                <InputField label="Ссылка карты" value="https://yandex.ru/maps/..." fullWidth />
              </FormSection>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <FormSection title="Уведомления о новых заявках" warning="В прототипе реальные отправки не выполняются">
                <div className="md:col-span-2 flex items-center gap-3 mb-4">
                  <input type="checkbox" id="email-notif" defaultChecked className="w-4 h-4 accent-red" />
                  <label htmlFor="email-notif" className="text-xs text-graphite/60 font-body">Включить email-уведомления</label>
                </div>
                <InputField label="Email получателя" value="sales@vostok-motors.ru" fullWidth />
                <InputField label="Текст уведомления" type="textarea" value="Поступила новая заявка на сайте TENET. Проверьте панель управления." fullWidth />
                <div className="md:col-span-2 flex items-center gap-3 mt-4">
                  <input type="checkbox" id="browser-notif" className="w-4 h-4 accent-red" />
                  <label htmlFor="browser-notif" className="text-xs text-graphite/60 font-body">Включить уведомления в браузере</label>
                </div>
              </FormSection>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6">
              <FormSection title="Поисковая оптимизация">
                <InputField label="Title" value="TENET для своих — Официальный дилер" fullWidth />
                <InputField label="Description" type="textarea" value="Эксклюзивное предложение от Восток Моторс..." fullWidth />
                <InputField label="OG Title" value="TENET — Выгода до 200 000 ₽" fullWidth />
                <InputField label="OG Image" value="/assets/og-image.jpg" fullWidth />
              </FormSection>
            </div>
          )}

          {activeTab === 'access' && (
            <div className="space-y-6">
              <FormSection title="Учетная запись">
                <InputField label="Email администратора" value="admin@tenet.ru" disabled fullWidth />
                <InputField label="Роль" value="Администратор" disabled fullWidth />
                <div className="md:col-span-2 flex gap-4 pt-4 border-t border-graphite/5">
                  <button className="px-6 py-2 bg-beige-soft text-graphite/60 text-[10px] font-heading uppercase tracking-widest rounded-sm hover:bg-beige-dark/20 transition-all cursor-pointer">
                    Изменить пароль
                  </button>
                </div>
              </FormSection>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex items-center gap-4 pt-8 border-t border-graphite/10">
            <button 
              onClick={handleSave}
              className="px-8 py-3 bg-red text-white text-xs font-heading uppercase tracking-widest rounded-sm shadow-lg shadow-red/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Сохранить
            </button>
            <button 
              onClick={handleReset}
              className="px-8 py-3 bg-white text-graphite/40 text-xs font-heading uppercase tracking-widest rounded-sm hover:text-red transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Сбросить изменения
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
