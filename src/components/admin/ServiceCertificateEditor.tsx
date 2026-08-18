import { EditorWrapper, FormSection, InputField } from './EditorWrapper';

export function ServiceCertificateEditor() {
  return (
    <EditorWrapper 
      title="Сертификат на сервис" 
      description="Настройка блока специального предложения на сервисное обслуживание"
    >
      <FormSection title="Контент блока">
        <InputField 
          label="Надзаголовок" 
          placeholder="Спецпредложение" 
          value="Спецпредложение"
        />
        <InputField 
          label="Заголовок" 
          placeholder="Сертификат на сервис 5%" 
          value="Сертификат на сервис 5%"
          fullWidth
        />
        <InputField 
          label="Описание" 
          type="textarea"
          placeholder="Описание сертификата..." 
          value="Каждый участник партнерской программы получает именной сертификат на обслуживание."
          fullWidth
        />
        <InputField 
          label="Текст кнопки" 
          placeholder="Получить сертификат" 
          value="Получить сертификат"
        />
        <InputField 
          label="Ссылка кнопки" 
          placeholder="#form" 
          value="#form"
        />
      </FormSection>

      <FormSection title="Параметры сертификата">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:col-span-2">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-heading text-graphite/60 mb-2">
              Процент скидки
            </label>
            <div className="relative">
              <input 
                type="number" 
                defaultValue={5}
                className="w-full bg-beige-soft border border-graphite/5 rounded-sm px-4 py-3 text-sm text-graphite focus:outline-none focus:border-red/20 transition-all pr-10"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-graphite/40 font-heading">%</span>
            </div>
          </div>
          <InputField 
            label="Срок действия" 
            placeholder="до 31.12.2026" 
            value="до 31.12.2026"
          />
        </div>
        <InputField 
          label="Условие суммирования" 
          placeholder="Суммируется с акциями дилера" 
          value="Суммируется с акциями дилера"
          fullWidth
        />
      </FormSection>

      <FormSection title="Визуал сертификата">
        <div className="md:col-span-2 space-y-4">
          <label className="block text-[10px] uppercase tracking-[0.2em] font-heading text-graphite/60">
            Изображение сертификата
          </label>
          <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
            <div className="w-full lg:w-64 aspect-[4/3] bg-beige-soft rounded-sm border border-graphite/5 overflow-hidden shadow-inner relative group shrink-0">
              <div className="absolute inset-0 flex items-center justify-center text-[10px] text-graphite/20 font-heading uppercase tracking-widest group-hover:text-graphite/40 transition-colors">
                Превью
              </div>
            </div>
            <div className="flex-1 space-y-4 w-full">
              <InputField 
                label="URL изображения" 
                placeholder="/assets/certificate.webp" 
                value="/assets/certificate.webp"
              />
              <InputField 
                label="Alt-текст" 
                placeholder="Сертификат на сервис 5% TENET" 
                value="Сертификат на сервис 5% TENET"
              />
              <div className="flex items-center gap-3 pt-2">
                <input type="checkbox" id="show-cert" defaultChecked className="w-4 h-4 accent-red" />
                <label htmlFor="show-cert" className="text-xs text-graphite/60 font-body">Отображать этот блок на сайте</label>
              </div>
            </div>
          </div>
        </div>
      </FormSection>
    </EditorWrapper>
  );
}
