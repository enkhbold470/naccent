import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
    try {
        const transcriptionPath = join(process.cwd(), 'temp', 'latest_transcription.json');
        const transcription = await readFile(transcriptionPath, 'utf-8');
        return NextResponse.json(JSON.parse(transcription));
    } catch (error) {
        console.error('Error fetching transcription:', error);
        return NextResponse.json(
            { error: 'No transcription found' },
            { status: 404 }
        );
    }
} 