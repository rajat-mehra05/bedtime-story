// Creative AI prompts for story and illustration generation

import { StoryInputs } from './types';

export const generateStoryPrompt = (inputs: StoryInputs): string => {
  const prompt = `You are a creative children's storyteller. Generate an enchanting bedtime story for children under 6 years old.

**Story Requirements:**
- Genre: ${inputs.genre}
- Characters: ${inputs.characters}
- Length: Maximum 250 words per chapter
- Language: ${inputs.language === 'english' ? 'English' : inputs.language === 'hindi' ? 'Hindi' : 'Assamese'}
${inputs.additionalPreferences ? `- Additional preferences: ${inputs.additionalPreferences}` : ''}

**Structure:**
Create exactly 5 chapters that form ONE INTERCONNECTED NARRATIVE. This is crucial:
- Each chapter MUST continue directly from the previous chapter
- The story should flow naturally as one continuous tale, not 5 separate stories
- Maintain consistent plot progression and character development throughout
- Chapter 1: Introduce characters and setting
- Chapters 2-4: Build the adventure with rising action, each continuing the plot
- Chapter 5: MUST include the complete ending of the story with full resolution

**Chapter Guidelines:**
- Maximum 250 words per chapter
- Age-appropriate and gentle (no scary content)
- Include vivid, colorful descriptions
- Build excitement while remaining calming for bedtime
- Feature dialogue and character interactions
- Each chapter must end in a way that naturally leads to the next

**Final Chapter Requirements:**
The last chapter (Chapter 5) MUST include:
- A complete, satisfying ending to the entire story
- Full resolution of all plot elements
- The ending MUST be part of the chapter content itself, not separate
- The story should feel complete and concluded within the chapter

**Format your response as a JSON object with this exact structure:**
{
  "title": "Story title",
  "chapters": [
    {
      "chapterNumber": 1,
      "title": "Chapter 1 title",
      "content": "Chapter 1 story text"
    },
    ...5 chapters total
  ]
}

Make the story magical, heartwarming, and perfect for sweet dreams. Remember: this is ONE continuous story told across 5 chapters, not 5 separate stories.`;

  return prompt;
};

export const generateMoralPrompt = (storyTitle: string, chapters: string[]): string => {
  const chaptersText = chapters.map((c, i) => `Chapter ${i + 1}: ${c.substring(0, 200)}...`).join('\n');

  return `Based on this bedtime story titled "${storyTitle}", create an inspiring moral or life lesson.

Story chapters:
${chaptersText}

Generate a short, powerful moral that is:
- EXACTLY 1-2 lines only (maximum 2 sentences)
- Inspiring and motivational
- Contains a meaningful life lesson
- Easy for children to understand and remember
- Related to themes like friendship, kindness, bravery, honesty, perseverance, or love

Examples of good morals:
- "True friendship means being there for each other, no matter what."
- "Even the smallest acts of kindness can make the biggest difference."
- "Believe in yourself, and you can achieve anything you dream of."

Return ONLY the moral text (1-2 lines), nothing else.`;
};

export const generateIllustrationPrompt = (chapterTitle: string, chapterContent: string): string => {
  return `Create a beautiful anime-style illustration for a children's bedtime story.

Scene: ${chapterTitle}
Context: ${chapterContent.substring(0, 300)}

Style: Soft anime art style with cute characters, large expressive eyes, warm pastel colors, dreamy atmosphere, children's storybook illustration, magical lighting, gentle and calming composition, no scary elements, cozy bedtime aesthetic, high quality digital art, studio ghibli inspired, kawaii style`;
};

export const translateStoryPrompt = (
  storyData: { title: string; chapters: Array<{ title: string; content: string }>; happyEnding?: string },
  targetLanguage: 'hindi' | 'assamese'
): string => {
  const languageName = targetLanguage === 'hindi' ? 'Hindi' : 'Assamese (অসমীয়া)';
  
  return `Translate this children's bedtime story to ${languageName}. Maintain the same warmth, magic, and age-appropriate tone.

**Original Story:**
Title: ${storyData.title}

${storyData.chapters.map((ch, i) => `
Chapter ${i + 1} - ${ch.title}
${ch.content}
`).join('\n')}

${storyData.happyEnding ? `Moral:\n${storyData.happyEnding}` : ''}

**Translation Guidelines:**
- Keep the storytelling style natural and engaging for ${languageName} speaking children
- Maintain all emotional warmth and magical elements
- Use simple, age-appropriate vocabulary
- Preserve character names unless they have natural ${languageName} equivalents
${targetLanguage === 'assamese' ? '- Use native Assamese script (অসমীয়া), NOT Bengali script' : ''}
- Keep the same structure and chapter divisions
- Keep the moral short and impactful (1-2 lines)

**Format your response as a JSON object:**
{
  "title": "Translated title",
  "chapters": [
    {
      "chapterNumber": 1,
      "title": "Translated chapter title",
      "content": "Translated chapter content"
    },
    ...all 5 chapters
  ],
  "happyEnding": "Translated moral (if exists)"
}`;
};

