import React, { useRef } from 'react';
import { motion, type Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Twitter, Github, Linkedin, Mail, MapPin, Briefcase } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

function TiltBlock({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative w-full h-full ${className || ''}`}
    >
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function SocialGallery() {
  return (
    <div className="mx-auto flex w-full max-w-280 flex-col px-6 py-24 sm:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="w-full"
      >
        <motion.div variants={itemVariants} className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="mb-6 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            Let's build something <span className="text-primary italic">impactful</span>
          </h2>
          <p className="text-lg font-medium text-muted-foreground">
            Whether it's data analytics, business strategy, or a creative project, reach out and let's start the conversation.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          
          {/* LinkedIn - PRIMARY Focus (2x2) */}
          <motion.div
            variants={itemVariants}
            className="sm:col-span-2 sm:row-span-2 min-h-[320px] lg:h-auto"
            style={{ perspective: "1000px" }}
          >
            <TiltBlock>
              <a
                href="https://www.linkedin.com/in/shubham-real/"
                className="group block h-full w-full"
              >
                <div className="flex h-full flex-col items-start justify-between rounded-[2.5rem] border border-primary/20 bg-linear-to-br from-primary/10 via-card to-card p-10 shadow-2xl transition-all duration-500 hover:border-primary/40 hover:shadow-primary/5">
                  <div className="flex w-full items-start justify-between">
                    <div className="p-4 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-110 duration-500">
                      <Linkedin className="h-10 w-10" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60">Verified Profile</span>
                      <div className="h-1 w-12 rounded-full bg-primary/20" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">LinkedIn</h3>
                    <p className="max-w-[80%] text-lg font-medium leading-relaxed text-muted-foreground"> Connect for professional inquiries, analytics insights, and strategic collaborations.</p>
                  </div>
                </div>
              </a>
            </TiltBlock>
          </motion.div>

          {/* GitHub - PROJECT Focus (2x1) */}
          <motion.div
            variants={itemVariants}
            className="sm:col-span-2 h-[180px]"
            style={{ perspective: "1000px" }}
          >
            <TiltBlock>
              <a
                href="https://github.com/shubham1091"
                className="group block h-full w-full"
              >
                <div className="flex h-full items-center justify-between rounded-[2rem] border border-border/70 bg-card p-8 shadow-xl transition-all duration-300 hover:border-foreground/20 hover:bg-muted/70">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-xl bg-foreground text-background transition-transform group-hover:rotate-12">
                      <Github className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight text-foreground">GitHub</h3>
                      <p className="text-sm font-medium text-muted-foreground">Review my technical architecture and code</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-border opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </div>
                </div>
              </a>
            </TiltBlock>
          </motion.div>

          {/* Email - DIRECT (1x1) */}
          <motion.div
            variants={itemVariants}
            className="sm:col-span-1 h-[180px]"
            style={{ perspective: "1000px" }}
          >
            <TiltBlock>
              <a
                href="mailto:shubhamverma1091@gmail.com"
                className="group block h-full w-full"
              >
                <div className="flex h-full flex-col items-center justify-center rounded-[2rem] border border-secondary/50 bg-secondary/10 p-6 text-center shadow-xl transition-all duration-300 hover:border-secondary hover:bg-secondary/20">
                  <Mail className="mb-3 h-8 w-8 text-secondary transition-transform group-hover:-translate-y-1" />
                  <span className="text-sm font-black tracking-widest uppercase text-foreground">Email</span>
                </div>
              </a>
            </TiltBlock>
          </motion.div>

          {/* Twitter - SOCIAL (1x1) */}
          <motion.div
            variants={itemVariants}
            className="sm:col-span-1 h-[180px]"
            style={{ perspective: "1000px" }}
          >
            <TiltBlock>
              <a
                href="https://x.com/smithofcode"
                className="group block h-full w-full"
              >
                <div className="flex h-full flex-col items-center justify-center rounded-[2rem] border border-accent/40 bg-accent/5 p-6 text-center shadow-xl transition-all duration-300 hover:border-accent hover:bg-accent/10">
                  <Twitter className="mb-3 h-8 w-8 text-accent transition-transform group-hover:scale-110" />
                  <span className="text-sm font-black tracking-widest uppercase text-foreground">Twitter</span>
                </div>
              </a>
            </TiltBlock>
          </motion.div>

          {/* Location/Status - NEW (2x1) */}
          <motion.div
            variants={itemVariants}
            className="sm:col-span-2 h-[100px] sm:h-auto"
            style={{ perspective: "1000px" }}
          >
            <div className="flex h-full items-center justify-between rounded-[2rem] border border-border/40 bg-card/40 p-8 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-primary opacity-50" />
                <span className="text-sm font-bold tracking-wide text-foreground/80">Stoke-on-Trent, UK</span>
              </div>
              <div className="h-px w-8 bg-border hidden sm:block" />
              <div className="flex items-center gap-4">
                <Briefcase className="h-5 w-5 text-primary opacity-50" />
                <span className="text-sm font-bold tracking-wide text-foreground/80">Available for Opportunities</span>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}
