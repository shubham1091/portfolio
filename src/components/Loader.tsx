import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (could be replaced with actual asset loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(onLoadingComplete, 800); // Wait for exit animation to explicitly unmount
    }, 1500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#1a1a1a]"
        >
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.76, 0, 0.24, 1] 
              }}
              className="text-4xl md:text-6xl font-black text-white tracking-tighter"
            >
              SMITHOFCODE<span className="text-primary">.</span>
            </motion.h1>
          </div>
          
          <motion.div 
            className="w-48 h-[2px] bg-white/10 mt-8 overflow-hidden rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div 
              className="h-full bg-primary"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
