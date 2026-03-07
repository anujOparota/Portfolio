import { motion, useReducedMotion } from "framer-motion";

/**
 * Reusable scroll-reveal wrapper using Framer Motion.
 * Wraps children in a <motion.section> that fades/slides in when 40% visible.
 * Respects prefers-reduced-motion by skipping animation.
 */
const SectionReveal = ({ id, className = "", children, ...props }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={`scroll-mt-20 ${className}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default SectionReveal;
