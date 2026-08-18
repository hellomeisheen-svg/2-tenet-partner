import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export function Contacts() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="contacts" className="bg-white py-24 lg:py-40">
      {/* CMS content loading must be enabled only after PostgreSQL is configured in production.
          Public components must always preserve static fallback content. */}
      <div ref={ref} className="max-w-content mx-auto px-6 lg:px-12">
        <div className={`max-w-2xl mb-16 mx-auto text-center ${visible ? 'is-visible' : 'reveal'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="divider-line" />
            <span className="text-red font-heading text-[11px] tracking-[0.4em] uppercase">
              Контакты
            </span>
            <span className="divider-line" />
          </div>
          <h2 className="text-graphite font-display font-black text-[2.25rem] sm:text-[2.75rem] lg:text-[3.5rem]">
            Контакты дилерского центра
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map column */}
          <div
            className={`relative w-full h-[420px] lg:h-full min-h-[520px] bg-beige-soft overflow-hidden ${visible ? 'is-visible' : 'reveal'} reveal-delay-1`}
          >
            <div
              id="yandex-map"
              className="absolute inset-0"
              data-src="https://yandex.ru/map-widget/v1/?mode=search&text=Тюмень+Алебашевская+11"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-graphite/35">
                <MapPin className="w-10 h-10 mb-5" strokeWidth={1} />
                <p className="font-heading text-sm tracking-wide">
                  Яндекс.Карта — контейнер готов к&nbsp;подключению
                </p>
                <p className="font-body text-xs mt-2 text-graphite/25">
                  г. Тюмень, ул. Алебашевская, д. 11, этаж 1, помещение 38
                </p>
              </div>
            </div>
          </div>

          {/* Contact info column */}
          <div className="flex flex-col">
            <div className={`bg-beige-soft ${visible ? 'is-visible' : 'reveal'} reveal-delay-2`}>
              {/* Address */}
              <div className="flex items-start gap-5 p-8 lg:p-10 border-b border-beige-dark/15 transition-colors duration-300 hover:bg-white">
                <MapPin className="w-6 h-6 text-graphite/60 flex-shrink-0" strokeWidth={1.25} />
                <div>
                  <div className="text-graphite/35 font-body text-xs uppercase tracking-wider mb-2.5">
                    Адрес
                  </div>
                  <div className="text-graphite font-heading text-base lg:text-lg leading-tight">
                    г. Тюмень, ул. Алебашевская, д. 11,<br />этаж 1, помещение 38
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-5 p-8 lg:p-10 border-b border-beige-dark/15 transition-colors duration-300 hover:bg-white">
                <Phone className="w-6 h-6 text-graphite/60 flex-shrink-0" strokeWidth={1.25} />
                <div>
                  <div className="text-graphite/35 font-body text-xs uppercase tracking-wider mb-2.5">
                    Телефон
                  </div>
                  <a href="tel:+73452521030" className="text-graphite font-heading text-base lg:text-lg leading-tight hover:text-red transition-colors">
                    +7 3452 52 10 30
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5 p-8 lg:p-10 border-b border-beige-dark/15 transition-colors duration-300 hover:bg-white">
                <Mail className="w-6 h-6 text-graphite/60 flex-shrink-0" strokeWidth={1.25} />
                <div>
                  <div className="text-graphite/35 font-body text-xs uppercase tracking-wider mb-2.5">
                    Email
                  </div>
                  <a href="mailto:mshlyapnikov@vostok-motors-chery.ru" className="text-graphite font-heading text-base lg:text-lg leading-tight hover:text-red transition-colors">
                    mshlyapnikov@vostok-motors-chery.ru
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-5 p-8 lg:p-10 transition-colors duration-300 hover:bg-white">
                <Clock className="w-6 h-6 text-graphite/60 flex-shrink-0" strokeWidth={1.25} />
                <div>
                  <div className="text-graphite/35 font-body text-xs uppercase tracking-wider mb-2.5">
                    Режим работы
                  </div>
                  <div className="text-graphite font-heading text-base lg:text-lg leading-tight">
                    Пн–Пт, 8:00–20:00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
