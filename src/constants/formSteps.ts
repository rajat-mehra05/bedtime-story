// Form step configuration

import { StoryInputs, Language } from '@/lib/types';
import { LANGUAGES } from './languages';
import { getTranslation } from './translations';

export interface FormStep {
  id: number;
  question: string;
  field: keyof StoryInputs;
  type: 'select' | 'input' | 'textarea';
  options?: Array<{ value: string; label: string; icon?: string }>;
  placeholder?: string;
  optional?: boolean;
}

export const getStoryFormSteps = (language: Language): FormStep[] => [
  {
    id: 1,
    question: getTranslation(language, 'form.step1.question'),
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
    question: getTranslation(language, 'form.step2.question'),
    field: 'genre',
    type: 'input',
    placeholder: getTranslation(language, 'form.step2.placeholder'),
  },
  {
    id: 3,
    question: getTranslation(language, 'form.step3.question'),
    field: 'characters',
    type: 'input',
    placeholder: getTranslation(language, 'form.step3.placeholder'),
  },
  {
    id: 4,
    question: getTranslation(language, 'form.step4.question'),
    field: 'additionalPreferences',
    type: 'textarea',
    placeholder: getTranslation(language, 'form.step4.placeholder'),
    optional: true,
  },
];

export const TOTAL_STEPS = 4;

export const getStepByIndex = (steps: FormStep[], index: number): FormStep | undefined => {
  return steps[index];
};

export const isStepOptional = (steps: FormStep[], stepIndex: number): boolean => {
  const step = getStepByIndex(steps, stepIndex);
  return step?.optional || false;
};

