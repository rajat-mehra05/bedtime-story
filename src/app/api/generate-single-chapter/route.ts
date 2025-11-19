import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';
import { generateIllustrationPrompt } from '@/lib/prompts';
import { handleAPIError, formatAPIError } from '@/lib/utils/apiErrorHandler';

export async function POST(request: NextRequest) {
  try {
    const { chapterNumber, chapterTitle, chapterContent } = await request.json();

    if (!chapterNumber || !chapterTitle || !chapterContent) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate illustration for the chapter
    const prompt = generateIllustrationPrompt(chapterTitle, chapterContent);
    
    const response = await handleAPIError(async () => {
      return await openai.images.generate({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        style: 'vivid',
      });
    });

    if (!response.data || response.data.length === 0) {
      throw new Error('No image data returned from DALL-E');
    }

    const imageUrl = response.data[0]?.url;

    if (!imageUrl) {
      throw new Error('No image URL returned from DALL-E');
    }

    return NextResponse.json({
      success: true,
      data: {
        chapterNumber,
        illustration: imageUrl,
      },
    });
  } catch (error: any) {
    console.error('Error generating chapter illustration:', error);
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

