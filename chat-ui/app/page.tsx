import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ChatMain } from "@/components/chat-main"

export default function ChatPage() {
  return (
    <div className="flex h-screen bg-gray-100 rounded-xl overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <ChatMain />
      </div>
    </div>
  )
}
