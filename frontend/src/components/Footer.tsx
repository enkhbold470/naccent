import { Button } from "@/components/ui/button"
import { Home, Mic, User } from 'lucide-react'

export default function Footer() {
    return (
      <div className="w-full fixed bottom-0 border bg-inherit">
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
      </div>
    )
}