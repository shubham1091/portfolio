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
    <div className="mx-auto flex w-full max-w-350 flex-col items-center px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16 flex w-full items-center justify-between"
      >
        <h2 className="flex items-center gap-4 text-3xl font-bold text-foreground">
          <span className="font-mono text-xl text-primary">02.</span> Education
          Background
          <div className="ml-4 hidden h-px w-32 bg-border md:block"></div>
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative ml-4 w-full max-w-200 space-y-12 border-l border-border md:ml-0 md:pl-8"
      >
        {educationData.map((item) => (
          <motion.div
            variants={itemVariants}
            key={item.id}
            className="relative pl-8 md:pl-0"
          >
            {/* Timeline Dot */}
            <div className="absolute top-1.5 left-[-5.5px] h-3 w-3 rounded-full border border-card bg-primary shadow-[0_0_0_4px_rgba(150,120,150,0.08)] md:left-[-37.5px]" />

            <div className="group rounded-2xl border border-border/60 bg-card/75 p-6 transition-colors duration-300 hover:bg-card">
              <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                  {item.degree}
                </h3>
                <span className="w-fit rounded-full bg-muted/70 px-3 py-1 font-mono text-sm text-muted-foreground">
                  {item.year}
                </span>
              </div>

              <h4 className="mb-4 text-lg text-primary">{item.school}</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
