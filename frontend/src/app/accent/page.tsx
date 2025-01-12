'use client'

import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Home, Mic, User, Volume2 } from 'lucide-react'
import  VoiceRecorder  from "@/components/VoiceRecorder"

export default function PronunciationTrainer() {
  return (
    <div className="max-w-md mx-auto flex flex-col pt-[4rem]">
      <main className="">

        {/* Text display area */}
        <div className=" rounded-lg p-6 shadow-sm mb-6">
          <p className="text-lg leading-relaxed">
            The quick <span className="text-red-500 font-bold">bro</span>wn fox jumps over{' '}
            <span className="text-red-500 font-bold">the</span> lazy dog
          </p>
          <p className="mt-4 italic">You can also edit your text</p>
        </div>

        {/* Word focus area */}
        <div className="mb-6">
          <p className="text-lg">
            <span className="text-red-500 font-bold">bro</span>wn
          </p>
        </div>

        {/* Audio controls */}
        <div className="space-y-2 mb-8">
          <div className="px-2 flex items-center w-full justify-between h-16 bg-red-300 rounded-md">
          <Button  
          >
            <Volume2 className="h-6 w-6 mr-2" />
          </Button>
          You
          <Button variant="default" size="icon" className="h-14 w-14 rounded-full">
            <Mic className="h-6 w-6" />
          </Button>
          </div>
       
          <div className="px-2 flex items-center w-full justify-between h-16 bg-green-300 rounded-md">
          <Button>
            <Volume2 className="h-6 w-6 mr-2" />
          </Button>
          <div className="">
          Native Speaker
          </div>
          <Button variant="default" size="icon" className="h-14 w-14 rounded-full">
            <Mic className="h-6 w-6" />
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

