import { useState } from 'react';
import { motion, type Variants, useMotionValue, useSpring } from 'framer-motion';

import { projects } from '@/data/projects';
import { Link } from 'react-router-dom';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

// Component for a single project card with floating image reveal
function HoverImageCard({ project }: { project: typeof projects[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the trailing motion
  const xSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 100, damping: 20 });
  const rotateSpring = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Calculate center of the div
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate mouse position relative to center
    const xPos = e.clientX - rect.left - centerX;
    const yPos = e.clientY - rect.top - centerY;
    
    x.set(xPos);
    y.set(yPos);
    
    // Add slight rotation based on horizontal movement
    rotateSpring.set(xPos * 0.05); 
  };

  return (
    <Link to={`/work/${project.id}`}>
      <motion.div
        variants={itemVariants}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          x.set(0)
          y.set(0)
          rotateSpring.set(0)
        }}
        onMouseMove={handleMouseMove}
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/60 bg-card"
      >
        {/* Floating Image Reveal Element */}
        <motion.div
          style={{
            x: xSpring,
            y: ySpring,
            rotate: rotateSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute top-1/2 left-1/2 z-30 aspect-4/3 w-4/5 overflow-hidden rounded-xl border border-white/10 shadow-2xl"
        >
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-secondary/80 to-primary/70 font-bold text-primary-foreground backdrop-blur-md">
            {project.image ? (
              <span className="px-4 text-center text-2xl opacity-50">
                View Details
              </span>
            ) : (
              "View Project"
            )}
          </div>
        </motion.div>

        {/* Content description (Static) */}
        <div className="relative z-10 flex grow flex-col justify-between p-8 opacity-100 transition-opacity duration-300 group-hover:opacity-40">
          <div>
            <h3 className="mb-6 text-3xl leading-tight font-bold text-foreground transition-colors group-hover:text-primary">
              {project.title}
            </h3>
          </div>

          <div className="mt-12 flex w-full items-end justify-between">
            <span className="rounded-full bg-primary/85 px-4 py-1.5 text-xs font-medium text-primary-foreground">
              {project.category}
            </span>

            <span className="pointer-events-none transform text-5xl font-black text-foreground/10 italic transition-colors group-hover:text-foreground/20">
              {project.year}
            </span>
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 z-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/6" />
        <div className="pointer-events-none absolute inset-0 z-20 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-primary/25" />
      </motion.div>
    </Link>
  )
}

export default function Work({ defaultTab = 'experience', showTabs = true }: { defaultTab?: 'experience' | 'personal', showTabs?: boolean }) {
  const [activeTab, setActiveTab] = useState<'experience' | 'personal'>(defaultTab);

  return (
    <div className="mx-auto flex w-full max-w-350 flex-col items-center px-8">
      {showTabs && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 flex rounded-xl border border-border bg-card p-1"
        >
          <button
            onClick={() => setActiveTab("experience")}
            className={`rounded-lg px-8 py-3 text-sm font-medium transition-all ${
              activeTab === "experience"
                ? "bg-primary/20 text-foreground shadow-lg"
                : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => setActiveTab("personal")}
            className={`rounded-lg px-8 py-3 text-sm font-medium transition-all ${
              activeTab === "personal"
                ? "bg-primary/20 text-foreground shadow-lg"
                : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
            }`}
          >
            Personal Projects
          </button>
        </motion.div>
      )}

      {/* Grid */}
      <motion.div
        key={activeTab}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects
          .filter((p) => p.tab === activeTab)
          .map((project) => {
            // Add discrete mouse tracking per card
            return <HoverImageCard key={project.id} project={project} />
          })}
        {projects.filter((p) => p.tab === activeTab).length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground">
            No projects in this category yet.
          </div>
        )}
      </motion.div>
    </div>
  )
}
