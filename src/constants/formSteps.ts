// Form step configuration

import { StoryInputs } from '@/lib/types';
import { LANGUAGES } from './languages';

export interface FormStep {
  id: number;
  question: string;
  field: keyof StoryInputs;
  type: 'select' | 'input' | 'textarea';
  options?: Array<{ value: string; label: string; icon?: string }>;
  placeholder?: string;
  optional?: boolean;
}

export const STORY_FORM_STEPS: FormStep[] = [
  {
    id: 1,
    question: 'Which language would you like your story in?',
    field: 'language',
    type: 'select',
    options: LANGUAGES.map((lang) => ({
      value: lang.value,
      label: lang.label,
      icon: lang.icon,
    })),
  },
  {
    id: 2,
    question: 'What kind of story would you like?',
    field: 'genre',
    type: 'input',
    placeholder: 'e.g., Space adventure, Magical forest, Underwater journey...',
  },
  {
    id: 3,
    question: 'Who are the main characters?',
    field: 'characters',
    type: 'input',
    placeholder: 'e.g., A friendly dragon, A curious rabbit, A brave astronaut...',
  },
  {
    id: 4,
    question: 'Any special wishes for your story?',
    field: 'additionalPreferences',
    type: 'textarea',
    placeholder: 'Optional: Add any special elements you\'d like in the story...',
    optional: true,
  },
];

export const TOTAL_STEPS = STORY_FORM_STEPS.length;

export const getStepByIndex = (index: number): FormStep | undefined => {
  return STORY_FORM_STEPS[index];
};

export const isStepOptional = (stepIndex: number): boolean => {
  const step = getStepByIndex(stepIndex);
  return step?.optional || false;
};

