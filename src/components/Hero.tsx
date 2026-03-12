import React, { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, DollarSign, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero = ({ onSearch }: { onSearch: (params: any) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <img
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/d80cc09c-1209-4318-a6fa-88e761c0524c/luxury-villa-1-df902063-1773299727541.webp"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      <div className="relative z-10 w-full max-w-4xl px-4 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
        >
          Find Your Next <br />
          <span className="text-indigo-400">Exceptional</span> Living
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
        >
          Discover luxury properties, neighborhood guides, and expert real estate advice all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-xl p-2 rounded-2xl border border-white/20 shadow-2xl flex flex-col md:flex-row gap-2"
        >
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-xl">
            <Search className="text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Address, Neighborhood, or ZIP"
              className="w-full bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="hidden lg:flex items-center gap-3 px-4 py-3 bg-white rounded-xl min-w-[150px]">
            <Home className="text-slate-400" size={18} />
            <select className="w-full bg-transparent border-none focus:ring-0 text-slate-600 text-sm appearance-none">
              <option>Property Type</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Villa</option>
            </select>
          </div>

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
            <Search size={18} />
            Search
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-6"
        >
          {[
            { label: 'Popular', value: 'Miami, FL' },
            { label: 'Trending', value: 'Austin, TX' },
            { label: 'Luxury', value: 'Laguna Beach, CA' },
          ].map((tag) => (
            <button key={tag.value} className="text-sm text-white/70 hover:text-white transition-colors">
              <span className="font-semibold">{tag.label}:</span> {tag.value}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};