import { EditorWrapper, FormSection, InputField } from './EditorWrapper';
import { AlertCircle, Plus, Trash2 } from 'lucide-react';

interface LegalEditorProps {
  type: 'privacy' | 'terms';
}

export function LegalEditor({ type }: LegalEditorProps) {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? "Политика конфиденциальности" : "Условия акции";
  const warning = isPrivacy 
    ? "Юридические формулировки нельзя изменять без проверки специалистом по персональным данным"
    : "Изменения условий акции должны быть согласованы с заказчиком и юридическим ответственным лицом";

  return (
    <EditorWrapper 
      title={title} 
      description={`Редактирование юридического документа «${title}»`}
    >
      <FormSection title="Основные сведения" warning={warning}>
        <InputField 
          label="Заголовок документа" 
          value={isPrivacy ? "Политика конфиденциальности" : "Условия акции «TENET ДЛЯ СВОИХ»"}
          fullWidth
        />
        <InputField 
          label="Дата последнего обновления" 
          value="18.08.2026"
        />
        {!isPrivacy && (
          <InputField 
            label="Период действия" 
            value="до 31.12.2026"
          />
        )}
      </FormSection>

      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-sm uppercase tracking-widest text-graphite/40">Разделы документа</h3>
        <button className="px-4 py-2 bg-white border border-graphite/10 text-graphite/60 text-[10px] font-heading uppercase tracking-widest rounded-sm flex items-center gap-2">
          <Plus className="w-3.5 h-3.5" /> Добавить раздел
        </button>
      </div>

      <div className="space-y-6">
        <LegalSection 
          num="1" 
          title="Общие положения" 
          content="Настоящий документ определяет порядок..." 
        />
        <LegalSection 
          num="2" 
          title={isPrivacy ? "Оператор данных" : "Срок действия"} 
          content="..." 
        />
        <LegalSection 
          num="3" 
          title={isPrivacy ? "Цели сбора" : "Суть предложения"} 
          content="..." 
        />
      </div>

      {isPrivacy && (
        <FormSection title="Данные оператора">
          <InputField label="Название организации" value="ООО «Восток Моторс»" />
          <InputField label="Email для обращений" value="privacy@vostok-motors.ru" />
          <InputField label="Адрес оператора" value="г. Тюмень, ул. Алебашевская, д. 11" fullWidth />
          <InputField label="URL сайта" value="first-screen-studio.lovable.app" />
        </FormSection>
      )}

      {!isPrivacy && (
        <FormSection title="Финальные примечания">
          <InputField label="Текст оферты" value="Не является публичной офертой" fullWidth />
        </FormSection>
      )}
    </EditorWrapper>
  );
}

function LegalSection({ num, title, content }: any) {
  return (
    <div className="bg-white p-6 rounded-sm border border-graphite/5 shadow-sm group">
      <div className="flex items-center justify-between mb-6 border-b border-graphite/5 pb-4">
        <div className="flex items-center gap-4">
          <span className="text-beige-dark font-display font-black text-xl">{num}</span>
          <InputField label="Заголовок раздела" value={title} />
        </div>
        <div className="flex items-center gap-3">
          <button className="text-graphite/20 hover:text-red transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <InputField label="Содержание раздела" type="textarea" value={content} fullWidth />
    </div>
  );
}
