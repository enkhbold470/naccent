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
  },
  {
    id: '4',
    date: '1/08/26',
    messages: [
      'Can you help me with my assignment?',
      'What time is the meeting tomorrow?',
      'I really enjoyed the lecture on history.'
    ]
  },
  {
    id: '5',
    date: '1/07/26',
    messages: [
      'Is there a way to extend the deadline?',
      'I have a question about the last exam.',
      'Thank you for your feedback on my paper.'
    ]
  },
  {
    id: '6',
    date: '1/06/26',
    messages: [
      'I found a great resource for our project.',
      'Can we schedule a time to meet?',
      'I appreciate your guidance on this topic.'
    ]
  },
  {
    id: '7',
    date: '1/05/26',
    messages: [
      'What are the requirements for the next assignment?',
      'I would like to discuss my progress.',
      'The group project is coming along well.'
    ]
  },
  {
    id: '8',
    date: '1/04/26',
    messages: [
      'I need clarification on the last lecture.',
      'Are there any recommended readings?',
      'I enjoyed the class discussion today.'
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
    <div className="flex flex-col py-[4rem] border border-red-500">
  
      {/* Search Bar */}
      <div className="px-4 font-bold text-xl border-green-500">
        History
      </div>
      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto p-4  border-blue-500">
        {historyData.length > 0 ? (
          historyData.map((item) => (
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
          ))
        ) : (
          <p className="text-center">No history available.</p>
        )}
      </div>

     
    </div>
  )
}

