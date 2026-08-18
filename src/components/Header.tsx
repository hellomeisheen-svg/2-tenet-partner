import { ArrowRight } from 'lucide-react';
import { TenetLogo, VostokMotorsLogo } from './Logo';

interface HeaderProps {
  onCtaClick: () => void;
  content?: {
    button_text?: string;
  };
}

export function Header({ onCtaClick, content }: HeaderProps) {
  // CMS content loading must be enabled only after PostgreSQL is configured in production.
  // Public components must always preserve static fallback content.
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-graphite-dark py-5 border-b border-beige/15">
      <div className="max-w-content mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand block — TENET + partner, unified */}
        <a href="#hero" className="flex items-center gap-3 sm:gap-5 lg:gap-7 group">
          <span className="text-white flex items-center h-[10px] sm:h-[12px] lg:h-[15px] transition-opacity duration-300 group-hover:opacity-80">
            <TenetLogo inverted className="h-full w-auto" />
          </span>
          <span className="w-px h-3.5 sm:h-4 lg:h-5 bg-beige/25" />
          <span className="text-white/80 flex items-center h-[11px] sm:h-[14px] lg:h-[17px] transition-opacity duration-300 group-hover:opacity-80">
            <VostokMotorsLogo inverted className="h-full w-auto" />
          </span>
        </a>

        {/* CTA — premium, compact */}
        <button
          onClick={onCtaClick}
          className="btn-primary group hidden md:inline-flex items-center gap-2.5 bg-red hover:bg-red-dark text-white px-6 py-2.5 rounded-sm font-heading text-[13px] tracking-wide transition-all duration-300 hover:gap-3.5"
        >
          {content?.button_text || 'Оставить заявку'}
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </header>
  );
}
