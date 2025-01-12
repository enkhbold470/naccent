import { ArrowRight, Home, Mic, User } from 'lucide-react'
import Image from 'next/image'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const image = "https://images.pexels.com/photos/28406651/pexels-photo-28406651/free-photo-of-historic-armenian-church-on-akdamar-island-van.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"

export default function LanguageProfile() {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <Image
          src={image}
          alt="US Flag"
          width={40}
          height={40}
          className="rounded-full"
        />
        <Image
          src={image}
          alt="Nascent Logo"
          width={48}
          height={48}
        />
      </header>

      {/* Profile Section */}
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src = {image}
              alt="Profile"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Katskt</h1>
              <a href = "/history">
              <Button variant="ghost" className="text-gray-600 gap-1">
                History <ArrowRight className="w-4 h-4" />
              </Button>
              </a>
            </div>
            <p className="text-sm text-gray-600 mt-1">You have a 3 day streak!</p>
          </div>
        </div>
      </div>

      {/* Progress Visualization */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-12 gap-1">
          {Array.from({ length: 144 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-sm ${
                Math.random() > 0.5 ? 'bg-orange-200' : 'bg-orange-100'
              }`}
            />
          ))}
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

