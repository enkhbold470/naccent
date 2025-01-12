'use client'

import { useState, useRef } from 'react'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Home, Mic, User, Volume2 } from 'lucide-react'
import VoiceRecorder from "@/components/VoiceRecorder"

export default function PronunciationTrainer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [lastTranscription, setLastTranscription] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ttsAudioRef = useRef<HTMLAudioElement | null>(null);

  const playLatestRecording = async () => {
    try {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
          return;
        }
      }

      const response = await fetch('/api/audio/latest');
      if (!response.ok) {
        throw new Error('No audio found');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      if (!audioRef.current) {
        audioRef.current = new Audio();
      }

      audioRef.current.src = url;
      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
      };

      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const playNativeSpeaker = async () => {
    try {
      if (ttsAudioRef.current) {
        if (isPlayingTTS) {
          ttsAudioRef.current.pause();
          setIsPlayingTTS(false);
          return;
        }
      }

      // First, get the latest transcription
      const response = await fetch('/api/transcribe/latest');
      if (!response.ok) {
        throw new Error('No transcription found');
      }
      const { text } = await response.json();
      setLastTranscription(text);

      // Then, get the TTS audio
      const ttsResponse = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!ttsResponse.ok) {
        throw new Error('TTS failed');
      }

      const blob = await ttsResponse.blob();
      const url = URL.createObjectURL(blob);

      if (!ttsAudioRef.current) {
        ttsAudioRef.current = new Audio();
      }

      ttsAudioRef.current.src = url;
      ttsAudioRef.current.onended = () => {
        setIsPlayingTTS(false);
        URL.revokeObjectURL(url);
      };

      await ttsAudioRef.current.play();
      setIsPlayingTTS(true);
    } catch (error) {
      console.error('Error playing TTS:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto flex flex-col pt-[4rem]">
      <main className="">

        {/* Text display area
        <div className=" rounded-lg p-6 shadow-sm mb-6">
          <p className="text-lg leading-relaxed">
            The quick <span className="text-red-500 font-bold">bro</span>wn fox jumps over{' '}
            <span className="text-red-500 font-bold">the</span> lazy dog
          </p>
          <p className="mt-4 italic">You can also edit your text</p>
        </div> */}

        {/* Word focus area
        <div className="mb-6">
          <p className="text-lg">
            <span className="text-red-500 font-bold">bro</span>wn
          </p>
        </div> */}

        {/* Audio controls */}
        <div className="space-y-2 mb-8">
          <div className="px-2 flex items-center w-full justify-between h-16 bg-inherit-300 rounded-md">
            <Button
              onClick={playLatestRecording}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Volume2 className="h-6 w-6" />
              {isPlaying ? 'Stop' : 'Play'} Your Speech
            </Button>
           
            <Button
              onClick={playNativeSpeaker}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Volume2 className="h-6 w-6" />
              {isPlayingTTS ? 'Stop' : 'Play'} Native Speaker
            </Button>
          </div>
        </div>
       
        {/* Difficulty slider */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm">Easy</span>
            <span className="text-sm">Hard</span>
          </div>
          <Slider
            defaultValue={[75]}
            max={100}
            step={25}
          />
        </div>
      </main>

      <div className='container mx-auto py-8'>
            <h1 className='text-2xl font-semibold text-center mb-8'>
                Pronunciation Checker
            </h1>
            <VoiceRecorder />
        </div>

    </div>
  )
}

