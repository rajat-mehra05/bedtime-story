// API Key management utilities

interface APIKeyConfig {
  primary: string | undefined;
  fallback: string | undefined;
}

/**
 * Manages API key fallback logic for OpenAI
 * Attempts to use primary key first, falls back to secondary if primary fails
 */
export class APIKeyManager {
  private static currentKeyType: 'primary' | 'fallback' = 'primary';
  
  static getOpenAIKey(): string {
    const keys = this.getOpenAIKeys();
    
    // Use current key type (switches to fallback after primary fails)
    if (this.currentKeyType === 'fallback' && keys.fallback) {
      return keys.fallback;
    }
    
    // Default to primary
    if (keys.primary) {
      return keys.primary;
    }
    
    // Fallback if primary not available
    if (keys.fallback) {
      console.warn('Primary OpenAI API key not set, using fallback');
      this.currentKeyType = 'fallback';
      return keys.fallback;
    }
    
    throw new Error(
      'No OpenAI API key found. Please set OPENAI_API_KEY or OPENAI_API_KEY_FALLBACK in your .env.local file'
    );
  }
  
  static getOpenAIKeys(): APIKeyConfig {
    return {
      primary: process.env.OPENAI_API_KEY,
      fallback: process.env.OPENAI_API_KEY_FALLBACK,
    };
  }
  
  /**
   * Switch to fallback key after primary key fails
   */
  static switchToFallback(): void {
    const keys = this.getOpenAIKeys();
    if (keys.fallback) {
      console.warn('Switching to fallback OpenAI API key');
      this.currentKeyType = 'fallback';
    } else {
      throw new Error('No fallback OpenAI API key available');
    }
  }
  
  /**
   * Reset to primary key
   */
  static resetToPrimary(): void {
    this.currentKeyType = 'primary';
  }
  
  /**
   * Get current key type being used
   */
  static getCurrentKeyType(): 'primary' | 'fallback' {
    return this.currentKeyType;
  }
  
  /**
   * Check if fallback key is available
   */
  static hasFallback(): boolean {
    return !!process.env.OPENAI_API_KEY_FALLBACK;
  }
}

