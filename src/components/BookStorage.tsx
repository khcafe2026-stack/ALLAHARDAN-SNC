import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, Plus, Minus, Send, AlertCircle, Info, ShieldCheck, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface BookStorageProps {
  language: Language;
}

export default function BookStorage({ language }: BookStorageProps) {
  const t = translations[language];
  const isRtl = language === 'ar';

  // State variables for luggage quantities
  const [largeQty, setLargeQty] = useState(0);
  const [mediumQty, setMediumQty] = useState(0);
  const [smallQty, setSmallQty] = useState(0);

  // Booking details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('10:00');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('18:00');
  const [manualDays, setManualDays] = useState(1);
  const [useDatesForDays, setUseDatesForDays] = useState(true);

  // Statuses
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Pricing constants
  const PRICES = {
    large: 10,
    medium: 7,
    small: 5,
  };

  // Set default dates on load
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (date: Date) => {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    };

    setCheckInDate(formatDate(today));
    setCheckOutDate(formatDate(tomorrow));
  }, []);

  // Calculate days based on dates
  const calculatedDays = (() => {
    if (!checkInDate || !checkOutDate) return 1;
    const start = new Date(`${checkInDate}T${checkInTime}`);
    const end = new Date(`${checkOutDate}T${checkOutTime}`);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;
    
    const diffTime = end.getTime() - start.getTime();
    if (diffTime <= 0) return 1;
    
    // Calculate fractional days and round up (any part of a day counts as a full day)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  })();

  const activeDays = useDatesForDays ? calculatedDays : manualDays;

  // Calculate individual costs and total
  const calculateLuggageCost = (qty: number, dailyPrice: number, days: number) => {
    if (qty <= 0 || days <= 0) return 0;
    return qty * dailyPrice * days;
  };

  const largeTotal = calculateLuggageCost(largeQty, PRICES.large, activeDays);
  const mediumTotal = calculateLuggageCost(mediumQty, PRICES.medium, activeDays);
  const smallTotal = calculateLuggageCost(smallQty, PRICES.small, activeDays);
  const grandTotal = largeTotal + mediumTotal + smallTotal;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (largeQty === 0 && mediumQty === 0 && smallQty === 0) {
      setError(t.booking.errorEmpty);
      return;
    }

    if (useDatesForDays) {
      const start = new Date(`${checkInDate}T${checkInTime}`);
      const end = new Date(`${checkOutDate}T${checkOutTime}`);
      if (end.getTime() <= start.getTime()) {
        setError(t.booking.errorDate);
        return;
      }
    }

    setSuccess(true);

    // Format WhatsApp message
    const formattedCheckIn = `${checkInDate} @ ${checkInTime}`;
    const formattedCheckOut = `${checkOutDate} @ ${checkOutTime}`;

    let msg = `*ALLAHARDAN S.N.C - New Luggage Storage Booking*\n\n`;
    msg += `👤 *Customer Details:*\n`;
    msg += `• Name: ${name || 'Not provided'}\n`;
    if (email) msg += `• Email: ${email}\n`;
    if (phone) msg += `• Phone: ${phone}\n\n`;

    msg += `📅 *Schedule:*\n`;
    msg += `• Check-in: ${formattedCheckIn}\n`;
    msg += `• Check-out: ${formattedCheckOut}\n`;
    msg += `• Total Duration: ${activeDays} Day(s)\n\n`;

    msg += `🧳 *Bags Selected:*\n`;
    if (largeQty > 0) {
      msg += `• *Large Luggage:* ${largeQty} bag(s) (€${PRICES.large}/day per bag) -> *€${largeTotal}*\n`;
    }
    if (mediumQty > 0) {
      msg += `• *Medium Luggage:* ${mediumQty} bag(s) (€${PRICES.medium}/day per bag) -> *€${mediumTotal}*\n`;
    }
    if (smallQty > 0) {
      msg += `• *Small Luggage:* ${smallQty} bag(s) (€${PRICES.small}/day per bag) -> *€${smallTotal}*\n`;
    }
    msg += `\n`;

    msg += `💰 *Pricing Summary:*\n`;
    msg += `• *Total Price:* *€${grandTotal}* _(Pay at the store)_\n\n`;
    msg += `Please confirm my space booking! Thank you.`;

    // Encode URL
    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/393511001860?text=${encodedMsg}`;

    // Open WhatsApp in a new tab after a brief delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setSuccess(false);
    }, 1500);
  };

  return (
    <section
      id="book-space"
      className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Decorative background grid elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-gold/5 blur-3xl rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute top-10 right-0 w-96 h-96 bg-brand-blue/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue dark:text-brand-gold bg-blue-50 dark:bg-slate-800/80 px-3.5 py-1.5 rounded-full inline-block mb-3">
            🎯 {t.booking.title}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.booking.title}
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {t.booking.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Dynamic Luggage Selector & Pricing Breakdown (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 shadow-md">
              <h3 className={`text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <Briefcase className="w-5 h-5 text-brand-gold" />
                <span>1. Select Luggage Sizes</span>
              </h3>

              <div className="space-y-4">
                {/* Large Luggage Card */}
                <div className={`p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between gap-4 transition-all duration-300 hover:border-brand-gold/30 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-start gap-3.5 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                      <span className="font-extrabold text-lg">L</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                        {t.booking.large}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {t.booking.largeDesc}
                      </p>
                      <div className="flex gap-2.5 mt-1 text-[11px] font-medium text-slate-500">
                        <span className="bg-slate-100 dark:bg-slate-800/80 px-1.5 py-0.5 rounded text-amber-600 dark:text-amber-400">€10 / day</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setLargeQty(Math.max(0, largeQty - 1))}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      aria-label="Decrease Large"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold text-slate-800 dark:text-slate-100">{largeQty}</span>
                    <button
                      type="button"
                      onClick={() => setLargeQty(largeQty + 1)}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      aria-label="Increase Large"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Medium Luggage Card */}
                <div className={`p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between gap-4 transition-all duration-300 hover:border-brand-gold/30 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-start gap-3.5 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                      <span className="font-extrabold text-lg">M</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                        {t.booking.medium}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {t.booking.mediumDesc}
                      </p>
                      <div className="flex gap-2.5 mt-1 text-[11px] font-medium text-slate-500">
                        <span className="bg-slate-100 dark:bg-slate-800/80 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400">€7 / day</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setMediumQty(Math.max(0, mediumQty - 1))}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      aria-label="Decrease Medium"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold text-slate-800 dark:text-slate-100">{mediumQty}</span>
                    <button
                      type="button"
                      onClick={() => setMediumQty(mediumQty + 1)}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      aria-label="Increase Medium"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Small Luggage Card */}
                <div className={`p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between gap-4 transition-all duration-300 hover:border-brand-gold/30 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-start gap-3.5 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                      <span className="font-extrabold text-lg">S</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                        {t.booking.small}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {t.booking.smallDesc}
                      </p>
                      <div className="flex gap-2.5 mt-1 text-[11px] font-medium text-slate-500">
                        <span className="bg-slate-100 dark:bg-slate-800/80 px-1.5 py-0.5 rounded text-emerald-600 dark:text-emerald-400">€5 / day</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSmallQty(Math.max(0, smallQty - 1))}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      aria-label="Decrease Small"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold text-slate-800 dark:text-slate-100">{smallQty}</span>
                    <button
                      type="button"
                      onClick={() => setSmallQty(smallQty + 1)}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      aria-label="Increase Small"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Info notice box on pricing rules */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-amber-500/5 to-transparent border border-blue-100 dark:border-slate-800/80 flex gap-3.5 items-start text-sm text-slate-700 dark:text-slate-300">
              <Info className="w-5 h-5 shrink-0 text-blue-500 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider">
                  {t.booking.ratesTitle}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {t.booking.ratesNotice}
                </p>
                <p className="text-[11px] font-semibold text-brand-blue-dark dark:text-brand-gold">
                  {t.booking.rateInfo}
                </p>
              </div>
            </div>

            {/* Pricing breakdown summary card */}
            {(largeQty > 0 || mediumQty > 0 || smallQty > 0) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800/50 shadow-lg space-y-4"
              >
                <h4 className="font-bold text-sm tracking-wider uppercase text-slate-400">
                  Cost Breakdown ({activeDays} Day{activeDays > 1 ? 's' : ''})
                </h4>

                <div className="space-y-2 text-sm border-b border-slate-800 pb-3">
                  {largeQty > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-300">{largeQty}x Large Luggage</span>
                      <span className="font-mono font-bold">€{largeTotal}</span>
                    </div>
                  )}
                  {mediumQty > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-300">{mediumQty}x Medium Luggage</span>
                      <span className="font-mono font-bold">€{mediumTotal}</span>
                    </div>
                  )}
                  {smallQty > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-300">{smallQty}x Small Luggage</span>
                      <span className="font-mono font-bold">€{smallTotal}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-bold text-slate-300">{t.booking.total}</span>
                  <span className="text-2xl font-extrabold text-brand-gold font-mono">€{grandTotal}</span>
                </div>

                <div className="text-[10px] text-slate-400 italic">
                  * All items are secured inside our CCTV-monitored private facility at Piazza dei Cinquecento, 48, Rome. Pay on arrival.
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT: Booking details (Nome, Email, Date/Time Check-In/Check-Out) (Col 5) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 shadow-md">
              <h3 className={`text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <Calendar className="w-5 h-5 text-brand-gold" />
                <span>2. Provide Your Details</span>
              </h3>

              {error && (
                <div className="mb-4 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 text-red-700 dark:text-red-400 flex gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-400 flex gap-2 text-xs">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-brand-gold" />
                  <span>{t.booking.whatsAppSent}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <label htmlFor="booking-name" className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    {t.booking.name} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="booking-name"
                    required
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-all text-sm"
                  />
                </div>

                {/* Email */}
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <label htmlFor="booking-email" className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    {t.booking.email}
                  </label>
                  <input
                    type="email"
                    id="booking-email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-all text-sm"
                  />
                </div>

                {/* Phone */}
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <label htmlFor="booking-phone" className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    {t.booking.phone}
                  </label>
                  <input
                    type="text"
                    id="booking-phone"
                    placeholder="+1 555-123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-all text-sm"
                  />
                </div>

                {/* Method selector for Days computation */}
                <div className="flex gap-4 border-b border-slate-100 dark:border-slate-800 pb-3 mb-2 pt-1">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      checked={useDatesForDays}
                      onChange={() => setUseDatesForDays(true)}
                      className="accent-brand-gold"
                    />
                    <span>Auto-calculate Days</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      checked={!useDatesForDays}
                      onChange={() => setUseDatesForDays(false)}
                      className="accent-brand-gold"
                    />
                    <span>Set Days Manually</span>
                  </label>
                </div>

                {/* Dates Selector */}
                {useDatesForDays ? (
                  <div className="space-y-3 pt-1">
                    {/* Check-In */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className={isRtl ? 'text-right' : 'text-left'}>
                        <label htmlFor="checkin-date" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          {t.booking.checkIn} Date
                        </label>
                        <input
                          type="date"
                          id="checkin-date"
                          value={checkInDate}
                          onChange={(e) => setCheckInDate(e.target.value)}
                          className="w-full px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                        />
                      </div>
                      <div className={isRtl ? 'text-right' : 'text-left'}>
                        <label htmlFor="checkin-time" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          Check-In Time
                        </label>
                        <input
                          type="time"
                          id="checkin-time"
                          value={checkInTime}
                          onChange={(e) => setCheckInTime(e.target.value)}
                          className="w-full px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                        />
                      </div>
                    </div>

                    {/* Check-Out */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className={isRtl ? 'text-right' : 'text-left'}>
                        <label htmlFor="checkout-date" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          {t.booking.checkOut} Date
                        </label>
                        <input
                          type="date"
                          id="checkout-date"
                          value={checkOutDate}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          className="w-full px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                        />
                      </div>
                      <div className={isRtl ? 'text-right' : 'text-left'}>
                        <label htmlFor="checkout-time" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          Check-Out Time
                        </label>
                        <input
                          type="time"
                          id="checkout-time"
                          value={checkOutTime}
                          onChange={(e) => setCheckOutTime(e.target.value)}
                          className="w-full px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                        />
                      </div>
                    </div>

                    {/* Auto Calculated Days Notice */}
                    <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
                      <span className="text-xs font-semibold text-slate-500">{t.booking.days} (calculated):</span>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-100 bg-brand-gold/15 px-2.5 py-0.5 rounded-full">{calculatedDays} Day{calculatedDays > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                ) : (
                  /* Manual Days Slider */
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                      <label htmlFor="manual-days-slider">{t.booking.days}:</label>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-100 bg-brand-gold/15 px-2.5 py-0.5 rounded-full">{manualDays} Day{manualDays > 1 ? 's' : ''}</span>
                    </div>
                    <input
                      type="range"
                      id="manual-days-slider"
                      min={1}
                      max={30}
                      value={manualDays}
                      onChange={(e) => setManualDays(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>1 Day</span>
                      <span>30 Days</span>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Send className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>{t.booking.submit}</span>
                </button>

                <div className="text-center text-[11px] text-slate-400 mt-2 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Your booking will be processed immediately via WhatsApp</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
