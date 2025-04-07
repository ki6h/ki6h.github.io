"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedBackgroundProps {
  className?: string
}

export default function AnimatedBackground({ className }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 1.1 // Extra height to ensure full coverage
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Mouse position tracking
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 150,
    }

    window.addEventListener("mousemove", (event) => {
      mouse.x = event.x
      mouse.y = event.y
    })

    // Touch position tracking for mobile
    window.addEventListener("touchmove", (event) => {
      if (event.touches[0]) {
        mouse.x = event.touches[0].clientX
        mouse.y = event.touches[0].clientY
      }
    })

    // Reset mouse position when inactive
    window.addEventListener("mouseout", () => {
      mouse.x = null
      mouse.y = null
    })

    // Particle class with enhanced properties
    class Particle {
      x: number
      y: number
      size: number
      baseX: number
      baseY: number
      density: number
      color: string
      opacity: number
      directionX: number
      directionY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.baseX = this.x
        this.baseY = this.y
        this.size = Math.random() * 3 + 1
        this.density = Math.random() * 30 + 1
        this.directionX = Math.random() * 2 - 1
        this.directionY = Math.random() * 2 - 1

        // Vibrant colors that match the website theme but more dynamic
        const colors = [
          "rgba(196, 156, 120, ", // brown-400
          "rgba(211, 184, 157, ", // brown-300
          "rgba(226, 211, 193, ", // brown-200
          "rgba(165, 109, 79, ", // brown-600
          "rgba(138, 87, 66, ", // brown-700
          "rgba(200, 200, 200, ", // light gray (cat fur)
          "rgba(180, 180, 180, ", // medium gray (cat fur)
        ]

        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.opacity = Math.random() * 0.6 + 0.2
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fillStyle = `${this.color}${this.opacity})`
        ctx.fill()
      }

      update() {
        // Mouse interaction
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance

          // Maximum distance, past which the force is 0
          const maxDistance = mouse.radius
          // Convert (0...maxDistance) to (1...0)
          let force = (maxDistance - distance) / maxDistance

          // If we're too far away, force = 0
          if (force < 0) force = 0

          // Every frame we're moving this particle towards the mouse by this amount
          const directionX = forceDirectionX * force * this.density
          const directionY = forceDirectionY * force * this.density

          if (distance < maxDistance) {
            this.x -= directionX
            this.y -= directionY
          } else {
            // Gentle floating motion when not affected by mouse
            if (this.x !== this.baseX) {
              const dx = this.x - this.baseX
              this.x -= dx / 20
            }
            if (this.y !== this.baseY) {
              const dy = this.y - this.baseY
              this.y -= dy / 20
            }

            // Add some gentle movement
            this.x += this.directionX * 0.2
            this.y += this.directionY * 0.2

            // Bounce off edges
            if (this.x > canvas.width || this.x < 0) {
              this.directionX *= -1
            }
            if (this.y > canvas.height || this.y < 0) {
              this.directionY *= -1
            }
          }
        } else {
          // Gentle floating motion when mouse is inactive
          this.x += this.directionX * 0.2
          this.y += this.directionY * 0.2

          // Bounce off edges
          if (this.x > canvas.width || this.x < 0) {
            this.directionX *= -1
          }
          if (this.y > canvas.height || this.y < 0) {
            this.directionY *= -1
          }

          // Gradually return to base position
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX
            this.x -= dx / 50
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY
            this.y -= dy / 50
          }
        }
      }
    }

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(Math.max(window.innerWidth / 8, 100), 300) // Responsive number of particles

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Connect particles with lines
    function connect() {
      if (!ctx) return
      const maxDistance = 150

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            // Create gradient lines
            const opacity = 1 - distance / maxDistance
            const gradient = ctx.createLinearGradient(
              particlesArray[a].x,
              particlesArray[a].y,
              particlesArray[b].x,
              particlesArray[b].y,
            )

            gradient.addColorStop(0, `rgba(200, 180, 160, ${opacity * 0.2})`)
            gradient.addColorStop(1, `rgba(165, 109, 79, ${opacity * 0.2})`)

            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width,
      )

      // More vibrant gradient
      gradient.addColorStop(0, "rgba(248, 245, 241, 0.9)") // brown-50
      gradient.addColorStop(0.4, "rgba(240, 233, 224, 0.8)") // brown-100
      gradient.addColorStop(0.8, "rgba(226, 211, 193, 0.7)") // brown-200
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.8)") // white

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      connect()
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", (event) => {
        mouse.x = event.x
        mouse.y = event.y
      })
      window.removeEventListener("mouseout", () => {
        mouse.x = null
        mouse.y = null
      })
      window.removeEventListener("touchmove", (event) => {
        if (event.touches[0]) {
          mouse.x = event.touches[0].clientX
          mouse.y = event.touches[0].clientY
        }
      })
    }
  }, [])

  return <canvas ref={canvasRef} className={cn("fixed top-0 left-0 w-full h-full -z-10", className)} />
}

