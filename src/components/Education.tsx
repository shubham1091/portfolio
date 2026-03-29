import { motion, type Variants } from 'framer-motion';
import { educationData, certifications } from '@/data/education';
import { Link } from 'react-router-dom';

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
          <span className="font-mono text-xl text-primary">02.</span> Education &
          Certifications
          <div className="ml-4 hidden h-px w-32 bg-border md:block"></div>
        </h2>
      </motion.div>

      <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative ml-4 space-y-12 border-l border-border md:ml-0 md:pl-8"
        >
          <p className="mb-8 font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase opacity-50">Academic Path</p>
          {educationData.map((item) => (
            <motion.div
              variants={itemVariants}
              key={item.id}
              className="relative pl-8 md:pl-0"
            >
              {/* Timeline Dot */}
              <div className="absolute top-1.5 left-[-5.5px] h-3 w-3 rounded-full border border-card bg-primary shadow-[0_0_0_4px_rgba(150,120,150,0.08)] md:left-[-37.5px]" />

              <Link to={`/education/${item.id}`} className="block">
                <div className="group rounded-2xl border border-border/60 bg-card/75 p-6 transition-all duration-300 hover:bg-card hover:border-primary/30">
                  <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                      {item.degree}
                    </h3>
                    <span className="w-fit rounded-full bg-muted/70 px-3 py-1 font-mono text-xs text-muted-foreground">
                      {item.year}
                    </span>
                  </div>

                  <h4 className="mb-4 text-lg text-primary/80">{item.school}</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/70 transition-colors">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-6"
        >
          <p className="mb-8 font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase opacity-50">Professional Certifications</p>
          <div className="grid grid-cols-1 gap-4">
            {certifications.map((cert) => (
              <Link key={cert.id} to={`/certification/${cert.id}`} className="block">
                <motion.div
                  variants={itemVariants}
                  className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-card/40 p-5 transition-all duration-300 hover:border-primary/30 hover:bg-card/70"
                >
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="font-bold text-foreground group-hover:text-primary">{cert.title}</h4>
                      <span className="text-[10px] font-mono text-muted-foreground">{cert.date}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  </div>
                  {cert.idCode && (
                    <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-primary-foreground/40">
                      <span className="rounded-sm bg-muted/50 px-1.5 py-0.5">ID: {cert.idCode}</span>
                    </div>
                  )}
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
