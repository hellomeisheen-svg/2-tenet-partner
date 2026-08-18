import { motion } from 'motion/react';
import logoGwm from '../assets/logo-gwm.svg';
import logoHaval from '../assets/logo-haval.svg';
import logoTank from '../assets/logo-tank.svg';
import logoOra from '../assets/logo-ora.svg';
import logoPoer from '../assets/logo-poer.svg';

interface TrustLogo {
  id: string;
  image_url: string;
  title: string;
  sort_order: number;
}

interface TrustProps {
  items?: TrustLogo[];
}

const DEFAULT_LOGOS = [
  { src: logoGwm, alt: 'GWM', width: 140 },
  { src: logoHaval, alt: 'Haval', width: 120 },
  { src: logoTank, alt: 'Tank', width: 100 },
  { src: logoOra, alt: 'Ora', width: 90 },
  { src: logoPoer, alt: 'Poer', width: 110 },
];

export function Trust({ items }: TrustProps) {
  const logos = items?.length
    ? items.map(item => ({
        src: item.image_url,
        alt: item.title,
        width: 120
      }))
    : DEFAULT_LOGOS;

  return (
    <section className="bg-beige-soft py-20 lg:py-28 border-y border-beige-dark/10 overflow-hidden">
      <div className="max-w-content mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          <div className="max-w-xs text-center md:text-left">
            <h3 className="text-graphite font-heading text-xl lg:text-2xl mb-4 leading-tight">
              Нам доверяют лучшие
            </h3>
            <p className="text-graphite-light font-body text-sm leading-relaxed">
              Официальный партнёр крупнейших мировых брендов в регионе.
            </p>
          </div>

          <div className="flex-1 flex flex-wrap items-center justify-center md:justify-end gap-x-12 lg:gap-x-20 gap-y-10">
            {logos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{ width: logo.width }}
                  className="h-auto block"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
