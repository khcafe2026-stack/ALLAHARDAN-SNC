import { motion } from 'motion/react';
import { Users, ShieldAlert, Award } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface AboutUsProps {
  language: Language;
}

export default function AboutUs({ language }: AboutUsProps) {
  const t = translations[language];
  const isRtl = t.dir === 'rtl';

  const statsList = [
    {
      id: 'users',
      value: '25K+',
      label: t.about.stats.users,
      icon: Users,
      color: 'text-blue-500',
    },
    {
      id: 'transfers',
      value: '100K+',
      label: t.about.stats.transfers,
      icon: ShieldAlert,
      color: 'text-amber-500',
    },
    {
      id: 'satisfaction',
      value: '4.9 ★',
      label: t.about.stats.satisfaction,
      icon: Award,
      color: 'text-emerald-500',
    },
  ];

  return (
    <section
      id="about"
      className="py-20 sm:py-28 bg-white dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
            isRtl ? 'lg:flex lg:flex-row-reverse' : ''
          }`}
        >
          {/* Visual stat grid column */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {/* Stat card 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <span className="block text-3xl font-display font-extrabold text-slate-900 dark:text-white">
                  25K+
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {t.about.stats.users}
                </span>
              </motion.div>

              {/* Stat card 2 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-2xl bg-brand-gold/5 border border-brand-gold/10 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold-dark dark:text-brand-gold flex items-center justify-center mx-auto mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <span className="block text-3xl font-display font-extrabold text-slate-900 dark:text-white">
                  4.9 ★
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {t.about.stats.satisfaction}
                </span>
              </motion.div>
            </div>

            <div className="flex flex-col justify-center">
              {/* Stat card 3 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-3">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <span className="block text-3xl font-display font-extrabold text-slate-900 dark:text-white">
                  100%
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Secure & Licensed
                </span>
              </motion.div>
            </div>
          </div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`lg:col-span-7 flex flex-col justify-center ${
              isRtl ? 'text-right' : 'text-left'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.about.title}
            </h2>
            <div className={`w-12 h-1 bg-brand-gold mt-4 rounded-full ${isRtl ? 'ml-auto' : ''}`} />
            <h3 className="mt-4 text-lg font-bold text-brand-blue dark:text-brand-gold-light">
              {t.about.subtitle}
            </h3>

            <p className="mt-6 text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              {t.about.p1}
            </p>

            <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              {t.about.p2}
            </p>

            <div className={`mt-8 ${isRtl ? 'text-right' : 'text-left'}`}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue dark:text-brand-gold hover:underline group"
              >
                <span>{language === 'ar' ? 'تواصل معنا لمعرفة المزيد' : language === 'it' ? 'Contattaci per saperne di più' : language === 'bn' ? 'আরও জানতে যোগাযোগ করুন' : 'Contact us to learn more'}</span>
                <span className={`transform group-hover:translate-x-1 transition-transform duration-150 ${isRtl ? 'rotate-180' : ''}`}>
                  →
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
