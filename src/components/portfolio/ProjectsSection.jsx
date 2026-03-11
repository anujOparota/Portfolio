import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionReveal from "./SectionReveal";
import { StaggerContainer, StaggerItem } from "./StaggerChildren";
import Tilt from "react-parallax-tilt";

const projects = [
  {
    title: "The_school_web",
    description: "A responsive website designed for a school to present information about academics, facilities, and announcements. It provides an organized and user-friendly platform for students, parents, and staff.",
    tech: ["React", "Node.js", "firebase"],
    github: "https://github.com/anujOparota/The_School_Web",
    demo: "https://github.com/anujOparota/The_School_Web",
    image: "/projects/schoolweb.webp",
  },
  {
    title: "TechSprint",
    description: "A AI-assisted healthcare platform that helps users book appointment and get preliminary guidance by AI , avail Emergency services like need ambulance, need blood and first aid.",
    tech: ["React", "Firebase"],
    github: "https://github.com/anujOparota/TechSprint",
    demo: "https://carebridge-ai-9b4c9.web.app/",
    image: "/projects/techsprint.webp",
  },
  {
    title: "5bit-xor-cipher",
    description: "A simple encryption tool that uses a 5-bit XOR cipher to encode and decode messages. It demonstrates the basic concept of symmetric encryption using bitwise operations.",
    tech: ["cpp", "STL", "Xor"],
    github: "https://github.com/anujOparota/5bit-xor-cipher.git",
    demo: "https://github.com/anujOparota/5bit-xor-cipher.git",
    image: "/projects/cipher.webp",
  },
  {
    title: "Inventory-manager",
    description: "A simple and efficient inventory tracking system built in C — perfect for contractors, small businesses, and hands-on project managers.",
    tech: ["c", "structure", "file handling"],
    github: "https://github.com/anujOparota/inventory-manager",
    demo: "https://github.com/anujOparota/inventory-manager",
    image: "/projects/inventory.webp",
  },
  {
    title: "Portfolio",
    description: "A personal portfolio website showcasing my projects, skills, and work. It highlights my development journey and provides an interactive way to explore my technical work.",
    tech: ["React", "SMTP", "Node.js"],
    github: "https://github.com/anujOparota/Portfolio",
    demo: "https://anujparota.vercel.app/",
    image: "/projects/portfolio.webp",
  },
];

const ProjectsSection = () => {
  return (
    <SectionReveal id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">
          My <span className="text-primary">Projects</span>
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-12" />

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.25}
              scale={1.05}
              tiltMaxAngleX={12}
              tiltMaxAngleY={12}
              transitionSpeed={1000}
            >
              <StaggerItem
                key={project.title}
                className="bg-card border border-border relative overflow-hidden rounded-xl p-6 cursor-pointer hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 group flex flex-col"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none"></div>
                {/* Decorative top bar */}
                <div className="h-1 w-12 bg-primary rounded-full mb-5 group-hover:w-20 transition-all duration-300" />


                <div className="relative w-full h-44 mb-5 overflow-hidden rounded-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-tr from-primary/20 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/40 to-transparent"></div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                    
                  </div>
                </div>



                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs font-normal bg-secondary text-secondary-foreground">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <Button asChild size="sm" variant="outline" className="border-primary/20 hover:bg-primary/10 hover:text-primary text-xs">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github size={14} /> GitHub
                    </a>
                  </Button>
                  <Button asChild size="sm" className="text-xs">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  </Button>
                </div>
              </StaggerItem>
            </Tilt>
          ))}
        </StaggerContainer>
      </div>
    </SectionReveal>
  );
};

export default ProjectsSection;
