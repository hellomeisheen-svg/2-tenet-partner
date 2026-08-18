import { EditorWrapper, FormSection, InputField } from './EditorWrapper';
import { Globe, Search, Share2, Facebook, Twitter, MessageSquare } from 'lucide-react';

export function SEOEditor() {
  return (
    <EditorWrapper 
      title="SEO и мета-теги" 
      description="Управление поисковой оптимизацией и отображением сайта в социальных сетях"
    >
      <FormSection title="Основные мета-теги">
        <InputField 
          label="Title (Заголовок страницы)" 
          value="TENET для своих — Официальный дилер Восток Моторс"
          fullWidth
          description="Рекомендуется 50-60 символов"
        />
        <InputField 
          label="Description (Описание)" 
          type="textarea"
          value="Эксклюзивная программа для своих от официального дилера TENET Восток Моторс. Получите выгоду 200 000 ₽ и сертификат на сервис."
          fullWidth
          description="Рекомендуется 120-160 символов"
        />
        <InputField 
          label="Keywords (Ключевые слова)" 
          placeholder="tenet, восток моторс, тюмень, купить машину" 
          value="tenet, восток моторс, тюмень, купить машину, спецпредложение"
          fullWidth
        />
      </FormSection>

      <FormSection title="Настройки Open Graph (Соцсети)">
        <InputField 
          label="OG Title" 
          value="TENET для своих — Выгода до 200 000 ₽"
          fullWidth
        />
        <InputField 
          label="OG Description" 
          type="textarea"
          value="Станьте участником партнерской программы и получите персональные условия на покупку TENET."
          fullWidth
        />
        <div className="md:col-span-2 space-y-4">
          <label className="block text-[10px] uppercase tracking-[0.2em] font-heading text-graphite/60">
            OG Image (Превью при репосте)
          </label>
          <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
            <div className="w-full lg:w-64 aspect-[1.91/1] bg-beige-soft rounded-sm border border-graphite/5 overflow-hidden shadow-inner relative group shrink-0">
              <div className="absolute inset-0 flex items-center justify-center text-[10px] text-graphite/20 font-heading uppercase tracking-widest">
                1200x630
              </div>
            </div>
            <div className="flex-1 space-y-4 w-full">
              <InputField 
                label="URL изображения" 
                value="/assets/og-image.jpg"
              />
              <button className="text-[9px] font-heading uppercase tracking-widest text-red flex items-center gap-2 pt-2">
                <Globe className="w-3.5 h-3.5" /> Загрузить из библиотеки
              </button>
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection title="Счетчики и аналитика">
        <InputField 
          label="ID Яндекс.Метрики" 
          placeholder="12345678" 
          value="98765432"
        />
        <InputField 
          label="ID Google Analytics" 
          placeholder="G-XXXXXXXXXX" 
          value="G-A1B2C3D4"
        />
        <InputField 
          label="Код верификации владельца" 
          placeholder="yandex-verification-code" 
          value="yandex-verification-123456"
          fullWidth
        />
        <div className="md:col-span-2 pt-4">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="indexing" defaultChecked className="w-4 h-4 accent-red" />
            <label htmlFor="indexing" className="text-xs text-graphite/60 font-body">Разрешить индексацию поисковыми системами</label>
          </div>
        </div>
      </FormSection>
    </EditorWrapper>
  );
}
