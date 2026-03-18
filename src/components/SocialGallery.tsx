import React, { useRef } from 'react';
import { motion, type Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

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
    transition: { type: "spring", stiffness: 100 }
  }
};

function TiltBlock({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function SocialGallery() {
  return (
    <div className="mx-auto flex w-full max-w-250 flex-col px-8 pt-20 pb-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="w-full"
      >
        <motion.div variants={itemVariants} className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground">
            Let's Build Together
          </h2>
          <p className="font-medium text-muted-foreground">
            Have a project in mind or want to explore opportunities? Reach out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Email */}
          <motion.div
            variants={itemVariants}
            className="h-48"
            style={{ perspective: "1000px" }}
          >
            <TiltBlock>
              <a
                href="mailto:shubhamverma1091@gmail.com"
                className="group block h-full w-full"
              >
                <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-border/70 bg-card p-8 text-center shadow-xl transition-all duration-300 group-hover:border-secondary group-hover:bg-secondary/45">
                  <Mail
                    className="mb-4 h-10 w-10 text-muted-foreground transition-colors group-hover:text-foreground"
                    style={{ transform: "translateZ(20px)" }}
                  />
                  <span
                    className="font-bold tracking-wider text-foreground"
                    style={{ transform: "translateZ(10px)" }}
                  >
                    Email
                  </span>
                </div>
              </a>
            </TiltBlock>
          </motion.div>

          {/* Twitter */}
          <motion.div
            variants={itemVariants}
            className="h-48"
            style={{ perspective: "1000px" }}
          >
            <TiltBlock>
              <a
                href="https://x.com/smithofcode"
                className="group block h-full w-full"
              >
                <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-border/70 bg-card p-8 text-center shadow-xl transition-all duration-300 group-hover:border-accent group-hover:bg-accent/30">
                  <Twitter
                    className="mb-4 h-10 w-10 text-muted-foreground transition-colors group-hover:text-accent-foreground"
                    style={{ transform: "translateZ(20px)" }}
                  />
                  <span
                    className="font-bold tracking-wider text-foreground"
                    style={{ transform: "translateZ(10px)" }}
                  >
                    Twitter
                  </span>
                </div>
              </a>
            </TiltBlock>
          </motion.div>

          {/* Github */}
          <motion.div
            variants={itemVariants}
            className="h-48"
            style={{ perspective: "1000px" }}
          >
            <TiltBlock>
              <a
                href="https://github.com/shubham1091"
                className="group block h-full w-full"
              >
                <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-border/70 bg-card p-8 text-center shadow-xl transition-all duration-300 group-hover:border-foreground/20 group-hover:bg-muted/70">
                  <Github
                    className="mb-4 h-10 w-10 text-muted-foreground transition-colors group-hover:text-foreground"
                    style={{ transform: "translateZ(20px)" }}
                  />
                  <span
                    className="font-bold tracking-wider text-foreground"
                    style={{ transform: "translateZ(10px)" }}
                  >
                    GitHub
                  </span>
                </div>
              </a>
            </TiltBlock>
          </motion.div>

          {/* LinkedIn */}
          <motion.div
            variants={itemVariants}
            className="h-48"
            style={{ perspective: "1000px" }}
          >
            <TiltBlock>
              <a
                href="https://www.linkedin.com/in/shubham-real/"
                className="group block h-full w-full"
              >
                <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-border/70 bg-card p-8 text-center shadow-xl transition-all duration-300 group-hover:border-primary/55 group-hover:bg-primary/18">
                  <Linkedin
                    className="mb-4 h-10 w-10 text-muted-foreground transition-colors group-hover:text-primary"
                    style={{ transform: "translateZ(20px)" }}
                  />
                  <span
                    className="font-bold tracking-wider text-foreground"
                    style={{ transform: "translateZ(10px)" }}
                  >
                    LinkedIn
                  </span>
                </div>
              </a>
            </TiltBlock>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
