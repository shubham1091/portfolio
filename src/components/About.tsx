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
          className="rounded-3xl border border-border/70 bg-card/70 p-4 backdrop-blur-sm lg:col-span-5 lg:row-span-3"
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
            Analytically minded and detail-oriented Junior Business Analyst with
            an MSc in Business Analytics (Distinction) from Keele University,
            where I was recognised as Student of the Year.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground/70">
            I bring hands-on experience across data analysis, machine learning,
            business intelligence, and AI governance, gained through elected
            student leadership, a university consultancy placement, and
            independent community education work. I am motivated by using data
            to drive clear, practical business decisions.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-border/70 bg-card/80 p-7 lg:col-span-7"
        >
          <p className="text-sm tracking-[0.18em] text-foreground/50 uppercase">
            Core Skills
          </p>
          <div className="mt-5 space-y-5">
            {/* Technical */}
            <div>
              <p className="mb-2 text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                Technical
              </p>
              <div className="flex flex-wrap gap-2.5">
                {["Python", "SQL", "Git", "Excel", "Tableau", "Power BI", "Jira"].map((skill) => (
                  <span key={skill} className="rounded-full border border-secondary/45 bg-secondary/15 px-3 py-1 text-xs text-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Analytical */}
            <div>
              <p className="mb-2 text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                Analytical
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Machine Learning",
                  "Data Visualisation",
                  "BI Pipeline Design",
                  "Cloud Architecture",
                  "Statistical Analysis"
                ].map((skill) => (
                  <span key={skill} className="rounded-full border border-accent/45 bg-accent/15 px-3 py-1 text-xs text-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Business */}
            <div>
              <p className="mb-2 text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                Business
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Requirements Gathering",
                  "Agile & Scrum",
                  "Stakeholder Engagement",
                  "Process Mapping",
                  "AI Ethics & Governance",
                  "Strategic Frameworks"
                ].map((skill) => (
                  <span key={skill} className="rounded-full border border-primary/45 bg-primary/15 px-3 py-1 text-xs text-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-border/70 bg-card/80 p-7 lg:col-span-7"
        >
          <p className="text-sm tracking-[0.18em] text-foreground/50 uppercase">
            Now
          </p>
          <p className="mt-4 max-w-130 text-[15px] leading-relaxed text-foreground/80">
            Building robust products and decision systems where governance,
            usability, and measurable impact can coexist.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
