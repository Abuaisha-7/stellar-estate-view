import React from 'react';
import { Property } from '../types';
import { formatCurrency, cn } from '../lib/utils';
import { X, Check, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ComparisonTool = ({ selected, onRemove, isOpen, onClose }: { selected: Property[], onRemove: (id: string) => void, isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Property Comparison</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {selected.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Minus size={32} />
              </div>
              <p className="text-slate-500">No properties selected for comparison. Add properties from the listings page.</p>
            </div>
          ) : (
            <div className="grid grid-cols-[150px_repeat(auto-fit,minmax(200px,1fr))] gap-4">
              <div className="space-y-8 pt-48">
                {['Price', 'Type', 'Beds', 'Baths', 'Sq Ft', 'Year Built', 'Pool', 'Smart Home'].map(feat => (
                  <div key={feat} className="text-sm font-bold text-slate-400 uppercase tracking-wider h-8 flex items-center">
                    {feat}
                  </div>
                ))}
              </div>

              {selected.map(property => (
                <div key={property.id} className="min-w-[200px]">
                  <div className="relative mb-6">
                    <img src={property.imageUrl} className="w-full h-40 object-cover rounded-2xl mb-4" />
                    <button 
                      onClick={() => onRemove(property.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                    >
                      <X size={14} />
                    </button>
                    <h3 className="font-bold text-slate-900 truncate">{property.title}</h3>
                  </div>

                  <div className="space-y-8">
                    <div className="h-8 flex items-center font-bold text-indigo-600">{formatCurrency(property.price)}</div>
                    <div className="h-8 flex items-center text-slate-600">{property.type}</div>
                    <div className="h-8 flex items-center text-slate-600">{property.beds}</div>
                    <div className="h-8 flex items-center text-slate-600">{property.baths}</div>
                    <div className="h-8 flex items-center text-slate-600">{property.sqft}</div>
                    <div className="h-8 flex items-center text-slate-600">{property.yearBuilt}</div>
                    <div className="h-8 flex items-center">
                      {property.features.includes('Infinity Pool') || property.features.includes('Pool') ? <Check className="text-green-500" /> : <X className="text-slate-300" />}
                    </div>
                    <div className="h-8 flex items-center">
                      {property.features.includes('Smart Home System') ? <Check className="text-green-500" /> : <X className="text-slate-300" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};