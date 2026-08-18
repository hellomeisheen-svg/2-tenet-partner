import { EditorWrapper, FormSection, InputField } from './EditorWrapper';
import { Plus, Trash2 } from 'lucide-react';

interface LegalEditorProps {
  type: 'privacy' | 'terms';
}

export function LegalEditor({ type }: LegalEditorProps) {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? "Политика конфиденциальности" : "Условия акции";
  const warning = isPrivacy 
    ? "Юридические формулировки нельзя изменять без проверки специалистом по персональным данным"
    : "Изменения условий акции должны быть согласованы с заказчиком и юридическим ответственным лицом";

  // Mock data representing what's in Privacy.tsx and Terms.tsx
  const privacyData = {
    heroTitle: "Политика конфиденциальности",
    heroDesc: "Настоящий документ определяет порядок обработки и защиты персональных данных пользователей сайта дилера «TENET Восток Моторс». Оставляя заявку через формы на сайте, пользователь подтверждает согласие с условиями настоящей Политики.",
    sections: [
      { num: "1", title: "Общие положения", items: "1.1 Настоящая Политика конфиденциальности...\n1.2 Политика разработана в соответствии...\n1.3 Используя сайт и оставляя заявку...\n1.4 В случае несогласия..." },
      { num: "2", title: "Термины и определения", items: "2.1 В Политике используются следующие термины:\n• «Персональные данные»...\n• «Обработка персональных данных»...\n• «Пользователь»...\n• «Сайт»..." },
      { num: "3", title: "Цели обработки персональных данных", items: "3.1 Оператор обрабатывает персональные данные пользователей в следующих целях:\n• обработка входящих заявок...\n• информирование о продуктах...\n• заключение и исполнение договоров...\n• выполнение обязательств...\n• улучшение качества обслуживания..." },
    ],
    disclaimerTitle: "Примечание",
    disclaimerText: "Настоящая Политика носит шаблонный характер и подлежит уточнению в соответствии с фактическими процессами обработки персональных данных Оператором и требованиями действующего законодательства Российской Федерации."
  };

  const termsData = {
    heroTitle: "Условия акции «TENET ДЛЯ СВОИХ»",
    heroDesc: "Условия участия в программе привилегий для участников закрытого клуба. Получите персональный бонус в размере 200 000 рублей или сервисный сертификат, предусмотренный условиями партнерского направления.",
    sections: [
      { num: "1", title: "Общие положения", items: "1.1 Акция «TENET ДЛЯ СВОИХ» проводится...\n1.2 Участником акции может быть физическое лицо...\n1.3 Организатором предложения...\n1.4 Участие в акции означает..." },
      { num: "2", title: "Срок действия акции", items: "2.1 Акция действует до 31 декабря 2026 года...\n2.2 Организатор вправе изменить сроки..." },
      { num: "3", title: "Суть предложения", items: "3.1 По условиям закрытого клуба...\n3.2 Участнику акции предоставляется право...\n3.3 Одновременное предоставление обоих вариантов..." },
    ],
    disclaimerTitle: "Дисклеймер",
    disclaimerText: "Указанная выгода предоставляется в виде прямой денежной скидки от дилера «TENET Восток Моторс» или комплекта дополнительного оборудования... Не является публичной офертой."
  };

  const data = isPrivacy ? privacyData : termsData;

  return (
    <EditorWrapper 
      title={title} 
      description={`Редактирование юридического документа «${title}»`}
    >
      <FormSection title="Вступление (Hero)" warning={warning}>
        <InputField 
          label="Заголовок документа" 
          value={data.heroTitle}
          fullWidth
        />
        <InputField 
          label="Описание (подзаголовок)" 
          value={data.heroDesc}
          type="textarea"
          fullWidth
        />
      </FormSection>

      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-sm uppercase tracking-widest text-graphite/40">Разделы документа</h3>
        <button className="px-4 py-2 bg-white border border-graphite/10 text-graphite/60 text-[10px] font-heading uppercase tracking-widest rounded-sm flex items-center gap-2 cursor-pointer hover:bg-beige-soft transition-colors">
          <Plus className="w-3.5 h-3.5" /> Добавить раздел
        </button>
      </div>

      <div className="space-y-6 mb-12">
        {data.sections.map((section, idx) => (
          <div key={idx} className="bg-white p-6 rounded-sm border border-graphite/5 shadow-sm group">
            <div className="flex items-center justify-between mb-6 border-b border-graphite/5 pb-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 bg-beige-soft flex items-center justify-center rounded-sm">
                  <span className="text-beige-dark font-display font-black text-xl">{section.num}</span>
                </div>
                <div className="flex-1">
                  <InputField label="Заголовок раздела" value={section.title} fullWidth />
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <button className="text-graphite/20 hover:text-red transition-colors cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <InputField 
              label="Содержание раздела (пункты и списки)" 
              type="textarea" 
              value={section.items} 
              fullWidth 
            />
          </div>
        ))}
      </div>

      <FormSection title="Нижний блок (Примечание / Дисклеймер)">
        <InputField 
          label="Заголовок блока" 
          value={data.disclaimerTitle}
        />
        <InputField 
          label="Текст примечания" 
          type="textarea"
          value={data.disclaimerText} 
          fullWidth 
        />
      </FormSection>

      {isPrivacy && (
        <FormSection title="Реквизиты оператора (скрыто в тексте)">
          <InputField label="Название организации" value="ООО «Восток Моторс»" />
          <InputField label="Email для обращений" value="privacy@vostok-motors.ru" />
        </FormSection>
      )}
    </EditorWrapper>
  );
}
