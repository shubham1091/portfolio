import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { educationData } from '@/data/education';
import { ArrowLeft, GraduationCap, Calendar, School, BookOpen } from 'lucide-react';

export default function EducationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const item = educationData.find((e) => e.id === Number(id));

  if (!item) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center pt-20">
        <h2 className="text-2xl font-bold">Education record not found</h2>
        <Link to="/" className="mt-4 text-primary hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-4xl px-6 py-24 sm:px-8"
    >
      <Link
        to="/"
        className="group mb-12 flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Portfolio
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column: Info */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <GraduationCap className="h-8 w-8" />
              </div>
              <span className="font-mono text-sm text-primary font-bold tracking-widest uppercase">Academic Achievement</span>
            </div>

            <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {item.degree}
            </h1>
            
            <p className="mt-8 text-xl leading-relaxed text-foreground/80">
              {item.description}
            </p>

            <div className="mt-12 space-y-12">
              {item.details && (
                <div>
                  <h3 className="mb-6 text-xl font-bold text-foreground flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Key Focus Areas
                  </h3>
                  <ul className="space-y-4">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-4 text-muted-foreground items-start">
                        <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span className="text-lg leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.modules && (
                <div>
                  <h3 className="mb-6 text-xl font-bold text-foreground">Core Modules</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {item.modules.map((module, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-border/40 bg-card/30 flex items-center gap-3">
                        <div className="h-1 w-1 rounded-full bg-primary/40" />
                        <span className="text-sm font-medium text-foreground/80">{module}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="sticky top-32 space-y-8 rounded-3xl border border-border/60 bg-card/50 p-8 backdrop-blur-sm"
          >
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-xs font-bold tracking-widest text-muted-foreground uppercase opacity-60">
                <School className="h-3 w-3" /> Institution
              </p>
              <p className="text-lg font-bold text-foreground">{item.school}</p>
            </div>

            <div className="space-y-1">
              <p className="flex items-center gap-2 text-xs font-bold tracking-widest text-muted-foreground uppercase opacity-60">
                <Calendar className="h-3 w-3" /> Duration
              </p>
              <p className="text-lg font-bold text-foreground">{item.year}</p>
            </div>

            <div className="pt-6 border-t border-border/40">
              <div className="rounded-2xl bg-primary/5 p-4 border border-primary/10">
                <p className="text-xs text-primary/70 italic leading-relaxed">
                  "This academic foundation provides the core logic and analytical rigor applied across all professional projects."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
