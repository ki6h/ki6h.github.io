"use client"

import { useEffect } from "react"

export default function PerformanceMetrics() {
  useEffect(() => {
    // Only run in production and in the browser
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      // Report Web Vitals
      const reportWebVitals = async () => {
        const { onCLS, onFID, onLCP, onTTFB } = await import("web-vitals")

        const sendToAnalytics = ({ name, delta, id }: { name: string; delta: number; id: string }) => {
          // This is where you would send the metric to your analytics service
          console.log(`Web Vital: ${name}`, { delta, id })
        }

        onCLS(sendToAnalytics)
        onFID(sendToAnalytics)
        onLCP(sendToAnalytics)
        onTTFB(sendToAnalytics)
      }

      reportWebVitals()
    }
  }, [])

  // This component doesn't render anything
  return null
}

