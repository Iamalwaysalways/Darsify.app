import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  className?: string;
  variant?: 'compact' | 'full';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
  className = '',
  variant = 'compact',
}) => {
  const languages: { code: Language; label: string; flag: string; native: string }[] = [
    { code: 'kaa', label: 'Qaraqalpaq', flag: '🇺🇿', native: 'KAA' },
    { code: 'uz', label: "O'zbek", flag: '🇺🇿', native: 'UZ' },
    { code: 'en', label: 'English', flag: '🇬🇧', native: 'EN' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺', native: 'RU' },
  ];

  if (variant === 'full') {
    return (
      <div id="language-switcher-full" className={`flex flex-wrap gap-2 ${className}`}>
        {languages.map((l) => (
          <button
            key={l.code}
            id={`lang-btn-${l.code}`}
            type="button"
            onClick={() => onLanguageChange(l.code)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentLanguage === l.code
                ? 'bg-[#6E3482] text-white shadow-md shadow-[#6E3482]/40 ring-1 ring-[#A56ABD]'
                : 'bg-[#2A1335]/70 text-[#E7DBEF]/70 hover:text-white hover:bg-[#49225B]/60'
            }`}
          >
            <span>{l.flag}</span>
            <span>{l.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div id="language-switcher-compact" className={`flex items-center gap-1 bg-[#2A1335]/80 backdrop-blur-md p-1 rounded-2xl border border-[#49225B] shadow-inner ${className}`}>
      <div className="pl-2 pr-1 text-[#A56ABD]">
        <Globe className="w-3.5 h-3.5" />
      </div>
      {languages.map((l) => {
        const isActive = currentLanguage === l.code;
        return (
          <button
            key={l.code}
            id={`lang-compact-${l.code}`}
            type="button"
            onClick={() => onLanguageChange(l.code)}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? 'bg-[#6E3482] text-white shadow-sm ring-1 ring-[#A56ABD]/50'
                : 'text-[#E7DBEF]/60 hover:text-white hover:bg-white/5'
            }`}
            title={l.label}
          >
            {l.native}
          </button>
        );
      })}
    </div>
  );
};
