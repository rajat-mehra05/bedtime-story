// LocalStorage utilities for persistent storage

import { Story, StoryInputs } from './types';

const STORAGE_KEYS = {
  CURRENT_INPUTS: 'bedtime-story-inputs',
  STORIES: 'bedtime-stories',
  CURRENT_STORY_ID: 'current-story-id',
} as const;

// Story Inputs Management
export const saveStoryInputs = (inputs: Partial<StoryInputs>): void => {
  if (typeof window === 'undefined') return;
  
  const existing = getStoryInputs();
  const updated = { ...existing, ...inputs };
  localStorage.setItem(STORAGE_KEYS.CURRENT_INPUTS, JSON.stringify(updated));
};

export const getStoryInputs = (): Partial<StoryInputs> => {
  if (typeof window === 'undefined') return {};
  
  const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_INPUTS);
  return stored ? JSON.parse(stored) : {};
};

export const clearStoryInputs = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.CURRENT_INPUTS);
};

// Stories Management
export const saveStory = (story: Story): void => {
  if (typeof window === 'undefined') return;
  
  const stories = getAllStories();
  const existingIndex = stories.findIndex(s => s.id === story.id);
  
  if (existingIndex >= 0) {
    stories[existingIndex] = story;
  } else {
    stories.push(story);
  }
  
  localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
  setCurrentStoryId(story.id);
};

export const getStory = (id: string): Story | null => {
  if (typeof window === 'undefined') return null;
  
  const stories = getAllStories();
  return stories.find(s => s.id === id) || null;
};

export const getAllStories = (): Story[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEYS.STORIES);
  return stored ? JSON.parse(stored) : [];
};

export const deleteStory = (id: string): void => {
  if (typeof window === 'undefined') return;
  
  const stories = getAllStories().filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
  
  if (getCurrentStoryId() === id) {
    clearCurrentStoryId();
  }
};

// Current Story ID Management
export const setCurrentStoryId = (id: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.CURRENT_STORY_ID, id);
};

export const getCurrentStoryId = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.CURRENT_STORY_ID);
};

export const clearCurrentStoryId = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.CURRENT_STORY_ID);
};

export const getCurrentStory = (): Story | null => {
  const id = getCurrentStoryId();
  return id ? getStory(id) : null;
};

// Update current chapter in story
export const updateStoryChapter = (storyId: string, chapterNumber: number): void => {
  if (typeof window === 'undefined') return;
  
  const story = getStory(storyId);
  if (story) {
    story.currentChapter = chapterNumber;
    saveStory(story);
  }
};

// Save translation to story
export const saveTranslation = (
  storyId: string,
  language: 'english' | 'hindi' | 'assamese',
  translatedData: {
    title: string;
    chapters: Story['chapters'];
    happyEnding?: string;
  }
): void => {
  if (typeof window === 'undefined') return;
  
  const story = getStory(storyId);
  if (story) {
    if (!story.translations) {
      story.translations = {};
    }
    story.translations[language] = translatedData;
    saveStory(story);
  }
};

// Update specific chapter content in a story
export const updateStoryChapterContent = (
  storyId: string,
  chapterNumber: number,
  chapterData: Partial<Story['chapters'][0]>
): void => {
  if (typeof window === 'undefined') return;
  
  const story = getStory(storyId);
  if (story) {
    const chapterIndex = story.chapters.findIndex(ch => ch.chapterNumber === chapterNumber);
    if (chapterIndex >= 0) {
      story.chapters[chapterIndex] = {
        ...story.chapters[chapterIndex],
        ...chapterData,
      };
      saveStory(story);
    }
  }
};

// Update happy ending in a story
export const updateStoryHappyEnding = (storyId: string, happyEnding: string): void => {
  if (typeof window === 'undefined') return;
  
  const story = getStory(storyId);
  if (story) {
    story.happyEnding = happyEnding;
    saveStory(story);
  }
};