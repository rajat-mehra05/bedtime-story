'use client';

import { memo } from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-slate-900/50">
        <div
          className="h-full bg-gradient-to-r from-slate-400 to-blue-400 transition-all duration-500 ease-out shadow-lg shadow-slate-400/30"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default memo(ProgressBar);
