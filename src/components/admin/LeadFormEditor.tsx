import { EditorWrapper, FormSection, InputField } from './EditorWrapper';

export function LeadFormEditor() {
  return (
    <EditorWrapper 
      title="Форма заявки" 
      description="Настройка текстового контента и полей формы обратной связи"
    >
      <FormSection title="Заголовки и тексты">
        <InputField 
          label="Надзаголовок" 
          value="Заявка"
        />
        <InputField 
          label="Заголовок" 
          value="Получите персональные условия"
          fullWidth
        />
        <InputField 
          label="Описание" 
          type="textarea"
          value="Оставьте заявку, и менеджер «TENET Восток Моторс» свяжется с вами для уточнения деталей, подтверждения статуса участника программы и подбора подходящего предложения."
          fullWidth
        />
      </FormSection>

      <FormSection title="Преимущества в блоке">
        <InputField label="Пункт 1" value="Бонус 200 000 ₽" />
        <InputField label="Пункт 2" value="Сертификат 5% на сервис" />
        <InputField label="Пункт 3" value="Персональный менеджер" fullWidth />
      </FormSection>

      <FormSection title="Поля и плейсхолдеры">
        <InputField label="Подпись поля Имя" value="Имя" />
        <InputField label="Placeholder поля Имя" value="Как к вам обращаться" />
        <InputField label="Подпись поля Телефон" value="Телефон" />
        <InputField label="Placeholder поля Телефон" value="+7 (___) ___-__-__" />
        <InputField label="Подпись выбора модели" value="Интересующая модель" fullWidth />
        <InputField 
          label="Список моделей" 
          type="textarea"
          value="TENET — базовая комплектация, TENET — средняя комплектация, TENET — максимальная комплектация, Ещё не определился(ась) / нужна консультация"
          fullWidth
          description="Разделяйте модели запятой"
        />
      </FormSection>

      <FormSection title="Юридические сноски и кнопка">
        <InputField label="Текст чекбокса согласия" value="Я согласен(на) на обработку персональных данных и принимаю" fullWidth />
        <InputField label="Текст ссылки на политику" value="политику конфиденциальности" />
        <InputField label="Текст кнопки" value="Получить предложение" />
        <InputField label="Текст под кнопкой" type="textarea" value="Нажимая кнопку, вы отправляете заявку менеджеру дилерского центра. Ваши данные не передаются третьим лицам." fullWidth />
      </FormSection>

      <FormSection title="Уведомления после отправки">
        <InputField label="Сообщение успеха" value="Заявка отправлена" />
        <InputField label="Описание успеха" type="textarea" value="Менеджер «TENET Восток Моторс» свяжется с вами в ближайшее время для уточнения деталей и подтверждения статуса участника программы." fullWidth />
        <InputField label="Сообщение ошибки" value="Произошла ошибка. Попробуйте ещё раз или позвоните нам." fullWidth />
      </FormSection>
    </EditorWrapper>
  );
}
