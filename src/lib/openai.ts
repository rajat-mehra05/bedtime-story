import OpenAI from 'openai';
import { APIKeyManager } from './utils/apiKeyManager';

// Get API key with fallback support
const getOpenAIKey = (): string => {
  return APIKeyManager.getOpenAIKey();
};

// Create OpenAI client instance (can be recreated with different key)
let openaiInstance: OpenAI | null = null;

const getOpenAIClient = (): OpenAI => {
  if (!openaiInstance) {
    openaiInstance = new OpenAI({
      apiKey: getOpenAIKey(),
});
  }
  return openaiInstance;
};

// Initialize OpenAI client with fallback support
const openai = getOpenAIClient();

// Export function to recreate client with fallback key
export const recreateClientWithFallback = (): OpenAI => {
  APIKeyManager.switchToFallback();
  openaiInstance = new OpenAI({
    apiKey: APIKeyManager.getOpenAIKey(),
  });
  return openaiInstance;
};

export default openai;
