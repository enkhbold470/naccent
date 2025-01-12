'use client'

import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Home, Mic, User, Volume2 } from 'lucide-react'

export default function PronunciationTrainer() {
  return (
    <div className="max-w-md mx-auto h-screen bg-gray-50 flex flex-col pt-20">
      <main className="p-6 h-screen">

        {/* Text display area */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <p className="text-lg leading-relaxed">
            The quick <span className="text-red-500 font-bold">bro</span>wn fox jumps over{' '}
            <span className="text-red-500 font-bold">the</span> lazy dog
          </p>
          <p className="text-gray-400 mt-4 italic">You can also edit your text</p>
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

      {/* Bottom navigation */}
      <div className="border-t bg-gray-100 p-4">
        <div className="flex justify-between items-center max-w-xs mx-auto">
          <Button variant="ghost" size="icon">
            <Home className="h-6 w-6" />
          </Button>
          <Button variant="default" size="icon" className="h-14 w-14 rounded-full">
            <Mic className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}

