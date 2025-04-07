"use client"

import type React from "react"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { trackPageView } from "@/lib/analytics"

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
      trackPageView(url)
    }
  }, [pathname, searchParams])

  return <>{children}</>
}

