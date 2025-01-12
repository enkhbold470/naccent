'use client'

import { useState } from 'react'
import { Search, Home, Mic, User } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface HistoryItem {
  id: string
  date: string
  messages: string[]
}

const historyData: HistoryItem[] = [
  {
    id: '1',
    date: '1/11/26',
    messages: [
      'Hi Professor, will you post the home...',
      'What are your hobbies?',
      'The past is history, the future is a m...'
    ]
  },
  {
    id: '2',
    date: '1/10/26',
    messages: [
      'May I check into room 206? I don\'t h..',
      'The The The The The The The.'
    ]
  },
  {
    id: '3',
    date: '1/09/26',
    messages: [
      'Betty Botter bought some butter. "Bu..',
      'Reciept',
      'Coup d\'etat'
    ]
  }
]

export default function ChatHistory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">History</h1>
        <div className="relative">

          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto bg-[#FFE4B5] p-4">
        {historyData.map((item) => (
          <div key={item.id} className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Checkbox
                checked={selectedItems.includes(item.id)}
                onCheckedChange={() => toggleItem(item.id)}
                className="border-2 border-black"
              />
              <span className="font-bold">{item.date}</span>
            </div>
            {item.messages.map((message, idx) => (
              <p key={idx} className="ml-8 mb-2">
                {message}
              </p>
            ))}
          </div>
        ))}
      </div>

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

