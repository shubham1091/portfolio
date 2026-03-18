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
    <nav className="relative mx-auto flex w-full max-w-350 items-center justify-between px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <div className="relative z-20 flex items-center gap-3">
        <div className="size-10 overflow-hidden rounded-full border-2 border-primary/20">
          <img
            src="/logo.jpg"
            alt="Shubham logo"
            className="size-full object-cover"
          />
        </div>
        <span className="text-sm font-semibold text-primary sm:text-base">
          Home
        </span>
      </div>

      <div className="hidden items-center gap-6 text-sm font-medium lg:flex">
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
              <span className="text-xs text-muted-foreground/50">/</span>
            )}
          </div>
        ))}
      </div>

      <div className="relative z-20 hidden items-center gap-4 lg:flex">
        <Button
          variant="secondary"
          className="h-10 gap-2 rounded-xl border border-border bg-secondary px-5 text-foreground ring-0 transition-all outline-none hover:bg-secondary/80 focus:outline-none focus-visible:ring-0"
        >
          <FileText className="h-4 w-4 text-primary" />
          <span>Download Resume</span>
        </Button>
      </div>

      <button
        type="button"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        className="relative z-20 inline-flex size-10 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-colors hover:bg-muted lg:hidden"
      >
        {isMobileMenuOpen ? (
          <X className="size-5" />
        ) : (
          <Menu className="size-5" />
        )}
      </button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-4 left-4 z-30 mt-3 rounded-2xl border border-border bg-card/95 p-4 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, `#${item.id}`)}
                  className={`rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    activeSection === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/85 hover:bg-muted/60 hover:text-primary"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <Button
              variant="secondary"
              className="mt-4 h-10 w-full gap-2 rounded-xl border border-border bg-secondary px-5 text-foreground transition-all hover:bg-secondary/80"
            >
              <FileText className="h-4 w-4 text-primary" />
              <span>Download Resume</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
