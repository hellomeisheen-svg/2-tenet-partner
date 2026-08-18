import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Save, Loader2, Globe, Search } from 'lucide-react';

export const Route = createFileRoute('/admin/seo')({
  component: AdminSeoPage,
});

function AdminSeoPage() {
  const [settings, setSettings] = useState({
    seo_title: '',
    seo_description: '',
    seo_og_title: '',
    seo_og_description: '',
    seo_og_image: '',
    seo_canonical_url: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/seo');
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (err) {
      toast.error('Ошибка при загрузке настроек');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        toast.success('Настройки SEO сохранены');
      } else {
        toast.error('Ошибка при сохранении');
      }
    } catch (err) {
      toast.error('Ошибка при сохранении');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SEO и мета-теги</h1>
        <p className="text-gray-500">Управляйте тем, как ваш сайт выглядит в поисковиках и соцсетях</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Google Preview */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-bold text-gray-900">Поисковая выдача (Google/Yandex)</h2>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <p className="text-[#1a0dab] text-xl mb-1 truncate">{settings.seo_title || 'Заголовок страницы'}</p>
            <p className="text-[#006621] text-sm mb-1 truncate">https://tenet-for-friends.ru › ...</p>
            <p className="text-[#545454] text-sm line-clamp-2">
              {settings.seo_description || 'Описание страницы, которое увидят пользователи в результатах поиска...'}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Meta Title</label>
              <input
                type="text"
                value={settings.seo_title}
                onChange={(e) => setSettings({ ...settings, seo_title: e.target.value })}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-shadow text-sm"
                placeholder="Напр: TENET для своих — Закрытый клуб"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Meta Description</label>
              <textarea
                value={settings.seo_description}
                onChange={(e) => setSettings({ ...settings, seo_description: e.target.value })}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-shadow text-sm min-h-[100px]"
                placeholder="Краткое описание страницы для поисковиков..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Canonical URL</label>
              <input
                type="text"
                value={settings.seo_canonical_url}
                onChange={(e) => setSettings({ ...settings, seo_canonical_url: e.target.value })}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-shadow text-sm"
                placeholder="https://tenet-for-friends.ru"
              />
            </div>
          </div>
        </div>

        {/* Social Sharing */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-bold text-gray-900">Социальные сети (OpenGraph)</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">OG Title</label>
              <input
                type="text"
                value={settings.seo_og_title}
                onChange={(e) => setSettings({ ...settings, seo_og_title: e.target.value })}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-shadow text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">OG Description</label>
              <textarea
                value={settings.seo_og_description}
                onChange={(e) => setSettings({ ...settings, seo_og_description: e.target.value })}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-shadow text-sm min-h-[100px]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">OG Image URL</label>
              <input
                type="text"
                value={settings.seo_og_image}
                onChange={(e) => setSettings({ ...settings, seo_og_image: e.target.value })}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-shadow text-sm"
                placeholder="/uploads/share-preview.jpg"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Сохранить настройки
          </button>
        </div>
      </form>
    </div>
  );
}
