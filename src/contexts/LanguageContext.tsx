'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.shop': 'Shop Online 24/7 - Your Everyday Essentials',
    'hero.title': 'Everything You Need,',
    'hero.title.highlight': 'Anytime.',
    'hero.subtitle': 'Discover everyday essentials, groceries, personal care products, and household items in one convenient online shop.',
    'btn.shop_now': 'Shop Now',
    'btn.explore': 'Explore Categories',
  },
  bn: {
    'nav.shop': '২৪/৭ অনলাইনে কেনাকাটা - আপনার প্রতিদিনের প্রয়োজনীয় জিনিসপত্র',
    'hero.title': 'আপনার প্রয়োজনীয় সবকিছু,',
    'hero.title.highlight': 'যেকোনো সময়।',
    'hero.subtitle': 'নিত্যপ্রয়োজনীয় পণ্য, মুদিখানা সামগ্রী, ব্যক্তিগত পরিচর্যা পণ্য এবং গৃহস্থালির জিনিসপত্র একটি সুবিধাজনক অনলাইন শপে আবিষ্কার করুন।',
    'btn.shop_now': 'কেনাকাটা করুন',
    'btn.explore': 'ক্যাটাগরি দেখুন',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
