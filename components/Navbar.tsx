import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Lock, Sun, Moon } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { useTheme } from '../contexts/ThemeContext';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { content, isAdmin } = useContent();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path 
      ? 'text-blue-600 dark:text-blue-400 font-bold' 
      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white';
  };

  return (
    <nav className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-md text-slate-900 dark:text-slate-200 sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={content.general?.logo} 
              alt="Raven Guardian Logo" 
              className={`h-10 md:h-12 w-auto object-contain transition-all duration-300 ${theme === 'dark' ? 'brightness-0 invert' : ''}`}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide items-center">
            <Link to="/" className={`transition-colors ${isActive('/')}`}>STARTSEITE</Link>
            <Link to="/services" className={`transition-colors ${isActive('/services')}`}>LEISTUNGEN</Link>
            <Link to="/about" className={`transition-colors ${isActive('/about')}`}>ÜBER UNS</Link>
            <Link to="/contact" className={`transition-colors ${isActive('/contact')}`}>KONTAKT</Link>
            
            {isAdmin && (
              <Link to="/admin" className="text-amber-600 dark:text-amber-500 font-bold flex items-center gap-2 border border-amber-500/30 px-3 py-1 rounded bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-500 hover:text-white transition-all">
                <Lock size={14} /> ADMIN
              </Link>
            )}

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
              aria-label="Design wechseln"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          {/* Call CTA */}
          <div className="hidden md:flex items-center">
            <a href={`tel:${content.contact.phone}`} className="flex items-center gap-2 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm transition-all shadow-md font-medium">
              <Phone size={16} />
              <span>{content.contact.phone}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-xl absolute w-full left-0 z-50">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Startseite</Link>
            <Link to="/services" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Leistungen</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Über uns</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Kontakt</Link>
            
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 dark:border-slate-800 mt-2">
               <span className="text-slate-600 dark:text-slate-400 font-medium">Design</span>
               <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                {theme === 'light' ? <div className="flex items-center gap-2"><Moon size={18}/> Dunkel</div> : <div className="flex items-center gap-2"><Sun size={18}/> Hell</div>}
              </button>
            </div>
            
            <div className="pt-2">
               <a href={`tel:${content.contact.phone}`} className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium">
                <Phone size={18} />
                Anrufen
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};