import { Suspense } from 'react';
import { motion, type Variants } from 'framer-motion';
import HangingCard from './HangingCard';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" } }
};

export default function About() {
  return (
    <div id="about" className="w-full max-w-325 mx-auto px-8 py-24 relative">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10"
      >
        <motion.div variants={itemVariants} className="lg:col-span-5 lg:row-span-2 rounded-3xl border border-white/10 bg-card/40 p-4 backdrop-blur-sm">
          <Suspense fallback={
            <div className="w-full h-155 flex items-center justify-center rounded-2xl bg-background/40">
              <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          }>
            <HangingCard />
          </Suspense>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-7 rounded-3xl border border-white/10 bg-card/30 p-8">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight flex items-baseline gap-3">
            About <span className="font-serif italic font-light text-white/85">Me</span>
          </h2>
          <p className="mt-6 text-foreground/75 leading-relaxed text-[15px]">
            I am a highly analytical professional blending data science, enterprise strategy, and full-stack engineering. With a foundation in theoretical mathematics, I connect algorithmic optimization with practical business outcomes and product delivery.
          </p>
          <p className="mt-4 text-foreground/70 leading-relaxed text-[15px]">
            Currently pursuing an M.Sc. in Business Analytics at Keele University, I work across AI governance, compliance, and systems development, with hands-on focus in TypeScript, Python, cloud security, and enterprise architecture.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-4 rounded-3xl border border-white/10 bg-card/30 p-7">
          <p className="text-sm uppercase tracking-[0.18em] text-foreground/50">Core Areas</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <span className="rounded-full border border-red-500/45 bg-red-500/10 px-3 py-1 text-xs text-red-300">AI Strategy</span>
            <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-foreground/80">Data Governance</span>
            <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-foreground/80">TypeScript</span>
            <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-foreground/80">Cloud Security</span>
            <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-foreground/80">Public Policy</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-3 rounded-3xl border border-white/10 bg-card/30 p-7">
          <p className="text-sm uppercase tracking-[0.18em] text-foreground/50">Now</p>
          <p className="mt-4 text-foreground/80 leading-relaxed text-[15px]">
            Building robust products and decision systems where governance, usability, and measurable impact can coexist.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
