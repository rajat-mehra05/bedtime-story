// Story-related utilities

import { Story, Language, Chapter } from '@/lib/types';

export const getTranslatedContent = (
  story: Story,
  language: Language
): {
  title: string;
  chapters: Chapter[];
  happyEnding?: string;
} => {
  if (language === 'english') {
    return {
      title: story.title,
      chapters: story.chapters,
      happyEnding: story.happyEnding,
    };
  }

  const translation = story.translations?.[language];
  return {
    title: translation?.title || story.title,
    chapters: translation?.chapters || story.chapters,
    happyEnding: translation?.happyEnding || story.happyEnding,
  };
};

export const generateStoryId = (): string => {
  return `story-${Date.now()}`;
};

export const isStoryComplete = (story: Story): boolean => {
  return story.currentChapter >= story.chapters.length;
};

export const getStoryProgress = (story: Story): number => {
  return (story.currentChapter / story.chapters.length) * 100;
};

