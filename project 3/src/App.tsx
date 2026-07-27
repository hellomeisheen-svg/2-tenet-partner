import { useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { BonusChoice } from './components/BonusChoice';
import { Certificate } from './components/Certificate';
import { HappyClients } from './components/HappyClients';
import { Trust } from './components/Trust';
import { LeadForm } from './components/LeadForm';
import { Contacts } from './components/Contacts';
import { Footer } from './components/Footer';
import { NotFound } from './components/NotFound';
import { Terms } from './components/Terms';

export default function App() {
  const scrollToForm = useCallback(() => {
    const el = document.getElementById('form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const path = window.location.pathname;
  const isTerms = path === '/terms' || path === '/terms/';
  const is404 = !isTerms && path !== '/' && path !== '/index.html';

  if (isTerms) {
    return <Terms />;
  }

  if (is404) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onCtaClick={scrollToForm} />
      <Hero onCtaClick={scrollToForm} />
      <Benefits />
      <BonusChoice onCtaClick={scrollToForm} />
      <Certificate onCtaClick={scrollToForm} />
      <HappyClients />
      <Trust />
      <LeadForm />
      <Contacts />
      <Footer />
    </div>
  );
}
