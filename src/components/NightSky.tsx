'use client';

import { memo } from 'react';

const NightSky = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Moon */}
      <div 
        className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-[0_0_80px_25px_rgba(255,255,255,0.15)]"
        style={{ animation: 'float 6s ease-in-out infinite' }}
      >
        {/* Moon craters */}
        <div className="absolute top-6 left-6 w-4 h-4 rounded-full bg-gray-300 opacity-40" />
        <div className="absolute top-12 right-8 w-6 h-6 rounded-full bg-gray-300 opacity-30" />
        <div className="absolute bottom-8 left-10 w-5 h-5 rounded-full bg-gray-300 opacity-35" />
      </div>

      {/* Clouds */}
      <div 
        className="absolute top-40 left-0 opacity-30"
        style={{ animation: 'drift 60s linear infinite' }}
      >
        <svg width="200" height="80" viewBox="0 0 200 80" fill="none">
          <ellipse cx="60" cy="40" rx="40" ry="25" fill="white" opacity="0.6"/>
          <ellipse cx="90" cy="35" rx="50" ry="30" fill="white" opacity="0.7"/>
          <ellipse cx="130" cy="40" rx="45" ry="28" fill="white" opacity="0.6"/>
        </svg>
      </div>

      <div 
        className="absolute top-60 left-0 opacity-20"
        style={{ animation: 'drift 80s linear infinite', animationDelay: '10s' }}
      >
        <svg width="180" height="70" viewBox="0 0 180 70" fill="none">
          <ellipse cx="50" cy="35" rx="35" ry="22" fill="white" opacity="0.5"/>
          <ellipse cx="80" cy="32" rx="45" ry="25" fill="white" opacity="0.6"/>
          <ellipse cx="115" cy="36" rx="40" ry="24" fill="white" opacity="0.5"/>
        </svg>
      </div>

      <div 
        className="absolute top-96 left-0 opacity-25"
        style={{ animation: 'drift 100s linear infinite', animationDelay: '30s' }}
      >
        <svg width="220" height="90" viewBox="0 0 220 90" fill="none">
          <ellipse cx="70" cy="45" rx="45" ry="28" fill="white" opacity="0.6"/>
          <ellipse cx="105" cy="40" rx="55" ry="32" fill="white" opacity="0.7"/>
          <ellipse cx="150" cy="45" rx="50" ry="30" fill="white" opacity="0.6"/>
        </svg>
      </div>
    </div>
  );
};

export default memo(NightSky);

