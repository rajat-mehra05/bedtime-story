import NightSky from '@/components/NightSky';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <NightSky />
      <div className="text-center relative z-10">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-yellow-400/30 rounded-full animate-ping" />
          <div className="absolute inset-0 border-4 border-purple-400/50 rounded-full animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center text-3xl">
            ✨
          </div>
        </div>
        <p className="text-xl text-purple-200">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;

