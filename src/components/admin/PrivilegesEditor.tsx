import { EditorWrapper, FormSection, InputField } from './EditorWrapper';
import { Tag, Gift, BadgePercent, MoveVertical, Eye, EyeOff, Trash2, Plus } from 'lucide-react';

export function PrivilegesEditor() {
  return (
    <EditorWrapper 
      title="Привилегии" 
      description="Управление карточками преимуществ в блоке «Ваши привилегии в клубе»"
    >
      <div className="space-y-6">
        <PrivilegeCard 
          id="1"
          icon={Tag}
          title="Денежная выгода 200 000 ₽"
          desc="Прямая дополнительная скидка от дилера при покупке автомобиля TENET по программе «TENET для своих»."
        />
        <PrivilegeCard 
          id="2"
          icon={Gift}
          title="Доп. оборудование на 200 000 ₽"
          desc="Комплект полезного дополнительного оборудования и услуг на сумму 200 000 ₽ для вашего автомобиля."
        />
        <PrivilegeCard 
          id="3"
          icon={BadgePercent}
          title="Сертификат 5% на сервис"
          desc="Сертификат действует на все услуги сервисного центра и суммируется с другими предложениями дилера."
        />
      </div>

      <div className="flex justify-center pt-6">
        <button className="px-8 py-4 bg-white border border-graphite/10 text-graphite/60 hover:text-graphite-dark hover:border-graphite/20 text-[11px] font-heading uppercase tracking-[0.2em] transition-all rounded-sm flex items-center gap-3 group shadow-sm">
          <Plus className="w-4 h-4 text-beige-dark group-hover:text-red transition-colors" /> 
          Добавить карточку
        </button>
      </div>

      <FormSection title="Общие настройки">
        <InputField 
          label="Срок действия акции" 
          placeholder="Акция действует до 31.12.2026" 
          value="Акция действует до 31.12.2026"
        />
      </FormSection>
    </EditorWrapper>
  );
}

function PrivilegeCard({ id, icon: Icon, title, desc }: any) {
  return (
    <div className="bg-white rounded-sm border border-graphite/5 shadow-sm overflow-hidden group hover:border-red/20 transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-16 bg-beige-soft flex md:flex-col items-center justify-center gap-4 py-4 md:py-0 border-b md:border-b-0 md:border-r border-graphite/5">
          <button className="text-graphite/20 hover:text-graphite transition-colors cursor-grab active:cursor-grabbing">
            <MoveVertical className="w-5 h-5" />
          </button>
          <div className="text-[10px] font-display font-black text-graphite/10 md:rotate-90">
            0{id}
          </div>
        </div>
        
        <div className="flex-1 p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-beige-soft rounded-sm flex items-center justify-center text-red">
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <InputField 
                label="Заголовок" 
                value={title}
              />
            </div>
            <InputField 
              label="Описание" 
              type="textarea"
              value={desc}
            />
          </div>
          
          <div className="flex flex-col gap-4 h-full justify-between">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-heading text-graphite/60 mb-2">
                  Иконка
                </label>
                <select className="w-full bg-beige-soft border border-graphite/5 rounded-sm px-4 py-2 text-sm text-graphite focus:outline-none focus:border-red/20">
                  <option>Тег (Tag)</option>
                  <option>Подарок (Gift)</option>
                  <option>Ключ (Wrench)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-heading text-graphite/60 mb-2">
                  Цвет
                </label>
                <select className="w-full bg-beige-soft border border-graphite/5 rounded-sm px-4 py-2 text-sm text-graphite focus:outline-none focus:border-red/20">
                  <option>Графит</option>
                  <option>Красный</option>
                  <option>Бежевый</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-graphite/5">
              <button className="flex items-center gap-2 text-[10px] font-heading uppercase tracking-widest text-graphite/40 hover:text-graphite transition-colors">
                <Eye className="w-3.5 h-3.5" /> Скрыть
              </button>
              <button className="flex items-center gap-2 text-[10px] font-heading uppercase tracking-widest text-red/60 hover:text-red transition-colors">
                <Trash2 className="w-3.5 h-3.5" /> Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
