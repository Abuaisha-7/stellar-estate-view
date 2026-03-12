import React, { useState, useEffect } from 'react';
import { Home, Search, Heart, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <Home size={24} />
          </div>
          <span className={cn(
            "text-xl font-bold tracking-tight",
            isScrolled ? "text-slate-900" : "text-white"
          )}>EstateLuxe</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Buy', 'Rent', 'Sell', 'Market Trends', 'Neighborhoods'].map((item) => (
            <a
              key={item}
              href="#"
              className={cn(
                "text-sm font-medium transition-colors hover:text-indigo-600",
                isScrolled ? "text-slate-600" : "text-white/90"
              )}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className={cn(
            "p-2 rounded-full transition-colors",
            isScrolled ? "text-slate-600 hover:bg-slate-100" : "text-white hover:bg-white/10"
          )}>
            <Heart size={20} />
          </button>
          <button className={cn(
            "p-2 rounded-full transition-colors",
            isScrolled ? "text-slate-600 hover:bg-slate-100" : "text-white hover:bg-white/10"
          )}>
            <User size={20} />
          </button>
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} className={isScrolled ? "text-slate-900" : "text-white"} /> : <Menu size={24} className={isScrolled ? "text-slate-900" : "text-white"} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-4 md:hidden border-t"
          >
            <div className="flex flex-col gap-4">
              {['Buy', 'Rent', 'Sell', 'Market Trends', 'Neighborhoods'].map((item) => (
                <a key={item} href="#" className="text-slate-800 font-medium p-2 hover:bg-slate-50 rounded-lg">
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};