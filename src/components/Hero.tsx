import { Maximize2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 400]);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageContainerRef.current) return;

    const el = imageContainerRef.current;
    
    const onMouseEnter = () => {
      gsap.to(el, {
        scale: 1.05,
        rotationY: 15, // Horizontal axis rotation
        perspective: 1000,
        duration: 0.8,
        ease: "back.out(2)",
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "back.out(2)",
      });
    };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[88vh] lg:min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background large text "SERGIO" */}
      <motion.h1 
        style={{ y: yParallax }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-[14%] lg:top-[10%] left-1/2 -translate-x-1/2 text-[22vw] lg:text-[18vw] font-black tracking-tighter text-white/3 select-none pointer-events-none whitespace-nowrap leading-none z-0"
      >
        SHUBHAM
      </motion.h1>

      {/* Main content area */}
      <div className="relative z-10 w-full max-w-350 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-center lg:items-end mt-8 md:mt-12 lg:mt-20 gap-7 lg:gap-0 pb-8">
        
        {/* Left text block */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="order-2 lg:order-1 max-w-full lg:max-w-100 text-center lg:text-left z-20 mt-2 lg:mt-0"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 lg:mb-4 flex items-center justify-center lg:justify-start gap-2">
            Hello<span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">👋</span>,
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6">I'm Shubham</h2>
          <p className="text-[11px] sm:text-xs md:text-sm tracking-[0.08em] md:tracking-[0.2em] text-muted-foreground/80 font-medium mb-5 lg:mb-8 max-w-[320px] lg:max-w-full mx-auto lg:mx-0">
            DATA GOVERNANCE & AI STRATEGIST | FULL-STACK ENGINEER
          </p>
          
          <div className="space-y-2 text-[13px] sm:text-sm md:text-[15px] leading-relaxed text-foreground/80 px-2 sm:px-0">
            <p>A practitioner synthesizing ethical governance and executive strategy.</p>
            <p>Bridging the gap between abstract algorithmic theory and commercial application.</p>
            <p className="text-muted-foreground mt-4 block">"Algorithms require structural empathy and ethical rigor."</p>
          </div>
        </motion.div>

        {/* Center portrait (Masked image) */}
        <div className="order-1 lg:order-2 relative lg:absolute left-auto lg:left-1/2 top-auto lg:top-0 lg:bottom-0 translate-x-0 lg:-translate-x-1/2 w-65 h-65 sm:w-80 sm:h-80 md:w-95 md:h-95 lg:w-150 lg:h-150 z-0">
          <motion.div 
            ref={imageContainerRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
            className="w-full h-full rounded-full overflow-hidden border border-border z-0 group cursor-pointer pointer-events-auto relative"
          >
            {/* Illustration (Default state) */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 group-hover:opacity-0" 
              style={{ backgroundImage: "url('/hero-image-illustration.png')" }}
            />

            {/* Real Image (Hover state) */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
              style={{ backgroundImage: "url('/hero-image.png')" }}
            />
          </motion.div>
        </div>

        {/* Right info block */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="order-3 w-full max-w-md lg:max-w-[320px] text-sm z-10 text-center lg:text-left bg-black/20 lg:bg-transparent p-4 sm:p-6 lg:p-0 rounded-2xl lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none border border-white/5 lg:border-none mt-2 lg:mt-0"
        >
          <p className="text-base lg:text-lg font-medium mb-4 lg:mb-6">Quick Links:</p>
          
          <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-start bg-black/40 rounded-lg p-1 w-full lg:w-fit mb-5 lg:mb-8 backdrop-blur-md border border-white/10">
            <a href="#work" className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-md font-medium transition-colors w-full lg:w-auto text-center">View Projects</a>
            <a href="#about" className="px-6 py-2 text-white/80 hover:text-white transition-colors w-1/2 lg:w-auto text-center">About Me</a>
            <a href="#gallery" className="px-3 py-2 text-white/80 hover:text-white transition-colors border-l border-white/10 ml-1 w-1/2 lg:w-auto flex justify-center lg:justify-start">
              <div className="border border-orange-500/50 rounded p-1">
                <Maximize2 className="w-4 h-4 text-orange-400" />
              </div>
            </a>
          </div>
          
          <div className="space-y-4 lg:space-y-6 text-[12px] lg:text-[13px] leading-relaxed text-white/70">
            <p>
              Hey there! Thanks for stopping by.<br className="hidden lg:block"/>
              This portfolio is built with React, Vite,<br className="hidden lg:block"/>
              and Framer Motion.
            </p>
            
            <p className="hidden lg:block">
              For the best experience, view this site<br/>
              on a desktop browser to see all the<br/>
              custom interactions.
            </p>
            
            <p className="text-primary/80 font-medium">
              Currently open for new opportunities.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
