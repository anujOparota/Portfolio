import { User, Code, Lightbulb } from "lucide-react";
import SectionReveal from "./SectionReveal";
import { StaggerContainer, StaggerItem } from "./StaggerChildren";

const AboutSection = () => {
  return (
    <SectionReveal id="about" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">
          About <span className="text-primary">Me</span>
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-12" />

        <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: User, title: "Who I Am", text: "Programmer and developer who builds web projects and explores cybersecurity, AI, and machine learning. Focused on practical problem solving and learning by building." },
            { icon: Code, title: "What I Do", text: "I build web projects, experiment with algorithms, and create small tools to solve practical problems. I also explore cybersecurity concepts and AI/ML through hands-on projects." },
            { icon: Lightbulb, title: "My Philosophy", text: "I believe the best way to learn technology is by building and experimenting. Break things, understand how they work, and improve them step by step." },
          ].map(({ icon: Icon, title, text }) => (
            <StaggerItem
              key={title}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="text-primary" size={24} />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{text}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            I’m a programmer with a strong foundation in computer science and a curiosity for understanding
            how systems work. I build web projects, experiment with algorithms, and explore fields like 
            cybersecurity and AI by turning ideas into practical implementations.
          </p>
        </div>
      </div>
    </SectionReveal>
  );
};

export default AboutSection;
