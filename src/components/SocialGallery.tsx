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
    <div className="w-full max-w-[1000px] mx-auto px-8 flex flex-col pt-20 pb-20">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="w-full"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Let's Build Together</h2>
          <p className="text-white/60 font-medium">Have a project in mind or want to explore opportunities? Reach out.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Email */}
          <motion.div variants={itemVariants} className="h-48" style={{ perspective: "1000px" }}>
            <TiltBlock>
              <a href="mailto:shubhamverma1091@gmail.com" className="block w-full h-full group">
                <div className="bg-[#181a40] group-hover:bg-[#b48af8]/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-white/5 group-hover:border-[#b48af8]/50 h-full transition-all duration-300 shadow-xl">
                  <Mail className="w-10 h-10 text-white/50 group-hover:text-[#b48af8] mb-4 transition-colors" style={{ transform: "translateZ(20px)" }} />
                  <span className="font-bold text-white tracking-wider" style={{ transform: "translateZ(10px)" }}>Email</span>
                </div>
              </a>
            </TiltBlock>
          </motion.div>

          {/* Twitter */}
          <motion.div variants={itemVariants} className="h-48" style={{ perspective: "1000px" }}>
            <TiltBlock>
              <a href="https://x.com/smithofcode" className="block w-full h-full group">
                <div className="bg-[#181a40] group-hover:bg-[#1DA1F2]/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-white/5 group-hover:border-[#1DA1F2]/50 h-full transition-all duration-300 shadow-xl">
                  <Twitter className="w-10 h-10 text-white/50 group-hover:text-[#1DA1F2] mb-4 transition-colors" style={{ transform: "translateZ(20px)" }} />
                  <span className="font-bold text-white tracking-wider" style={{ transform: "translateZ(10px)" }}>Twitter</span>
                </div>
              </a>
            </TiltBlock>
          </motion.div>

          {/* Github */}
          <motion.div variants={itemVariants} className="h-48" style={{ perspective: "1000px" }}>
            <TiltBlock>
              <a href="https://github.com/shubham1091" className="block w-full h-full group">
                <div className="bg-[#181a40] group-hover:bg-white/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-white/5 group-hover:border-white/50 h-full transition-all duration-300 shadow-xl">
                  <Github className="w-10 h-10 text-white/50 group-hover:text-white mb-4 transition-colors" style={{ transform: "translateZ(20px)" }} />
                  <span className="font-bold text-white tracking-wider" style={{ transform: "translateZ(10px)" }}>GitHub</span>
                </div>
              </a>
            </TiltBlock>
          </motion.div>

          {/* LinkedIn */}
          <motion.div variants={itemVariants} className="h-48" style={{ perspective: "1000px" }}>
            <TiltBlock>
              <a href="https://www.linkedin.com/in/shubham-real/" className="block w-full h-full group">
                <div className="bg-[#181a40] group-hover:bg-[#0A66C2]/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-white/5 group-hover:border-[#0A66C2]/50 h-full transition-all duration-300 shadow-xl">
                  <Linkedin className="w-10 h-10 text-white/50 group-hover:text-[#0A66C2] mb-4 transition-colors" style={{ transform: "translateZ(20px)" }} />
                  <span className="font-bold text-white tracking-wider" style={{ transform: "translateZ(10px)" }}>LinkedIn</span>
                </div>
              </a>
            </TiltBlock>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
