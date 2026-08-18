import { EditorWrapper, FormSection, InputField } from './EditorWrapper';
import { Camera, Plus, Trash2, Eye, MoveVertical } from 'lucide-react';

export function MomentsEditor() {
  const mockMoments = [
    { id: 1, name: 'Алексей и Мария', city: 'Тюмень', model: 'TENET T7 Prestige', quote: 'Забрали ключи и сразу поехали в путешествие — машина оправдала все ожидания.' },
    { id: 2, name: 'Семья Соколовых', city: 'Екатеринбург', model: 'TENET T8 Family', quote: 'Дети в восторге от простора, а мы — от плавного хода и тишины в салоне.' },
    { id: 3, name: 'Дмитрий', city: 'Новосибирск', model: 'TENET T7 Business', quote: 'Сделка прошла быстро и прозрачно — приятно, когда всё по-человечески.' },
  ];

  return (
    <EditorWrapper 
      title="Истории клиентов" 
      description="Управление медиакаталогом и карточками счастливых покупателей"
    >
      <FormSection title="Общие настройки">
        <InputField 
          label="Вступительный текст" 
          type="textarea"
          placeholder="Каждый автомобиль — это не просто покупка..." 
          value="Каждый автомобиль — это не просто покупка. Это начало новой истории."
          fullWidth
        />
        <InputField 
          label="Текст кнопки" 
          placeholder="Смотреть все моменты" 
          value="Смотреть все моменты"
        />
      </FormSection>

      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-sm uppercase tracking-widest text-graphite/40">Карточки историй</h3>
        <button className="px-4 py-2 bg-red text-white text-[10px] font-heading uppercase tracking-widest rounded-sm flex items-center gap-2">
          <Plus className="w-3.5 h-3.5" /> Добавить историю
        </button>
      </div>

      <div className="space-y-4">
        {mockMoments.map((moment) => (
          <div key={moment.id} className="bg-white p-6 rounded-sm border border-graphite/5 shadow-sm hover:border-red/20 transition-all group">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              <div className="w-full lg:w-32 flex flex-col items-center lg:items-start gap-3">
                <div className="w-32 h-32 lg:w-full lg:aspect-square bg-beige-soft rounded-sm border border-graphite/5 overflow-hidden relative">
                   <div className="absolute inset-0 flex items-center justify-center text-[8px] text-graphite/20 font-heading uppercase tracking-tighter">Фото</div>
                </div>
                <button className="text-[9px] font-heading uppercase tracking-widest text-graphite/40 hover:text-red transition-colors text-center">Изменить фото</button>
              </div>
              
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Имя" value={moment.name} fullWidth />
                <InputField label="Город" value={moment.city} />
                <InputField label="Модель автомобиля" value={moment.model} />
                <InputField label="Цитата" type="textarea" value={moment.quote} fullWidth />
              </div>

              <div className="flex lg:flex-col items-center justify-center gap-4 lg:gap-6 border-t lg:border-t-0 lg:border-l border-graphite/5 pt-4 lg:pt-0 lg:pl-6">
                <button className="text-graphite/20 hover:text-graphite transition-colors cursor-grab p-2">
                  <MoveVertical className="w-5 h-5" />
                </button>
                <button className="text-graphite/20 hover:text-graphite transition-colors p-2">
                  <Eye className="w-5 h-5" />
                </button>
                <button className="text-red/40 hover:text-red transition-colors p-2">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </EditorWrapper>
  );
}
