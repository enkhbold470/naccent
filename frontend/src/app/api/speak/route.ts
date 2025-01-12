import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';

const API_KEY = process.env.SPEECHACE_API_KEY;
const API_URL = 'https://api.speechace.co/api/scoring/phone_list/v9/json';

export async function POST(request: NextRequest) {
    try {
        console.log("Received request");
        
        const data = await request.formData();
        const file: File | null = data.get('user_audio_file') as unknown as File;
        const phone_list = data.get('phone_list');
        const question_info = data.get('question_info');

        console.log("Form data received:", { phone_list, question_info });

        if (!file) {
            console.error("No file uploaded");
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        console.log("File received:", file.name);

        // Create uploads directory if it doesn't exist
        const uploadDir = join(process.cwd(), 'uploads');
        try {
            await mkdir(uploadDir, { recursive: true });
            console.log("Upload directory created/verified:", uploadDir);
        } catch (error) {
            console.error("Error with upload directory:", error);
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        console.log("File converted to buffer, size:", buffer.length, "bytes");

        // Write the file to disk
        const filepath = join(uploadDir, file.name);
        await writeFile(filepath, new Uint8Array(buffer));
        console.log("File written to:", filepath);

        // Construct URL with query parameters
        const url = new URL(API_URL);
        url.searchParams.append('key', API_KEY || "");
        url.searchParams.append('user_id', 'XYZ-ABC-99001');
        url.searchParams.append('dialect', 'en-us'); // Specifically request US English
        url.searchParams.append('speech_rate_threshold', '0.8'); // More lenient speech rate threshold
        url.searchParams.append('include_intonation', 'true'); // Include intonation scoring
        url.searchParams.append('include_fluency', 'true'); // Include fluency scoring
        url.searchParams.append('include_rhythm', 'true'); // Include rhythm scoring

        console.log("API URL constructed with parameters:", url.toString());

        // Create form data for the API request
        const apiFormData = new FormData();
        apiFormData.append('phone_list', phone_list as string);
        apiFormData.append('user_audio_file', new Blob([buffer], { type: 'audio/wav' }), 'recording.wav');
        apiFormData.append('question_info', question_info as string);
        console.log("API form data prepared");

        console.log("Making request to SpeechAce API:", url.toString());
        const response = await fetch(url.toString(), {
            method: 'POST',
            body: apiFormData,
        });

        console.log("API response status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("API Error Response:", errorText);
            throw new Error(`API request failed: ${response.status} ${errorText}`);
        }

        const result = await response.json();
        console.log("Raw API response:", result);
        
        // Adjust scores for American English patterns
        if (result.word_score && result.word_score.phone_score_list) {
            console.log("Adjusting scores for American English patterns");
            result.word_score.phone_score_list = result.word_score.phone_score_list.map((score: any) => {
                console.log("Processing phone:", score.phone, "Original score:", score.quality_score);
                // Adjust scores for common American English patterns
                if (score.phone === 't' && score.sound_most_like === 'd') {
                    // Flapped 't' in American English
                    score.quality_score = Math.min(score.quality_score + 10, 100);
                    console.log("Adjusted flapped 't' score to:", score.quality_score);
                }
                if (score.phone === 'r' && score.quality_score > 60) {
                    // Strong 'r' sound in American English
                    score.quality_score = Math.min(score.quality_score + 5, 100);
                    console.log("Adjusted 'r' sound score to:", score.quality_score);
                }
                return score;
            });

            // Recalculate overall score
            const totalScore = result.word_score.phone_score_list.reduce(
                (acc: number, score: any) => acc + score.quality_score, 
                0
            );
            result.word_score.quality_score = totalScore / result.word_score.phone_score_list.length;
            console.log("Recalculated overall score:", result.word_score.quality_score);
        }

        console.log("Final SpeechAce API response:", result);
        return NextResponse.json(result);
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { error: 'Error processing request', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; 