import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Save, Eye, EyeOff, Loader2 } from 'lucide-react';

export const Route = createFileRoute('/admin/content')({
  component: AdminContentPage,
});

function AdminContentPage() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState<string | null>(null);

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    try {
      const res = await fetch('/api/admin/content');
      if (res.ok) {
        const data = await res.ok ? await res.json() : [];
        setBlocks(data);
      }
    } catch (err) {
      toast.error('Ошибка при загрузке блоков');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (block: any) => {
    setIsSaving(block.id);
    try {
      const res = await fetch(`/api/admin/content/${block.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(block),
      });
      if (res.ok) {
        toast.success('Блок сохранен');
        fetchBlocks();
      } else {
        toast.error('Ошибка при сохранении');
      }
    } catch (err) {
      toast.error('Ошибка при сохранении');
    } finally {
      setIsSaving(null);
    }
  };

  const updateBlock = (id: string, updates: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Страницы и блоки</h1>
        <p className="text-gray-500">Редактируйте основные текстовые и графические блоки лендинга</p>
      </div>

      <div className="space-y-8">
        {blocks.map((block) => (
          <div key={block.id} className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-[10px] font-bold uppercase tracking-widest">
                  {block.block_key}
                </span>
                <h2 className="text-lg font-bold text-gray-900">{block.title || 'Без названия'}</h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateBlock(block.id, { is_published: !block.is_published })}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    block.is_published ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"
                  )}
                  title={block.is_published ? "Опубликовано" : "Черновик"}
                >
                  {block.is_published ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => handleSave(block)}
                  disabled={isSaving === block.id}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSaving === block.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Сохранить
                </button>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Заголовок</label>
                  <input
                    type="text"
                    value={block.title || ''}
                    onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Подзаголовок</label>
                  <input
                    type="text"
                    value={block.subtitle || ''}
                    onChange={(e) => updateBlock(block.id, { subtitle: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Основной текст</label>
                  <textarea
                    rows={4}
                    value={block.body || ''}
                    onChange={(e) => updateBlock(block.id, { body: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Текст кнопки</label>
                    <input
                      type="text"
                      value={block.button_text || ''}
                      onChange={(e) => updateBlock(block.id, { button_text: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">URL кнопки</label>
                    <input
                      type="text"
                      value={block.button_url || ''}
                      onChange={(e) => updateBlock(block.id, { button_url: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">URL изображения</label>
                  <input
                    type="text"
                    value={block.image_url || ''}
                    onChange={(e) => updateBlock(block.id, { image_url: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Alt-текст изображения</label>
                  <input
                    type="text"
                    value={block.image_alt || ''}
                    onChange={(e) => updateBlock(block.id, { image_alt: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { cn } from '../../lib/utils';
