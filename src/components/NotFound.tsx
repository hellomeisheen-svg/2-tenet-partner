import { ArrowRight } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';

export function NotFound() {
  return (
    <div className="min-h-screen bg-graphite-dark flex flex-col">
      <Header onCtaClick={() => { window.location.href = '/'; }} />

      <section
        className="relative flex-1 flex items-center justify-center overflow-hidden"
        style={{
          paddingTop: 'calc(var(--header-height) + 48px)',
          paddingBottom: '48px',
          minHeight: 'calc(100vh - var(--header-height))',
        }}
      >
        {/* Vignette + scrim for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-dark via-graphite-dark/80 to-graphite-dark/60" />

        {/* Giant 404 — background graphic element */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-display font-black text-white/[0.025] text-[18rem] sm:text-[24rem] lg:text-[32rem] leading-none tracking-tighter select-none"
        >
          404
        </span>

        {/* Content */}
        <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12 w-full text-center">
          <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
            <span className="divider-line !bg-beige/25" />
            <span className="text-beige font-heading text-[11px] tracking-[0.4em] uppercase">
              TENET
            </span>
            <span className="divider-line !bg-beige/25" />
          </div>

          <h1 className="text-white font-display font-black text-[2.5rem] sm:text-5xl lg:text-[4rem] animate-fade-up">
            Страница не найдена
          </h1>

          <p className="text-white/65 font-body text-base lg:text-lg leading-[1.8] max-w-xl mx-auto mt-7 animate-fade-up" style={{ animationDelay: '0.16s' }}>
            Похоже, ссылка устарела или страница была перемещена.
            Вы можете вернуться на главную страницу или перейти к актуальным предложениям TENET.
          </p>

          {/* Primary CTA */}
          <div className="flex items-center justify-center mt-10 animate-fade-up" style={{ animationDelay: '0.28s' }}>
            <a
              href="/"
              className="btn-primary group inline-flex items-center gap-3 bg-red hover:bg-red-dark text-white px-9 py-4 rounded-sm font-heading text-sm tracking-[0.05em] shadow-lg shadow-red/20 hover:shadow-xl hover:shadow-red/25 hover:gap-4 transition-all duration-300"
            >
              На главную
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Bottom edge — thin beige hairline */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-beige/25 to-transparent z-10" />
      </section>

      <Footer />
    </div>
  );
}
