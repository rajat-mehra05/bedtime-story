// Language configuration

import { Language } from '@/lib/types';

export interface LanguageOption {
  value: Language;
  label: string;
  icon: string;
  nativeName: string;
}

export const LANGUAGES: LanguageOption[] = [
  {
    value: 'english',
    label: 'English',
    icon: '🇬🇧',
    nativeName: 'English',
  },
  {
    value: 'hindi',
    label: 'हिंदी',
    icon: '🇮🇳',
    nativeName: 'Hindi',
  },
  {
    value: 'assamese',
    label: 'অসমীয়া',
    icon: '🇮🇳',
    nativeName: 'Assamese',
  },
];

export const DEFAULT_LANGUAGE: Language = 'english';

export const getLanguageLabel = (language: Language): string => {
  const lang = LANGUAGES.find((l) => l.value === language);
  return lang?.label || language;
};

export const getLanguageIcon = (language: Language): string => {
  const lang = LANGUAGES.find((l) => l.value === language);
  return lang?.icon || '🌍';
};

