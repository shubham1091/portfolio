import { motion } from 'framer-motion';

export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 min-h-screen overflow-hidden pointer-events-none z-0">
      {/* Top right gray orb */}
      <motion.div
        animate={{
          x: [0, 50, 0, -50, 0],
          y: [0, 30, 80, 20, 0],
          scale: [1, 1.2, 1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[10%] -right-[10%] w-[500px] h-[500px] rounded-full bg-gray-600/20 blur-[120px]"
      />
      
      {/* Bottom left gray orb */}
      <motion.div
        animate={{
          x: [0, -60, -20, 40, 0],
          y: [0, -40, 20, 60, 0],
          scale: [1, 0.8, 1.1, 1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[60%] -left-[10%] w-[600px] h-[600px] rounded-full bg-gray-700/20 blur-[150px]"
      />
      
      {/* Center accent red orb */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
          scale: [0.8, 1, 0.9, 0.8],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[30%] left-[30%] w-[400px] h-[400px] rounded-full bg-red-500/20 blur-[100px]"
      />
    </div>
  );
}
