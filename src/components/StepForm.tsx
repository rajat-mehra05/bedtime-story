'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from './ProgressBar';
import { saveStoryInputs, getStoryInputs } from '@/lib/localStorage';
import { StoryInputs, Language } from '@/lib/types';
import { getStoryFormSteps, TOTAL_STEPS, isStepOptional } from '@/constants/formSteps';
import { DEFAULT_LANGUAGE } from '@/constants/languages';
import { cn, buttonStyles, inputStyles, animationStyles } from '@/lib/utils/classes';
import { useTranslation } from '@/hooks/useTranslation';

const StepForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<StoryInputs>>({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [pendingStepChange, setPendingStepChange] = useState<number | null>(null);

  // Get current language for translations
  const currentLanguage = (formData.language as Language) || DEFAULT_LANGUAGE;
  const { t } = useTranslation(currentLanguage);
  
  // Get form steps based on current language
  const STORY_FORM_STEPS = useMemo(() => getStoryFormSteps(currentLanguage), [currentLanguage]);

  // Handle pending step changes after language updates
  useEffect(() => {
    if (pendingStepChange !== null) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setCurrentStep(pendingStepChange);
        setIsAnimating(false);
        setPendingStepChange(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pendingStepChange]);

  useEffect(() => {
    // Load saved inputs
    const savedInputs = getStoryInputs();
    if (Object.keys(savedInputs).length > 0) {
      setFormData(savedInputs);
    } else {
      // Set default language
      setFormData({ language: DEFAULT_LANGUAGE });
      saveStoryInputs({ language: DEFAULT_LANGUAGE });
    }
  }, []);

  useEffect(() => {
    // Set current answer when step changes
    const step = STORY_FORM_STEPS[currentStep - 1];
    const value = formData[step.field];
    setCurrentAnswer(value ? String(value) : '');
  }, [currentStep, formData, STORY_FORM_STEPS]);

  const handleNext = useCallback(() => {
    const currentStepOptional = isStepOptional(STORY_FORM_STEPS, currentStep - 1);
    if (!currentAnswer.trim() && !currentStepOptional) return;

    setIsAnimating(true);

    // Save the answer
    const step = STORY_FORM_STEPS[currentStep - 1];
    const updatedData = { ...formData, [step.field]: currentAnswer };
    setFormData(updatedData);
    saveStoryInputs(updatedData);

    setTimeout(() => {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      } else {
        // All steps complete - navigate to generation page
        router.push('/story/generating');
      }
    }, 300);
  }, [currentStep, currentAnswer, formData, router, STORY_FORM_STEPS]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  }, [currentStep]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  }, [handleNext]);

  const currentStepData = STORY_FORM_STEPS[currentStep - 1];

  return (
    <div className="min-h-screen flex flex-col">
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      <div className="flex-1 flex items-center justify-center p-6">
        <div
          className={cn(
            'w-full max-w-2xl',
            isAnimating ? animationStyles.fadeOut : animationStyles.fadeIn
          )}
        >
          {/* Step counter */}
          <div className="text-center mb-8">
            <span className="text-sm font-medium text-slate-400">
              {t('form.step.label')} {currentStep} {t('form.step.of')} {TOTAL_STEPS}
            </span>
          </div>

          {/* Question */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-100">
            {currentStepData.question}
          </h2>

          {/* Input area */}
        <div className="mb-8">
            {currentStepData.type === 'select' && currentStepData.options ? (
              <div className="space-y-3">
                {currentStepData.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      // If this is language selection, handle it specially to ensure UI updates
                      if (currentStepData.field === 'language') {
                        setCurrentAnswer(option.value);
                        const updatedData = { ...formData, language: option.value as Language };
                        setFormData(updatedData);
                        saveStoryInputs(updatedData);
                        
                        // Use pendingStepChange to ensure language updates before moving to next step
                        if (currentStep < TOTAL_STEPS) {
                          setPendingStepChange(currentStep + 1);
                        }
                      } else {
                        // For non-language selections, proceed normally
                        setCurrentAnswer(option.value);
                        setTimeout(() => handleNext(), 100);
                      }
                    }}
                    className={`w-full p-6 rounded-2xl border-2 transition-all duration-200 text-left flex items-center gap-4 cursor-pointer ${
                      currentAnswer === option.value
                        ? 'border-slate-400 bg-slate-800/70 shadow-lg shadow-slate-400/20 scale-105 text-slate-100'
                        : 'border-slate-700/50 bg-slate-900/40 hover:border-slate-500 hover:shadow-md text-slate-200'
                    }`}
                  >
                    {option.icon && (
                      <span className="text-3xl">{option.icon}</span>
                    )}
                    <span className="text-lg font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            ) : currentStepData.type === 'textarea' ? (
              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={currentStepData.placeholder}
                className={inputStyles.textarea}
                rows={4}
                autoFocus
              />
            ) : (
              <input
                type="text"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={currentStepData.placeholder}
                className={inputStyles.base}
                autoFocus
              />
          )}
        </div>

          {/* Navigation buttons */}
          <div className="flex gap-4 justify-between items-center">
              <button
                onClick={handleBack}
                className={cn(
                  'px-6 py-3 font-medium rounded-xl transition-all cursor-pointer',
                  currentStep === 1 ? 'invisible' : 'text-slate-400 hover:bg-slate-800/50'
                )}
                disabled={currentStep === 1}
              >
                {t('form.back')}
              </button>

            {currentStepData.type !== 'select' && (
             <button
                onClick={handleNext}
                disabled={!currentAnswer.trim() && !isStepOptional(STORY_FORM_STEPS, currentStep - 1)}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  currentAnswer.trim() || isStepOptional(STORY_FORM_STEPS, currentStep - 1)
                    ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white border border-slate-600/50 hover:border-slate-400 hover:shadow-lg hover:shadow-slate-500/30 hover:scale-105 cursor-pointer'
                    : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                )}
             >
                 {currentStep === TOTAL_STEPS ? t('form.createStory') : t('form.next')}
             </button>
           )}
        </div>

          {/* Hint text */}
          {currentStepData.type !== 'select' && (
            <p className="text-center text-sm text-slate-500 mt-6">
              {t('form.pressEnter')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepForm;
