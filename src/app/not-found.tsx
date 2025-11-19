'use client';

import { useRouter } from 'next/navigation';
import NightSky from '@/components/NightSky';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <NightSky />
      <div className="text-center max-w-md relative z-10">
        <div className="text-8xl mb-6">🌙</div>
        <h1 className="text-4xl font-bold text-yellow-100 mb-4">
          Lost in Dreamland?
        </h1>
        <p className="text-xl text-purple-200 mb-8">
          This page doesn't exist, but we can create a magical story for you!
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-900 font-semibold rounded-xl hover:shadow-lg hover:shadow-yellow-400/30 transition-all"
          >
            Go Home
          </button>
          <button
            onClick={() => router.push('/create')}
            className="px-6 py-3 bg-purple-900/50 border-2 border-purple-500/30 text-purple-200 font-semibold rounded-xl hover:border-yellow-400 hover:shadow-lg transition-all"
          >
            Create Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

