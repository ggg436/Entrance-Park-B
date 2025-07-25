import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Settings, HelpCircle, Plus, Ellipsis } from "lucide-react"

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <div className="relative flex-1 max-w-md mr-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search"
          className="pl-9 pr-4 py-2 rounded-xl border focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Plus className="h-4 w-4 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Ellipsis className="h-4 w-4 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <HelpCircle className="h-4 w-4 text-gray-500" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User Avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
