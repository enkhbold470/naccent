import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
    try {
        console.log('Fetching latest transcription');
        const transcriptionPath = join(process.cwd(), 'temp', 'latest_transcription.json');
        const transcription = await readFile(transcriptionPath, 'utf-8');
        console.log('Successfully read transcription file');
        const parsedTranscription = JSON.parse(transcription);
        console.log('Parsed transcription:', parsedTranscription);
        return NextResponse.json(parsedTranscription);
    } catch (error) {
        console.error('Error fetching transcription:', error);
        return NextResponse.json(
            { error: 'No transcription found' },
            { status: 404 }
        );
    }
} 