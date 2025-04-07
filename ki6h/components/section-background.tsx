"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface SectionBackgroundProps {
  variant: "hero" | "about" | "skills" | "projects" | "contact"
  className?: string
}

export default function SectionBackground({ variant, className }: SectionBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Background patterns based on variant
    const renderBackground = () => {
      if (!ctx) return

      switch (variant) {
        case "hero":
          renderHeroBackground(ctx, canvas.width, canvas.height)
          break
        case "about":
          renderAboutBackground(ctx, canvas.width, canvas.height)
          break
        case "skills":
          renderSkillsBackground(ctx, canvas.width, canvas.height)
          break
        case "projects":
          renderProjectsBackground(ctx, canvas.width, canvas.height)
          break
        case "contact":
          renderContactBackground(ctx, canvas.width, canvas.height)
          break
      }
    }

    // Hero section - Gradient with floating particles
    const renderHeroBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // Create gradient
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width)
      gradient.addColorStop(0, "rgba(248, 245, 241, 0.9)")
      gradient.addColorStop(0.7, "rgba(226, 211, 193, 0.7)")
      gradient.addColorStop(1, "rgba(211, 184, 157, 0.5)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Add subtle floating particles
      const particles = []
      const particleCount = Math.min(width / 15, 50)

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          speed: Math.random() * 0.5 + 0.1,
        })
      }

      function animateHero() {
        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          p.y -= p.speed
          if (p.y < -10) p.y = height + 10

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(165, 109, 79, ${p.opacity})`
          ctx.fill()
        }

        requestAnimationFrame(animateHero)
      }

      animateHero()
    }

    // About section - Diagonal lines pattern
    const renderAboutBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // Base gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, "rgba(248, 245, 241, 0.9)")
      gradient.addColorStop(1, "rgba(240, 233, 224, 0.7)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Diagonal lines
      const lineSpacing = 40
      const lineCount = Math.ceil((width + height) / lineSpacing)

      ctx.strokeStyle = "rgba(196, 156, 120, 0.1)"
      ctx.lineWidth = 1

      function animateAbout() {
        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)

        const offset = (Date.now() / 100) % lineSpacing

        for (let i = 0; i < lineCount; i++) {
          const pos = i * lineSpacing - offset

          ctx.beginPath()
          ctx.moveTo(pos, 0)
          ctx.lineTo(pos - height, height)
          ctx.stroke()
        }

        requestAnimationFrame(animateAbout)
      }

      animateAbout()
    }

    // Skills section - Hexagonal pattern
    const renderSkillsBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // Base gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, "rgba(240, 233, 224, 0.8)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.9)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Hexagonal pattern
      const hexSize = 30
      const hexHeight = hexSize * Math.sqrt(3)
      const rows = Math.ceil(height / hexHeight) + 1
      const cols = Math.ceil(width / (hexSize * 3)) + 1

      function drawHexagon(x: number, y: number, size: number, opacity: number) {
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3
          const xPos = x + size * Math.cos(angle)
          const yPos = y + size * Math.sin(angle)

          if (i === 0) {
            ctx.moveTo(xPos, yPos)
          } else {
            ctx.lineTo(xPos, yPos)
          }
        }
        ctx.closePath()
        ctx.strokeStyle = `rgba(196, 156, 120, ${opacity})`
        ctx.stroke()
      }

      function animateSkills() {
        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)

        const timeOffset = Date.now() / 5000

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * hexSize * 3
            const y = row * hexHeight + (col % 2 === 0 ? 0 : hexHeight / 2)

            // Vary opacity based on time and position
            const opacity = 0.05 + 0.05 * Math.sin(timeOffset + row * 0.1 + col * 0.1)

            drawHexagon(x, y, hexSize, opacity)
          }
        }

        requestAnimationFrame(animateSkills)
      }

      animateSkills()
    }

    // Projects section - Grid pattern
    const renderProjectsBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // Base gradient
      const gradient = ctx.createLinearGradient(0, 0, width, 0)
      gradient.addColorStop(0, "rgba(226, 211, 193, 0.7)")
      gradient.addColorStop(0.5, "rgba(240, 233, 224, 0.8)")
      gradient.addColorStop(1, "rgba(226, 211, 193, 0.7)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Grid pattern with dots at intersections
      const gridSize = 30
      const rows = Math.ceil(height / gridSize) + 1
      const cols = Math.ceil(width / gridSize) + 1

      function animateProjects() {
        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)

        const timeOffset = Date.now() / 3000

        // Draw grid lines
        ctx.strokeStyle = "rgba(196, 156, 120, 0.1)"
        ctx.lineWidth = 1

        // Horizontal lines
        for (let row = 0; row < rows; row++) {
          const y = row * gridSize
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(width, y)
          ctx.stroke()
        }

        // Vertical lines
        for (let col = 0; col < cols; col++) {
          const x = col * gridSize
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, height)
          ctx.stroke()
        }

        // Draw dots at intersections
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * gridSize
            const y = row * gridSize

            // Vary size based on time and position
            const size = 1 + 0.5 * Math.sin(timeOffset + row * 0.1 + col * 0.1)

            ctx.beginPath()
            ctx.arc(x, y, size, 0, Math.PI * 2)
            ctx.fillStyle = "rgba(165, 109, 79, 0.3)"
            ctx.fill()
          }
        }

        requestAnimationFrame(animateProjects)
      }

      animateProjects()
    }

    // Contact section - Curved lines
    const renderContactBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // Base gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, "rgba(248, 245, 241, 0.9)")
      gradient.addColorStop(1, "rgba(211, 184, 157, 0.5)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Curved lines
      const lineCount = 5

      function animateContact() {
        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)

        const timeOffset = Date.now() / 2000

        for (let i = 0; i < lineCount; i++) {
          ctx.beginPath()

          const yStart = height * (i / lineCount)
          const amplitude = height / 10
          const frequency = 0.005

          ctx.moveTo(0, yStart)

          for (let x = 0; x < width; x += 5) {
            const y = yStart + amplitude * Math.sin(x * frequency + timeOffset + i)
            ctx.lineTo(x, y)
          }

          ctx.strokeStyle = `rgba(196, 156, 120, 0.1)`
          ctx.lineWidth = height / 30
          ctx.stroke()
        }

        requestAnimationFrame(animateContact)
      }

      animateContact()
    }

    // Start the appropriate animation
    renderBackground()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [variant])

  return <canvas ref={canvasRef} className={cn("absolute inset-0 w-full h-full -z-10", className)} />
}

