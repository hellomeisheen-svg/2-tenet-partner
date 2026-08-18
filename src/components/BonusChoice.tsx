import { Check, ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

type EquipmentItem = { label: string };
type EquipmentGroup = { category: string; items: EquipmentItem[] };

const equipmentGroups: EquipmentGroup[] = [
  {
    category: 'Защита кузова',
    items: [
      { label: 'Тонировка задней полусферы' },
      { label: 'Сетка в передний бампер для защиты радиатора' },
      { label: 'Антикор и шумоизоляционное покрытие днища' },
      { label: 'Брызговики' },
    ],
  },
  {
    category: 'Комфорт и безопасность',
    items: [
      { label: 'Ковры в салон и багажник' },
      { label: 'Защита картера двигателя' },
      { label: 'Набор автомобилиста' },
      { label: 'Сигнализация с автозапуском' },
    ],
  },
];

export function BonusChoice({ onCtaClick }: { onCtaClick: () => void }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="bonus" className="bg-white py-24 lg:py-40">
      {/* CMS content loading must be enabled only after PostgreSQL is configured in production.
          Public components must always preserve static fallback content. */}
      <div ref={ref} className="max-w-content mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className={`max-w-3xl mb-20 mx-auto text-center ${visible ? 'is-visible' : 'reveal'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="divider-line" />
            <span className="text-red font-heading text-[11px] tracking-[0.4em] uppercase">
              Выбор бонуса
            </span>
            <span className="divider-line" />
          </div>
          <h2 className="text-graphite font-display font-black text-[2.25rem] sm:text-[2.75rem] lg:text-[3.5rem] mb-8">
            Выберите свой персональный бонус
          </h2>
          <p className="text-graphite-light font-body text-base lg:text-lg leading-[1.75] max-w-2xl mx-auto">
            По условиям закрытого клуба «TENET для своих» вы получаете право
            выбора персонального бонуса при покупке автомобиля.
          </p>
        </div>

        {/* Two premium option cards */}
        <div className="relative flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-6">
          {/* ── Variant 01 — Dark ── */}
          <div
            className={`relative bg-graphite-dark text-white overflow-hidden rounded-sm transition-all duration-700 hover:shadow-2xl hover:shadow-graphite/30 ${visible ? 'is-visible' : 'reveal'} reveal-delay-1`}
          >
            {/* Watermark number */}
            <span className="absolute -top-12 -right-2 font-display font-black text-[10rem] lg:text-[12rem] leading-none text-white/[0.03] select-none pointer-events-none">
              01
            </span>

            <div className="relative p-10 lg:p-14 flex flex-col h-full">
              {/* Label */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-beige font-heading text-[11px] tracking-[0.3em] uppercase">
                  Вариант 01
                </span>
                <span className="h-px w-10 bg-beige/25" />
              </div>

              {/* Title */}
              <h3 className="font-display font-black text-2xl lg:text-[1.9rem] mb-4 leading-[1.1] max-w-md">
                Дополнительное оборудование под ключ
              </h3>

              {/* Description */}
              <p className="text-white/40 font-body text-sm lg:text-[15px] mb-9 leading-[1.75] max-w-md">
                Мы полностью укомплектуем ваш автомобиль полезными опциями,
                которые сделают поездки комфортнее, а кузов — защищённым.
              </p>

              {/* Equipment groups */}
              <div className="space-y-8 mb-10 flex-1">
                {equipmentGroups.map((group, gi) => (
                  <div key={gi}>
                    {/* Group label */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-heading text-[10px] tracking-[0.25em] uppercase text-beige/45">
                        {group.category}
                      </span>
                      <span className="h-px flex-1 bg-beige/25" />
                    </div>
                    {/* Items */}
                    <ul className="flex flex-col gap-3">
                      {group.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-white/55 font-body text-[13px] lg:text-[13.5px] leading-snug"
                        >
                          <span className="flex-shrink-0 w-3.5 h-3.5 mt-[3px] flex items-center justify-center">
                            <Check className="w-3 h-3 text-beige/70" strokeWidth={2.5} />
                          </span>
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Value footer */}
              <div className="flex items-center justify-between pt-5 border-t border-beige/15 mt-auto">
                <span className="font-heading text-[11px] tracking-[0.2em] uppercase text-beige/50">
                  Стоимость комплекта
                </span>
                <span className="font-display font-black text-xl lg:text-2xl text-beige">
                  200 000 ₽
                </span>
              </div>
            </div>
          </div>

          {/* Mobile divider */}
          <div className="lg:hidden flex items-center justify-center gap-3 py-1">
            <span className="h-px w-12 bg-graphite/10" />
            <span className="font-heading text-[10px] tracking-[0.3em] uppercase text-graphite/25">
              или
            </span>
            <span className="h-px w-12 bg-graphite/10" />
          </div>

          {/* ── Variant 02 — Light ── */}
          <div
            className={`relative bg-beige-soft text-graphite overflow-hidden rounded-sm transition-all duration-700 hover:shadow-2xl hover:shadow-graphite/10 ${visible ? 'is-visible' : 'reveal'} reveal-delay-2`}
          >
            {/* Watermark number */}
            <span className="absolute -top-12 -right-2 font-display font-black text-[10rem] lg:text-[12rem] leading-none text-graphite/[0.035] select-none pointer-events-none">
              02
            </span>

            <div className="relative p-10 lg:p-14 flex flex-col h-full">
              {/* Label */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-red font-heading text-[11px] tracking-[0.3em] uppercase">
                  Вариант 02
                </span>
                <span className="h-px w-10 bg-red/25" />
              </div>

              {/* Title */}
              <h3 className="font-display font-black text-2xl lg:text-[1.9rem] mb-4 leading-[1.1] max-w-md">
                <span className="block">Дисконт</span>
                <span className="block">на 200 000 ₽</span>
              </h3>

              {/* Description */}
              <p className="text-graphite-light font-body text-sm lg:text-[15px] mb-9 leading-[1.75] max-w-md">
                Вы можете получить прямую скидку от дилера и самостоятельно
                распорядиться сэкономленными средствами.
              </p>

              {/* Price display — centered for visual balance with left card's list */}
              <div className="flex flex-col items-center justify-center text-center flex-1 mb-10">
                <span className="font-heading text-[11px] tracking-[0.2em] uppercase text-graphite/40 block mb-5">
                  Прямая скидка от дилера
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-5xl lg:text-[4.5rem] text-graphite leading-none tracking-tight">
                    200 000
                  </span>
                  <span className="font-heading text-2xl text-graphite/45">₽</span>
                </div>
                <p className="text-graphite/45 font-body text-[13px] lg:text-sm leading-[1.75] max-w-sm mt-6">
                  Прямая денежная скидка от дилера «TENET Восток Моторс» на покупку
                  автомобиля. Суммируется со всеми действующими акциями импортёра.
                </p>
              </div>

              {/* Value footer */}
              <div className="flex items-center justify-between pt-5 border-t border-graphite/15 mt-auto">
                <span className="font-heading text-[11px] tracking-[0.2em] uppercase text-graphite/40">
                  Ваша выгода
                </span>
                <span className="font-display font-black text-xl lg:text-2xl text-graphite">
                  200 000 ₽
                </span>
              </div>
            </div>
          </div>

          {/* Desktop central "или" divider — subtle vertical line with small label */}
          <div className="hidden lg:flex absolute left-1/2 top-12 bottom-12 -translate-x-1/2 items-center justify-center z-10 pointer-events-none">
            <div className="relative h-full flex items-center">
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-graphite/[0.06]" />
              <div className="relative bg-white px-4 py-3">
                <span className="font-heading text-[10px] tracking-[0.3em] uppercase text-graphite/20">
                  или
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`mt-16 flex flex-col items-center gap-8 ${visible ? 'is-visible' : 'reveal'} reveal-delay-3`}>
          <button
            onClick={onCtaClick}
            className="btn-primary group inline-flex items-center gap-3 bg-red hover:bg-red-dark text-white px-9 py-4 rounded-sm font-heading text-sm tracking-[0.05em] shadow-lg shadow-red/20 hover:shadow-xl hover:shadow-red/25 hover:gap-4"
          >
            Выбрать бонус и оставить заявку
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <p className="max-w-3xl text-center text-graphite/35 font-body text-xs leading-[1.75]">
            Подробные условия — в разделе{' '}
            <a href="/terms" className="text-graphite/60 underline hover:text-graphite transition-colors">
              Условия акции
            </a>
            . Не является публичной офертой.
          </p>
        </div>
      </div>
    </section>
  );
}
