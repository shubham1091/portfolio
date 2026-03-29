import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { certifications } from '@/data/education';
import { ArrowLeft, Award, Calendar, ShieldCheck, ExternalLink, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CertificationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const cert = certifications.find((c) => c.id === id);

  if (!cert) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center pt-20">
        <h2 className="text-2xl font-bold">Certification record not found</h2>
        <Link to="/" className="mt-4 text-primary hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
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
        {/* Left Column: Cert Info & Talk */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Award className="h-8 w-8" />
              </div>
              <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase">Professional Credential</span>
            </div>

            <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              {cert.title}
            </h1>
            
            <p className="mt-8 text-xl leading-relaxed text-foreground/80 font-medium">
              {cert.description}
            </p>

            <div className="mt-16 relative">
              <div className="absolute top-0 left-0 -translate-x-8 -translate-y-4 opacity-10">
                <Quote className="h-16 w-16 text-primary rotate-180" />
              </div>
              
              <div className="relative z-10 p-8 rounded-3xl border border-primary/10 bg-primary/2">
                <h3 className="mb-6 text-xl font-bold text-primary flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  Why this matters
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground italic">
                  "{cert.talk}"
                </p>
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
            className="sticky top-32 space-y-8 rounded-3xl border border-border/60 bg-card/50 p-8 backdrop-blur-sm"
          >
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase opacity-60">
                Issuer
              </p>
              <p className="text-xl font-bold text-foreground">{cert.issuer}</p>
            </div>

            <div className="space-y-1">
              <p className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase opacity-60">
                <Calendar className="h-3 w-3" /> Issued
              </p>
              <p className="text-lg font-bold text-foreground">{cert.date}</p>
            </div>

            {cert.idCode && (
              <div className="space-y-1">
                <p className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase opacity-60">
                  Credential ID
                </p>
                <p className="font-mono text-sm text-foreground break-all">{cert.idCode}</p>
              </div>
            )}

            <div className="pt-6 border-t border-border/40">
              <Button variant="default" className="w-full group rounded-xl" asChild>
                <a href={`https://www.coursera.org/verify/${cert.idCode}`} target="_blank" rel="noopener noreferrer">
                  Verify Certificate
                  <ExternalLink className="ml-2 h-4 w-4 opacity-70 group-hover:opacity-100" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Visual representation of the certificate */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 aspect-video w-full overflow-hidden rounded-3xl border-4 border-card/50 shadow-2xl relative group bg-card"
      >
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-12">
            <Award className="h-24 w-24 text-primary/20 mx-auto mb-6" />
            <h2 className="text-3xl font-black text-foreground/40 uppercase tracking-tighter opacity-30 select-none">
              Official Certification Copy
            </h2>
            <p className="text-muted-foreground/30 font-mono text-sm mt-4 select-none italic">
              Record ID: {cert.idCode || 'PENDING_VERIFICATION'}
            </p>
          </div>
        </div>
        
        {/* Decorative corner labels */}
        <div className="absolute top-8 left-8 p-1 px-4 border border-primary/20 bg-primary/5 rounded-full text-[10px] font-mono text-primary/40 uppercase tracking-widest group-hover:opacity-100 opacity-50 transition-opacity">
          Authenticated
        </div>
      </motion.div>
    </motion.div>
  );
}
