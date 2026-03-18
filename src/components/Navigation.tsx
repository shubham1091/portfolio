import { FileText, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function MagneticLink({ children, href, isActive, onClick }: { children: React.ReactNode, href: string, isActive: boolean, onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width/2);
    const middleY = clientY - (top + height/2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick={(e) => onClick(e as any, href)}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`transition-colors cursor-pointer relative z-10 ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'}`}
    >
      {children}
    </motion.a>
  );
}

const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Education', id: 'education' },
  { name: 'Work', id: 'work' },
  { name: 'Gallery', id: 'gallery' },
  { name: 'Contact', id: 'contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = navItems[0].id;
      let minDistance = Infinity;

      navItems.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check distance from middle of viewport
          const distance = Math.abs(rect.top - window.innerHeight / 3);
          
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = item.id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      // Small offset for the fixed header
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }

    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="relative flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 lg:py-6 max-w-350 mx-auto w-full">
      <div className="flex items-center gap-3 relative z-20">
        <div className="size-10 rounded-full overflow-hidden border-2 border-primary/20">
          <img src="/logo.jpg" alt="Shubham logo" className="size-full object-cover" />
        </div>
        <span className="text-primary font-semibold text-sm sm:text-base">Home</span>
      </div>

      <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
        {navItems.map((item, index) => (
          <div key={item.name} className="flex items-center gap-6">
            <MagneticLink 
              href={`#${item.id}`}
              isActive={activeSection === item.id}
              onClick={handleNavClick}
            >
              {item.name}
            </MagneticLink>
            {index < navItems.length - 1 && (
              <span className="text-muted-foreground/50 text-xs">/</span>
            )}
          </div>
        ))}
      </div>

      <div className="hidden lg:flex relative z-20 items-center gap-4">
        <Button variant="secondary" className="bg-secondary hover:bg-secondary/80 text-foreground border border-border rounded-xl gap-2 h-10 px-5 transition-all outline-none focus:outline-none ring-0 focus-visible:ring-0">
          <FileText className="w-4 h-4 text-red-500" />
          <span>Download Resume</span>
        </Button>
      </div>

      <button
        type="button"
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        className="lg:hidden relative z-20 inline-flex items-center justify-center rounded-xl border border-border bg-background size-10 text-foreground hover:bg-muted transition-colors"
      >
        {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-4 right-4 mt-3 rounded-2xl border border-border bg-card/95 backdrop-blur-md p-4 z-30"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, `#${item.id}`)}
                  className={`rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    activeSection === item.id ? 'text-primary bg-primary/10' : 'text-foreground/85 hover:text-primary hover:bg-muted/60'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <Button
              variant="secondary"
              className="mt-4 w-full bg-secondary hover:bg-secondary/80 text-foreground border border-border rounded-xl gap-2 h-10 px-5 transition-all"
            >
              <FileText className="w-4 h-4 text-red-500" />
              <span>Download Resume</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
