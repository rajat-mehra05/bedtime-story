'use client';

import { memo } from 'react';
import Image from 'next/image';
import { Chapter } from '@/lib/types';

interface ChapterViewProps {
  chapter: Chapter;
  isLastChapter?: boolean;
  happyEnding?: string;
}

const ChapterView = ({ chapter, isLastChapter, happyEnding }: ChapterViewProps) => {
  return (
    <div className="space-y-8">
      {/* Chapter illustration */}
      {chapter.illustration && (
        <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl overflow-hidden shadow-xl">
          <Image
            src={chapter.illustration}
            alt={chapter.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 896px, 896px"
          />
        </div>
      )}

      {/* Chapter number badge */}
      <div className="flex justify-center">
        <span className="px-4 py-2 bg-gradient-to-br from-slate-700 to-slate-800 text-white text-sm font-semibold rounded-full border border-slate-600/50 shadow-lg">
          Chapter {chapter.chapterNumber}
        </span>
      </div>

      {/* Chapter title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-100">
        {chapter.title}
      </h2>

      {/* Chapter content */}
      <div className="prose prose-lg max-w-none">
        <p className="text-lg md:text-xl leading-relaxed text-slate-200 whitespace-pre-wrap">
          {chapter.content}
        </p>
      </div>

      {/* Moral (only for last chapter) */}
      {isLastChapter && happyEnding && (
        <div className="mt-8 p-8 bg-gradient-to-br from-gray-900/20 to-white-900/20 backdrop-blur-sm rounded-2xl border-2 border-amber-600/30 shadow-xl">
          <div className="text-center mb-3">
            <span className="text-2xl">💫</span>
          </div>
          <h4 className="text-lg font-semibold text-center mb-4 text-amber-200/90 uppercase tracking-wide">
            Moral of the Story
          </h4>
          <p className="text-xl md:text-2xl font-medium text-center text-amber-100 leading-relaxed italic">
            "{happyEnding}"
          </p>
        </div>
      )}
    </div>
  );
};

export default memo(ChapterView);

