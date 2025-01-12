import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    try {
        console.log('Starting transcription process');
        const formData = await request.formData();
        const audioFile = formData.get('audio') as Blob;
        console.log('Received audio file');
        
        const tempDir = join(process.cwd(), 'temp');
        const tempFilePath = join(tempDir, `${Date.now()}.wav`);
        console.log('Created temporary file path:', tempFilePath);

        await mkdir(tempDir, { recursive: true });
        const arrayBuffer = await audioFile.arrayBuffer();
        await writeFile(tempFilePath, new Uint8Array(arrayBuffer));
        console.log('Saved audio file to temp directory');

        console.log('Starting OpenAI transcription');
        const transcription = await openai.audio.transcriptions.create({
            file: new File([new Uint8Array(arrayBuffer)], 'audio.wav', { type: 'audio/wav' }),
            model: 'whisper-1',
            language: 'en',
            response_format: 'json',
            prompt: "This is American English speech.",
        });
        console.log('Completed OpenAI transcription');

        await unlink(tempFilePath).catch(console.error);
        console.log('Cleaned up temporary file');

        const transcriptionPath = join(process.cwd(), 'temp', 'latest_transcription.json');
        await writeFile(
            transcriptionPath,
            JSON.stringify({ text: transcription.text }),
            'utf-8'
        );
        console.log('Saved transcription to file');

        console.log('Returning transcription response');
        return NextResponse.json({ text: transcription.text });
    } catch (error) {
        console.error('Transcription error:', error);
        return NextResponse.json(
            { error: 'Transcription failed', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';