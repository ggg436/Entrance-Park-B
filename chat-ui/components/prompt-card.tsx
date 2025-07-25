import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface PromptCardProps {
  icon: LucideIcon
  title: string
  description: string
  tags?: string[]
}

export function PromptCard({ icon: Icon, title, description, tags }: PromptCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow duration-200 rounded-xl">
      <CardHeader className="pb-2">
        <Icon className="h-5 w-5 text-gray-600 mb-2" />
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-gray-600">
        {description}
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                  tag === "file" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800",
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
