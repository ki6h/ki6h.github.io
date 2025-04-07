import { ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Project {
  title: string
  description: string
  tags: string[]
  link: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 border-0 shadow-sm hover:shadow-md bg-white/90 backdrop-blur-sm rounded-xl group">
      <div className="absolute inset-0 bg-gradient-to-br from-brown-100 to-brown-300 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-black">{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-neutral-600">{project.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-brown-50 text-brown-700 border-brown-200">
              {tag}
            </Badge>
          ))}
        </div>
        <a
          href={project.link}
          className="flex items-center text-sm font-medium text-brown-600 hover:text-brown-800 transition-colors"
        >
          View Details <ArrowUpRight className="w-3 h-3 ml-1" />
        </a>
      </CardFooter>
    </Card>
  )
}

