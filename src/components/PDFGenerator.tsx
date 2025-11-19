'use client';

import { memo, useCallback } from 'react';
import { Story, Language } from '@/lib/types';
import { generateStoryPDF } from '@/lib/utils/pdf';
import { getTranslatedContent } from '@/lib/utils/story';

interface PDFGeneratorProps {
  story: Story;
  currentLanguage: Language;
}

const PDFGenerator = ({ story, currentLanguage }: PDFGeneratorProps) => {
  const generatePDF = useCallback(() => {
    const { title, chapters, happyEnding } = getTranslatedContent(story, currentLanguage);
    generateStoryPDF(title, chapters, happyEnding);
  }, [story, currentLanguage]);

  return (
    <button
      onClick={generatePDF}
      className="px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base bg-gradient-to-br from-slate-700 to-slate-800 text-white font-semibold rounded-xl border border-slate-600/50 hover:border-slate-400 hover:shadow-lg hover:shadow-slate-500/30 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
    >
      Download PDF
    </button>
  );
};

export default memo(PDFGenerator);

