import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import Cursor from '@/components/Cursor';
import BackgroundOrbs from '@/components/BackgroundOrbs';
import ProgressBar from '@/components/ProgressBar';
import Loader from '@/components/Loader';

// Pages
import HomePage from '@/pages/HomePage';
import WorkDetailPage from '@/pages/WorkDetailPage';
import EducationDetailPage from '@/pages/EducationDetailPage';
import CertificationDetailPage from '@/pages/CertificationDetailPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:id" element={<WorkDetailPage />} />
        <Route path="/education/:id" element={<EducationDetailPage />} />
        <Route path="/certification/:id" element={<CertificationDetailPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Cursor />
      
      {!isLoaded && <Loader onLoadingComplete={() => setIsLoaded(true)} />}
      
      <div style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.8s ease-in' }}>
        <ProgressBar />
        <BackgroundOrbs />
        
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </div>
    </BrowserRouter>
  )
}

export default App
