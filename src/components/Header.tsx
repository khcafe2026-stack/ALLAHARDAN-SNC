import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Languages, ChevronDown, Phone } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Header({ language, setLanguage, darkMode, setDarkMode }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = translations[language];
  const isRtl = t.dir === 'rtl';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.bookSpace, href: '#book-space' },
    { label: t.nav.whyUs, href: '#why-us' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.reviews, href: '#reviews' },
    { label: t.nav.faq, href: '#faq' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const languagesList: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
  ];

  const currentLangObj = languagesList.find((l) => l.code === language) || languagesList[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-slate-950/95 shadow-md backdrop-blur-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <a
            href="#home"
            className={`flex items-center gap-2 font-display text-xl sm:text-2xl font-bold tracking-tight text-brand-blue-dark dark:text-white transition-colors duration-200 ${
              isRtl ? 'flex-row-reverse' : ''
            }`}
          >
            <span className="text-brand-gold font-extrabold text-2xl">⚡</span>
            <span>
              ALLAHARDAN <span className="text-brand-gold text-sm sm:text-base">S.N.C</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center gap-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-brand-gold transition-colors duration-150"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Settings & CTA */}
          <div className={`hidden lg:flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                aria-label="Switch Language"
              >
                <Languages className="w-4 h-4 text-slate-500" />
                <span>{currentLangObj.flag} {currentLangObj.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {langMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <div
                    className={`absolute mt-2 w-40 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 py-1.5 z-20 ${
                      isRtl ? 'left-0' : 'right-0'
                    }`}
                  >
                    {languagesList.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                          language === lang.code ? 'font-bold text-brand-blue dark:text-brand-gold bg-slate-50 dark:bg-slate-800/30' : ''
                        } ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-brand-gold" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* CTA Button */}
            <a
              href="tel:+393511001860"
              className="flex items-center gap-2 bg-brand-blue dark:bg-brand-blue-medium hover:bg-brand-blue-light text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              <span>+39 351 100 1860</span>
            </a>
          </div>

          {/* Mobile Buttons Panel */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Dark Mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-brand-gold" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Language Switcher button */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                aria-label="Switch Language"
              >
                <Languages className="w-4 h-4" />
              </button>

              {langMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <div
                    className="absolute right-0 mt-2 w-40 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 py-1.5 z-20"
                  >
                    {languagesList.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                          language === lang.code ? 'font-bold text-brand-blue dark:text-brand-gold' : ''
                        }`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 focus:outline-none"
              aria-label="Main menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 px-4 pt-4 pb-6 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all ${
                  isRtl ? 'text-right' : 'text-left'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-900 flex flex-col gap-3">
            <a
              href="tel:+393511001860"
              className="flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-light text-white py-3 rounded-xl font-semibold shadow-sm transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>{t.hero.callNow}: +39 351 100 1860</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
