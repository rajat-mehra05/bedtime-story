// Custom hook for accessing translations based on current language

import { useMemo, useCallback } from 'react';
import { Language } from '@/lib/types';
import { getTranslation, TranslationStrings } from '@/constants/translations';

export const useTranslation = (language: Language) => {
  const t = useCallback(
    (key: keyof TranslationStrings): string => {
      return getTranslation(language, key);
    },
    [language]
  );

  return useMemo(() => ({ t }), [t]);
};

