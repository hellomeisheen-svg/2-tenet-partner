import { ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { TenetLogo } from './Logo';

export function Certificate({ onCtaClick }: { onCtaClick: () => void }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="certificate" className="bg-graphite-dark py-24 lg:py-40 relative overflow-hidden">
      {/* CMS content loading must be enabled only after PostgreSQL is configured in production.
          Public components must always preserve static fallback content. */}
      <div ref={ref} className="max-w-content mx-auto px-6 lg:px-12 relative">
        <div className={`max-w-2xl mb-16 mx-auto text-center ${visible ? 'is-visible' : 'reveal'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="divider-line !bg-beige" />
            <span className="text-beige font-heading text-[11px] tracking-[0.4em] uppercase">
              Сервис
            </span>
            <span className="divider-line !bg-beige" />
          </div>
          <h2 className="text-white font-display font-black text-[2.25rem] sm:text-[2.75rem] lg:text-[3.5rem]">
            Сертификат на сервис 5%
          </h2>
        </div>

        {/* Certificate card */}
        <div className={`relative max-w-3xl mx-auto ${visible ? 'is-visible' : 'reveal'} reveal-delay-1`}>
          <div className="relative bg-beige-soft overflow-hidden">
            {/* Inner frame */}
            <div className="absolute inset-3 border border-graphite/15 pointer-events-none" />

            <div className="relative p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
                <div className="flex-1">
                  <div className="text-graphite/35 font-heading text-[10px] tracking-[0.3em] uppercase mb-6">
                    Сертификат участника программы
                  </div>
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="font-display font-black text-[5rem] lg:text-[7rem] text-graphite leading-none">
                      5%
                    </span>
                  </div>
                  <h3 className="text-graphite font-display font-black text-xl lg:text-2xl mb-4">
                    На все услуги сервисного центра
                  </h3>
                  <p className="text-graphite-light font-body text-sm lg:text-base leading-[1.75] max-w-md">
                    Каждому участнику программы доступен сертификат 5% на все
                    услуги сервисного центра. Предложение суммируется с другими
                    акциями дилера и помогает сделать обслуживание автомобиля
                    ещё выгоднее.
                  </p>
                </div>

                {/* Seal */}
                <div className="flex-shrink-0 w-full lg:w-auto flex justify-start lg:block pl-[1.4rem] lg:pl-0">
                  <div className="w-28 h-28 lg:w-36 lg:h-36 border border-graphite/15 rounded-full flex flex-col items-center justify-center text-center px-2">
                    <TenetLogo className="h-4 lg:h-5 w-auto text-graphite" />
                    <span className="font-body text-[9px] lg:text-[11px] text-graphite/35 tracking-[0.25em] uppercase mt-1.5">
                      для своих
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-graphite/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-graphite/35 font-body text-[10px] uppercase tracking-wider mb-1">
                      Действует до
                    </div>
                    <div className="text-graphite font-heading text-base">31.12.2026</div>
                  </div>
                  <div className="w-px h-8 bg-graphite/15" />
                  <div>
                    <div className="text-graphite/35 font-body text-[10px] uppercase tracking-wider mb-1">
                      Суммируется
                    </div>
                    <div className="text-graphite font-heading text-base">с акциями дилера</div>
                  </div>
                </div>
                <button
                  onClick={onCtaClick}
                  className="btn-primary group inline-flex items-center gap-3 bg-red hover:bg-red-dark text-white px-7 py-3.5 rounded-sm font-heading text-sm tracking-[0.05em] shadow-lg shadow-red/20 hover:shadow-xl hover:shadow-red/25 hover:gap-4"
                >
                  Получить сертификат
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-white/25 font-body text-xs leading-[1.75] max-w-2xl mx-auto">
            Подробные условия — в разделе{' '}
            <a href="/terms" className="text-white/40 underline hover:text-white/60 transition-colors">
              Условия акции
            </a>
            . Не является публичной офертой.
          </p>
        </div>
      </div>
    </section>
  );
}
