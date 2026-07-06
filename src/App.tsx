import { useState, useEffect } from 'react';
import { Language } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import BookStorage from './components/BookStorage';
import WhyChooseUs from './components/WhyChooseUs';
import AboutUs from './components/AboutUs';
import Reviews from './components/Reviews';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppFloating from './components/WhatsAppFloating';

export default function App() {
  // Read initial states from localStorage with safe fallbacks
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('allahardan_lang');
    if (saved === 'en' || saved === 'it' || saved === 'ar' || saved === 'bn') {
      return saved as Language;
    }
    return 'en';
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('allahardan_theme');
    if (saved) return saved === 'dark';
    // Fallback to light mode by default as per guidelines
    return false;
  });

  // Sync state transitions with localStorage
  useEffect(() => {
    localStorage.setItem('allahardan_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('allahardan_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Apply dark mode CSS classes & direction tags on document roots
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('lang', language);
    root.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [language]);

  // Inject Structured LocalBusiness Schema, SEO tags and OG tags dynamically
  useEffect(() => {
    // 1. Injects Local Business Schema (JSON-LD)
    const schemaId = 'allahardan-schema';
    let script = document.getElementById(schemaId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "ALLAHARDAN S.N.C",
      "image": "https://ais-dev-fyobvwmeborr23y5nrmvex-263479024167.europe-west2.run.app/src/assets/images/hero_illustration_1783376429702.jpg",
      "@id": "https://allahardan-snc.com/#store",
      "url": window.location.origin,
      "telephone": "+393511001860",
      "priceRange": "€",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Piazza dei Cinquecento, 48",
        "addressLocality": "Rome",
        "postalCode": "00185",
        "addressCountry": "IT"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 41.90258197123985,
        "longitude": 12.500582076412155
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "08:30",
        "closes": "22:00"
      },
      "sameAs": [
        "https://wa.me/393511001860"
      ]
    });

    // 2. Set Page Title & Meta tags dynamically
    document.title = "ALLAHARDAN S.N.C | Money Transfer & Luggage Storage Rome Termini";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'ALLAHARDAN S.N.C offers international money transfers, quick remittances, and secure monitored luggage storage right outside Roma Termini Station, Italy.'
    );

    // 3. Inject Open Graph tags for premium social embeds
    const ogTags = [
      { property: 'og:title', content: 'ALLAHARDAN S.N.C | Money Transfer & Luggage Storage' },
      { property: 'og:description', content: 'Fast & Secure money remittance and 24/7 CCTV luggage storage in Rome, Piazza dei Cinquecento near Termini Station.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.origin }
    ];

    ogTags.forEach((tag) => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });
  }, [language]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-brand-gold/30 transition-colors duration-300">
      {/* Header Sticky Navigation */}
      <Header
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Sections */}
      <main>
        <Hero language={language} />
        <Services language={language} />
        <BookStorage language={language} />
        <WhyChooseUs language={language} />
        <AboutUs language={language} />
        <Reviews language={language} />
        <Faq language={language} />
        <Contact language={language} />
      </main>

      {/* Footer Details & Compliance */}
      <Footer language={language} />

      {/* Auxiliary Floating Elements */}
      <ScrollToTop />
      <WhatsAppFloating language={language} />
    </div>
  );
}
