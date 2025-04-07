import { Instagram, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"
import AnimatedText from "@/components/animated-text"
import SectionBackground from "@/components/section-background"
import type { Project, Skill } from "@/lib/types"
import Image from "next/image"

export default function Home() {
  const skills: Skill[] = [
    { name: "HTML", link: "https://en.wikipedia.org/wiki/HTML" },
    { name: "JavaScript", link: "https://en.wikipedia.org/wiki/JavaScript" },
    { name: "CSS", link: "https://en.wikipedia.org/wiki/CSS" },
    { name: "React Native", link: "https://en.wikipedia.org/wiki/React_Native" },
    { name: "Python", link: "https://en.wikipedia.org/wiki/Python_(programming_language)" },
    { name: "Kotlin", link: "https://en.wikipedia.org/wiki/Kotlin_(programming_language)" },
    { name: "Ruby", link: "https://en.wikipedia.org/wiki/Ruby_(programming_language)" },
    { name: "C#", link: "https://en.wikipedia.org/wiki/C_Sharp_(programming_language)" },
    { name: "C++", link: "https://en.wikipedia.org/wiki/C%2B%2B" },
    { name: "PHP", link: "https://en.wikipedia.org/wiki/PHP" },
    { name: "SQL", link: "https://en.wikipedia.org/wiki/SQL" },
  ]

  const projects: Project[] = [
    {
      title: "Instagram Enhancement Suite",
      description:
        "A collection of tweaks and exploits for Instagram that improve user experience and add new features.",
      tags: ["React Native", "JavaScript", "API Integration"],
      link: "#",
    },
    {
      title: "Social Media Security Analyzer",
      description:
        "Tool that scans social media applications for potential security vulnerabilities and privacy concerns.",
      tags: ["Python", "Cybersecurity", "API"],
      link: "#",
    },
    {
      title: "Custom App Modification Framework",
      description: "A framework for developing and implementing modifications to popular mobile applications.",
      tags: ["Kotlin", "Java", "Mobile Development"],
      link: "#",
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20 md:py-32 overflow-hidden">
        <SectionBackground variant="hero" />
        <div className="container max-w-4xl mx-auto z-10">
          <div className="space-y-8 text-center">
            <div className="flex justify-center">
              <div className="relative inline-block">
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-brown-300 to-brown-600 blur-md opacity-70"></span>
                <div className="relative z-10 w-24 h-24 overflow-hidden rounded-full border-2 border-brown-400 shadow-xl">
                  <Image
                    src="/images/profile.png"
                    alt="ki6h"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl text-black">
              ki<span className="text-brown-600">6</span>h
            </h1>
            <AnimatedText
              text="Cybersecurity Expert & Exploit Developer"
              className="text-xl font-medium tracking-tight md:text-2xl text-neutral-700"
            />
            <p className="max-w-2xl mx-auto text-lg text-neutral-600">
              Specializing in developing innovative tweaks for Instagram and other popular social apps. Turning security
              challenges into opportunities.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                variant="outline"
                className="rounded-full border-brown-400 text-brown-600 hover:bg-brown-50 hover:border-brown-600 transition-all duration-300"
              >
                <a href="#contact" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Contact Me</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 overflow-hidden">
        <SectionBackground variant="about" />
        <div className="container max-w-4xl px-4 mx-auto z-10 relative">
          <h2 className="mb-12 text-3xl font-bold text-center text-black">About Me</h2>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-brown-100">
                <h3 className="text-2xl font-semibold text-brown-600 mb-4">Cybersecurity Expert</h3>
                <p className="text-neutral-700 mb-4">
                  As a cybersecurity specialist and exploit developer, I'm passionate about understanding system
                  vulnerabilities and creating innovative solutions. My expertise lies in developing tweaks and
                  modifications for popular social media platforms.
                </p>
                <p className="text-neutral-700">
                  With a strong foundation in multiple programming languages and a keen eye for security details, I
                  approach each project with creativity and technical precision, always staying ahead of emerging
                  threats and technologies.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-brown-50 to-brown-100/70 backdrop-blur-md rounded-2xl shadow-sm">
                <h3 className="text-2xl font-semibold text-brown-700 mb-4">Exploit Developer</h3>
                <p className="text-neutral-700 mb-4">
                  I specialize in identifying and exploiting vulnerabilities in social media applications, with a focus
                  on Instagram and other popular platforms. My work involves reverse engineering, code analysis, and
                  developing creative solutions that enhance functionality.
                </p>
                <p className="text-neutral-700">
                  My approach combines technical expertise with innovative thinking, allowing me to develop unique
                  tweaks that improve user experience while maintaining security integrity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 overflow-hidden">
        <SectionBackground variant="skills" />
        <div className="container max-w-4xl px-4 mx-auto z-10 relative">
          <h2 className="mb-12 text-3xl font-bold text-center text-black">Technical Proficiencies</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <SkillBadge key={index} name={skill.name} link={skill.link} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 overflow-hidden">
        <SectionBackground variant="projects" />
        <div className="container max-w-4xl px-4 mx-auto z-10 relative">
          <h2 className="mb-12 text-3xl font-bold text-center text-black">Featured Projects</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 overflow-hidden">
        <SectionBackground variant="contact" />
        <div className="container max-w-4xl px-4 mx-auto z-10 relative">
          <h2 className="mb-12 text-3xl font-bold text-center text-black">Get In Touch</h2>
          <div className="max-w-md p-8 mx-auto space-y-6 bg-white/90 rounded-2xl shadow-lg border border-neutral-100">
            <div className="flex flex-col space-y-4">
              <Button
                variant="outline"
                className="flex items-center justify-start gap-2 border-brown-400 text-brown-600 hover:bg-brown-50 hover:border-brown-600 rounded-xl transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                <span>ki6h@hi2.in</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-start gap-2 border-brown-400 text-brown-600 hover:bg-brown-50 hover:border-brown-600 rounded-xl transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
                <span>ki6h</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-neutral-900/90 backdrop-blur-sm text-neutral-400">
        <div className="container px-4 mx-auto">
          <p>© {new Date().getFullYear()} | ki6h | Cybersecurity Expert & Exploit Developer</p>
        </div>
      </footer>
    </main>
  )
}

