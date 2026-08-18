import { EditorWrapper, FormSection, InputField } from './EditorWrapper';
import { ShieldCheck, Headphones, Tag, Wrench, MoveVertical, Eye, Trash2, Plus } from 'lucide-react';

export function TrustEditor() {
  const mockPoints = [
    { icon: ShieldCheck, title: 'Официальный дилерский центр TENET', desc: 'Полное официальное сопровождение покупки и обслуживания автомобиля.' },
    { icon: Headphones, title: 'Персональное сопровождение по заявке', desc: 'Закреплённый менеджер поможет на каждом этапе — от выбора до выдачи.' },
    { icon: Tag, title: 'Прямая скидка от дилера', desc: 'Дополнительный бонус 200 000 ₽ от дилера поверх акций импортёра.' },
    { icon: Wrench, title: 'Удобный сервис и консультация', desc: 'Сертификат 5% на все услуги сервисного центра, помощь в подборе условий.' },
  ];

  return (
    <EditorWrapper 
      title="Почему выбирают нас" 
      description="Управление карточками доверия в блоке «Почему клиенты обращаются в Восток Моторс»"
    >
      <div className="space-y-4">
        {mockPoints.map((point, i) => (
          <div key={i} className="bg-white p-5 sm:p-6 rounded-sm border border-graphite/5 shadow-sm hover:border-red/20 transition-all group">
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">
              <div className="w-full lg:w-16 bg-beige-soft rounded-sm flex flex-row lg:flex-col items-center justify-center gap-4 lg:gap-3 py-3 lg:py-0">
                <button className="text-graphite/20 hover:text-graphite transition-colors cursor-grab p-1">
                  <MoveVertical className="w-5 h-5" />
                </button>
                <div className="text-red">
                  <point.icon className="w-5 h-5" />
                </div>
              </div>
              
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Заголовок" value={point.title} fullWidth />
                <InputField label="Описание" type="textarea" value={point.desc} fullWidth />
              </div>

              <div className="flex lg:flex-col items-center justify-center gap-4 lg:gap-6 border-t lg:border-t-0 lg:border-l border-graphite/5 pt-4 lg:pt-0 lg:pl-6">
                <button className="text-graphite/40 hover:text-graphite transition-colors p-1">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-red/40 hover:text-red transition-colors p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <button className="px-6 py-3 bg-white border border-graphite/10 text-graphite/60 hover:text-graphite-dark text-[10px] font-heading uppercase tracking-widest transition-all rounded-sm flex items-center gap-2">
          <Plus className="w-3.5 h-3.5" /> Добавить преимущество
        </button>
      </div>

      <FormSection title="Брендирование блока">
        <InputField label="Логотип 1 (TENET)" value="/assets/tenet-logo.svg" />
        <InputField label="Подпись 1" value="Автомобильный бренд" />
        <InputField label="Логотип 2 (Восток Моторс)" value="/assets/vm-logo.svg" />
        <InputField label="Подпись 2" value="Официальный дилер" />
      </FormSection>
    </EditorWrapper>
  );
}
