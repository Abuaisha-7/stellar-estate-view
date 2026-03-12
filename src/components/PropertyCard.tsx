import React from 'react';
import { Bed, Bath, Square, MapPin, Heart, Share2, Eye } from 'lucide-react';
import { Property } from '../types';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface PropertyCardProps {
  property: Property;
  onSelect: (p: Property) => void;
  onCompare: (p: Property) => void;
  isCompared: boolean;
}

export const PropertyCard = ({ property, onSelect, onCompare, isCompared }: PropertyCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm group"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase">
            {property.status}
          </span>
          <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full uppercase">
            {property.type}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-700 hover:text-red-500 transition-colors shadow-lg">
            <Heart size={18} />
          </button>
          <button 
            onClick={() => onCompare(property)}
            className={cn(
              "w-9 h-9 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors shadow-lg",
              isCompared ? "bg-indigo-600 text-white" : "bg-white/90 text-slate-700"
            )}
          >
            <Share2 size={18} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-white font-bold text-2xl">{formatCurrency(property.price)}</p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-lg text-slate-900 truncate pr-4">{property.title}</h3>
            <div className="flex items-center text-slate-500 text-sm mt-1">
              <MapPin size={14} className="mr-1" />
              {property.location}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100 my-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-slate-900 font-semibold">
              <Bed size={16} className="text-indigo-600" />
              {property.beds}
            </div>
            <span className="text-xs text-slate-500">Beds</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-slate-900 font-semibold">
              <Bath size={16} className="text-indigo-600" />
              {property.baths}
            </div>
            <span className="text-xs text-slate-500">Baths</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-slate-900 font-semibold">
              <Square size={16} className="text-indigo-600" />
              {property.sqft}
            </div>
            <span className="text-xs text-slate-500">Sq Ft</span>
          </div>
        </div>

        <button 
          onClick={() => onSelect(property)}
          className="w-full bg-slate-50 hover:bg-indigo-600 hover:text-white text-slate-900 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
        >
          View Details
          <Eye size={18} className="transition-transform group-hover/btn:scale-110" />
        </button>
      </div>
    </motion.div>
  );
};