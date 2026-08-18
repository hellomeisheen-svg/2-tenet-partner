import { motion } from 'motion/react';

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
  { src: '', alt: 'GWM', width: 140 },
  { src: '', alt: 'Haval', width: 120 },
  { src: '', alt: 'Tank', width: 100 },
  { src: '', alt: 'Ora', width: 90 },
  { src: '', alt: 'Poer', width: 110 },
];

export function Trust({ items }: TrustProps) {
  // CMS content loading must be enabled only after PostgreSQL is configured in production.
  // Public components must always preserve static fallback content.
  const logos = items && items.length > 0
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
            {logos.length > 0 && logos.some(l => l.src) ? logos.filter(l => l.src).map((logo, index) => (
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
                  style={{ width: (logo as any).width }}
                  className="h-auto block"
                />
              </motion.div>
            )) : (
              <div className="flex gap-8 text-graphite/20 font-heading text-xl font-bold italic uppercase tracking-widest">
                <span>GWM</span>
                <span>HAVAL</span>
                <span>TANK</span>
                <span>ORA</span>
                <span>POER</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
