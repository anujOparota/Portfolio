import { motion, useReducedMotion } from "framer-motion";

/**
 * Container + item variants for staggered card reveals.
 */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const itemVariantsReduced = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export const StaggerContainer = ({ className = "", children, ...props }) => {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ className = "", children, ...props }) => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={prefersReducedMotion ? itemVariantsReduced : itemVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
};
