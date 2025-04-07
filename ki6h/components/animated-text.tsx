"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
}

export default function AnimatedText({ text, className }: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <p
      className={cn(
        "transition-all duration-1000 transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className,
      )}
    >
      {text}
    </p>
  )
}

