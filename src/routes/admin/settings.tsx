import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import { Shield, Loader2, Save, Key } from 'lucide-react';

export const Route = createFileRoute('/admin/settings')({
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/settings/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwords),
      });

      if (res.ok) {
        toast.success('Пароль успешно изменен');
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        const data = await res.json();
        toast.error(data.error || 'Ошибка при смене пароля');
      }
    } catch (err) {
      toast.error('Ошибка при смене пароля');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Настройки</h1>
        <p className="text-gray-500">Управление безопасностью и параметрами системы</p>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Key className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Смена пароля</h2>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Текущий пароль</label>
            <input
              type="password"
              required
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-shadow text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Новый пароль</label>
            <input
              type="password"
              required
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-shadow text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Подтвердите новый пароль</label>
            <input
              type="password"
              required
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-shadow text-sm"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Обновить пароль
            </button>
          </div>
        </form>
      </div>

      <div className="bg-amber-50 rounded-[24px] border border-amber-100 p-8 flex items-start gap-4">
        <div className="p-3 bg-white rounded-xl text-amber-600 shadow-sm">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-amber-900 mb-1">Совет по безопасности</h3>
          <p className="text-amber-800/70 text-sm leading-relaxed">
            Используйте надежный пароль, состоящий минимум из 8 символов, включая цифры и специальные знаки. Не сообщайте данные для входа посторонним лицам.
          </p>
        </div>
      </div>
    </div>
  );
}
