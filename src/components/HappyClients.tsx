import { useState, useId, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { cn } from '../lib/utils';
import happy1 from '../assets/happy-1.jpg';
import happy2 from '../assets/happy-2.jpg';
import happy3 from '../assets/happy-3.jpg';
import happy4 from '../assets/happy-4.jpg';
import happy5 from '../assets/happy-5.jpg';

interface ClientPhoto {
  id: string;
  image_url: string;
  title: string;
  subtitle: string;
  content: string;
  sort_order: number;
}

interface HappyClientsProps {
  items?: ClientPhoto[];
}

const DEFAULT_PHOTOS = [
  {
    id: 'photo-1',
    src: happy1,
    alt: 'Алексей и Мария забрали новый TENET T7',
    name: 'Алексей и Мария',
    city: 'Тюмень',
    model: 'TENET T7 Prestige',
    quote: 'Забрали ключи и сразу поехали в путешествие — машина оправдала все ожидания.',
    rotation: -18,
    x: -90,
    y: -20,
    zIndex: 10,
  },
  {
    id: 'photo-2',
    src: happy2,
    alt: 'Семья Соколовых у нового TENET T8',
    name: 'Семья Соколовых',
    city: 'Екатеринбург',
    model: 'TENET T8 Family',
    quote: 'Дети в восторге от простора, а мы — от плавного хода и тишины в салоне.',
    rotation: -6,
    x: 0,
    y: -35,
    zIndex: 20,
  },
  {
    id: 'photo-3',
    src: happy3,
    alt: 'Дмитрий подписывает договор на TENET T7',
    name: 'Дмитрий',
    city: 'Новосибирск',
    model: 'TENET T7 Business',
    quote: 'Сделка прошла быстро и прозрачно — приятно, когда всё по-человечески.',
    rotation: 8,
    x: 90,
    y: -25,
    zIndex: 30,
  },
  {
    id: 'photo-4',
    src: happy4,
    alt: 'Анна за рулём нового TENET T7',
    name: 'Анна',
    city: 'Челябинск',
    model: 'TENET T7 Comfort',
    quote: 'Первая машина в жизни — и сразу такая. Каждая поездка как маленький праздник.',
  },
  {
    id: 'photo-5',
    src: happy5,
    alt: 'Виктор и Людмила получают ключи от TENET T8',
    name: 'Виктор и Людмила',
    city: 'Пермь',
    model: 'TENET T8 Prestige',
    quote: 'Мечтали о просторном внедорожнике много лет — теперь ездим всей семьёй на дачу.',
  },
];

const transition = {
  type: 'spring' as const,
  stiffness: 160,
  damping: 18,
  mass: 1,
};

export function HappyClients({ items }: HappyClientsProps) {
  // CMS content loading must be enabled only after PostgreSQL is configured in production.
  // Public components must always preserve static fallback content.
  const [isExpanded, setIsExpanded] = useState(false);
  const layoutGroupId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useOutsideClick(containerRef, () => {
    if (isExpanded) setIsExpanded(false);
  });

  const photos = items?.length 
    ? items.map((item, index) => ({
        id: item.id,
        src: item.image_url,
        alt: item.title,
        name: item.title,
        city: item.subtitle?.split('/')[0]?.trim() || 'Город',
        model: item.subtitle?.split('/')[1]?.trim() || 'Модель',
        quote: item.content,
        rotation: index === 0 ? -18 : index === 1 ? -6 : index === 2 ? 8 : 0,
        x: index === 0 ? -90 : index === 1 ? 0 : index === 2 ? 90 : 0,
        y: index === 0 ? -20 : index === 1 ? -35 : index === 2 ? -25 : 0,
        zIndex: index === 0 ? 10 : index === 1 ? 20 : index === 2 ? 30 : 0,
      }))
    : DEFAULT_PHOTOS;

  return (
    <section id="clients" className="bg-white py-24 lg:py-40">
      <div className="max-w-content mx-auto px-6 lg:px-12">
        <LayoutGroup id={layoutGroupId}>
          <div className="w-full flex flex-col items-center">
            <div className="w-full h-12 flex items-center justify-between px-4 mb-2">
              <AnimatePresence>
                {isExpanded && (
                  <motion.button
                    key="back-button"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    onClick={() => setIsExpanded(false)}
                    className="flex items-center gap-2 text-graphite-light hover:text-graphite transition-all group relative z-30"
                  >
                    <div className="p-2 rounded-sm bg-beige-soft group-hover:bg-beige-light transition-colors text-graphite">
                      <ArrowLeft className="w-5 h-5" strokeWidth={1.25} />
                    </div>
                    <span className="font-heading text-sm">Назад</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              ref={containerRef}
              layout
              className={cn(
                'relative w-full',
                isExpanded
                  ? 'grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4'
                  : 'flex flex-col items-center justify-start pt-0',
              )}
              transition={transition}
            >
              <div
                className={cn(
                  'relative',
                  isExpanded
                    ? 'contents'
                    : 'h-[240px] w-full flex items-start justify-center -mt-2 mb-8',
                )}
              >
                {photos.map((photo, index) => {
                  const isPrimary = index < 3;
                  if (!isPrimary && !isExpanded) return null;

                  return (
                    <motion.div
                      key={`card-${photo.id}`}
                      layoutId={`card-container-${photo.id}`}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: !isExpanded ? photo.rotation ?? 0 : 0,
                        x: !isExpanded ? photo.x ?? 0 : 0,
                        y: !isExpanded ? photo.y ?? 0 : 0,
                        zIndex: !isExpanded ? photo.zIndex ?? index : 10,
                      }}
                      transition={transition}
                      whileHover={
                        !isExpanded
                          ? {
                              scale: 1.05,
                              y: (photo.y ?? 0) - 15,
                              rotate: (photo.rotation ?? 0) * 0.8,
                              zIndex: 50,
                              transition: {
                                type: 'spring',
                                stiffness: 400,
                                damping: 25,
                              },
                            }
                          : { scale: 1.02 }
                      }
                      className={cn(
                        'cursor-pointer overflow-hidden bg-beige-soft',
                        isExpanded
                          ? 'relative aspect-square rounded-sm border-4 md:border-[6px] border-white shadow-lg'
                          : 'absolute w-44 h-44 md:w-60 md:h-60 rounded-sm border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)]',
                      )}
                      onClick={() => !isExpanded && setIsExpanded(true)}
                    >
                      <motion.div
                        layoutId={`image-inner-${photo.id}`}
                        layout="position"
                        className="w-full h-full relative"
                        transition={transition}
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover select-none pointer-events-none"
                          loading={isPrimary ? 'eager' : 'lazy'}
                        />
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.3 }}
                            className="hidden md:block absolute inset-x-0 bottom-0 bg-gradient-to-t from-graphite/95 via-graphite/70 to-transparent p-4 md:p-5 text-white"
                          >
                            <div className="flex items-baseline justify-between gap-2 mb-1">
                              <span className="font-heading text-sm md:text-base tracking-tight">
                                {photo.name}
                              </span>
                              <span className="font-body text-[11px] md:text-xs text-white/70">
                                {photo.city}
                              </span>
                            </div>
                            <div className="text-[11px] md:text-xs font-heading uppercase tracking-[0.15em] text-red-light mb-2">
                              {photo.model}
                            </div>
                            <p className="text-[12px] md:text-[13px] leading-snug text-white/85 font-body">
                              «{photo.quote}»
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              <AnimatePresence>
                {!isExpanded && (
                  <motion.div
                    key="stack-content"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center max-w-2xl space-y-8"
                  >
                    <h3 className="text-xl md:text-2xl font-normal tracking-tight text-graphite/90 leading-tight font-body">
                      Каждый автомобиль — это не просто покупка.
                      <br className="hidden md:block" />
                      Это начало новой истории.
                    </h3>

                    <div className="flex justify-center">
                      <button
                        onClick={() => setIsExpanded(true)}
                        className="btn-primary group inline-flex items-center gap-3 bg-red hover:bg-red-dark text-white px-9 py-4 rounded-sm font-heading text-sm tracking-[0.05em] shadow-lg shadow-red/20 hover:shadow-xl hover:shadow-red/25 hover:gap-4"
                      >
                        Смотреть все моменты
                        <ArrowRight
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                          strokeWidth={1.5}
                        />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
