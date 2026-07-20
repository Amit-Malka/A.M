import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useTheme } from '../theme/ThemeProvider';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Work With Me', id: 'work-with-me' },
    { label: 'Contact', id: 'contact' },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${scrolled
        ? 'border-b border-line bg-bg/95 backdrop-blur'
        : 'bg-transparent border-b border-transparent'
      }`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <motion.div
          className="text-2xl font-display font-semibold text-ink"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Amit Malka
        </motion.div>

        <nav className="hidden md:flex">
          <motion.div
            className="flex gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative text-muted hover:text-ink font-medium py-2 transition-colors duration-300 group text-sm"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-accent"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
              </motion.button>
            ))}
          </motion.div>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Toggle dark mode' : 'Toggle light mode'}
            className="w-10 h-10 flex items-center justify-center border border-line rounded-full text-ink hover:bg-bg/50 transition-colors duration-300"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <motion.button
            className="md:hidden w-10 h-10 flex items-center justify-center border border-line rounded-full text-ink hover:bg-bg/50 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="absolute top-full left-0 right-0 bg-bg/95 backdrop-blur border-b border-line py-8 md:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex flex-col gap-4 px-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left py-3 px-4 text-muted hover:text-ink hover:bg-bg/50 rounded-xl transition-all duration-300 font-medium"
                    variants={itemVariants}
                    whileHover={{ x: 8 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
