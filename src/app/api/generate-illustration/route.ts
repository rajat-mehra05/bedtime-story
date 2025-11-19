import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';
import { generateIllustrationPrompt } from '@/lib/prompts';

export async function POST(request: NextRequest) {
  try {
    const { chapterTitle, chapterContent } = await request.json();

    if (!chapterTitle || !chapterContent) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const prompt = generateIllustrationPrompt(chapterTitle, chapterContent);
    
    // Generate image using DALL-E 3
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      style: 'vivid',
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
        imageUrl: imageUrl,
        prompt: prompt,
      },
    });
  } catch (error: any) {
    console.error('Error generating illustration:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to generate illustration. Please try again.',
      },
      { status: 500 }
    );
  }
}
