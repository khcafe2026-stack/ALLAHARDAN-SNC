import { motion } from 'motion/react';
import { DollarSign, Briefcase, Compass, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface ServicesProps {
  language: Language;
}

export default function Services({ language }: ServicesProps) {
  const t = translations[language];
  const isRtl = t.dir === 'rtl';

  const services = [
    {
      id: 'money-transfer',
      title: t.services.moneyTransfer.title,
      description: t.services.moneyTransfer.desc,
      icon: DollarSign,
      color: 'from-blue-600 to-indigo-600',
      textColor: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50/50 dark:bg-blue-950/20',
      borderColor: 'hover:border-blue-500/30',
      features: t.services.moneyTransfer.features,
    },
    {
      id: 'luggage-storage',
      title: t.services.luggageStorage.title,
      description: t.services.luggageStorage.desc,
      icon: Briefcase,
      color: 'from-amber-500 to-amber-600',
      textColor: 'text-amber-500 dark:text-amber-400',
      bgColor: 'bg-amber-50/50 dark:bg-amber-950/20',
      borderColor: 'hover:border-amber-500/30',
      features: t.services.luggageStorage.features,
    },
    {
      id: 'tourist-assistance',
      title: t.services.touristAssistance.title,
      description: t.services.touristAssistance.desc,
      icon: Compass,
      color: 'from-emerald-500 to-emerald-600',
      textColor: 'text-emerald-500 dark:text-emerald-400',
      bgColor: 'bg-emerald-50/50 dark:bg-emerald-950/20',
      borderColor: 'hover:border-emerald-500/30',
      features: t.services.touristAssistance.features,
    },
  ];

  return (
    <section
      id="services"
      className="py-20 sm:py-28 bg-white dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.services.title}
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${isRtl ? 'md:flex md:flex-row-reverse' : ''}`}>
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`flex flex-col p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group ${service.borderColor} relative overflow-hidden`}
              >
                {/* Decorative background gradient */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-slate-50/10 dark:to-slate-900/10 rounded-bl-full group-hover:scale-110 transition-transform" />

                {/* Service Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${service.color} text-white shadow-md shadow-slate-100 dark:shadow-none`}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className={`text-xl font-display font-bold text-slate-900 dark:text-white mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                  {service.title}
                </h3>

                {/* Description */}
                <p className={`text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow ${isRtl ? 'text-right' : 'text-left'}`}>
                  {service.description}
                </p>

                {/* Feature Bullet List */}
                <ul className="space-y-3.5 border-t border-slate-50 dark:border-slate-900/50 pt-5">
                  {service.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className={`flex items-start gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 ${
                        isRtl ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${service.textColor}`} />
                      <span className={isRtl ? 'text-right w-full' : 'text-left'}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
