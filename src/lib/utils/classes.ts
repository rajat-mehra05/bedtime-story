// CSS class utilities

type ClassValue = string | undefined | null | false;

export const cn = (...classes: ClassValue[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Common button styles
export const buttonStyles = {
  primary: 'bg-gradient-to-r from-[#ff9f7f] to-[#ffd4a3] text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105',
  secondary: 'bg-white border-2 border-gray-200 hover:border-[#ff9f7f] hover:shadow-md text-gray-800 font-semibold rounded-xl transition-all',
  disabled: 'bg-gray-200 text-gray-400 cursor-not-allowed',
  ghost: 'text-gray-600 hover:bg-gray-100 rounded-xl transition-all',
};

// Common card styles
export const cardStyles = {
  base: 'bg-white rounded-2xl p-6 shadow-lg border border-gray-100',
  hover: 'hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105',
  interactive: 'bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 border border-gray-100',
};

// Common input styles
export const inputStyles = {
  base: 'w-full p-6 rounded-2xl border-2 border-slate-700/50 bg-slate-900/40 text-slate-200 placeholder-slate-500 focus:border-slate-400 focus:outline-none text-lg',
  textarea: 'w-full p-6 rounded-2xl border-2 border-slate-700/50 bg-slate-900/40 text-slate-200 placeholder-slate-500 focus:border-slate-400 focus:outline-none text-lg resize-none',
};

// Animation classes
export const animationStyles = {
  fadeIn: 'opacity-100 transition-all duration-300',
  fadeOut: 'opacity-0 transform translate-y-4 transition-all duration-300',
  bounce: 'animate-bounce',
  pulse: 'animate-pulse',
};

