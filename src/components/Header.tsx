import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
      scrolled 
        ? 'bg-primary/95 backdrop-blur-xl shadow-lg border-b border-accent/20' 
        : 'bg-transparent backdrop-blur-sm border-b border-accent/10'
    }`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Amit Malka
        </div>

        <nav className={`hidden md:flex gap-8 ${isMenuOpen ? 'flex' : ''}`}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative text-gray-300 hover:text-accent font-medium py-2 transition-colors duration-300 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </nav>

        <button
          className="md:hidden w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-accent/20 rounded-xl text-accent hover:bg-white/20 transition-all duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="absolute top-full left-0 right-0 bg-primary/95 backdrop-blur-xl border-b border-accent/20 py-8 md:hidden">
            <div className="flex flex-col gap-4 px-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left py-3 px-4 text-gray-300 hover:text-accent hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;