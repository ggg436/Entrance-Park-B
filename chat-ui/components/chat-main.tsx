import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Paperclip, ImageIcon, LayoutGrid, Send } from "lucide-react"
import { PromptCard } from "./prompt-card"
import { MessageSquareText, Edit, List, Lightbulb, User } from "lucide-react"

export function ChatMain() {
  const promptSuggestions = [
    {
      icon: MessageSquareText,
      title: "Catch up on meetings",
      description: "Catch me up on meetings I missed yesterday",
    },
    {
      icon: MessageSquareText,
      title: "Catch up on comms",
      description: "Summarize unread messages from this morning",
    },
    {
      icon: Edit,
      title: "Rewrite something",
      description: "Propose a new introduction to",
      tags: ["file"],
    },
    {
      icon: List,
      title: "Get up to speed",
      description: "List key points from",
      tags: ["file"],
    },
    {
      icon: Lightbulb,
      title: "Polish my writing",
      description: "Suggest edits to",
      tags: ["file"],
    },
    {
      icon: User,
      title: "Catch up on comms",
      description: "What's the latest from",
      tags: ["person"],
    },
  ]

  return (
    <main className="flex-1 flex flex-col bg-gray-50">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <Image
          src="/placeholder.svg?height=80&width=80"
          alt="Jobs in Point Logo"
          width={80}
          height={80}
          className="mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-800">Jobs in Point</h1>
        <p className="text-gray-600 mb-8">AI Assistant</p>

        <div className="flex space-x-6 mb-10">
          <div className="relative pb-2 cursor-pointer">
            <span className="font-semibold text-blue-700">Try these prompts</span>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 rounded-full"></div>
          </div>
          <span className="text-gray-600 cursor-pointer hover:text-gray-800">Stay on top</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mb-10">
          {promptSuggestions.map((prompt, index) => (
            <PromptCard key={index} {...prompt} />
          ))}
        </div>

        <p className="text-gray-600 mb-4">
          OK, what can I help you with? Try one of the examples or enter your own prompt.
        </p>
      </div>

      <div className="p-6 pt-0 flex justify-center">
        <div className="relative w-full max-w-3xl">
          {/* Gradient border container */}
          <div className="relative flex items-center w-full bg-white rounded-xl shadow-lg border border-gray-200">
            <Input
              type="text"
              placeholder="What's hot in my inbox right now?"
              className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-4 py-3 text-base"
            />
            <div className="flex items-center space-x-2 pr-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:bg-gray-100">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:bg-gray-100">
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:bg-gray-100">
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button className="h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
