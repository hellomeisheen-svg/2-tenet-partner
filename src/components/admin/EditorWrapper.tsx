import { ReactNode } from 'react';
import { Save, Eye, RefreshCcw, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditorWrapperProps {
  title: string;
  description: string;
  children: ReactNode;
  onSave?: () => void;
  onPreview?: () => void;
  onReset?: () => void;
  isDirty?: boolean;
}

export function EditorWrapper({ 
  title, 
  description, 
  children, 
  onSave, 
  onPreview, 
  onReset,
  isDirty = false
}: EditorWrapperProps) {
  return (
    <div className="flex-1 w-full max-w-4xl mx-auto pb-24 lg:pb-0">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 lg:mb-10">
        <div>
          <div className="flex items-center flex-wrap gap-3 mb-2">
            <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-graphite-dark leading-none">
              {title}
            </h2>
            {isDirty && (
              <span className="px-2 py-0.5 bg-beige-dark/20 text-graphite/60 text-[8px] sm:text-[10px] uppercase tracking-widest font-heading rounded-sm">
                Черновик
              </span>
            )}
          </div>
          <p className="text-graphite/40 text-xs sm:text-sm max-w-xl">{description}</p>
        </div>
        
        {/* Actions - Desktop */}
        <div className="hidden sm:flex flex-wrap gap-3">
          <button 
            onClick={onReset}
            className="px-4 lg:px-5 py-2.5 bg-white border border-graphite/5 text-graphite/60 hover:text-red hover:bg-beige-soft text-[10px] uppercase tracking-[0.2em] font-heading transition-all rounded-sm flex items-center gap-2 shadow-sm whitespace-nowrap"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> Сбросить
          </button>
          <button 
            onClick={onPreview}
            className="px-4 lg:px-5 py-2.5 bg-white border border-graphite/5 text-graphite/60 hover:text-graphite-dark hover:bg-beige-soft text-[10px] uppercase tracking-[0.2em] font-heading transition-all rounded-sm flex items-center gap-2 shadow-sm whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" /> Предпросмотр
          </button>
          <button 
            onClick={onSave}
            className="px-5 lg:px-6 py-2.5 bg-red hover:bg-red-dark text-white text-[10px] uppercase tracking-[0.2em] font-heading transition-all rounded-sm flex items-center gap-2 shadow-lg shadow-red/20 active:scale-95 whitespace-nowrap"
          >
            <Save className="w-3.5 h-3.5" /> Сохранить
          </button>
        </div>
      </div>

      <div className="space-y-6 lg:space-y-8 animate-fade-in">
        {children}
      </div>
      
      <div className="mt-8 lg:mt-12 p-4 sm:p-6 bg-white border border-graphite/5 rounded-sm flex items-start gap-3 sm:gap-4">
        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-beige-dark shrink-0 mt-0.5" />
        <div>
          <div className="text-[10px] sm:text-xs font-heading uppercase tracking-widest text-graphite-dark mb-1">
            Прототип — mock-данные
          </div>
          <p className="text-[10px] sm:text-xs text-graphite/40 leading-relaxed">
            Все изменения сохраняются только в локальном хранилище (localStorage) вашего браузера. Публичный сайт не будет изменен до подключения реальной базы данных и процесса деплоя.
          </p>
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-t border-graphite/5 p-4 flex gap-2 safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={onReset}
          className="flex-1 py-3 bg-beige-soft text-graphite/60 text-[9px] uppercase tracking-widest font-heading rounded-sm flex items-center justify-center gap-2"
        >
          <RefreshCcw className="w-3.5 h-3.5" /> Сброс
        </button>
        <button 
          onClick={onPreview}
          className="flex-1 py-3 bg-beige-soft text-graphite/60 text-[9px] uppercase tracking-widest font-heading rounded-sm flex items-center justify-center gap-2"
        >
          <Eye className="w-3.5 h-3.5" /> Предпр.
        </button>
        <button 
          onClick={onSave}
          className="flex-[2] py-3 bg-red text-white text-[9px] uppercase tracking-[0.15em] font-heading rounded-sm flex items-center justify-center gap-2 shadow-lg shadow-red/10"
        >
          <Save className="w-3.5 h-3.5" /> Сохранить
        </button>
      </div>
    </div>
  );
}

export function FormSection({ title, children, warning }: { title: string; children: ReactNode; warning?: string }) {
  return (
    <section className="bg-white p-5 sm:p-8 rounded-sm shadow-sm border border-graphite/5 space-y-6">
      <div className="flex items-center justify-between border-b border-graphite/5 pb-4 lg:pb-5">
        <h3 className="font-display text-base sm:text-lg uppercase tracking-widest text-graphite-dark">{title}</h3>
      </div>
      
      {warning && (
        <div className="bg-red/5 border-l-2 border-red p-3 sm:p-4 flex gap-2 sm:gap-3 items-start">
          <AlertCircle className="w-4 h-4 text-red shrink-0 mt-0.5" />
          <p className="text-[10px] sm:text-xs text-red/80 italic font-body leading-relaxed">{warning}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {children}
      </div>
    </section>
  );
}

export function InputField({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange,
  fullWidth = false,
  description,
  disabled = false,
  min = 0,
  max = 100,
  step = 1
}: { 
  label: string; 
  type?: string; 
  placeholder?: string; 
  value?: string; 
  onChange?: (val: string) => void;
  fullWidth?: boolean;
  description?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
}) {

  return (
    <div className={fullWidth ? 'md:col-span-2' : ''}>
      <label className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-heading text-graphite/60 mb-2">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea 
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-beige-soft border border-graphite/5 rounded-sm px-4 py-3 text-base sm:text-sm text-graphite focus:outline-none focus:border-red/20 transition-all min-h-[120px] resize-y disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
        />
      ) : type === 'range' ? (
        <div className="space-y-3">
          <input 
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full h-1.5 bg-beige-dark/20 rounded-lg appearance-none cursor-pointer accent-red disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <div className="flex justify-between items-center lg:hidden">
            <span className="text-[10px] text-graphite/40 font-heading tracking-wider">Текущее значение:</span>
            <span className="px-2 py-1 bg-red/10 text-red text-xs font-heading rounded-sm border border-red/20">{value}</span>
          </div>
        </div>
      ) : (
        <input 
          type={type}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-beige-soft border border-graphite/5 rounded-sm px-4 py-3 text-base sm:text-sm text-graphite focus:outline-none focus:border-red/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
        />
      )}
      {description && <p className="mt-2 text-[9px] sm:text-[10px] text-graphite/30 italic">{description}</p>}
    </div>
  );
}
