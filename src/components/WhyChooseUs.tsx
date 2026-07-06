import { motion } from 'motion/react';
import { Shield, Zap, MapPin, Heart, Percent, ThumbsUp } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface WhyChooseUsProps {
  language: Language;
}

export default function WhyChooseUs({ language }: WhyChooseUsProps) {
  const t = translations[language];
  const isRtl = t.dir === 'rtl';

  const features = [
    {
      key: 'secure',
      title: t.whyUs.items.secure.title,
      description: t.whyUs.items.secure.desc,
      icon: Shield,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      key: 'fast',
      title: t.whyUs.items.fast.title,
      description: t.whyUs.items.fast.desc,
      icon: Zap,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      key: 'convenient',
      title: t.whyUs.items.convenient.title,
      description: t.whyUs.items.convenient.desc,
      icon: MapPin,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10',
    },
    {
      key: 'friendly',
      title: t.whyUs.items.friendly.title,
      description: t.whyUs.items.friendly.desc,
      icon: Heart,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      key: 'affordable',
      title: t.whyUs.items.affordable.title,
      description: t.whyUs.items.affordable.desc,
      icon: Percent,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
    },
    {
      key: 'trusted',
      title: t.whyUs.items.trusted.title,
      description: t.whyUs.items.trusted.desc,
      icon: ThumbsUp,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
    },
  ];

  return (
    <section
      id="why-us"
      className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.whyUs.title}
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {t.whyUs.subtitle}
          </p>
        </div>

        {/* Feature Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${isRtl ? 'md:flex md:flex-wrap md:flex-row-reverse md:justify-center' : ''}`}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`flex gap-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all duration-300 ${
                  isRtl ? 'flex-row-reverse text-right' : 'text-left'
                }`}
              >
                {/* Icon Column */}
                <div className={`w-12 h-12 shrink-0 rounded-xl ${feature.bgColor} ${feature.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Content Column */}
                <div className="flex-grow">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {serviceIcon(feature.key)}{feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Custom decorative symbol helper for bullets matching user prompt checkboxes
function serviceIcon(key: string) {
  switch (key) {
    case 'secure':
      return '🛡️ ';
    case 'fast':
      return '⚡ ';
    case 'convenient':
      return '📍 ';
    case 'friendly':
      return '🤝 ';
    case 'affordable':
      return '🏷️ ';
    case 'trusted':
      return '🌍 ';
    default:
      return '✓ ';
  }
}
