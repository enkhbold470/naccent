"use client"
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { commonWordsToARPABET } from '@/lib/phonemeMapping';

const VoiceRecorder = () => {
    const [recording, setRecording] = useState(false);
    const [audioFile, setAudioFile] = useState<Blob | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [transcription, setTranscription] = useState<string>('');
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    // Function to convert text to ARPABET phonemes
    const textToARPABET = (text: string): string => {
        const words = text.toLowerCase().trim().split(/\s+/);
        const phonemes = words.map(word => {
            // First check if it's a known word
            if (commonWordsToARPABET[word as keyof typeof commonWordsToARPABET]) {
                return commonWordsToARPABET[word as keyof typeof commonWordsToARPABET];
            }

            // If not a known word, use basic phoneme mapping
            // This is a simplified mapping and should be enhanced for better accuracy
            const basicPhonemeMap: { [key: string]: string } = {
                'a': 'ae',  // as in "cat"
                'e': 'eh',  // as in "bed"
                'i': 'ih',  // as in "bit"
                'o': 'aa',  // as in "hot"
                'u': 'ah',  // as in "but"
                'h': 'hh',
                'l': 'l',
                'r': 'r',
                'w': 'w',
                'y': 'y',
                'm': 'm',
                'n': 'n',
                'p': 'p',
                'b': 'b',
                't': 't',
                'd': 'd',
                'k': 'k',
                'g': 'g',
                'f': 'f',
                'v': 'v',
                's': 's',
                'z': 'z',
            };

            return word
                .split('')
                .map(char => basicPhonemeMap[char] || '')
                .filter(Boolean)
                .join('|');
        });
        return phonemes.join('|');
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
                console.log("Audio data available:", event.data);
            };
            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                setAudioFile(audioBlob);
                console.log("Recording stopped, blob created:", audioBlob);
                audioChunksRef.current = [];
                
                // Automatically transcribe the audio
                transcribeAudio(audioBlob);
            };
            mediaRecorderRef.current.start();
            setRecording(true);
            console.log("Recording started");
        } catch (err) {
            console.error("Error starting recording:", err);
            setError("Failed to start recording");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setRecording(false);
            console.log("Recording stopped");
        }
    };

    const transcribeAudio = async (audioBlob: Blob) => {
        try {
            const formData = new FormData();
            formData.append('audio', audioBlob);

            // Call your Whisper API endpoint
            const response = await fetch('/api/transcribe', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Transcription failed');

            const data = await response.json();
            const text = data.text;
            setTranscription(text);

            // Convert transcription to ARPABET phonemes
            const phonemes = textToARPABET(text);
            console.log("Converted to phonemes:", phonemes);
            
            // Automatically trigger upload with the correct phonemes
            uploadAudioWithPhonemes(audioBlob, phonemes);
        } catch (err) {
            console.error("Transcription error:", err);
            setError("Failed to transcribe audio");
        }
    };

    const uploadAudioWithPhonemes = async (audioBlob: Blob, phonemes: string) => {
        try {
            setIsUploading(true);
            setError(null);

            const formData = new FormData();
            formData.append('phone_list', phonemes);
            formData.append('user_audio_file', audioBlob, 'recording.wav');
            formData.append('question_info', 'u1/q1');

            const response = await fetch('/api/speak', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("API Response:", data);
            setResult(data);

        } catch (err) {
            console.error("Error uploading audio:", err);
            setError(err instanceof Error ? err.message : "Failed to upload audio");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2">
                <Button onClick={recording ? stopRecording : startRecording}>
                    {recording ? 'Stop Recording' : 'Start Recording'}
                </Button>
            </div>

            {transcription && (
                <div className="mt-2">
                    <h3 className="font-bold">Transcription:</h3>
                    <p>{transcription}</p>
                </div>
            )}

            {error && (
                <div className="text-red-500">
                    Error: {error}
                </div>
            )}

            {result && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <h3 className="font-bold">Results:</h3>
                    <pre className="whitespace-pre-wrap">
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default VoiceRecorder; 