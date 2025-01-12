import { Card } from "@/components/ui/card"
import { Home, Mic, User } from 'lucide-react'
import { Button } from "@/components/ui/button"

import Image from "next/image"
const image = "https://images.pexels.com/photos/28406651/pexels-photo-28406651/free-photo-of-historic-armenian-church-on-akdamar-island-van.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
export default function DailyMissions() {
  return (
    <div className="flex flex-col pt-[4rem] ">


      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Daily Missions</h1>
          <span className="text-xl">1/3</span>
        </div>

        <div className="space-y-4">
          {/* Popular Quotes */}
          <Card className="p-4 bg-gray-100">
            <div className="space-y-2">
              <h2 className="inline-block px-3 py-1 bg-yellow-200 rounded-full text-sm font-medium">
                Popular Quotes
              </h2>
              <p className="text-gray-800">
                My mama always said life was like a box of chocolates. You never know what you&apos;re gonna get.
              </p>
            </div>
          </Card>

          {/* Daily Life */}
          <Card className="p-4 bg-green-100">
            <div className="space-y-2">
              <h2 className="inline-block px-3 py-1 bg-yellow-200 rounded-full text-sm font-medium">
                Daily Life
              </h2>
              <p className="text-gray-800">
                Excuse me, do you know where I can find the library?
              </p>
            </div>
          </Card>

          {/* Tongue Twister */}
          <Card className="p-4 bg-gray-100">
            <div className="space-y-2">
              <h2 className="inline-block px-3 py-1 bg-yellow-200 rounded-full text-sm font-medium">
                Tongue Twister
              </h2>
              <p className="text-gray-800">
                She sold seashells by the sea shore.
              </p>
            </div>
          </Card>
        </div>
      </main>

      {/* Bottom Navigation */}
    
    </div>
  )
}

