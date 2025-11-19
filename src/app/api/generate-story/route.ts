import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';
import { generateStoryPrompt } from '@/lib/prompts';
import { StoryInputs } from '@/lib/types';
import { handleAPIError, formatAPIError } from '@/lib/utils/apiErrorHandler';

export async function POST(request: NextRequest) {
  try {
    const inputs: StoryInputs = await request.json();
    const prompt = generateStoryPrompt(inputs);
    
    // Use error handler with automatic fallback
    const completion = await handleAPIError(async () => {
      return await openai.chat.completions.create({
        model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
            content: 'You are a creative children\'s storyteller specializing in bedtime stories for kids under 6. Always respond with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
        temperature: 0.9,
      });
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content generated');
    }

    const storyData = JSON.parse(content);

    return NextResponse.json({
      success: true,
      data: storyData,
    });
  } catch (error) {
    console.error('Error generating story:', error);
    const errorMessage = formatAPIError(error);
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
