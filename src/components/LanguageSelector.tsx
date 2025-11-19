'use client';

import { memo, useCallback } from 'react';
import { Language } from '@/lib/types';
import { LANGUAGES } from '@/constants/languages';
import { useTranslation } from '@/hooks/useTranslation';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  disabled?: boolean;
}

const LanguageSelector = ({
  currentLanguage,
  onLanguageChange,
  disabled = false,
}: LanguageSelectorProps) => {
  const { t } = useTranslation(currentLanguage);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange(e.target.value as Language);
  }, [onLanguageChange]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-400 mr-2">{t('language.label')}</span>
      <select
        value={currentLanguage}
        onChange={handleChange}
        disabled={disabled}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all bg-slate-800/40 border border-slate-700/50 text-slate-300 hover:border-slate-500 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500/50 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.icon} {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(LanguageSelector);
