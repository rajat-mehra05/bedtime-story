// API error handling utilities

import { APIKeyManager } from './apiKeyManager';
import { recreateClientWithFallback } from '../openai';

/**
 * Checks if an error is related to API key authentication
 */
export const isAuthError = (error: any): boolean => {
  const status = error?.response?.status || error?.status || error?.statusCode;
  
  // 401 Unauthorized or 403 Forbidden
  if (status === 401 || status === 403) {
    return true;
  }
  
  // Check error message for auth-related issues
  const message = error?.message?.toLowerCase() || '';
  const errorString = JSON.stringify(error).toLowerCase();
  const authKeywords = [
    'unauthorized',
    'invalid api key',
    'authentication',
    'api key',
    'invalid_api_key',
    'incorrect api key',
  ];
  
  return authKeywords.some(
    (keyword) => message.includes(keyword) || errorString.includes(keyword)
  );
};

/**
 * Handles API errors with automatic fallback to secondary key
 * This wrapper detects auth errors and retries with fallback key
 */
export const handleAPIError = async <T>(
  apiCall: () => Promise<T>,
  retryWithFallback: boolean = true
): Promise<T> => {
  try {
    return await apiCall();
  } catch (error) {
    // If it's an auth error and we have a fallback and retry is enabled
    if (isAuthError(error) && retryWithFallback && APIKeyManager.hasFallback()) {
      console.warn('Primary API key failed, attempting with fallback key...');
      
      try {
        // Recreate OpenAI client with fallback key
        recreateClientWithFallback();
        
        // Retry the API call with new client
        return await apiCall();
      } catch (fallbackError) {
        console.error('Fallback API key also failed');
        APIKeyManager.resetToPrimary(); // Reset for next attempt
        throw fallbackError;
      }
    }
    
    throw error;
  }
};

/**
 * Formats API error messages for user display
 */
export const formatAPIError = (error: any): string => {
  if (isAuthError(error)) {
    return 'API authentication failed. Please check your API keys in .env.local file.';
  }
  
  // Try to extract meaningful error message
  const errorMessage =
    error?.error?.message ||
    error?.response?.data?.error?.message ||
    error?.message ||
    'An unexpected error occurred. Please try again.';
  
  return errorMessage;
};

