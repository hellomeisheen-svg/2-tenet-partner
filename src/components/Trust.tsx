import { ShieldCheck, Headphones, Tag, Wrench } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { TenetLogo, VostokMotorsLogo } from './Logo';

const trustPoints = [
  {
    icon: ShieldCheck,
    title: 'Официальный дилерский центр TENET',
    description: 'Полное официальное сопровождение покупки и обслуживания автомобиля.',
  },
  {
    icon: Headphones,
    title: 'Персональное сопровождение по заявке',
    description: 'Закреплённый менеджер поможет на каждом этапе — от выбора до выдачи.',
  },
  {
    icon: Tag,
    title: 'Прямая скидка от дилера',
    description: 'Дополнительный бонус 200 000 ₽ от дилера поверх акций импортёра.',
  },
  {
    icon: Wrench,
    title: 'Удобный сервис и консультация',
    description: 'Сертификат 5% на все услуги сервисного центра, помощь в подборе условий.',
  },
];

export function Trust() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="trust" className="bg-beige-soft py-24 lg:py-40">
      <div ref={ref} className="max-w-content mx-auto px-6 lg:px-12">
        <div className={`max-w-2xl mb-16 mx-auto text-center ${visible ? 'is-visible' : 'reveal'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="divider-line" />
            <span className="text-red font-heading text-[11px] tracking-[0.4em] uppercase">
              Доверие
            </span>
            <span className="divider-line" />
          </div>
          <h2 className="text-graphite font-display font-black text-[2.25rem] sm:text-[2.75rem] lg:text-[3.5rem]">
            Почему клиенты обращаются в «Восток Моторс»
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-px bg-beige-dark/15 mb-20">
          {trustPoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <div
                key={i}
                className={`flex items-start gap-6 p-10 lg:p-14 bg-beige-soft border-t border-l border-r border-beige-dark/15 last:border-b sm:border-0 transition-all duration-700 hover:bg-white ${visible ? 'is-visible' : 'reveal'} reveal-delay-${(i % 4) + 1}`}
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-graphite/60">
                  <Icon className="w-6 h-6" strokeWidth={1.25} />
                </div>
                <div>
                  <h3 className="text-graphite font-heading text-lg lg:text-xl mb-3 leading-tight">
                    {point.title}
                  </h3>
                  <p className="text-graphite-light font-body text-sm lg:text-base leading-[1.75]">
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand logos */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-16 lg:gap-24 pt-16 border-t border-graphite/10 ${visible ? 'is-visible' : 'reveal'} reveal-delay-3`}>
          <div className="text-center">
            <div className="text-graphite text-[1.75rem] lg:text-3xl mb-3 flex justify-center">
              <TenetLogo className="!w-40 !h-auto sm:!w-auto sm:!h-[1em]" />
            </div>
            <div className="text-graphite/35 font-body text-xs tracking-[0.25em] uppercase">
              Автомобильный бренд
            </div>
          </div>
          <div className="hidden sm:block w-px h-14 bg-graphite/15" />
          <div className="text-center">
            <div className="text-graphite text-[1.75rem] lg:text-3xl mb-3 flex justify-center">
              <VostokMotorsLogo className="!w-40 !h-auto sm:!w-auto sm:!h-[1em]" />
            </div>
            <div className="text-graphite/35 font-body text-xs tracking-[0.25em] uppercase">
              Официальный дилер
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
