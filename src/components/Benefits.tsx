import { Tag, Gift, Wrench } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const cards = [
  {
    icon: Tag,
    title: 'Денежная выгода 200 000 ₽',
    description:
      'Прямая дополнительная скидка от дилера при покупке автомобиля TENET по программе «TENET для своих».',
    badge: '01',
  },
  {
    icon: Gift,
    title: 'Доп. оборудование на 200 000 ₽',
    description:
      'Комплект полезного дополнительного оборудования и услуг на сумму 200 000 ₽ для вашего автомобиля.',
    badge: '02',
  },
  {
    icon: Wrench,
    title: 'Сертификат 5% на сервис',
    description:
      'Сертификат действует на все услуги сервисного центра и суммируется с другими предложениями дилера.',
    badge: '03',
  },
];

export function Benefits() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="benefits" className="bg-beige-soft py-24 lg:py-40">
      <div ref={ref} className="max-w-content mx-auto px-6 lg:px-12">
        <div className={`max-w-2xl mb-16 mx-auto text-center ${visible ? 'is-visible' : 'reveal'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="divider-line" />
            <span className="text-red font-heading text-[11px] tracking-[0.4em] uppercase">
              Привилегии
            </span>
            <span className="divider-line" />
          </div>
          <h2 className="text-graphite font-display font-black text-[2.25rem] sm:text-[2.75rem] lg:text-[3.5rem]">
            Ваши привилегии в клубе
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-px bg-beige-dark/15">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className={`group bg-beige-soft p-10 lg:p-14 border-t border-l border-r border-beige-dark/15 last:border-b lg:border-0 transition-all duration-700 hover:bg-white ${visible ? 'is-visible' : 'reveal'} reveal-delay-${i + 1}`}
              >
                <div className="flex items-start justify-between mb-12">
                  <span className="text-graphite/15 font-display font-black text-4xl lg:text-5xl leading-none">
                    {card.badge}
                  </span>
                  <div className="w-11 h-11 flex items-center justify-center text-graphite/70 transition-colors duration-500 group-hover:text-red">
                    <Icon className="w-6 h-6" strokeWidth={1.25} />
                  </div>
                </div>
                <h3 className="text-graphite font-heading text-xl lg:text-2xl mb-5 leading-tight">
                  {card.title}
                </h3>
                <p className="text-graphite-light font-body text-base leading-[1.75]">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className={`mt-14 text-center text-graphite/40 font-body text-xs leading-[1.75] ${visible ? 'is-visible' : 'reveal'} reveal-delay-4`}>
          Акция действует до 31.12.2026
        </p>
      </div>
    </section>
  );
}
