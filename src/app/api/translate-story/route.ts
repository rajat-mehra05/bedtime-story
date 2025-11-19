import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';
import { translateStoryPrompt } from '@/lib/prompts';
import { handleAPIError, formatAPIError } from '@/lib/utils/apiErrorHandler';

export async function POST(request: NextRequest) {
  try {
    const { storyData, targetLanguage } = await request.json();

    if (!storyData || !targetLanguage) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (targetLanguage === 'english') {
      // No translation needed for English
      return NextResponse.json({
        success: true,
        data: storyData,
      });
    }

    const prompt = translateStoryPrompt(storyData, targetLanguage);
    
    // Use error handler with automatic fallback
    const completion = await handleAPIError(async () => {
      return await openai.chat.completions.create({
        model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
            content: `You are an expert translator specializing in children's literature. You translate stories while maintaining their magical, warm tone.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
        temperature: 0.7,
      });
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No translation generated');
    }

    const translatedData = JSON.parse(content);

    return NextResponse.json({
      success: true,
      data: translatedData,
    });
  } catch (error) {
    console.error('Error translating story:', error);
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
