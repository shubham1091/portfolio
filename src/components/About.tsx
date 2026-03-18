import { Suspense } from 'react';
import { motion, type Variants } from 'framer-motion';
import HangingCard from './HangingCard';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" } }
};

export default function About() {
  return (
    <div id="about" className="relative mx-auto w-full max-w-325 px-8 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
        className="relative z-10 grid grid-cols-1 gap-5 lg:grid-cols-12"
      >
        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-border/70 bg-card/70 p-4 backdrop-blur-sm lg:col-span-5 lg:row-span-2"
        >
          <Suspense
            fallback={
              <div className="flex h-155 w-full items-center justify-center rounded-2xl bg-background/40">
                <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
              </div>
            }
          >
            <HangingCard />
          </Suspense>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-border/70 bg-card/80 p-8 lg:col-span-7"
        >
          <h2 className="flex items-baseline gap-3 text-4xl font-black tracking-tight text-foreground md:text-5xl">
            About{" "}
            <span className="font-serif font-light text-foreground/80 italic">
              Me
            </span>
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-foreground/75">
            I am a highly analytical professional blending data science,
            enterprise strategy, and full-stack engineering. With a foundation
            in theoretical mathematics, I connect algorithmic optimization with
            practical business outcomes and product delivery.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground/70">
            Currently pursuing an M.Sc. in Business Analytics at Keele
            University, I work across AI governance, compliance, and systems
            development, with hands-on focus in TypeScript, Python, cloud
            security, and enterprise architecture.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-border/70 bg-card/80 p-7 lg:col-span-4"
        >
          <p className="text-sm tracking-[0.18em] text-foreground/50 uppercase">
            Core Areas
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <span className="rounded-full border border-primary/45 bg-primary/15 px-3 py-1 text-xs text-foreground">
              AI Strategy
            </span>
            <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-foreground/80">
              Data Governance
            </span>
            <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-foreground/80">
              TypeScript
            </span>
            <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-foreground/80">
              Cloud Security
            </span>
            <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-foreground/80">
              Public Policy
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-border/70 bg-card/80 p-7 lg:col-span-3"
        >
          <p className="text-sm tracking-[0.18em] text-foreground/50 uppercase">
            Now
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">
            Building robust products and decision systems where governance,
            usability, and measurable impact can coexist.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
