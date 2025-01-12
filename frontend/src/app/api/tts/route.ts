import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    try {
        console.log('Starting text-to-speech process');
        const { text } = await request.json();
        console.log('Received text:', text);
        
        if (!text) {
            console.log('No text provided');
            return NextResponse.json({ error: 'No text provided' }, { status: 400 });
        }

        console.log('Creating speech with OpenAI');
        const mp3Response = await openai.audio.speech.create({
            model: "tts-1",
            voice: "nova", // can be alloy, echo, fable, onyx, nova, or shimmer
            input: text,
        });
        console.log('Successfully generated speech');

        // Convert the raw response to a buffer
        const buffer = Buffer.from(await mp3Response.arrayBuffer());
        console.log('Converted response to buffer, size:', buffer.length);

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Length': buffer.length.toString(),
            },
        });
    } catch (error) {
        console.error('TTS error:', error);
        return NextResponse.json(
            { error: 'Text-to-speech failed', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; 