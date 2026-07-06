import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface ReviewsProps {
  language: Language;
}

export default function Reviews({ language }: ReviewsProps) {
  const t = translations[language];
  const isRtl = t.dir === 'rtl';

  return (
    <section
      id="reviews"
      className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.reviews.title}
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {t.reviews.subtitle}
          </p>
        </div>

        {/* Reviews Cards List */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${isRtl ? 'md:flex md:flex-row-reverse' : ''}`}>
          {t.reviews.items.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm relative flex flex-col justify-between group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Star Rating & Quote Accent */}
              <div className={`flex justify-between items-center mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-slate-100 dark:text-slate-800 group-hover:text-brand-gold/20 transition-colors" />
              </div>

              {/* Review Comment */}
              <p className={`text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 italic flex-grow ${isRtl ? 'text-right' : 'text-left'}`}>
                "{review.comment}"
              </p>

              {/* Reviewer Details */}
              <div className={`flex items-center gap-3 border-t border-slate-50 dark:border-slate-800/50 pt-5 mt-auto ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                {/* Avatar Badge */}
                <div className="w-10 h-10 rounded-full bg-brand-blue/10 dark:bg-brand-blue-medium/30 text-brand-blue dark:text-brand-gold flex items-center justify-center font-extrabold text-sm font-display shadow-inner">
                  {review.name.split(' ')[0][0]}
                  {review.name.split(' ')[1]?.[0] || ''}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {review.name}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {review.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
