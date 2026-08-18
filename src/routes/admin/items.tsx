import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Plus, Trash2, Edit2, Loader2, Image as ImageIcon, Check, X } from 'lucide-react';

export const Route = createFileRoute('/admin/items')({
  component: AdminItemsPage,
});

function AdminItemsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/items');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      toast.error('Ошибка при загрузке элементов');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const url = editingItem.id ? `/api/admin/items/${editingItem.id}` : '/api/admin/items';
      const method = editingItem.id ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      if (res.ok) {
        toast.success('Сохранено');
        setEditingItem(null);
        fetchItems();
      } else {
        toast.error('Ошибка при сохранении');
      }
    } catch (err) {
      toast.error('Ошибка при сохранении');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены?')) return;
    try {
      const res = await fetch(`/api/admin/items/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Удалено');
        fetchItems();
      }
    } catch (err) {
      toast.error('Ошибка при удалении');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const types = [
    { value: 'benefit', label: 'Преимущество' },
    { value: 'client', label: 'Счастливый клиент' },
    { value: 'trust', label: 'Логотип доверия' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Повторяющиеся элементы</h1>
          <p className="text-gray-500">Управление отзывами, преимуществами и логотипами</p>
        </div>
        <button
          onClick={() => setEditingItem({ type: 'benefit', title: '', content: '', sort_order: 0 })}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Добавить элемент
        </button>
      </div>

      <div className="grid gap-6">
        {types.map(type => {
          const typeItems = items.filter(i => i.type === type.value);
          return (
            <div key={type.value} className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-2">{type.label}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {typeItems.map(item => (
                  <div key={item.id} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        {item.image_url ? (
                          <img src={item.image_url} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-50" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-gray-300">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-gray-900 line-clamp-1">{item.title || 'Без заголовка'}</h3>
                          <p className="text-xs text-gray-400">Порядок: {item.sort_order}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4">{item.content || item.subtitle || ''}</p>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-3 h-3" /> Изменить
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {editingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <form onSubmit={handleSave} className="flex flex-col max-h-[90vh]">
              <div className="p-8 border-b flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingItem.id ? 'Редактировать' : 'Создать'} элемент
                </h2>
                <button type="button" onClick={() => setEditingItem(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="p-8 space-y-6 overflow-y-auto">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Тип</label>
                    <select
                      value={editingItem.type}
                      onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                      className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      {types.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Порядок сортировки</label>
                    <input
                      type="number"
                      value={editingItem.sort_order}
                      onChange={(e) => setEditingItem({ ...editingItem, sort_order: parseInt(e.target.value) })}
                      className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Заголовок / Имя</label>
                  <input
                    type="text"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {editingItem.type === 'client' && (
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Подзаголовок (Город / Модель)</label>
                    <input
                      type="text"
                      value={editingItem.subtitle || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                      className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Контент / Текст отзыва</label>
                  <textarea
                    value={editingItem.content || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 text-sm min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">URL Изображения</label>
                  <input
                    type="text"
                    value={editingItem.image_url || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, image_url: e.target.value })}
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="/uploads/filename.jpg"
                  />
                </div>
              </div>

              <div className="p-8 border-t flex gap-4">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-[2] bg-blue-600 text-white px-6 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
