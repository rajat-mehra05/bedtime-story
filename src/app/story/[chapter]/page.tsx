'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  getCurrentStory, 
  updateStoryChapter, 
  saveTranslation,
  updateStoryChapterContent,
  updateStoryHappyEnding,
} from '@/lib/localStorage';
import { Story, Language } from '@/lib/types';
import ChapterView from '@/components/ChapterView';
import LanguageSelector from '@/components/LanguageSelector';
import PDFGenerator from '@/components/PDFGenerator';
import ConfettiEffect from '@/components/ConfettiEffect';
import NightSky from '@/components/NightSky';
import { 
  translateStoryAPI, 
  generateSingleChapterAPI,
  generateHappyEndingAPI,
} from '@/lib/utils/api';
import { getTranslatedContent } from '@/lib/utils/story';
import { buttonStyles } from '@/lib/utils/classes';

type ChapterStatus = 'pending' | 'generating' | 'ready' | 'error';

const ChapterPage = () => {
  const router = useRouter();
  const params = useParams();
  const chapterNumber = parseInt(params.chapter as string, 10);

  const [story, setStory] = useState<Story | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('english');
  const [isTranslating, setIsTranslating] = useState(false);
  const [chapterGenerationStatus, setChapterGenerationStatus] = useState<Record<number, ChapterStatus>>({});
  const [isGeneratingBackground, setIsGeneratingBackground] = useState(false);
  const hasStartedGenerationRef = useRef(false);

  useEffect(() => {
    const currentStory = getCurrentStory();
    if (!currentStory) {
      router.push('/');
      return;
    }

    setStory(currentStory);
    setCurrentLanguage(currentStory.inputs.language);

    // Initialize generation status for all chapters
    const status: Record<number, ChapterStatus> = {};
    currentStory.chapters.forEach((ch) => {
      if (ch.illustration) {
        status[ch.chapterNumber] = 'ready';
      } else {
        status[ch.chapterNumber] = 'pending';
      }
    });
    setChapterGenerationStatus(status);

    // Update current chapter
    if (chapterNumber !== currentStory.currentChapter) {
      updateStoryChapter(currentStory.id, chapterNumber);
    }

    // Start background generation on Chapter 1
    if (chapterNumber === 1 && !hasStartedGenerationRef.current) {
      hasStartedGenerationRef.current = true;
      generateRemainingChapters(currentStory);
    }
  }, [chapterNumber, router]);

  const generateRemainingChapters = async (currentStory: Story) => {
    setIsGeneratingBackground(true);
    
    // Find chapters that need illustrations
    const chaptersToGenerate = currentStory.chapters.filter(
      (ch) => !ch.illustration && ch.chapterNumber > 1
    );

    if (chaptersToGenerate.length === 0) {
      setIsGeneratingBackground(false);
      return;
    }

    // Mark all as generating
    setChapterGenerationStatus((prev) => {
      const updated = { ...prev };
      chaptersToGenerate.forEach((ch) => {
        updated[ch.chapterNumber] = 'generating';
      });
      return updated;
    });

    // Generate all chapters in parallel
    const generationPromises = chaptersToGenerate.map(async (chapter) => {
      try {
        const result: any = await generateSingleChapterAPI(
          chapter.chapterNumber,
          chapter.title,
          chapter.content
        );

        // Update chapter in localStorage
        updateStoryChapterContent(currentStory.id, chapter.chapterNumber, {
          illustration: result.data.illustration,
          isGenerating: false,
        });

        // Update local state
        setChapterGenerationStatus((prev) => ({
          ...prev,
          [chapter.chapterNumber]: 'ready',
        }));

        // Refresh story state
        const updatedStory = getCurrentStory();
        if (updatedStory) {
          setStory(updatedStory);
        }

        return { success: true, chapterNumber: chapter.chapterNumber };
      } catch (error) {
        console.error(`Failed to generate chapter ${chapter.chapterNumber}:`, error);
        
        // Mark as error
        setChapterGenerationStatus((prev) => ({
          ...prev,
          [chapter.chapterNumber]: 'error',
        }));

        updateStoryChapterContent(currentStory.id, chapter.chapterNumber, {
          isGenerating: false,
          generationError: 'Failed to generate illustration',
        });

        return { success: false, chapterNumber: chapter.chapterNumber };
      }
    });

    // Wait for all chapters to complete
    await Promise.allSettled(generationPromises);

    // Generate moral after all chapters are ready
    try {
      const updatedStory = getCurrentStory();
      if (updatedStory && !updatedStory.happyEnding) {
        const moralResult: any = await generateHappyEndingAPI(
          updatedStory.title,
          updatedStory.chapters
        );
        updateStoryHappyEnding(updatedStory.id, moralResult.data.happyEnding);
        
        const finalStory = getCurrentStory();
        if (finalStory) {
          setStory(finalStory);
        }
      }
    } catch (error) {
      console.error('Failed to generate moral:', error);
    }

    setIsGeneratingBackground(false);
  };

  const handleLanguageChange = useCallback(async (newLanguage: Language) => {
    if (!story || newLanguage === currentLanguage || isTranslating) return;

    // Check if translation already exists in cache
    if (story.translations && story.translations[newLanguage]) {
      setCurrentLanguage(newLanguage);
      return;
    }

    // Translate the story
    setIsTranslating(true);
    try {
      const result: any = await translateStoryAPI(
        {
          title: story.title,
          chapters: story.chapters,
          happyEnding: story.happyEnding,
        },
        newLanguage
      );
      const translatedData = result.data;

      // Save translation to localStorage
      saveTranslation(story.id, newLanguage, translatedData);

      // Update local story state
      const updatedStory = {
        ...story,
        translations: {
          ...story.translations,
          [newLanguage]: translatedData,
        },
      };
      setStory(updatedStory);
      setCurrentLanguage(newLanguage);
    } catch (error) {
      console.error('Error translating story:', error);
      alert('Failed to translate story. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  }, [story, currentLanguage, isTranslating]);

  const handlePrevious = useCallback(() => {
    if (chapterNumber > 1) {
      router.push(`/story/${chapterNumber - 1}`);
    }
  }, [chapterNumber, router]);

  const handleNext = useCallback(() => {
    if (story && chapterNumber < story.chapters.length) {
      router.push(`/story/${chapterNumber + 1}`);
    }
  }, [story, chapterNumber, router]);

  const handleCreateNewStory = useCallback(() => {
    router.push('/');
  }, [router]);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-xl text-gray-500">Loading story...</p>
        </div>
      </div>
    );
  }

  // Get the appropriate language version
  const { title: displayTitle, chapters: displayChapters, happyEnding: displayHappyEnding } =
    getTranslatedContent(story, currentLanguage);

  const currentChapter = displayChapters[chapterNumber - 1];
  const isLastChapter = chapterNumber === story.chapters.length;

  if (!currentChapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❓</div>
          <p className="text-xl text-gray-500">Chapter not found</p>
          <button
            onClick={() => router.push('/story/1')}
            className={`mt-6 px-6 py-3 ${buttonStyles.primary}`}
          >
            Go to Chapter 1
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12 relative">
      <NightSky />
      {isLastChapter && <ConfettiEffect />}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="text-slate-400 hover:text-slate-200 mb-4 flex items-center gap-2 transition-colors cursor-pointer"
          >
            ← Back to Home
          </button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
              {displayTitle}
            </h1>
            <div className="flex gap-4 items-center">
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
                disabled={isTranslating}
              />
              <PDFGenerator story={story} currentLanguage={currentLanguage} />
            </div>
          </div>

          {isTranslating && (
            <div className="bg-slate-800/40 border border-slate-600/50 rounded-lg p-4 mb-6">
              <p className="text-slate-200 text-center">
                Translating story... This will only take a moment!
              </p>
            </div>
          )}
        </div>

        {/* Chapter content */}
        <ChapterView
          chapter={currentChapter}
          isLastChapter={isLastChapter}
          happyEnding={isLastChapter ? displayHappyEnding : undefined}
        />


        {/* Navigation */}
        <div className="mt-12 flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={chapterNumber === 1}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              chapterNumber === 1 ? 'invisible' : 'bg-slate-800/50 border-2 border-slate-700/50 text-slate-300 hover:border-slate-500 hover:shadow-md cursor-pointer'
            }`}
          >
            ← Previous
          </button>

          <div className="text-center">
            <p className="text-sm text-slate-400">
              Chapter {chapterNumber} of {story.chapters.length}
            </p>
          </div>

          {!isLastChapter ? (
            <>
              {chapterGenerationStatus[chapterNumber + 1] === 'ready' ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-gradient-to-br from-slate-700 to-slate-800 text-white font-semibold rounded-xl border border-slate-600/50 hover:border-slate-400 hover:shadow-lg hover:shadow-slate-500/30 transition-all cursor-pointer"
                >
                  Next →
                </button>
              ) : chapterGenerationStatus[chapterNumber + 1] === 'generating' ? (
                <button
                  disabled
                  className="px-6 py-3 bg-slate-800/30 text-slate-400 font-semibold rounded-xl border border-slate-700/50 cursor-not-allowed flex items-center gap-2"
                >
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                  Preparing...
                </button>
              ) : chapterGenerationStatus[chapterNumber + 1] === 'error' ? (
                <button
                  onClick={() => {
                    // Retry generation for this chapter
                    if (story) {
                      const nextChapter = story.chapters[chapterNumber];
                      setChapterGenerationStatus((prev) => ({
                        ...prev,
                        [chapterNumber + 1]: 'generating',
                      }));
                      generateSingleChapterAPI(
                        nextChapter.chapterNumber,
                        nextChapter.title,
                        nextChapter.content
                      )
                        .then((result: any) => {
                          updateStoryChapterContent(story.id, nextChapter.chapterNumber, {
                            illustration: result.data.illustration,
                            isGenerating: false,
                          });
                          setChapterGenerationStatus((prev) => ({
                            ...prev,
                            [nextChapter.chapterNumber]: 'ready',
                          }));
                          const updatedStory = getCurrentStory();
                          if (updatedStory) {
                            setStory(updatedStory);
                          }
                        })
                        .catch(() => {
                          setChapterGenerationStatus((prev) => ({
                            ...prev,
                            [nextChapter.chapterNumber]: 'error',
                          }));
                        });
                    }
                  }}
                  className="px-6 py-3 bg-red-900/30 text-red-300 font-semibold rounded-xl border border-red-700/50 hover:border-red-500 transition-all cursor-pointer"
                >
                  Retry →
                </button>
              ) : (
                <button
                  disabled
                  className="px-6 py-3 bg-slate-800/30 text-slate-400 font-semibold rounded-xl border border-slate-700/50 cursor-not-allowed"
                >
                  Next →
                </button>
              )}
            </>
          ) : (
            <button
              onClick={handleCreateNewStory}
              className="px-6 py-3 bg-gradient-to-br from-slate-700 to-slate-800 text-white font-semibold rounded-xl border border-slate-600/50 hover:border-slate-400 hover:shadow-lg hover:shadow-slate-500/30 transition-all cursor-pointer"
            >
              Create New Story
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;

