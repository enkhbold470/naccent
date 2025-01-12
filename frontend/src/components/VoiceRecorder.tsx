"use client"
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { commonWordsToARPABET } from '@/lib/phonemeMapping';

const VoiceRecorder = () => {
    const [recording, setRecording] = useState(false);
    const [audioFile, setAudioFile] = useState<Blob | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [transcription, setTranscription] = useState<string>('');
    const [accent, setAccent] = useState("general");
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
            };
            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                setAudioFile(audioBlob);
                audioChunksRef.current = [];
                transcribeAudio(audioBlob);
            };
            mediaRecorderRef.current.start();
            setRecording(true);
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

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-500";
        if (score >= 60) return "text-orange-500";
        return "text-red-500";
    };

    const formatPhonemeDisplay = (phoneme: string) => {
        // Remove pipes and format for display
        return phoneme.replace(/\|/g, ' ');
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-8">
            {/* Word Display */}
            <div className="text-center space-y-2">
                <div className="text-4xl font-medium">
                    {transcription && transcription.split('').map((char, i) => (
                        <span key={i} className={result ? getScoreColor(
                            result.word_score.phone_score_list[i]?.quality_score || 0
                        ) : ''}>
                            {char}
                        </span>
                    ))}
                </div>
                {result && (
                    <div className="space-y-2">
                        <div className="text-xl text-gray-600">
                            Expected: {formatPhonemeDisplay(result.word_score.word)}
                        </div>
                        <div className="text-xl text-gray-600">
                            Heard: {result.word_score.phone_score_list.map(p => p.sound_most_like).join(' ')}
                        </div>
                    </div>
                )}
            </div>

            {/* Microphone Button */}
            <div className="flex justify-center">
                <Button 
                    size="lg"
                    onClick={recording ? stopRecording : startRecording}
                    className={`rounded-full px-8 py-6 flex items-center gap-2 ${
                        recording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                    disabled={isUploading}
                >
                    <Mic className="w-6 h-6" />
                    <span>{recording ? 'Stop' : 'Tap to Speak'}</span>
                </Button>
            </div>

            {/* Accent Selection */}
            <div className="space-y-2">
                <Label>Select your preferred accent to score against:</Label>
                <RadioGroup 
                    defaultValue="general" 
                    onValueChange={setAccent}
                    className="flex gap-4"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="general" id="general" />
                        <Label htmlFor="general">General English</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="british" id="british" />
                        <Label htmlFor="british">British English</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="american" id="american" />
                        <Label htmlFor="american">American English</Label>
                    </div>
                </RadioGroup>
            </div>

            {error && (
                <div className="text-red-500 text-center">
                    Error: {error}
                </div>
            )}

            {result && (
                <>
                    {/* Overall Score */}
                    <div className="space-y-2">
                        <h2 className="text-xl text-blue-500 text-center">Overall</h2>
                        <div className="flex justify-center">
                            <div className="bg-blue-100 rounded-full px-8 py-4 flex items-center gap-2">
                                <span className="text-4xl font-bold text-blue-500">
                                    {Math.round(result.word_score.quality_score)}
                                </span>
                                <Mic className="w-5 h-5 text-blue-500" />
                            </div>
                        </div>
                    </div>

                    {/* Phoneme Results */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Phoneme-level Results</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Expected</TableHead>
                                    <TableHead>Heard As</TableHead>
                                    <TableHead>Quality Score</TableHead>
                                    <TableHead>Feedback</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {result.word_score.phone_score_list.map((phone: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{phone.phone}</TableCell>
                                        <TableCell className={
                                            phone.phone === phone.sound_most_like 
                                                ? "text-green-500" 
                                                : "text-red-500"
                                        }>
                                            {phone.sound_most_like}
                                        </TableCell>
                                        <TableCell className={getScoreColor(phone.quality_score)}>
                                            {Math.round(phone.quality_score)}
                                        </TableCell>
                                        <TableCell>
                                            {phone.phone === phone.sound_most_like 
                                                ? 'Correct sound' 
                                                : `Should be "${phone.phone}" sound`
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </>
            )}
        </div>
    );
};

export default VoiceRecorder; 