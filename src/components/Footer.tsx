import { useState } from 'react';
import { Phone, MapPin, MessageSquare, Shield, Info, Clock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const t = translations[language];
  const isRtl = t.dir === 'rtl';

  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-slate-800 pb-12 ${isRtl ? 'md:flex md:flex-row-reverse' : ''}`}>
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#home"
              className={`flex items-center gap-2 font-display text-xl sm:text-2xl font-bold tracking-tight text-white transition-colors duration-200 ${
                isRtl ? 'flex-row-reverse' : ''
              }`}
            >
              <span className="text-brand-gold font-extrabold text-2xl">⚡</span>
              <span>
                ALLAHARDAN <span className="text-brand-gold text-sm sm:text-base">S.N.C</span>
              </span>
            </a>
            <p className={`text-slate-400 text-sm leading-relaxed max-w-sm ${isRtl ? 'text-right' : 'text-left'}`}>
              {t.hero.subtitle}
            </p>
            {/* Quick badges */}
            <div className={`flex flex-wrap gap-2 pt-2 ${isRtl ? 'justify-end' : 'justify-start'}`}>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-300 border border-slate-700">
                <Shield className="w-3 h-3 text-brand-gold" />
                <span>Licensed Agent</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-300 border border-slate-700">
                <Info className="w-3 h-3 text-emerald-500" />
                <span>Termini Station</span>
              </span>
            </div>
          </div>

          {/* Quick links Col */}
          <div className="md:col-span-3 space-y-4">
            <h4 className={`text-sm font-bold uppercase tracking-wider text-slate-100 ${isRtl ? 'text-right' : 'text-left'}`}>
              {language === 'ar' ? 'روابط سريعة' : language === 'it' ? 'Link Rapidi' : language === 'bn' ? 'গুরুত্বপূর্ণ লিংক' : 'Quick Links'}
            </h4>
            <ul className={`space-y-2.5 text-sm ${isRtl ? 'text-right' : 'text-left'}`}>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">
                  {t.nav.whyUs}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {t.nav.faq}
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Phone Col */}
          <div className="md:col-span-4 space-y-4">
            <h4 className={`text-sm font-bold uppercase tracking-wider text-slate-100 ${isRtl ? 'text-right' : 'text-left'}`}>
              {t.footer.mapTitle}
            </h4>
            <ul className={`space-y-3.5 text-sm ${isRtl ? 'text-right' : 'text-left'}`}>
              <li className={`flex gap-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>Piazza dei Cinquecento, 48, 00185 Roma RM, Italy</span>
              </li>
              <li className={`flex gap-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <Phone className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <a href="tel:+393511001860" className="hover:text-white transition-colors">
                  +39 351 100 1860
                </a>
              </li>
              <li className={`flex gap-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <Clock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{t.contact.hoursValue}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Base */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
          <p className={isRtl ? 'text-right' : 'text-left'}>
            © {currentYear} ALLAHARDAN S.N.C. {t.footer.rights}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-white transition-colors underline bg-transparent border-0 cursor-pointer"
            >
              {t.footer.privacy}
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-white transition-colors underline bg-transparent border-0 cursor-pointer"
            >
              {t.footer.terms}
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-2xl w-full rounded-2xl max-h-[80vh] overflow-y-auto p-6 shadow-2xl relative">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              ✕
            </button>

            {modalType === 'privacy' ? (
              <div className="text-slate-800 dark:text-slate-200 space-y-4">
                <h3 className="text-xl font-display font-bold">Privacy Policy</h3>
                <p className="text-xs text-slate-500">Last updated: July 2026</p>
                <p className="text-sm leading-relaxed">
                  ALLAHARDAN S.N.C takes your privacy very seriously. We operate in absolute compliance with the European General Data Protection Regulation (GDPR) and local Italian guidelines regarding financial and identity monitoring.
                </p>
                <h4 className="font-bold text-sm">1. Data Collected</h4>
                <p className="text-sm leading-relaxed">
                  In order to process international money transfers and remittances, we are legally required to verify customer identity. This involves recording your full name, nationality, birth details, valid ID particulars (passport, national identity card, or residence permit), and transaction details.
                </p>
                <h4 className="font-bold text-sm">2. Use of Information</h4>
                <p className="text-sm leading-relaxed">
                  Any collected personal data is used exclusively to facilitate your transfers, prevent fraudulent transactions, comply with anti-money laundering (AML) laws, and guarantee high safety standards for our luggage storage facilities.
                </p>
                <h4 className="font-bold text-sm">3. Storage Safety</h4>
                <p className="text-sm leading-relaxed">
                  Luggage checked into our facilities is logged with receipt identifiers. CCTV monitoring data is kept secure and recycled in compliance with standard safety and privacy frameworks. We do not sell or lease any user details.
                </p>
              </div>
            ) : (
              <div className="text-slate-800 dark:text-slate-200 space-y-4">
                <h3 className="text-xl font-display font-bold">Terms of Service</h3>
                <p className="text-xs text-slate-500">Last updated: July 2026</p>
                <p className="text-sm leading-relaxed">
                  Welcome to the terms of service of ALLAHARDAN S.N.C, located in Piazza dei Cinquecento, 48, Rome, Italy. By purchasing or booking any services from us, you agree to abide by the following terms.
                </p>
                <h4 className="font-bold text-sm">1. Money Remittance Service</h4>
                <p className="text-sm leading-relaxed">
                  All money transfer services are subject to identity checks and regulatory approval. Taps, commissions, and speeds are clearly stated at checkout prior to processing. Transactions cannot be cancelled once processed and paid.
                </p>
                <h4 className="font-bold text-sm">2. Luggage Storage</h4>
                <p className="text-sm leading-relaxed">
                  Customers must check in luggage only with valid tags and receipts. We do not store hazardous, illegal, perishable, or highly fragile items. Storage is billed according to agreed hourly or daily rates. Luggage must be collected during business hours (08:30 AM to 10:00 PM).
                </p>
                <h4 className="font-bold text-sm">3. Liability Limits</h4>
                <p className="text-sm leading-relaxed">
                  While our storage room is locked and under continuous video camera coverage, customers are advised not to leave cash or luxury valuables in their suitcases. ALLAHARDAN S.N.C is not liable for minor external package wear and tear.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
