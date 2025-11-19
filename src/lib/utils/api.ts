// API utilities

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

export const fetchAPI = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const { method = 'GET', body, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(endpoint, config);

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};

export const generateStoryAPI = async (inputs: any) => {
  return fetchAPI('/api/generate-story', {
    method: 'POST',
    body: inputs,
  });
};

export const generateIllustrationAPI = async (
  chapterTitle: string,
  chapterContent: string
) => {
  return fetchAPI('/api/generate-illustration', {
    method: 'POST',
    body: { chapterTitle, chapterContent },
  });
};

export const generateHappyEndingAPI = async (
  storyTitle: string,
  chapters: any[]
) => {
  return fetchAPI('/api/generate-happy-ending', {
    method: 'POST',
    body: { storyTitle, chapters },
  });
};

export const translateStoryAPI = async (storyData: any, targetLanguage: string) => {
  return fetchAPI('/api/translate-story', {
    method: 'POST',
    body: { storyData, targetLanguage },
  });
};

export const generateSingleChapterAPI = async (
  chapterNumber: number,
  chapterTitle: string,
  chapterContent: string
) => {
  return fetchAPI('/api/generate-single-chapter', {
    method: 'POST',
    body: { chapterNumber, chapterTitle, chapterContent },
  });
};

