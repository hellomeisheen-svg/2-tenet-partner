import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useState } from 'react';
import { HeroEditor } from '../../components/admin/HeroEditor';
import { PrivilegesEditor } from '../../components/admin/PrivilegesEditor';
import { BonusesEditor } from '../../components/admin/BonusesEditor';
import { ServiceCertificateEditor } from '../../components/admin/ServiceCertificateEditor';
import { MomentsEditor } from '../../components/admin/MomentsEditor';
import { TrustEditor } from '../../components/admin/TrustEditor';
import { LeadFormEditor } from '../../components/admin/LeadFormEditor';
import { ContactsEditor } from '../../components/admin/ContactsEditor';
import { LegalEditor } from '../../components/admin/LegalEditor';
import { SEOEditor } from '../../components/admin/SEOEditor';
import { MediaLibrary } from '../../components/admin/MediaLibrary';
import { 
  Monitor, 
  Award, 
  Gift, 
  BadgePercent, 
  Camera, 
  ShieldCheck, 
  FileEdit, 
  MapPin, 
  FileText, 
  Scale, 
  Search, 
  Image as ImageIcon 
} from 'lucide-react';

const SECTIONS = [
  { id: 'hero', label: 'Первый экран', icon: Monitor, component: HeroEditor },
  { id: 'privileges', label: 'Привилегии', icon: Award, component: PrivilegesEditor },
  { id: 'bonuses', label: 'Выбор бонуса', icon: Gift, component: BonusesEditor },
  { id: 'service', label: 'Сертификат', icon: BadgePercent, component: ServiceCertificateEditor },
  { id: 'moments', label: 'Истории', icon: Camera, component: MomentsEditor },
  { id: 'trust', label: 'Доверие', icon: ShieldCheck, component: TrustEditor },
  { id: 'form', label: 'Форма заявки', icon: FileEdit, component: LeadFormEditor },
  { id: 'contacts', label: 'Контакты', icon: MapPin, component: ContactsEditor },
  { id: 'privacy', label: 'Политика', icon: FileText, component: () => <LegalEditor type="privacy" /> },
  { id: 'terms', label: 'Условия', icon: Scale, component: () => <LegalEditor type="terms" /> },
  { id: 'seo', label: 'SEO', icon: Search, component: SEOEditor },
  { id: 'media', label: 'Медиа', icon: ImageIcon, component: MediaLibrary },
];

export const Route = createFileRoute('/admin/content')({
  component: ContentManager,
});

function ContentManager() {
  const [activeSection, setActiveSection] = useState('hero');
  const ActiveComponent = SECTIONS.find(s => s.id === activeSection)?.component || HeroEditor;

  return (
    <AdminLayout title="Управление контентом">
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-2 border-b border-graphite/5 pb-4">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-[10px] font-heading uppercase tracking-widest transition-all cursor-pointer ${
                activeSection === s.id 
                  ? 'bg-red text-white shadow-md' 
                  : 'bg-white text-graphite/40 hover:text-graphite/60 hover:bg-beige-soft'
              }`}
            >
              <s.icon className="w-3.5 h-3.5" />
              {s.label}
            </button>
          ))}
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <ActiveComponent />
        </div>
      </div>
    </AdminLayout>
  );
}
