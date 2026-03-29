import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { ArrowLeft, Calendar, Tag, Building2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WorkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center pt-20">
        <h2 className="text-2xl font-bold">Project not found</h2>
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
            <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {project.title}
            </h1>
            
            <p className="mt-8 text-xl leading-relaxed text-foreground/80">
              {project.description}
            </p>

            <div className="mt-12 space-y-8">
              <div>
                <h3 className="mb-4 text-lg font-bold text-foreground">Key Responsibilities & Achievements</h3>
                <ul className="space-y-4">
                  {project.details?.map((detail, idx) => (
                    <li key={idx} className="flex gap-3 text-muted-foreground">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="sticky top-32 space-y-8 rounded-3xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm"
          >
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-xs font-bold tracking-widest text-muted-foreground uppercase opacity-60">
                <Building2 className="h-3 w-3" /> Organization
              </p>
              <p className="font-bold text-foreground">{project.category}</p>
            </div>

            <div className="space-y-1">
              <p className="flex items-center gap-2 text-xs font-bold tracking-widest text-muted-foreground uppercase opacity-60">
                <Calendar className="h-3 w-3" /> Period
              </p>
              <p className="font-bold text-foreground">{project.year}</p>
            </div>

            <div className="space-y-3">
              <p className="flex items-center gap-2 text-xs font-bold tracking-widest text-muted-foreground uppercase opacity-60">
                <Tag className="h-3 w-3" /> Expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-medium text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {project.links && project.links.length > 0 && (
              <div className="pt-4 border-t border-border/40">
                {project.links.map((link, idx) => (
                  <Button key={idx} variant="outline" className="w-full justify-between group" asChild>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label}
                      <ExternalLink className="h-4 w-4 opacity-40 group-hover:opacity-100" />
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Large visual placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 aspect-video w-full overflow-hidden rounded-3xl border border-border/60 bg-muted/30"
      >
        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-secondary/10 to-primary/10 text-muted-foreground/30">
          <span className="text-xl font-bold uppercase tracking-[0.2em]">Visual Representation</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
