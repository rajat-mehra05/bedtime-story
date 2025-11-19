import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';
import { generateMoralPrompt } from '@/lib/prompts';
import { handleAPIError, formatAPIError } from '@/lib/utils/apiErrorHandler';

export async function POST(request: NextRequest) {
  try {
    const { storyTitle, chapters } = await request.json();

    if (!storyTitle || !chapters || chapters.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Missing story data' },
        { status: 400 }
      );
    }

    const chaptersContent = chapters.map((ch: { content: string }) => ch.content);
    const prompt = generateMoralPrompt(storyTitle, chaptersContent);
    
    // Use error handler with automatic fallback
    const completion = await handleAPIError(async () => {
      return await openai.chat.completions.create({
        model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
            content: 'You are an inspiring storyteller who creates powerful, short morals and life lessons for children.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      });
    });

    const happyEnding = completion.choices[0].message.content?.trim();

    return NextResponse.json({
      success: true,
      data: { happyEnding },
    });
  } catch (error) {
    console.error('Error generating happy ending:', error);
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
