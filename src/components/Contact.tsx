import { useState, FormEvent } from 'react';
import { MapPin, Phone, Clock, Send, MessageSquare, Map, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface ContactProps {
  language: Language;
}

export default function Contact({ language }: ContactProps) {
  const t = translations[language];
  const isRtl = t.dir === 'rtl';

  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitted(true);
    setFormState({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 6000);
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.contact.title}
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {t.contact.subtitle}
          </p>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start ${isRtl ? 'lg:flex lg:flex-row-reverse' : ''}`}>
          {/* Contact Details & Map Card (Col 5) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Contact Cards */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
              {/* Address detail */}
              <div className={`flex gap-4 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t.contact.address}
                  </h4>
                  <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 mt-1">
                    ALLAHARDAN S.N.C<br />
                    Piazza dei Cinquecento, 48<br />
                    00185 Roma RM, Italy
                  </p>
                </div>
              </div>

              {/* Phone detail */}
              <div className={`flex gap-4 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <div className="w-10 h-10 shrink-0 rounded-xl bg-amber-500/10 text-brand-gold flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t.contact.phone}
                  </h4>
                  <a
                    href="tel:+393511001860"
                    className="text-sm sm:text-base font-semibold text-brand-blue dark:text-brand-gold hover:underline block mt-1"
                  >
                    +39 351 100 1860
                  </a>
                </div>
              </div>

              {/* Hours detail */}
              <div className={`flex gap-4 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t.contact.hours}
                  </h4>
                  <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 mt-1">
                    {t.contact.hoursValue}
                  </p>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className={`flex flex-wrap gap-3 pt-4 border-t border-slate-50 dark:border-slate-800/50 ${isRtl ? 'justify-end' : 'justify-start'}`}>
                <a
                  href="tel:+393511001860"
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 rounded-lg transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
                <a
                  href="https://wa.me/393511001860"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#20ba56] text-xs font-bold text-white rounded-lg transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="https://maps.google.com/?q=Piazza+dei+Cinquecento+48+00185+Roma+RM+Italy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-brand-blue hover:bg-brand-blue-light text-xs font-bold text-white rounded-lg transition-all"
                >
                  <Map className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
              </div>
            </div>

            {/* Embedded Map container */}
            <div className="rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm h-80 bg-slate-200">
              <iframe
                title="ALLAHARDAN S.N.C Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.800122998634!2d12.500582076412155!3d41.90258197123985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61a1006e89ab%3A0xc6cb5a64b971a1c9!2sPiazza%20dei%20Cinquecento%2C%2048%2C%2000185%20Roma%20RM%2C%20Italy!5e0!3m2!1sen!2sit!4v1783380000000!5m2!1sen!2sit"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form Card (Col 7) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className={`text-xl font-display font-bold text-slate-900 dark:text-white mb-6 ${isRtl ? 'text-right' : 'text-left'}`}>
                {t.contact.formTitle}
              </h3>

              {isSubmitted && (
                <div className={`mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 flex gap-3 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">{t.contact.success}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {t.contact.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all text-sm ${
                      isRtl ? 'text-right' : 'text-left'
                    }`}
                  />
                </div>

                {/* Email */}
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all text-sm ${
                      isRtl ? 'text-right' : 'text-left'
                    }`}
                  />
                </div>

                {/* Phone */}
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {t.contact.phoneInput}
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all text-sm ${
                      isRtl ? 'text-right' : 'text-left'
                    }`}
                  />
                </div>

                {/* Message */}
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all text-sm ${
                      isRtl ? 'text-right' : 'text-left'
                    }`}
                  />
                </div>

                {/* Submit button */}
                <div className={isRtl ? 'text-left' : 'text-right'}>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-light text-white font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <Send className="w-4 h-4 text-brand-gold" />
                    <span>{t.contact.submit}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
