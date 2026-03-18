import { useState } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Education from '@/components/Education';
import Work from '@/components/Work';
import PhotoGallery from '@/components/PhotoGallery';
import SocialGallery from '@/components/SocialGallery';
import Cursor from '@/components/Cursor';
import BackgroundOrbs from '@/components/BackgroundOrbs';
import ProgressBar from '@/components/ProgressBar';
import Loader from '@/components/Loader';

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Cursor />
      
      {!isLoaded && <Loader onLoadingComplete={() => setIsLoaded(true)} />}
      
      <div style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.8s ease-in' }}>
        <ProgressBar />
        <BackgroundOrbs />
        
        <Layout>
          <div className="flex flex-col gap-32 pb-10">
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
          </div>
        </Layout>
      </div>
    </>
  )
}

export default App
