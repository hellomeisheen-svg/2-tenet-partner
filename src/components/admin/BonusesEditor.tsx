import { EditorWrapper, FormSection, InputField } from './EditorWrapper';

export function BonusesEditor() {
  return (
    <EditorWrapper 
      title="Выбор бонуса" 
      description="Редактирование двух основных вариантов спецпредложений для клиентов"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FormSection title="Вариант 1: Доп. оборудование">
          <InputField 
            label="Название" 
            placeholder="Дополнительное оборудование под ключ" 
            value="Дополнительное оборудование под ключ"
            fullWidth
          />
          <InputField 
            label="Описание" 
            type="textarea"
            placeholder="Описание комплекта..." 
            value="Мы полностью укомплектуем ваш автомобиль полезными опциями, которые сделают поездки комфортнее, а кузов — защищённым."
            fullWidth
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-graphite/5">
            <div>
              <InputField 
                label="Категория 1" 
                value="Защита кузова"
                fullWidth
              />
              <InputField 
                label="Пункты категории 1" 
                type="textarea"
                value="Тонировка задней полусферы, Сетка в передний бампер для защиты радиатора, Антикор и шумоизоляционное покрытие днища, Брызговики"
                fullWidth
                description="Разделяйте пункты запятой"
              />
            </div>
            <div>
              <InputField 
                label="Категория 2" 
                value="Комфорт и безопасность"
                fullWidth
              />
              <InputField 
                label="Пункты категории 2" 
                type="textarea"
                value="Ковры в салон и багажник, Защита картера двигателя, Набор автомобилиста, Сигнализация с автозапуском"
                fullWidth
                description="Разделяйте пункты запятой"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <InputField 
              label="Стоимость комплекта" 
              placeholder="200 000 ₽" 
              value="200 000 ₽"
            />
            <InputField 
              label="Подпись стоимости" 
              placeholder="Ваша выгода" 
              value="Ваша выгода"
            />
          </div>
          
          <div className="md:col-span-2 flex items-center gap-6 pt-4 border-t border-graphite/5">
            <div className="flex items-center gap-3">
              <input type="checkbox" id="v1-show" defaultChecked className="w-4 h-4 accent-red" />
              <label htmlFor="v1-show" className="text-xs text-graphite/60 font-body">Показывать вариант</label>
            </div>
          </div>
        </FormSection>

        <FormSection title="Вариант 2: Прямая скидка">
          <InputField 
            label="Название" 
            placeholder="Скидка 200 000 ₽" 
            value="Скидка 200 000 ₽"
            fullWidth
          />
          <InputField 
            label="Описание" 
            type="textarea"
            placeholder="Описание скидки..." 
            value="Прямая дополнительная скидка от дилерского центра «TENET Восток Моторс»."
            fullWidth
          />
          <InputField 
            label="Размер скидки" 
            placeholder="200 000 ₽" 
            value="200 000 ₽"
          />
          <InputField 
            label="Поясняющий текст" 
            placeholder="от дилера" 
            value="от дилера"
          />
          <InputField 
            label="Подпись выгоды" 
            placeholder="Итоговая выгода" 
            value="Итоговая выгода"
          />
          <InputField 
            label="Дополнительные условия" 
            placeholder="Суммируется с акциями" 
            value="Суммируется с акциями"
          />
          <div className="md:col-span-2 flex items-center gap-6 pt-4 border-t border-graphite/5">
            <div className="flex items-center gap-3">
              <input type="checkbox" id="v2-show" defaultChecked className="w-4 h-4 accent-red" />
              <label htmlFor="v2-show" className="text-xs text-graphite/60 font-body">Показывать вариант</label>
            </div>
          </div>
        </FormSection>
      </div>

      <FormSection title="Настройки взаимодействия">
        <div className="md:col-span-2 flex items-center gap-10">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="allow-select" defaultChecked className="w-4 h-4 accent-red" />
            <label htmlFor="allow-select" className="text-xs text-graphite/60 font-body">Разрешить выбирать вариант в форме заявки</label>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="show-terms-link" defaultChecked className="w-4 h-4 accent-red" />
            <label htmlFor="show-terms-link" className="text-xs text-graphite/60 font-body">Показывать ссылку на условия акции</label>
          </div>
        </div>
      </FormSection>
    </EditorWrapper>
  );
}
