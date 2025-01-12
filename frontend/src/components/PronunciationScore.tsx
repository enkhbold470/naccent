"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PhoneScore {
    phone: string;
    quality_score: number;
    sound_most_like: string;
    extent: [number, number];
}

interface WordScore {
    word: string;
    quality_score: number;
    phone_score_list: PhoneScore[];
}

interface ScoringResult {
    status: string;
    word_score: WordScore;
}

const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-orange-500";
    return "bg-red-500";
};

const getTextColor = (score: number) => {
    if (score >= 80) return "text-green-700";
    if (score >= 60) return "text-orange-700";
    return "text-red-700";
};

export function PronunciationScore({ 
    result, 
    transcription 
}: { 
    result: ScoringResult;
    transcription: string;
}) {
    if (!result || !result.word_score) return null;

    const { word_score } = result;
    const overallScore = word_score.quality_score;

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>Pronunciation Score</span>
                    <span className={`text-2xl font-bold ${getTextColor(overallScore)}`}>
                        {Math.round(overallScore)}%
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Overall Score */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Overall Quality</span>
                        </div>
                        <Progress 
                            value={overallScore} 
                            className={getScoreColor(overallScore)}
                        />
                    </div>

                    {/* Phonetic Breakdown */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">Phonetic Breakdown</h4>
                        <div className="grid gap-2">
                            {word_score.phone_score_list.map((phone, index) => (
                                <div key={index} className="grid grid-cols-4 items-center gap-2">
                                    <div className="col-span-1">
                                        <span className="text-sm font-medium">
                                            {phone.phone}
                                            {phone.sound_most_like !== phone.phone && 
                                                ` → ${phone.sound_most_like}`
                                            }
                                        </span>
                                    </div>
                                    <div className="col-span-3">
                                        <Progress 
                                            value={phone.quality_score} 
                                            className={getScoreColor(phone.quality_score)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Transcription with Highlighting */}
                    <div className="space-y-2">
                        <h4 className="font-semibold">Transcription</h4>
                        <p className="text-lg leading-relaxed">
                            {transcription.split('').map((char, index) => {
                                const phoneScore = word_score.phone_score_list.find(
                                    phone => index >= phone.extent[0] && index < phone.extent[1]
                                );
                                return (
                                    <span
                                        key={index}
                                        className={`${
                                            phoneScore 
                                                ? getTextColor(phoneScore.quality_score) 
                                                : ''
                                        } font-medium`}
                                    >
                                        {char}
                                    </span>
                                );
                            })}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 