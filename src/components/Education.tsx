import { motion, type Variants } from 'framer-motion';

const educationData = [
  {
    id: 1,
    degree: 'M.Sc. in Business Analytics',
    school: 'Keele University (UK)',
    year: '2025 - 2026',
    description: 'Specializing in Enterprise Analytics, Strategic Implementation, and rigorous synthesis between technical data science and corporate executive functioning. Ranked among the top UK universities for scientific impact.'
  },
  {
    id: 2,
    degree: 'B.Sc. in Mathematics',
    school: 'Maharaja Ganga Singh University (MGSU)',
    year: '2020 - 2023',
    description: 'Rigorous grounding in theoretical mathematics—including linear algebra, multivariable calculus, and probability theory—the core mathematical architecture governing modern artificial intelligence and predictive modeling.'
  },
  {
    id: 3,
    degree: 'Executive Certificate in FinTech',
    school: 'Dept of IT & Communication, Govt of Rajasthan',
    year: '2023',
    description: 'Specialization in Financial Technology and Regulatory Compliance, navigating domains where high-velocity data processing, predictive analytics, and strict regulatory requirements intersect.'
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function Education() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-8 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full mb-16 flex items-center justify-between"
      >
        <h2 className="text-3xl font-bold text-white flex items-center gap-4">
          <span className="text-primary font-mono text-xl">02.</span> Education Background
          <div className="h-[1px] w-32 bg-white/10 ml-4 hidden md:block"></div>
        </h2>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="w-full max-w-[800px] relative border-l border-white/10 ml-4 md:ml-0 md:pl-8 space-y-12"
      >
        {educationData.map((item) => (
          <motion.div 
            variants={itemVariants}
            key={item.id} 
            className="relative pl-8 md:pl-0"
          >
            {/* Timeline Dot */}
            <div className="absolute left-[-5.5px] md:left-[-37.5px] top-1.5 w-3 h-3 rounded-full bg-primary border border-[#181a40] shadow-[0_0_0_4px_rgba(255,255,255,0.05)]" />
            
            <div className="group bg-[#2a2a2a]/50 hover:bg-[#2a2a2a] p-6 rounded-2xl border border-white/5 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {item.degree}
                </h3>
                <span className="text-sm font-mono text-white/50 bg-white/5 px-3 py-1 rounded-full w-fit">
                  {item.year}
                </span>
              </div>
              
              <h4 className="text-lg text-blue-400 mb-4">{item.school}</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
