// Core types for the Bedtime Stories app

export type Language = 'english' | 'hindi' | 'assamese';

export interface StoryInputs {
  language: Language;
  genre: string;
  characters: string;
  additionalPreferences?: string;
}

export interface Chapter {
  chapterNumber: number;
  title: string;
  content: string;
  illustration?: string; // Base64 or URL
  isGenerating?: boolean; // Track if chapter is being generated
  generationError?: string; // Track any generation errors
}

export interface Story {
  id: string;
  title: string;
  inputs: StoryInputs;
  chapters: Chapter[];
  happyEnding?: string;
  currentChapter: number;
  createdAt: number;
  translations?: {
    [key in Language]?: {
      title: string;
      chapters: Chapter[];
      happyEnding?: string;
    };
  };
}

export interface FormStep {
  id: number;
  question: string;
  type: 'select' | 'input' | 'textarea';
  options?: string[];
  field: keyof StoryInputs;
}

