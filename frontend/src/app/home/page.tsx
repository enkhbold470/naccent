import { Card } from "@/components/ui/card"
import { Home, Mic, User } from 'lucide-react'
import { Button } from "@/components/ui/button"

import Image from "next/image"
import { DailyPractice } from "@/components/DailyPractice"
export default function DailyMissions() {
  return (
    <div className="flex flex-col pt-[4rem] ">


     

<h1 className="text-3xl font-bold text-center mb-8">
              Daily English Practice
            </h1>
            <div className="max-w-2xl mx-auto">
                <DailyPractice />
            </div>    
    </div>
  )
}

