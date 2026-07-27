import { MapPin, Phone, Clock } from 'lucide-react';
import { TenetLogo, VostokMotorsLogo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-graphite-dark text-white pt-20 lg:pt-24 pb-10">
      <div className="max-w-content mx-auto px-6 lg:px-12">
        {/* Top: logos + contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pb-14 border-b border-beige/15">
          {/* Logos */}
          <div className="space-y-4">
            <div className="flex items-center h-[18px]">
              <TenetLogo inverted className="h-full w-auto" />
            </div>
            <div className="flex items-center h-[12px]">
              <VostokMotorsLogo inverted className="h-full w-auto" />
            </div>
            <p className="text-white/35 font-body text-xs leading-[1.75] pt-3 max-w-xs">
              Официальный дилерский центр TENET. Партнёрская программа
              «TENET для своих».
            </p>
          </div>

          {/* Address */}
          <div>
            <div className="flex items-center gap-2 text-beige font-heading text-xs uppercase tracking-[0.2em] mb-5">
              <MapPin className="w-3.5 h-3.5" /> Адрес
            </div>
            <p className="text-white/65 font-body text-sm leading-[1.75]">
              625022, РФ, Тюменская область,
              <br />
              г. Тюмень, ул. Алебашевская, д. 11,
              <br />
              этаж 1, помещение 38
            </p>
          </div>

          {/* Phone */}
          <div>
            <div className="flex items-center gap-2 text-beige font-heading text-xs uppercase tracking-[0.2em] mb-5">
              <Phone className="w-3.5 h-3.5" /> Телефон
            </div>
            <a
              href="tel:+73452521030"
              className="text-white/65 font-body text-sm hover:text-white transition-colors block mb-3"
            >
              +7 3452 52 10 30
            </a>
            <div className="flex items-center gap-2 text-white/35 font-body text-xs">
              <Clock className="w-3.5 h-3.5" /> Пн–Пт, 8:00–20:00
            </div>
          </div>

          {/* Legal */}
          <div>
            <div className="text-beige font-heading text-xs uppercase tracking-[0.2em] mb-5">
              Документы
            </div>
            <ul className="space-y-3">
              <li>
                <a href="#privacy" className="text-white/65 font-body text-sm hover:text-white transition-colors">
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href="/terms" className="text-white/65 font-body text-sm hover:text-white transition-colors">
                  Условия акции
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-5 text-white/25 font-body text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>
              © {new Date().getFullYear()} TENET Восток Моторс. Все права защищены.
            </span>
            <span className="hidden sm:inline text-white/15">·</span>
            <span className="flex items-center gap-1.5 flex-wrap justify-center">
              Сайт разработан&nbsp;—
              <a
                href="https://t.me/ksenny_designer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/35 hover:text-beige transition-colors duration-200"
              >
                CUBIK
              </a>
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-1 h-1 rounded-full bg-red" />
            Закрытый клуб «TENET для&nbsp;своих»
          </div>
        </div>
      </div>
    </footer>
  );
}
