import { motion } from 'framer-motion';

export default function BackgroundOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 min-h-screen overflow-hidden">
      {/* Top right accent orb */}
      <motion.div
        animate={{
          x: [0, 50, 0, -50, 0],
          y: [0, 30, 80, 20, 0],
          scale: [1, 1.2, 1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[10%] -right-[10%] h-125 w-125 rounded-full bg-primary/18 blur-[120px]"
      />

      {/* Bottom left accent orb */}
      <motion.div
        animate={{
          x: [0, -60, -20, 40, 0],
          y: [0, -40, 20, 60, 0],
          scale: [1, 0.8, 1.1, 1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[60%] -left-[10%] h-150 w-150 rounded-full bg-accent/20 blur-[150px]"
      />

      {/* Center soft orb */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
          scale: [0.8, 1, 0.9, 0.8],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[30%] left-[30%] h-100 w-100 rounded-full bg-secondary/35 blur-[100px]"
      />
    </div>
  )
}
