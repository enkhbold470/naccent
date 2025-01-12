import { ArrowRight, Home, Mic, User } from 'lucide-react'
import Image from 'next/image'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ModeToggle } from '@/components/mode-toggle'

const image = "https://images.pexels.com/photos/28406651/pexels-photo-28406651/free-photo-of-historic-armenian-church-on-akdamar-island-van.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"

export default function LanguageProfile() {
  return (
    <div className="flex flex-col pt-[4rem] ">
      

      {/* Profile Section */}
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16  rounded-lg overflow-hidden">
            <Image
              src = {image}
              alt="Profile"
              width={1080}
              height={1080}
              className="object-cover"
            />
          </div>
          <div className="flex-1 ">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Katskt</h1>
              <div className='flex  items-center'>

              <ModeToggle />
              <a href = "/history">
              <Button variant="ghost" className="text-gray-600 gap-1">
                History <ArrowRight className="w-4 h-4" />
              </Button>
              </a>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">You have a 3 day streak!</p>
          </div>
        </div>
      </div>
      {/* Progress Visualization */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-12 gap-2">
          {Array.from({ length: 72 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-sm ${
                Math.random() > 0.8 ? 'bg-orange-500' : 
                Math.random() > 0.6 ? 'bg-orange-400' :
                Math.random() > 0.4 ? 'bg-orange-300' :
                Math.random() > 0.2 ? 'bg-orange-200' : 'bg-green-100'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>Nov</span>
          <span>Dec</span>
          <span>Jan</span>
        </div>
      </div>

      {/* Challenge Words */}
      <Card className="mx-4 bg-orange-50">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">Challenge Words</h2>
          <p className="text-gray-600 italic mb-6">
            Here are some sounds we notice you miss often
          </p>
          
          <div className="space-y-4 mb-6">
            <p className="text-lg">
              Sh<span className="text-red-500">ee</span>p
            </p>
            <p className="text-lg">
              Bl<span className="text-red-500">oo</span>m
            </p>
            <p className="text-lg">
              <span className="text-red-500">The</span>
            </p>
          </div>

          <div className="flex justify-end">
            <a href = "/accent">
            <Button className="bg-orange-400 hover:bg-orange-500">
              Lets go
            </Button>
            </a>
          </div>
        </div>
      </Card>

     
    </div>
  )
}

