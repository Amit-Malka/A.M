import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
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
    <header className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
      scrolled 
        ? 'bg-primary/95 backdrop-blur-xl shadow-lg shadow-secondary/10 border-b border-accent/20' 
        : 'bg-transparent backdrop-blur-sm border-b border-accent/10'
    }`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <motion.div 
          className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Amit Malka
        </motion.div>

        <nav className={`hidden md:flex gap-8 ${isMenuOpen ? 'flex' : ''}`}>
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
                className="relative text-gray-300 hover:text-accent font-medium py-2 transition-colors duration-300 group text-sm"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
                <motion.span 
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
              </motion.button>
            ))}
          </motion.div>
        </nav>

        <motion.button
          className="md:hidden w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-accent/20 rounded-xl text-accent hover:bg-white/20 hover:scale-110 transition-all duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>

        {/* Mobile Menu */}
        <motion.nav 
          className={`absolute top-full left-0 right-0 bg-primary/95 backdrop-blur-xl border-b border-accent/20 py-8 md:hidden ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="flex flex-col gap-4 px-6"
            variants={containerVariants}
            initial="hidden"
            animate={isMenuOpen ? "visible" : "hidden"}
          >
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left py-3 px-4 text-gray-300 hover:text-accent hover:bg-white/10 rounded-xl transition-all duration-300 font-medium"
                variants={itemVariants}
                whileHover={{ x: 8 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.nav>
      </div>
    </header>
  );
};

export default Header;