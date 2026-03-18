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
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-10000 flex flex-col items-center justify-center bg-background"
        >
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="text-4xl font-black tracking-tighter text-foreground md:text-6xl"
            >
              SMITHOFCODE<span className="text-primary">.</span>
            </motion.h1>
          </div>

          <motion.div
            className="mt-8 h-0.5 w-48 overflow-hidden rounded-full bg-border"
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
  )
}
