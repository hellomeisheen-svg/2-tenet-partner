import { ReactNode } from 'react';
import { Save, Eye, RefreshCcw, AlertCircle } from 'lucide-react';

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
    <div className="flex-1 overflow-y-auto p-6 lg:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-display uppercase tracking-wider text-graphite-dark leading-none">
                {title}
              </h2>
              {isDirty && (
                <span className="px-2 py-0.5 bg-beige-dark/20 text-graphite/60 text-[10px] uppercase tracking-widest font-heading rounded-sm">
                  Черновик
                </span>
              )}
            </div>
            <p className="text-graphite/40 text-sm max-w-xl">{description}</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={onReset}
              className="px-5 py-2.5 bg-white border border-graphite/5 text-graphite/60 hover:text-red hover:bg-beige-soft text-[10px] uppercase tracking-[0.2em] font-heading transition-all rounded-sm flex items-center gap-2 shadow-sm"
            >
              <RefreshCcw className="w-3.5 h-3.5" /> Сбросить
            </button>
            <button 
              onClick={onPreview}
              className="px-5 py-2.5 bg-white border border-graphite/5 text-graphite/60 hover:text-graphite-dark hover:bg-beige-soft text-[10px] uppercase tracking-[0.2em] font-heading transition-all rounded-sm flex items-center gap-2 shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" /> Предпросмотр
            </button>
            <button 
              onClick={onSave}
              className="px-6 py-2.5 bg-red hover:bg-red-dark text-white text-[10px] uppercase tracking-[0.2em] font-heading transition-all rounded-sm flex items-center gap-2 shadow-lg shadow-red/20 active:scale-95"
            >
              <Save className="w-3.5 h-3.5" /> Сохранить
            </button>
          </div>
        </div>

        <div className="space-y-8 animate-fade-in">
          {children}
        </div>
        
        <div className="mt-12 p-6 bg-white border border-graphite/5 rounded-sm flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-beige-dark shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-heading uppercase tracking-widest text-graphite-dark mb-1">
              Прототип — mock-данные
            </div>
            <p className="text-xs text-graphite/40 leading-relaxed">
              Все изменения сохраняются только в локальном хранилище (localStorage) вашего браузера. Публичный сайт не будет изменен до подключения реальной базы данных и процесса деплоя.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FormSection({ title, children, warning }: { title: string; children: ReactNode; warning?: string }) {
  return (
    <section className="bg-white p-8 rounded-sm shadow-sm border border-graphite/5 space-y-6">
      <div className="flex items-center justify-between border-b border-graphite/5 pb-5">
        <h3 className="font-display text-lg uppercase tracking-widest text-graphite-dark">{title}</h3>
      </div>
      
      {warning && (
        <div className="bg-red/5 border-l-2 border-red p-4 flex gap-3 items-start">
          <AlertCircle className="w-4 h-4 text-red shrink-0 mt-0.5" />
          <p className="text-xs text-red/80 italic font-body">{warning}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
  disabled = false
}: { 
  label: string; 
  type?: string; 
  placeholder?: string; 
  value?: string; 
  onChange?: (val: string) => void;
  fullWidth?: boolean;
  description?: string;
  disabled?: boolean;
}) {

  return (
    <div className={fullWidth ? 'md:col-span-2' : ''}>
      <label className="block text-[10px] uppercase tracking-[0.2em] font-heading text-graphite/60 mb-2">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea 
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}

          placeholder={placeholder}
          className="w-full bg-beige-soft border border-graphite/5 rounded-sm px-4 py-3 text-sm text-graphite focus:outline-none focus:border-red/20 transition-all min-h-[100px] resize-y disabled:opacity-50 disabled:cursor-not-allowed"
        />
      ) : (
        <input 
          type={type}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}

          placeholder={placeholder}
          className="w-full bg-beige-soft border border-graphite/5 rounded-sm px-4 py-3 text-sm text-graphite focus:outline-none focus:border-red/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
      )}
      {description && <p className="mt-2 text-[10px] text-graphite/30 italic">{description}</p>}
    </div>
  );
}
