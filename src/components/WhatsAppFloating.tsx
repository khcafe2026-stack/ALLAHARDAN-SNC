import { MessageSquare } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface WhatsAppFloatingProps {
  language: Language;
}

export default function WhatsAppFloating({ language }: WhatsAppFloatingProps) {
  const t = translations[language];
  const isRtl = t.dir === 'rtl';

  return (
    <a
      href="https://wa.me/393511001860"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/20 hover:bg-[#20ba56] hover:scale-105 transition-all duration-300 group ${
        isRtl ? 'right-6' : 'left-6'
      }`}
      aria-label="Chat on WhatsApp"
    >
      <MessageSquare className="w-5 h-5 fill-white text-[#25D366]" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out font-bold text-xs whitespace-nowrap">
        {language === 'ar' ? 'دردش معنا' : language === 'it' ? 'Scrivici' : language === 'bn' ? 'যোগাযোগ করুন' : 'Chat with us'}
      </span>
    </a>
  );
}
