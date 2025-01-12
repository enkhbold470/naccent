import { NextResponse } from 'next/server';
import { readdir, readFile, stat } from 'fs/promises';
import { join } from 'path';

export async function GET() {
    try {
        const uploadDir = join(process.cwd(), 'uploads');
        const files = await readdir(uploadDir);
        
        // Get file stats for all wav files
        const fileStats = await Promise.all(
            files
                .filter(f => f.endsWith('.wav'))
                .map(async (file) => ({
                    name: file,
                    stat: await stat(join(uploadDir, file))
                }))
        );

        // Sort by modification time and get the latest
        const latestFile = fileStats
            .sort((a, b) => b.stat.mtime.getTime() - a.stat.mtime.getTime())
            [0]?.name;

        if (!latestFile) {
            return new NextResponse('No audio files found', { status: 404 });
        }

        const audioBuffer = await readFile(join(uploadDir, latestFile));
        
        return new NextResponse(audioBuffer, {
            headers: {
                'Content-Type': 'audio/wav',
                'Content-Disposition': `attachment; filename="${latestFile}"`,
            },
        });
    } catch (error) {
        console.error('Error fetching audio:', error);
        return new NextResponse('Error fetching audio', { status: 500 });
    }
} 