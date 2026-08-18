import { EditorWrapper, FormSection, InputField } from './EditorWrapper';

export function ContactsEditor() {
  return (
    <EditorWrapper 
      title="Контакты" 
      description="Управление контактной информацией и настройками карты"
    >
      <FormSection title="Основные контакты">
        <InputField 
          label="Адрес" 
          type="textarea"
          value="г. Тюмень, ул. Алебашевская, д. 11, этаж 1, помещение 38"
          fullWidth
        />
        <InputField 
          label="Телефон" 
          value="+7 3452 52 10 30"
        />
        <InputField 
          label="Email" 
          value="mshlyapnikov@vostok-motors-chery.ru"
        />
        <InputField 
          label="Режим работы" 
          value="Пн–Пт, 8:00–20:00"
        />
        <InputField 
          label="Копирайт в подвале" 
          value="© 2026 TENET Восток Моторс. Все права защищены."
        />
      </FormSection>

      <FormSection title="Настройки карты">
        <InputField 
          label="Подпись на заглушке карты" 
          value="Яндекс.Карта — контейнер готов к подключению"
          fullWidth
        />
        <InputField 
          label="URL/Код виджета карты" 
          type="textarea"
          value="https://yandex.ru/map-widget/v1/?mode=search&text=Тюмень+Алебашевская+11"
          fullWidth
          description="Вставьте ссылку на виджет Яндекс.Карт"
        />
        <InputField 
          label="Координаты (Широта, Долгота)" 
          value="57.1729, 65.5564"
        />
      </FormSection>
    </EditorWrapper>
  );
}
