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
        <InputField 
          label="URL изображения" 
          placeholder="/assets/tenet-hero.webp" 
          value="/assets/tenet-hero.webp"
          description="Рекомендуемый размер: 1920x1080px"
        />
        <InputField 
          label="Alt-текст изображения" 
          placeholder="TENET SUV в архитектурном пространстве" 
          value="TENET SUV в архитектурном пространстве"
        />
        <InputField 
          label="Яркость фона (%)" 
          type="range"
          min={50}
          max={150}
          value="110"
          description="Регулировка яркости основного изображения"
        />
        <div className="flex items-center gap-3 pt-2 md:ml-[33.333%]">
          <input type="checkbox" id="show-hero" defaultChecked className="w-4 h-4 accent-red cursor-pointer" />
          <label htmlFor="show-hero" className="text-[10px] uppercase tracking-widest text-graphite/60 font-heading cursor-pointer">Отображать этот блок на сайте</label>
        </div>
      </FormSection>
    </EditorWrapper>
  );
}
