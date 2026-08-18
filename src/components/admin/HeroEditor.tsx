import { EditorWrapper, FormSection, InputField } from './EditorWrapper';

export function HeroEditor() {
  return (
    <EditorWrapper 
      title="Первый экран" 
      description="Настройка главного визуального блока и основных заголовков лендинга"
    >
      <FormSection 
        title="Контент" 
        warning="Не изменяйте финансовые значения и юридические формулировки без согласования с заказчиком"
      >
        <InputField 
          label="Надзаголовок" 
          placeholder="ПАРТНЁРСКАЯ ПРОГРАММА" 
          value="ПАРТНЁРСКАЯ ПРОГРАММА"
        />
        <InputField 
          label="Основной заголовок" 
          placeholder="Закрытый клуб «TENET для своих»" 
          value="Закрытый клуб «TENET для своих»"
          fullWidth
        />
        <InputField 
          label="Описание" 
          type="textarea"
          placeholder="Описание персонального предложения..." 
          value="Для клиентов, пришедших по партнёрской ссылке, действует персональный дополнительный бонус 200 000 ₽ к действующим предложениям от импортёра."
          fullWidth
        />
        <InputField 
          label="Текст главной кнопки" 
          placeholder="Получить персональное предложение" 
          value="Получить персональное предложение"
        />
        <InputField 
          label="Ссылка главной кнопки" 
          placeholder="#form" 
          value="#form"
        />
      </FormSection>

      <FormSection title="Преимущества (под кнопкой)">
        <InputField 
          label="Преимущество 1" 
          placeholder="Бонус 200 000 ₽" 
          value="Бонус 200 000 ₽"
        />
        <InputField 
          label="Преимущество 2" 
          placeholder="Сертификат 5% на сервис" 
          value="Сертификат 5% на сервис"
        />
      </FormSection>

      <FormSection title="Визуал">
        <div className="md:col-span-2 space-y-4">
          <label className="block text-[10px] uppercase tracking-[0.2em] font-heading text-graphite/60">
            Фоновое изображение
          </label>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-full sm:w-64 aspect-[16/9] bg-beige-soft rounded-sm border border-graphite/5 overflow-hidden shadow-inner relative group">
              <div className="absolute inset-0 flex items-center justify-center text-[10px] text-graphite/20 font-heading uppercase tracking-widest group-hover:text-graphite/40 transition-colors">
                Превью
              </div>
              {/* Actual preview would go here */}
            </div>
            <div className="flex-1 space-y-4 w-full">
              <InputField 
                label="URL изображения" 
                placeholder="/assets/tenet-hero.webp" 
                value="/assets/tenet-hero.webp"
              />
              <InputField 
                label="Alt-текст изображения" 
                placeholder="TENET SUV в архитектурном пространстве" 
                value="TENET SUV в архитектурном пространстве"
              />
              <div className="flex items-center gap-3 pt-2">
                <input type="checkbox" id="show-hero" defaultChecked className="w-4 h-4 accent-red" />
                <label htmlFor="show-hero" className="text-xs text-graphite/60 font-body">Отображать этот блок на сайте</label>
              </div>
            </div>
          </div>
        </div>
      </FormSection>
    </EditorWrapper>
  );
}
