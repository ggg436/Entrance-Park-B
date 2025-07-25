import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Plus, FileText, Rss, Grid, Sparkles, Mail, Users, File, Table, Presentation, Search } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Home, label: "Home", href: "#" },
  { icon: Plus, label: "Create", href: "#" },
  { icon: FileText, label: "My Content", href: "#" },
  { icon: Rss, label: "Feed", href: "#" },
  { icon: Grid, label: "Apps", href: "#" },
  { icon: Sparkles, label: "Jobs in Point", href: "#", active: true },
  { icon: Mail, label: "Outlook", href: "#" },
  { icon: Users, label: "Teams", href: "#" },
  { icon: File, label: "Word", href: "#" },
  { icon: Table, label: "Excel", href: "#" },
  { icon: Presentation, label: "PowerPoint", href: "#" },
]

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-60 border-r bg-white h-screen py-4 px-2 rounded-xl">
      <div className="flex items-center justify-between px-3 mb-6">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-sm">Microsoft 365</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Search className="h-4 w-4 text-gray-500" />
        </Button>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={cn(
              "w-full justify-start px-3 py-2 text-sm font-medium rounded-md",
              item.active ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : "text-gray-700 hover:bg-gray-100",
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  )
}
