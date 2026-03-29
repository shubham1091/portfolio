import Hero from '@/components/Hero';
import About from '@/components/About';
import Education from '@/components/Education';
import Work from '@/components/Work';
import PhotoGallery from '@/components/PhotoGallery';
import SocialGallery from '@/components/SocialGallery';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-32 pb-10"
    >
      <section id="home" className="pt-10">
        <Hero />
      </section>
      
      <section id="about" className="min-h-[60vh] flex items-center justify-center pt-10">
        <About />
      </section>

      <section id="education" className="pt-10">
        <Education />
      </section>

      <section id="work" className="pt-20">
        <Work />
      </section>

      <section id="gallery" className="pt-10">
        <PhotoGallery />
      </section>
      
      <section id="contact" className="min-h-[60vh] flex items-center justify-center pt-10 mb-20">
        <SocialGallery />
      </section>
    </motion.div>
  );
}
