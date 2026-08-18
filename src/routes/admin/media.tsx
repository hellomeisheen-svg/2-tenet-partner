import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Upload, Trash2, Copy, Loader2, Image as ImageIcon } from 'lucide-react';

export const Route = createFileRoute('/admin/media')({
  component: AdminMediaPage,
});

function AdminMediaPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/admin/media');
      if (res.ok) {
        const data = await res.json();
        setMedia(data);
      }
    } catch (err) {
      toast.error('Ошибка при загрузке медиафайлов');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        toast.success('Файл загружен');
        fetchMedia();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Ошибка при загрузке');
      }
    } catch (err) {
      toast.error('Ошибка при загрузке');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот файл?')) return;

    try {
      const res = await fetch(`/api/admin/media/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast.success('Файл удален');
        fetchMedia();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Ошибка при удалении');
      }
    } catch (err) {
      toast.error('Ошибка при удалении');
    }
  };

  const copyUrl = (url: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success('Ссылка скопирована');
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Медиафайлы</h1>
          <p className="text-gray-500">Загружайте и управляйте изображениями для сайта</p>
        </div>
        <label className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50">
          {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          Загрузить файл
          <input type="file" className="hidden" onChange={handleUpload} disabled={isUploading} accept="image/*" />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {media.map((item) => (
          <div key={item.id} className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden group">
            <div className="aspect-square relative bg-gray-50">
              <img src={item.public_url} alt={item.alt_text} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => copyUrl(item.public_url)}
                  className="p-2 bg-white rounded-lg text-gray-700 hover:text-blue-600 transition-colors"
                  title="Копировать URL"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-white rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  title="Удалить"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs font-medium text-gray-500 truncate">{item.filename}</p>
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                {(item.size_bytes / 1024).toFixed(1)} KB • {item.mime_type.split('/')[1]}
              </p>
            </div>
          </div>
        ))}

        {media.length === 0 && (
          <div className="col-span-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-[24px] p-20 flex flex-col items-center justify-center text-gray-400">
            <ImageIcon className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-medium">Нет загруженных файлов</p>
          </div>
        )}
      </div>
    </div>
  );
}
