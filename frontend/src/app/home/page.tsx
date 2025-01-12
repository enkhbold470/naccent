import { Card } from "@/components/ui/card"
import { Home, Mic, User } from 'lucide-react'
import { Button } from "@/components/ui/button"

import Image from "next/image"
const image = "https://images.pexels.com/photos/28406651/pexels-photo-28406651/free-photo-of-historic-armenian-church-on-akdamar-island-van.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
export default function DailyMissions() {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <Image
            src={image}
            alt="US Flag"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
        <Image
          src={image}
          alt="Logo"
          width={40}
          height={40}
        />
      </header>

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
      <nav className="border-t bg-gray-50 p-4">
        <div className="flex justify-between items-center max-w-xs mx-auto">
          <a href = "/home">
          <Button variant="ghost" size="icon">
            <Home className="h-6 w-6" />
          </Button>
          </a>
          <a href = "/accent">
          <Button variant="default" size="icon" className="h-14 w-14 rounded-full">
            <Mic className="h-6 w-6" />
          </Button>
          </a>
          <a href = "/profile">
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
          </Button>
          </a>

        </div>
      </nav>
    </div>
  )
}

