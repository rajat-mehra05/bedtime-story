// Creative AI prompts for story and illustration generation

import { StoryInputs } from './types';

export const generateStoryPrompt = (inputs: StoryInputs): string => {
  const prompt = `You are a creative children's storyteller. Generate an enchanting bedtime story for children under 6 years old.

**Story Requirements:**
- Genre: ${inputs.genre}
- Characters: ${inputs.characters}
  **IMPORTANT**: Pay close attention to the gender specifications for each character. Use appropriate gender-specific pronouns (he/him, she/her, they/them) consistently throughout the story based on what is specified. If a character is described as a "girl" or "boy", use the corresponding pronouns. If described as "non-binary" or no gender is specified, use they/them pronouns.
- Length: Maximum 500 words per chapter
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
- Maximum 500 words per chapter
- Age-appropriate and gentle (no scary content)
- Include vivid, colorful descriptions
- Build excitement while remaining calming for bedtime
- Feature dialogue and character interactions
- Each chapter must end in a way that naturally leads to the next
- **Use the correct gender pronouns for each character as specified in their descriptions throughout the entire story**

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

export const generateMoralPrompt = (storyTitle: string, chapters: string[], language?: string): string => {
  const chaptersText = chapters.map((c, i) => `Chapter ${i + 1}: ${c.substring(0, 200)}...`).join('\n');
  
  const targetLanguage = language || 'english';
  const languageName = targetLanguage === 'english' ? 'English' : targetLanguage === 'hindi' ? 'Hindi (हिंदी)' : 'Assamese (অসমীয়া)';
  
  const languageInstruction = targetLanguage === 'english' 
    ? 'Generate the moral in English.'
    : `Generate the moral in ${languageName}. Use the native script for ${languageName === 'Hindi (हिंदी)' ? 'Hindi' : 'Assamese'} if applicable.`;

  const examples = targetLanguage === 'english' 
    ? `Examples of good morals:
- "True friendship means being there for each other, no matter what."
- "Even the smallest acts of kindness can make the biggest difference."
- "Believe in yourself, and you can achieve anything you dream of."`
    : targetLanguage === 'hindi'
    ? `Examples of good morals (in Hindi):
- "सच्ची दोस्ती का मतलब है एक-दूसरे के लिए हमेशा मौजूद रहना, चाहे कुछ भी हो।"
- "छोटे-छोटे दयालु कार्य भी सबसे बड़ा अंतर ला सकते हैं।"
- "अपने आप पर विश्वास करो, और तुम अपने सपनों को साकार कर सकते हो।"`
    : `Examples of good morals (in Assamese):
- "সঁচা বন্ধুত্বৰ অৰ্থ হ'ল এজনে আনজনৰ বাবে সদায় উপস্থিত থাকা, যিকোনো পৰিস্থিতিত।"
- "সৰু সৰু দয়ালু কাৰ্য্যইও সবাতোকৈ ডাঙৰ পাৰ্থক্য আনিব পাৰে।"
- "নিজৰ ওপৰত বিশ্বাস কৰা, আৰু তুমি তোমাৰ সপোনবোৰ সফল কৰিব পাৰা।"`;

  return `Based on this bedtime story titled "${storyTitle}", create an inspiring moral or life lesson.

Story chapters:
${chaptersText}

${languageInstruction}

Generate a short, powerful moral that is:
- EXACTLY 1-2 lines only (maximum 2 sentences)
- Inspiring and motivational
- Contains a meaningful life lesson
- Easy for children to understand and remember
- Related to themes like friendship, kindness, bravery, honesty, perseverance, or love

${examples}

Return ONLY the moral text (1-2 lines) in ${languageName}, nothing else.`;
};

export const generateIllustrationPrompt = (
  chapterTitle: string, 
  chapterContent: string, 
  characters?: string
): string => {
  // Extract gender information from character descriptions
  let genderInstructions = '';
  if (characters) {
    const characterDescriptions = characters.split(',').map(c => c.trim());
    const genderSpecs: string[] = [];
    
    characterDescriptions.forEach(char => {
      const lowerChar = char.toLowerCase();
      
      // Check for male/boy indicators
      const isMale = lowerChar.includes('boy') || 
                     lowerChar.includes('male') || 
                     lowerChar.match(/\b(boy|male)\b/);
      
      // Check for female/girl indicators
      const isFemale = lowerChar.includes('girl') || 
                       lowerChar.includes('female') || 
                       lowerChar.match(/\b(girl|female)\b/);
      
      // Check for non-binary
      const isNonBinary = lowerChar.includes('non-binary') || 
                          lowerChar.includes('nonbinary') ||
                          lowerChar.includes('non binary');
      
      if (isMale && !isFemale) {
        // Extract character description (everything before gender word or entire string)
        let charDesc = char;
        const maleMatch = char.match(/(.+?)\s+(?:boy|male)/i);
        if (maleMatch) {
          charDesc = maleMatch[1].trim();
        } else {
          // Remove articles
          charDesc = char.replace(/^(?:a|an|the)\s+/i, '').trim();
        }
        genderSpecs.push(`${charDesc} is a boy/male character - must appear as male in the illustration`);
      } else if (isFemale && !isMale) {
        let charDesc = char;
        const femaleMatch = char.match(/(.+?)\s+(?:girl|female)/i);
        if (femaleMatch) {
          charDesc = femaleMatch[1].trim();
        } else {
          charDesc = char.replace(/^(?:a|an|the)\s+/i, '').trim();
        }
        genderSpecs.push(`${charDesc} is a girl/female character - must appear as female in the illustration`);
      } else if (isNonBinary) {
        let charDesc = char;
        const nbMatch = char.match(/(.+?)\s+non-?binary/i);
        if (nbMatch) {
          charDesc = nbMatch[1].trim();
        } else {
          charDesc = char.replace(/^(?:a|an|the)\s+/i, '').trim();
        }
        genderSpecs.push(`${charDesc} is a non-binary character`);
      }
    });
    
    if (genderSpecs.length > 0) {
      genderInstructions = `\n\n**CRITICAL CHARACTER GENDER REQUIREMENTS - MUST FOLLOW EXACTLY:**\n${genderSpecs.map(spec => `- ${spec}`).join('\n')}\n\n**ABSOLUTELY CRITICAL**: You MUST accurately represent these genders in the illustration. If a character is specified as a boy/male, they MUST appear as clearly male. If specified as a girl/female, they MUST appear as clearly female. Do NOT change genders, mix them up, or make assumptions. Follow the gender specifications exactly as stated above.`;
    }
  }
  
  return `Create a beautiful anime-style illustration for a children's bedtime story.

Scene: ${chapterTitle}
Context: ${chapterContent.substring(0, 300)}${genderInstructions}

Style: Soft anime art style with cute characters, large expressive eyes, warm pastel colors, dreamy atmosphere, children's storybook illustration, magical lighting, gentle and calming composition, no scary elements, cozy bedtime aesthetic, high quality digital art, studio ghibli inspired, kawaii style

**IMPORTANT**: Accurately represent the genders of all characters as specified above. Do not change character genders or mix them up.`;
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

