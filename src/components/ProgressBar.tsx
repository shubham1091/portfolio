import { motion, useScroll, useSpring } from 'framer-motion';

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  
  // Apply a spring physics smoothing to the scroll progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-5000 h-1 origin-left transform bg-linear-to-r from-primary via-secondary to-accent"
      style={{ scaleX }}
    />
  )
}
