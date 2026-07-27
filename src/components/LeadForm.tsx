import { useState, useEffect, FormEvent } from 'react';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { getUrlParams, formatPhone, isValidPhone } from '../lib/utils';

const models = [
  'TENET — базовая комплектация',
  'TENET — средняя комплектация',
  'TENET — максимальная комплектация',
  'Ещё не определился(ась) / нужна консультация',
];

const hiddenFields = [
  'partner_code',
  'promo',
  'ref',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'page_url',
];

export function LeadForm() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [model, setModel] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [hiddenValues, setHiddenValues] = useState<Record<string, string>>({});

  useEffect(() => {
    setHiddenValues(getUrlParams());
  }, []);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) e.name = 'Укажите ваше имя';
    if (!isValidPhone(phone)) e.phone = 'Укажите корректный телефон';
    if (!model) e.model = 'Выберите модель';
    if (!consent) e.consent = 'Необходимо согласие на обработку данных';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section id="form" className="bg-graphite-dark py-24 lg:py-40">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red/15 mb-10">
              <Check className="w-8 h-8 text-red" strokeWidth={2} />
            </div>
            <h2 className="text-white font-display font-black text-[1.75rem] lg:text-3xl mb-5">
              Заявка отправлена
            </h2>
            <p className="text-white/55 font-body text-base lg:text-lg mb-10 leading-[1.75]">
              Менеджер «TENET Восток Моторс» свяжется с вами в ближайшее время
              для уточнения деталей и подтверждения статуса участника программы.
            </p>
            <button
              onClick={() => {
                setStatus('idle');
                setName('');
                setPhone('');
                setModel('');
                setConsent(false);
              }}
              className="text-beige font-heading text-sm tracking-wide hover:text-white transition-colors"
            >
              Отправить ещё одну заявку
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="form" className="bg-graphite-dark py-24 lg:py-40">
      <div ref={ref} className="max-w-content mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: heading + benefits list */}
          <div className={`${visible ? 'is-visible' : 'reveal'}`}>
            <div className="flex items-center gap-4 mb-6">
              <span className="divider-line !bg-beige/25" />
              <span className="text-beige font-heading text-[11px] tracking-[0.4em] uppercase">
                Заявка
              </span>
              <span className="divider-line !bg-beige/25" />
            </div>
            <h2 className="text-white font-display font-black text-[2.25rem] sm:text-[2.75rem] lg:text-[3.5rem] mb-8">
              Получите персональные условия
            </h2>
            <p className="text-white/55 font-body text-base lg:text-lg leading-[1.75] mb-12 max-w-lg">
              Оставьте заявку, и менеджер «TENET Восток Моторс» свяжется с вами
              для уточнения деталей, подтверждения статуса участника программы и подбора подходящего предложения.
            </p>
            <div className="space-y-5 pt-10 border-t border-beige/15">
              <div className="flex items-center gap-4">
                <span className="w-1 h-1 rounded-full bg-beige" />
                <span className="text-white/75 font-heading text-sm">Бонус 200 000 ₽</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-1 h-1 rounded-full bg-beige" />
                <span className="text-white/75 font-heading text-sm">Сертификат 5% на сервис</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-1 h-1 rounded-full bg-beige" />
                <span className="text-white/75 font-heading text-sm">Персональный менеджер</span>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className={`${visible ? 'is-visible' : 'reveal'} reveal-delay-1`}>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 lg:p-12 space-y-6"
              noValidate
            >
              <div>
                <label htmlFor="name" className="block text-graphite font-heading text-sm mb-3">
                  Имя
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как к вам обращаться"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                />
                {errors.name && (
                  <p className="mt-2 text-red text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-graphite font-heading text-sm mb-3">
                  Телефон
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="+7 (___) ___-__-__"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                />
                {errors.phone && (
                  <p className="mt-2 text-red text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="model" className="block text-graphite font-heading text-sm mb-3">
                  Интересующая модель
                </label>
                <select
                  id="model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className={`form-input form-input-select ${errors.model ? 'error' : ''} ${model ? '' : 'text-[#b0a89e]'}`}
                >
                  <option value="">Выберите модель</option>
                  {models.map((m) => (
                    <option key={m} value={m} className="text-graphite">
                      {m}
                    </option>
                  ))}
                </select>
                {errors.model && (
                  <p className="mt-2 text-red text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.model}
                  </p>
                )}
              </div>

              <label className="flex items-start gap-3.5 cursor-pointer pt-3">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-red cursor-pointer"
                />
                <span className="text-graphite-light font-body text-xs leading-[1.75]">
                  Я согласен(на) на обработку персональных данных и принимаю{' '}
                  <a href="#privacy" className="text-red underline hover:text-red-dark">
                    политику конфиденциальности
                  </a>
                  .
                </span>
              </label>
              {errors.consent && (
                <p className="text-red text-xs flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.consent}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full bg-red hover:bg-red-dark disabled:opacity-60 text-white py-4 rounded-sm font-heading text-base tracking-[0.05em] flex items-center justify-center gap-3"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Отправляем...
                  </>
                ) : (
                  'Получить предложение'
                )}
              </button>

              {status === 'error' && (
                <p className="text-red text-sm text-center">
                  Произошла ошибка. Попробуйте ещё раз или позвоните нам.
                </p>
              )}

              <p className="text-graphite/35 font-body text-[11px] leading-[1.75] text-center">
                Нажимая кнопку, вы отправляете заявку менеджеру дилерского
                центра. Ваши данные не передаются третьим лицам.
              </p>

              {hiddenFields.map((field) => (
                <input key={field} type="hidden" name={field} value={hiddenValues[field] ?? ''} />
              ))}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
