import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";

const roles = ["Full Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Tech Explorer"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(roles[roleIndex]);
      return;
    }
    const currentRole = roles[roleIndex];
    let timeout;

    if (typing) {
      if (displayed.length < currentRole.length) {
        timeout = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 1500);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex, prefersReducedMotion]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen mt-16 md:mt-0 flex items-center justify-center overflow-hidden scroll-mt-20"
    >
      {/* Decorative glow - purely cosmetic */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative z-10 px-4 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Text content */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
            Welcome to my world
          </p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Judge a book by<br />
            <span className="text-primary">it's cover</span>
          </h1>

          <div className="h-10 mb-8">
            <span className="text-xl sm:text-2xl text-muted-foreground font-display">
              I'm a <span className="text-foreground font-semibold typing-cursor">{displayed}</span>
            </span>
          </div>

          <p className="text-muted-foreground text-lg max-w-2xl mb-10">
            Crafting elegant digital experiences through clean code and creative problem-solving.
            Passionate about building things that live on the internet.
          </p>

          <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4">
            <Button
              size="lg"
              className="px-8 text-base font-semibold hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300"
              onClick={() => scrollTo("projects")}
            >
              View Projects
            </Button>
            <a href="../resume.pdf" download>
              <Button
                variant="outline"
                size="lg"
                className="px-8 text-base font-semibold border-primary/30 hover:bg-primary/10 hover:text-primary hover:shadow-lg hover:shadow-primary/15 hover:-translate-y-0.5 transition-all duration-300"
              >
                Download Resume
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Profile image */}
        <motion.div
          className="flex-shrink-0"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20">
            <img
              src="/profile-placeholder.webp"
              alt="Portrait photo of the developer"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover bg-secondary"
            />
          </div>
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <button
        onClick={() => scrollTo("about")}
        aria-label="Scroll down to About section"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full p-2"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={24} />
        </motion.div>
      </button>
    </section>
  );
};

export default HeroSection;
