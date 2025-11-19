'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getStoryInputs, saveStory, setCurrentStoryId } from '@/lib/localStorage';
import { Story, Chapter } from '@/lib/types';
import {
  generateStoryAPI,
  generateIllustrationAPI,
  generateHappyEndingAPI,
} from '@/lib/utils/api';
import { generateStoryId } from '@/lib/utils/story';
import { buttonStyles } from '@/lib/utils/classes';
import NightSky from '@/components/NightSky';
import { useTranslation } from '@/hooks/useTranslation';
import { DEFAULT_LANGUAGE } from '@/constants/languages';

const GeneratingPage = () => {
  const router = useRouter();
  const inputs = getStoryInputs();
  const currentLanguage = inputs.language || DEFAULT_LANGUAGE;
  const { t } = useTranslation(currentLanguage);
  
  const [status, setStatus] = useState(t('generating.preparing'));
  const [error, setError] = useState('');
  const hasGeneratedRef = useRef(false);

  useEffect(() => {
    // Prevent double generation in React Strict Mode
    if (hasGeneratedRef.current) return;
    hasGeneratedRef.current = true;
    
    generateStory();
  }, []);

  const generateStory = async () => {
    try {
      const inputs = getStoryInputs();

      if (!inputs.language || !inputs.genre || !inputs.characters) {
        router.push('/create');
        return;
      }

      // Step 1: Generate all chapter texts
      setStatus(t('generating.creating'));
      const storyResult: any = await generateStoryAPI(inputs);
      const { title, chapters: generatedChapters } = storyResult.data;

      // Step 2: Generate illustration ONLY for Chapter 1
      setStatus(t('generating.illustration'));
      let chapter1WithIllustration = generatedChapters[0];
      
      try {
        const illustrationResult: any = await generateIllustrationAPI(
          chapter1WithIllustration.title,
          chapter1WithIllustration.content,
          inputs.characters
        );
        
        chapter1WithIllustration = {
          ...chapter1WithIllustration,
          illustration: illustrationResult.data.imageUrl,
          isGenerating: false,
        };
      } catch (error) {
        console.error('Failed to generate illustration for chapter 1:', error);
        chapter1WithIllustration = {
          ...chapter1WithIllustration,
          illustration: undefined,
          isGenerating: false,
        };
      }

      // Mark remaining chapters (2-5) as not generated yet
      const allChapters: Chapter[] = [
        chapter1WithIllustration,
        ...generatedChapters.slice(1).map((ch: Chapter) => ({
          ...ch,
          illustration: undefined,
          isGenerating: false,
        })),
      ];

      // Step 3: Save the story (without moral, will be generated with Chapter 5)
      const story: Story = {
        id: generateStoryId(),
        title,
        inputs: inputs as any,
        chapters: allChapters,
        happyEnding: undefined,
        currentChapter: 1,
        createdAt: Date.now(),
      };

      saveStory(story);
      setCurrentStoryId(story.id);

      // Navigate to first chapter immediately
      setStatus(t('generating.ready'));
      setTimeout(() => {
        router.push('/story/1');
      }, 500);
    } catch (error) {
      console.error('Error generating story:', error);
      setError(t('generating.error'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <NightSky />
      <div className="text-center max-w-md relative z-10">
        {error ? (
          <div>
            <div className="text-6xl mb-6">😔</div>
            <h2 className="text-2xl font-bold text-slate-100 mb-4">{error}</h2>
            <button
              onClick={() => router.push('/create')}
              className="px-6 py-3 bg-gradient-to-br from-slate-700 to-slate-800 text-white font-semibold rounded-xl border border-slate-600/50 hover:border-slate-400 hover:shadow-lg hover:shadow-slate-500/30 transition-all cursor-pointer"
            >
              {t('generating.tryAgain')}
            </button>
          </div>
        ) : (
          <div>
            {/* Loading animation */}
            <div className="mb-8">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 border-8 border-slate-400/30 rounded-full animate-ping" />
                <div className="absolute inset-0 border-8 border-blue-400/50 rounded-full animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center text-5xl">
                  ✨
                </div>
              </div>
            </div>

            {/* Status text */}
            <h2 className="text-2xl font-bold text-slate-100 mb-4 animate-pulse">
              {status}
            </h2>
            <p className="text-slate-400">
              {t('generating.wait')}
            </p>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-8">
              <div className="w-3 h-3 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-3 h-3 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-3 h-3 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratingPage;

