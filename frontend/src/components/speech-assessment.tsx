'use client'

import { useState } from 'react'
import { Mic } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function SpeechAssessment() {
  const [accent, setAccent] = useState("general")
  
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-semibold text-center">
        Speech Assessment of English Word
      </h1>

      {/* Word Display */}
      <div className="text-center space-y-2">
        <div className="text-4xl font-medium">
          <span className="text-green-500">sh</span>
          <span className="text-red-500">ee</span>
          <span className="text-green-500">p</span>
        </div>
        <div className="text-xl text-gray-600">/ʃiːp/</div>
      </div>

      {/* Try Another Button */}
      <div className="text-center">
        <Button variant="outline">try another one</Button>
      </div>

      {/* Microphone Button */}
      <div className="flex justify-center">
        <Button 
          size="lg" 
          className="rounded-full w-16 h-16 bg-blue-500 hover:bg-blue-600"
        >
          <Mic className="w-8 h-8" />
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
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="indian" id="indian" />
            <Label htmlFor="indian">Indian English</Label>
          </div>
        </RadioGroup>
      </div>

      {/* More Customization Link */}
      <div className="text-right">
        <Button variant="link">More customization →</Button>
      </div>

      {/* Overall Score */}
      <div className="space-y-2">
        <h2 className="text-xl text-blue-500 text-center">Overall</h2>
        <div className="flex justify-center">
          <div className="bg-blue-100 rounded-full px-8 py-4 flex items-center gap-2">
            <span className="text-4xl font-bold text-blue-500">90</span>
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
              <TableHead>Spelling</TableHead>
              <TableHead>Sound</TableHead>
              <TableHead>Quality Score</TableHead>
              <TableHead>Sound Like</TableHead>
              <TableHead>Feedback</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>sh</TableCell>
              <TableCell>/ʃ/</TableCell>
              <TableCell>95</TableCell>
              <TableCell>/ʃ/</TableCell>
              <TableCell>Sound match</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ee</TableCell>
              <TableCell>/iː/</TableCell>
              <TableCell>66</TableCell>
              <TableCell>/ɪ/</TableCell>
              <TableCell>Wrong sound</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>p</TableCell>
              <TableCell>/p/</TableCell>
              <TableCell>91</TableCell>
              <TableCell>/p/</TableCell>
              <TableCell>Sound match</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Word Stress Detection */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Word Stress Detection</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p>You pronounced the correct word stress. Its on the 1st syllable.</p>
        </div>
      </div>
    </div>
  )
}

