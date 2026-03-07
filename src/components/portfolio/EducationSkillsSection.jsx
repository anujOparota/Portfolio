import { GraduationCap, Calendar } from "lucide-react";
import SectionReveal from "./SectionReveal";
import { StaggerContainer, StaggerItem } from "./StaggerChildren";

const education = [
  { degree: "Bachelor of Technology", field: "Computer Science & Engineering", school: "Indian Institute of Information Technology, Guwahati", year: "2024 – 2028", gpa: "8.5 / 10" },
  { degree: "Higher Secondary", field: "Science (PCM)", school: "KVM Sikar", year: "2023 – 2024", gpa: "89%" },
  { degree: "Secondary School", field: "General Studies", school: "NKSS Nasirda", year: "2022", gpa: "91%" },
];

const skillCategories = [
  {
    title: "Programming",
    skills: [
      { name: "JavaScript / TypeScript", level: 90 },
      { name: "Python", level: 80 },
      { name: "Java", level: 70 },
      { name: "C++", level: 94 },
      { name: "C", level: 95 },
    ],
  },
  {
    title: "Web Development",
    skills: [
      { name: "React.js", level: 92 },
      { name: "HTML", level: 98 },
      { name: "CSS", level: 95 },
      { name: "JavaScript", level: 88 },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "Figma", level: 80 },
      { name: "Canva", level: 90 },
    ],
  },
];

const EducationSkillsSection = () => {
  return (
    <SectionReveal id="education" className="py-24 px-4 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">
          Education & <span className="text-primary">Skills</span>
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-16" />

        {/* Education */}
        <div className="mb-20">
          <h3 className="font-display text-2xl font-semibold text-foreground mb-8 flex items-center gap-3">
            <GraduationCap className="text-primary" size={28} />
            Education
          </h3>
          <StaggerContainer className="space-y-6">
            {education.map((edu, i) => (
              <StaggerItem
                key={i}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1">
                  <h4 className="font-display text-lg font-semibold text-foreground">{edu.degree}</h4>
                  <p className="text-primary text-sm font-medium">{edu.field}</p>
                  <p className="text-muted-foreground text-sm">{edu.school}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {edu.year}
                  </span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                    {edu.gpa}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Skills */}
        <div>
          <h3 className="font-display text-2xl font-semibold text-foreground mb-8 flex items-center gap-3">
            <CodeIcon className="text-primary" size={28} />
            Skills
          </h3>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((cat) => (
              <StaggerItem key={cat.title} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <h4 className="font-display text-lg font-semibold text-foreground mb-6">{cat.title}</h4>
                <div className="space-y-5">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-foreground font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} proficiency`}>
                        <div
                          className="h-full rounded-full bg-primary skill-bar-fill"
                          style={{ "--skill-level": `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </SectionReveal>
  );
};

const CodeIcon = ({ className, size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);

export default EducationSkillsSection;
