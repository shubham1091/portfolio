import { useState } from 'react';
import { motion, type Variants, useMotionValue, useSpring } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "AI & Analytics Strategist",
    category: 'Stratifae (London)',
    year: '2025-Present',
    image: '/placeholder-hero.png',
    tab: 'experience'
  },
  {
    id: 2,
    title: "AI Ethics & Data Governance Consultant",
    category: 'OpenPlan / Mondrem',
    year: '2025',
    image: '/placeholder-work-1.png',
    tab: 'experience'
  },
  {
    id: 3,
    title: "Association Secretary & Trustee",
    category: 'Keele Postgrad Assoc.',
    year: '2025-Present',
    image: '/placeholder-work-2.png',
    tab: 'experience'
  },
  {
    id: 4,
    title: "Global Community Manager (15k+ Members)",
    category: 'Pooja Dutt Tech',
    year: '2022-2025',
    image: '/placeholder-work-3.png',
    tab: 'experience'
  },
  {
    id: 5,
    title: "Dropbox Cloud Architecture Clone",
    category: 'TS / React',
    year: '2023',
    image: '/placeholder-hero.png',
    tab: 'personal'
  },
  {
    id: 6,
    title: "Netflix High-Concurrency Simulator",
    category: 'Full-Stack',
    year: '2023',
    image: '/placeholder-work-1.png',
    tab: 'personal'
  },
  {
    id: 7,
    title: "Real-Time WebSocket Chat Network",
    category: 'Sockets / Typescript',
    year: '2023',
    image: '/placeholder-work-2.png',
    tab: 'personal'
  }
];

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
    <motion.div 
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
        rotateSpring.set(0);
      }}
      onMouseMove={handleMouseMove}
      className="group relative bg-[#2a2a2a] rounded-2xl overflow-hidden cursor-pointer border border-white/5 h-full flex flex-col"
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
          scale: isHovered ? 1 : 0.5 
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-1/2 left-1/2 w-4/5 aspect-[4/3] pointer-events-none z-30 rounded-xl overflow-hidden shadow-2xl border border-white/10"
      >
        <div className="w-full h-full bg-gradient-to-br from-gray-600/80 to-red-600/80 flex items-center justify-center text-white font-bold backdrop-blur-md">
          {project.image ? <span className="text-2xl opacity-50 text-center px-4">Image<br/>Placeholder</span> : "View Project"}
        </div>
      </motion.div>

      {/* Content description (Static) */}
      <div className="p-8 flex-grow flex flex-col justify-between relative z-10 opacity-100 transition-opacity duration-300 group-hover:opacity-40">
        <div>
          <h3 className="text-3xl font-bold text-white mb-6 leading-tight group-hover:text-gray-400 transition-colors">
            {project.title}
          </h3>
        </div>
        
        <div className="flex justify-between items-end mt-12 w-full">
          <span className="bg-red-500 text-white text-xs px-4 py-1.5 rounded-full font-medium">
            {project.category}
          </span>
          
          <span className="text-5xl font-black italic text-white/[0.05] transform pointer-events-none group-hover:text-white/[0.1] transition-colors">
            {project.year}
          </span>
        </div>
      </div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gray-500/0 group-hover:bg-gray-500/5 transition-colors duration-500 z-0" />
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gray-500/30 pointer-events-none transition-colors duration-300 z-20" />
    </motion.div>
  );
}

export default function Work() {
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <div className="w-full max-w-[1400px] mx-auto px-8 flex flex-col items-center">
      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex bg-[#2a2a2a] p-1 rounded-xl mb-16 border border-white/5"
      >
        <button 
          onClick={() => setActiveTab('experience')}
          className={`px-8 py-3 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'experience' 
              ? 'bg-[#3d3d3d] text-white shadow-lg' 
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          Experience
        </button>
        <button 
          onClick={() => setActiveTab('personal')}
          className={`px-8 py-3 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'personal' 
              ? 'bg-[#3d3d3d] text-white shadow-lg' 
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          Personal Projects
        </button>
      </motion.div>

      {/* Grid */}
      <motion.div 
        key={activeTab}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
      >
        {projects.filter(p => p.tab === activeTab).map((project) => {
          // Add discrete mouse tracking per card
          return (
            <HoverImageCard key={project.id} project={project} />
          );
        })}
        {projects.filter(p => p.tab === activeTab).length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground">
            No projects in this category yet.
          </div>
        )}
      </motion.div>
    </div>
  );
}
