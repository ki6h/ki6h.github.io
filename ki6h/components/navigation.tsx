"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/lib/types"

interface NavigationProps {
  className?: string
}

export default function Navigation({ className }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navItems: NavItem[] = [
    { title: "Home", href: "#" },
    { title: "About", href: "#about" },
    { title: "Skills", href: "#skills" },
    { title: "Projects", href: "#projects" },
    { title: "Contact", href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-sm shadow-sm py-3" : "bg-transparent py-5",
        className,
      )}
    >
      <div className="container flex items-center justify-between px-4 mx-auto">
        <Link href="#" className="text-xl font-bold text-black">
          ki<span className="text-brown-600">6</span>h
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-neutral-700 hover:text-brown-600 transition-colors">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </Button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm md:hidden">
            <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
              <X />
            </Button>
            <nav>
              <ul className="flex flex-col items-center space-y-6">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xl text-neutral-700 hover:text-brown-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

