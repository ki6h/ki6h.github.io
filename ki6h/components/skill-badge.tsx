import { cn } from "@/lib/utils"
import Link from "next/link"

interface SkillBadgeProps {
  name: string
  link?: string
  className?: string
}

export default function SkillBadge({ name, link, className }: SkillBadgeProps) {
  const content = (
    <div
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-brown-50 to-brown-100 text-brown-800 border border-brown-200 transition-all hover:shadow-md hover:from-brown-100 hover:to-brown-200 hover:scale-105 backdrop-blur-sm",
        className,
      )}
    >
      {name}
    </div>
  )

  if (link) {
    return (
      <Link href={link} target="_blank" rel="noopener noreferrer" className="inline-block">
        {content}
      </Link>
    )
  }

  return content
}

