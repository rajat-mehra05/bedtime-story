// Formatting utilities

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const calculateProgress = (current: number, total: number): number => {
  return Math.round((current / total) * 100);
};

export const sanitizeFileName = (text: string): string => {
  return text.replace(/[^a-z0-9]/gi, '_').toLowerCase();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

