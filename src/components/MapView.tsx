import React, { useState } from 'react';
import { MapPin, Info, ArrowRight, Star } from 'lucide-react';
import { Property } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../lib/utils';

export const MapView = ({ properties, onSelect }: { properties: Property[], onSelect: (p: Property) => void }) => {
  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);

  return (
    <div className="bg-slate-200 rounded-3xl h-[600px] relative overflow-hidden group">
      {/* Map Background Simulation */}
      <div className="absolute inset-0 bg-[#e5e7eb] opacity-80" 
           style={{ backgroundImage: 'radial-gradient(#94a3b8 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      
      {/* Property Markers */}
      {properties.map((p, idx) => (
        <motion.button
          key={p.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          onMouseEnter={() => setHoveredProperty(p)}
          onMouseLeave={() => setHoveredProperty(null)}
          onClick={() => onSelect(p)}
          className="absolute z-10 transition-transform hover:scale-125"
          style={{ 
            left: `${30 + (idx * 15)}%`, 
            top: `${40 + (idx * 8)}%` 
          }}
        >
          <div className="relative group/marker">
            <div className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg flex items-center gap-1 group-hover/marker:bg-indigo-700">
              <MapPin size={12} />
              {formatCurrency(p.price / 1000)}k
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-indigo-600" />
          </div>
        </motion.button>
      ))}

      {/* Property Preview Popup */}
      <AnimatePresence>
        {hoveredProperty && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            className="absolute bottom-10 left-1/2 z-20 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-none border border-slate-100"
          >
            <img src={hoveredProperty.imageUrl} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h4 className="font-bold text-slate-900 truncate">{hoveredProperty.title}</h4>
              <p className="text-xs text-slate-500 mb-2">{hoveredProperty.location}</p>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
                <span className="font-bold text-indigo-600">{formatCurrency(hoveredProperty.price)}</span>
                <div className="flex gap-2 text-[10px] text-slate-400 font-bold uppercase">
                  <span>{hoveredProperty.beds} Bed</span>
                  <span>{hoveredProperty.baths} Bath</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map UI Overlay */}
      <div className="absolute top-6 left-6 flex flex-col gap-2">
        <div className="bg-white/90 backdrop-blur-md p-1 rounded-xl shadow-lg border border-white flex">
          <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-md">Map View</button>
          <button className="px-4 py-2 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors">Satellite</button>
        </div>
      </div>

      <div className="absolute top-6 right-6 flex flex-col gap-2">
        <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-center text-slate-700 hover:bg-white transition-all">+</button>
        <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-center text-slate-700 hover:bg-white transition-all">-</button>
      </div>

      <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white max-w-[240px]">
        <div className="flex items-center gap-2 mb-2">
          <Info size={16} className="text-indigo-600" />
          <span className="text-xs font-bold text-slate-900">Area Insights</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
          Properties in this area have seen a 12% increase in value over the last 12 months.
        </p>
        <button className="w-full bg-slate-100 hover:bg-slate-200 py-2 rounded-lg text-[10px] font-bold text-slate-700 flex items-center justify-center gap-1 transition-all">
          View Detail Report <ArrowRight size={10} />
        </button>
      </div>
    </div>
  );
};