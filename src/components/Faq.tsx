import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface FaqProps {
  language: Language;
}

export default function Faq({ language }: FaqProps) {
  const t = translations[language];
  const isRtl = t.dir === 'rtl';

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-20 sm:py-28 bg-white dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.faq.title}
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {t.faq.items.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 overflow-hidden transition-all duration-200"
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`w-full p-5 flex items-center justify-between gap-4 font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${
                    isRtl ? 'flex-row-reverse text-right' : 'text-left'
                  }`}
                  aria-expanded={isOpen}
                >
                  <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <HelpCircle className="w-5 h-5 text-brand-blue shrink-0 dark:text-brand-gold" />
                    <span className="text-base sm:text-lg">{item.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transform transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Accordion Panel with Smooth AnimatePresence */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className={`px-5 pb-5 pt-1 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400 border-t border-slate-50 dark:border-slate-900/40 ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}>
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
