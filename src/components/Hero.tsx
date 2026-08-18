import { ArrowRight } from 'lucide-react';
import heroDefaultImage from '@/assets/tenet-hero.webp';
import { cn } from '@/lib/utils';

interface HeroProps {
  onCtaClick: () => void;
  content?: {
    title?: string;
    subtitle?: string;
    body?: string;
    button_text?: string;
    image_url?: string;
    image_alt?: string;
  };
}

export function Hero({ onCtaClick, content }: HeroProps) {
  // CMS content loading must be enabled only after PostgreSQL is configured in production.
  // Public components must always preserve static fallback content.
  const title = content?.title || 'Закрытый клуб «TENET для своих»';
  const subtitle = content?.subtitle || 'Партнёрская программа';
  const body = content?.body || 'Для клиентов, пришедших по партнёрской ссылке, действует персональный дополнительный бонус 200 000 ₽ к действующим предложениям от импортёра. Выберите подходящий вариант и получите индивидуальные условия при обращении в дилерский центр.';
  const buttonText = content?.button_text || 'Получить персональное предложение';
  const image = content?.image_url || heroDefaultImage;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-graphite-dark"
    >
      {/* Background image — car pushed to the right half */}
      <div
        className="absolute inset-0 bg-cover animate-ken-burns brightness-110"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundPosition: '60% center',
        }}
      />


      {/* Bottom fade — grounds the section */}
      <div className="absolute inset-0 bg-gradient-to-t from-graphite-dark/95 via-graphite-dark/30 to-transparent" />

      {/* Left safe-zone — solid dark column protecting text area */}
      <div className="absolute inset-0 hero-scrim" />

      {/* Subtle beige warmth layer */}
      <div className="absolute inset-0 hero-warmth" />

      {/* Content — vertically centered, text left-aligned */}
      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12 w-full pt-24">
        <div className="max-w-2xl">
          {/* Pretitle with beige accent line */}
          <div className="flex items-center gap-4 mb-10 animate-fade-in">
            <span className="divider-line !bg-beige/25" />
            <span className="text-beige font-heading text-[11px] tracking-[0.4em] uppercase">
              {subtitle}
            </span>
          </div>

          {/* Hero copy — heading defines width, paragraph follows */}
          <div className="hero-copy">
            <h1 className="hero-title text-white font-display font-black text-[2rem] sm:text-4xl lg:text-[3.75rem] animate-fade-up">
              {title.split('«').map((part, i) => (
                <span key={i} className={cn("hero-title-line", i === 1 && "hero-line-2")}>
                  {i === 1 ? `«${part}` : part}
                </span>
              ))}
            </h1>
            <p className="hero-description text-white/75 font-body text-[15px] lg:text-base leading-[1.8] animate-fade-up" style={{ animationDelay: '0.24s' }}>
              {body}
            </p>
          </div>

          {/* CTA + benefits row */}
          <div className="flex flex-col items-start gap-5 mt-9 lg:mt-10 animate-fade-up" style={{ animationDelay: '0.36s' }}>
            <button
              onClick={onCtaClick}
              className="btn-primary group inline-flex items-center gap-3 bg-red text-white px-9 py-4 rounded-sm font-heading text-sm tracking-[0.05em] will-change-transform"
            >
              {buttonText}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <div className="flex items-center justify-center gap-5 text-white/75 font-body text-[13px] tracking-wide whitespace-nowrap">
              <span>Бонус 200 000 ₽</span>
              <span className="w-px h-3 bg-beige/25" />
              <span>Сертификат 5% на сервис</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom edge — thin beige hairline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-beige/25 to-transparent z-10" />
    </section>
  );
}
