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
    <div className="relative flex min-h-[88vh] w-full flex-col items-center justify-center overflow-hidden lg:min-h-[80vh]">
      {/* Background large text "SERGIO" */}
      <motion.h1
        style={{ y: yParallax }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="pointer-events-none absolute top-[14%] left-1/2 z-0 -translate-x-1/2 text-[22vw] leading-none font-black tracking-tighter whitespace-nowrap text-foreground/8 select-none lg:top-[10%] lg:text-[18vw]"
      >
        SHUBHAM
      </motion.h1>

      {/* Main content area */}
      <div className="relative z-10 mt-8 flex w-full max-w-350 flex-col items-center justify-between gap-7 px-4 pb-8 sm:px-6 md:mt-12 lg:mt-20 lg:flex-row lg:items-end lg:gap-0 lg:px-8">
        {/* Left text block */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="z-20 order-2 mt-2 max-w-full text-center lg:order-1 lg:mt-0 lg:max-w-100 lg:text-left"
        >
          <h2 className="mb-2 flex items-center justify-center gap-2 text-3xl font-bold sm:text-4xl md:text-5xl lg:mb-4 lg:justify-start lg:text-6xl">
            Hello
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              👋
            </span>
            ,
          </h2>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:mb-6 lg:text-6xl">
            I'm Shubham
          </h2>
          <p className="mx-auto mb-5 max-w-[320px] text-[11px] font-medium tracking-[0.08em] text-muted-foreground/80 sm:text-xs md:text-sm md:tracking-[0.2em] lg:mx-0 lg:mb-8 lg:max-w-full">
            JUNIOR BUSINESS ANALYST | MSC BUSINESS ANALYTICS (DISTINCTION)
          </p>

          <div className="space-y-2 px-2 text-[13px] leading-relaxed text-foreground/80 sm:px-0 sm:text-sm md:text-[15px]">
            <p>
              Analytically minded and detail-oriented with an MSc (Distinction)
              from Keele University and recognized as Student of the Year.
            </p>
            <p>
              Bridging the gap between complex data analysis and
              practical business decisions.
            </p>
            <p className="mt-4 block text-muted-foreground italic">
              "Driven by using data to drive clear, practical business decisions."
            </p>
          </div>
        </motion.div>

        {/* Center portrait (Masked image) */}
        <div className="relative top-auto left-auto z-0 order-1 h-65 w-65 translate-x-0 sm:h-80 sm:w-80 md:h-95 md:w-95 lg:absolute lg:top-0 lg:bottom-0 lg:left-1/2 lg:order-2 lg:h-150 lg:w-150 lg:-translate-x-1/2">
          <motion.div
            ref={imageContainerRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
            }}
            className="group pointer-events-auto relative z-0 h-full w-full cursor-pointer overflow-hidden rounded-full border border-border"
          >
            {/* Illustration (Default state) */}
            <div
              className="absolute inset-0 h-full w-full bg-cover bg-center transition-opacity duration-500 group-hover:opacity-0"
              style={{ backgroundImage: "url('/hero-image-illustration.png')" }}
            />

            {/* Real Image (Hover state) */}
            <div
              className="absolute inset-0 h-full w-full bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ backgroundImage: "url('/hero-image.png')" }}
            />
          </motion.div>
        </div>

        {/* Right info block */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="z-10 order-3 mt-2 w-full max-w-md rounded-2xl border border-border/60 bg-card/70 p-4 text-center text-sm backdrop-blur-sm sm:p-6 lg:mt-0 lg:max-w-[320px] lg:rounded-none lg:border-none lg:bg-transparent lg:p-0 lg:text-left lg:backdrop-blur-none"
        >
          <p className="mb-4 text-base font-medium lg:mb-6 lg:text-lg">
            Quick Links:
          </p>

          <div className="mb-5 flex w-full flex-wrap justify-center rounded-lg border border-border bg-background/70 p-1 backdrop-blur-md lg:mb-8 lg:w-fit lg:flex-nowrap lg:justify-start">
            <a
              href="#work"
              className="w-full rounded-md bg-primary px-6 py-2 text-center font-medium text-primary-foreground transition-colors hover:bg-primary/80 lg:w-auto"
            >
              View Projects
            </a>
            <a
              href="#about"
              className="w-1/2 px-6 py-2 text-center text-foreground/80 transition-colors hover:text-foreground lg:w-auto"
            >
              About Me
            </a>
            <a
              href="#gallery"
              className="ml-1 flex w-1/2 justify-center border-l border-border px-3 py-2 text-foreground/80 transition-colors hover:text-foreground lg:w-auto lg:justify-start"
            >
              <div className="rounded border border-primary/50 p-1">
                <Maximize2 className="h-4 w-4 text-primary" />
              </div>
            </a>
          </div>

          <div className="space-y-4 text-[12px] leading-relaxed text-muted-foreground lg:space-y-6 lg:text-[13px]">
            <p>
              Hey there! Thanks for stopping by.
              <br className="hidden lg:block" />
              This portfolio is built with React, Vite,
              <br className="hidden lg:block" />
              and Framer Motion.
            </p>

            <p className="hidden lg:block">
              For the best experience, view this site
              <br />
              on a desktop browser to see all the
              <br />
              custom interactions.
            </p>

            <p className="font-medium text-primary/80">
              Currently open for new opportunities.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
