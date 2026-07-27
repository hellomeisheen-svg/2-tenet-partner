import { useState, useId, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { cn } from '../lib/utils';

type Photo = {
  id: string;
  src: string;
  alt: string;
  rotation?: number;
  x?: number;
  y?: number;
  zIndex?: number;
};

const PHOTOS: Photo[] = [
  {
    id: 'photo-1',
    src: '/tenet-hero-car.png',
    alt: 'Счастливый клиент с новым автомобилем — Алексей, Тюмень',
    rotation: -18,
    x: -90,
    y: -20,
    zIndex: 10,
  },
  {
    id: 'photo-2',
    src: '/tenet-hero-car.png',
    alt: 'Радость покупки — Марина и Сергей',
    rotation: -6,
    x: 0,
    y: -35,
    zIndex: 20,
  },
  {
    id: 'photo-3',
    src: '/tenet-hero-car.png',
    alt: 'Первый день с новой машиной — Дмитрий',
    rotation: 8,
    x: 90,
    y: -25,
    zIndex: 30,
  },
  {
    id: 'photo-5',
    src: '/tenet-hero-car.png',
    alt: 'Счастливая семья с автомобилем — Анна и Виктор',
  },
  {
    id: 'photo-6',
    src: '/tenet-hero-car.png',
    alt: 'Довольный владелец — Павел',
  },
];

const transition = {
  type: 'spring' as const,
  stiffness: 160,
  damping: 18,
  mass: 1,
};

export function HappyClients() {
  const [isExpanded, setIsExpanded] = useState(false);
  const layoutGroupId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(containerRef, () => {
    if (isExpanded) setIsExpanded(false);
  });

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
                    className="flex items-center gap-2 text-graphite-light hover:text-graphite transition-all group z-50"
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
                {PHOTOS.map((photo, index) => {
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
