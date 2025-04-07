import { render, screen } from "@testing-library/react"
import ProjectCard from "@/components/project-card"

describe("ProjectCard", () => {
  const mockProject = {
    title: "Test Project",
    description: "This is a test project",
    tags: ["React", "TypeScript"],
    link: "https://example.com",
  }

  it("renders project information correctly", () => {
    render(<ProjectCard project={mockProject} />)

    expect(screen.getByText("Test Project")).toBeInTheDocument()
    expect(screen.getByText("This is a test project")).toBeInTheDocument()
    expect(screen.getByText("React")).toBeInTheDocument()
    expect(screen.getByText("TypeScript")).toBeInTheDocument()
    expect(screen.getByText("View Project")).toHaveAttribute("href", "https://example.com")
  })
})

