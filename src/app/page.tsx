'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getAllStories, clearStoryInputs, deleteStory } from '@/lib/localStorage';
import StoryCard from '@/components/StoryCard';
import { Story } from '@/lib/types';
import NightSky from '@/components/NightSky';

const HomePage = () => {
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    // Load all saved stories
    const savedStories = getAllStories();
    setStories(savedStories);
  }, []);

  const handleCreateNewStory = useCallback(() => {
    // Clear any previous inputs
    clearStoryInputs();
    // Navigate to the create flow
    router.push('/create');
  }, [router]);

  const handleDeleteStory = useCallback((storyId: string) => {
    deleteStory(storyId);
    // Refresh the stories list
    const updatedStories = getAllStories();
    setStories(updatedStories);
  }, []);

  return (
    <div className="min-h-screen relative">
      <NightSky />
      
      <div className="relative z-10 p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Banner */}
          <div className="text-center mb-16">
            <div className="mb-8 flex justify-center">
              <div className="relative w-full max-w-2xl h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-200/30">
                <Image
                  src="/bedtime-banner.avif"
                  alt="Bedtime Stories"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-blue-100 to-indigo-200 drop-shadow-lg">
              Bedtime Stories
            </h1>
            <p className="text-2xl md:text-3xl text-slate-300 font-light tracking-wide">
              Magical tales for sweet dreams
            </p>
          </div>

          {/* Create new story button */}
          <div className="flex justify-center mb-16">
            <button
              onClick={handleCreateNewStory}
              className="px-12 py-5 text-xl font-semibold bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl border border-slate-600/50 hover:border-slate-400 hover:shadow-[0_0_40px_rgba(148,163,184,0.25)] transition-all hover:scale-105 transform backdrop-blur-sm cursor-pointer"
            >
              Create New Story
            </button>
          </div>

          {/* Stories grid */}
          {stories.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-slate-200 mb-8 text-center">
                Your Magical Collection
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stories.map((story) => (
                  <StoryCard key={story.id} story={story} onDelete={handleDeleteStory} />
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-24 text-slate-500 text-sm">
            <p>Made with ❤️ for bedtime adventures</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
