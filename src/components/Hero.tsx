import { motion } from 'motion/react';
import { Phone, MapPin, MessageSquare } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import heroIllustration from '../assets/images/hero_illustration_1783376429702.jpg';

interface HeroProps {
  language: Language;
}

export default function Hero({ language }: HeroProps) {
  const t = translations[language];
  const isRtl = t.dir === 'rtl';

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300 flex items-center"
    >
      {/* Background elegant circles/gradients */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-gold/5 dark:bg-brand-gold/2 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-blue/5 dark:bg-brand-blue/2 rounded-full filter blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
            isRtl ? 'lg:flex lg:flex-row-reverse' : ''
          }`}
        >
          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`lg:col-span-7 flex flex-col justify-center ${
              isRtl ? 'text-right lg:items-end' : 'text-left lg:items-start'
            }`}
          >
            {/* Status pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-gold/10 text-brand-gold-dark dark:text-brand-gold dark:bg-brand-gold/5 mb-6 border border-brand-gold/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              <span>Roma Termini Station Shop</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
              {t.hero.title.split('Rome')[0]}
              <span className="text-brand-blue dark:text-brand-gold-light">
                {isRtl ? 'روما' : 'Rome'}
              </span>
              {t.hero.title.split('Rome')[1] || ''}
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* Call to Actions */}
            <div
              className={`mt-10 flex flex-wrap gap-4 w-full ${
                isRtl ? 'justify-start lg:justify-end flex-row-reverse' : 'justify-start'
              }`}
            >
              {/* Call Button */}
              <a
                href="tel:+393511001860"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-blue-medium to-brand-blue text-white font-bold shadow-lg shadow-brand-blue/25 dark:shadow-none hover:shadow-xl hover:scale-102 transition-all duration-200"
              >
                <Phone className="w-5 h-5 text-brand-gold" />
                <span>{t.hero.callNow}</span>
              </a>

              {/* Directions Button */}
              <a
                href="https://maps.google.com/?q=Piazza+dei+Cinquecento+48+00185+Roma+RM+Italy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-102 transition-all duration-200"
              >
                <MapPin className="w-5 h-5 text-brand-blue" />
                <span>{t.hero.getDirections}</span>
              </a>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/393511001860"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#25D366] text-white font-bold shadow-lg shadow-green-500/20 hover:bg-[#20ba56] hover:scale-102 transition-all duration-200"
              >
                <MessageSquare className="w-5 h-5 fill-white text-[#25D366]" />
                <span>{t.hero.whatsapp}</span>
              </a>
            </div>

            {/* Service Tags */}
            <div
              className={`mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-100 dark:border-slate-800 pt-8 w-full ${
                isRtl ? 'justify-start lg:justify-end flex-row-reverse' : 'justify-start'
              }`}
            >
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="text-brand-gold font-bold">✓</span>
                <span>{translations[language].services.moneyTransfer.title}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="text-brand-gold font-bold">✓</span>
                <span>{translations[language].services.luggageStorage.title}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="text-brand-gold font-bold">✓</span>
                <span>{translations[language].services.touristAssistance.title}</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            {/* Visual Frame */}
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none rounded-3xl overflow-hidden shadow-2xl dark:shadow-brand-blue-dark/20 border-4 border-white dark:border-slate-800 transform hover:rotate-1 transition-all duration-300">
              <img
                src={heroIllustration}
                alt="ALLAHARDAN SNC Rome Financial & Luggage Services"
                className="w-full h-auto object-cover select-none"
                referrerPolicy="no-referrer"
              />
              {/* Elegant golden overlay accent */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
            </div>

            {/* Small Floating Card */}
            <div
              className={`absolute -bottom-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 animate-bounce-slow ${
                isRtl ? '-left-4' : '-right-4'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                ⭐⭐⭐⭐⭐
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  Trusted Partner
                </p>
                <p className="text-[10px] text-slate-400">Licensed Money Transfer Agent</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
