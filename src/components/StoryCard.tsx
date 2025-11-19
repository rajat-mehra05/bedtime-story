'use client';

import { memo, useCallback } from 'react';
import Image from 'next/image';
import { Story } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { formatDate, calculateProgress } from '@/lib/utils/formatting';
import { cardStyles, buttonStyles, cn } from '@/lib/utils/classes';

interface StoryCardProps {
  story: Story;
  onDelete?: (storyId: string) => void;
}

const StoryCard = ({ story, onDelete }: StoryCardProps) => {
  const router = useRouter();

  const handleContinueReading = useCallback(() => {
    router.push(`/story/${story.currentChapter}`);
  }, [router, story.currentChapter]);

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && confirm(`Are you sure you want to delete "${story.title}"?`)) {
      onDelete(story.id);
    }
  }, [onDelete, story.id, story.title]);

  const progress = calculateProgress(story.currentChapter, story.chapters.length);

  return (
    <div 
      onClick={handleContinueReading} 
      className="bg-gradient-to-br from-slate-800/60 to-slate-900/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-slate-500/30 transition-all duration-300 cursor-pointer hover:scale-105 border border-slate-700/50 relative"
    >
      {/* Delete button */}
      {onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-600/80 hover:bg-gray-400 text-white rounded-full transition-all hover:scale-110 shadow-lg"
          aria-label="Delete story"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      )}

      {/* Story illustration preview */}
      {story.chapters[0]?.illustration && (
        <div className="relative w-full h-48 bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl overflow-hidden mb-4">
          <Image
            src={story.chapters[0].illustration}
            alt={story.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 384px, 384px"
          />
        </div>
      )}

      {/* Story title */}
      <h3 className="text-xl font-bold text-slate-100 mb-2 line-clamp-2">
        {story.title}
      </h3>

      {/* Story metadata */}
      <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
        <span className="flex items-center gap-1">
          📚 {story.chapters.length} chapters
        </span>
        <span className="flex items-center gap-1">
          🗓️ {formatDate(story.createdAt)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-slate-900/70 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-slate-400 to-blue-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Continue button */}
      <button className="w-full py-3 bg-gradient-to-br from-slate-700 to-slate-800 text-white font-semibold rounded-xl border border-slate-600/50 hover:border-slate-400 hover:shadow-lg hover:shadow-slate-500/30 transition-all cursor-pointer">
        Continue Reading →
      </button>
    </div>
  );
};

export default memo(StoryCard);

