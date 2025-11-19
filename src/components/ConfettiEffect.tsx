'use client';

import { memo, useMemo } from 'react';

const ConfettiEffect = () => {
  const confetti = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
    })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute top-0 w-2 h-2 opacity-0"
          style={{
            left: `${piece.left}%`,
            animation: `confettiFall ${piece.duration}s ease-in ${piece.delay}s forwards`,
            backgroundColor: ['#ff9f7f', '#ffd4a3', '#a8d5e2', '#ffb6c1'][Math.floor(Math.random() * 4)],
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-10px) rotateZ(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotateZ(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default memo(ConfettiEffect);

