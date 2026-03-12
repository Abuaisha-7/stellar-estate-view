import React, { useState } from 'react';
import { Property, Agent, Neighborhood } from './types';
import { properties, agents, neighborhoods, testimonials } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertyCard } from './components/PropertyCard';
import { MortgageCalculator } from './components/MortgageCalculator';
import { MarketTrends } from './components/MarketTrends';
import { ComparisonTool } from './components/ComparisonTool';
import { MapView } from './components/MapView';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home,
  Map as MapIcon, 
  ArrowRight, 
  Star, 
  Phone, 
  Mail, 
  Navigation, 
  ShieldCheck, 
  Footprints,
  PlayCircle,
  X,
  ChevronRight,
  TrendingUp,
  LayoutGrid,
  Filter,
  Layers,
  Search,
  CheckCircle2,
  Quote
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { formatCurrency, cn } from './lib/utils';

export default function App() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [comparedProperties, setComparedProperties] = useState<Property[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const handleCompare = (property: Property) => {
    if (comparedProperties.find(p => p.id === property.id)) {
      setComparedProperties(comparedProperties.filter(p => p.id !== property.id));
      toast.info('Removed from comparison');
    } else {
      if (comparedProperties.length >= 3) {
        toast.error('You can compare up to 3 properties');
        return;
      }
      setComparedProperties([...comparedProperties, property]);
      toast.success('Added to comparison');
    }
  };

  const filteredProperties = filterType === 'All' 
    ? properties 
    : properties.filter(p => p.type === filterType);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Toaster position="top-center" richColors />
      <Navbar />
      <Hero onSearch={() => {}} />

      {/* Stats/Quick Access */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Properties Sold', value: '1.2k+', color: 'bg-indigo-600' },
            { label: 'Happy Clients', value: '4.8k+', color: 'bg-emerald-600' },
            { label: 'Expert Agents', value: '45+', color: 'bg-amber-500' },
            { label: 'Awards Won', value: '12', color: 'bg-rose-500' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center group hover:border-indigo-200 transition-colors"
            >
              <div className="text-3xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Listings Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm block mb-2">Featured Listings</span>
            <h2 className="text-4xl font-black mb-4">Exceptional Properties</h2>
            <p className="text-slate-500 leading-relaxed text-lg">Browse our handpicked selection of premium residences, from beachfront villas to downtown luxury penthouses.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2.5 rounded-xl transition-all",
                  viewMode === 'grid' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "text-slate-400 hover:text-slate-600"
                )}
              >
                <LayoutGrid size={20} />
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={cn(
                  "p-2.5 rounded-xl transition-all",
                  viewMode === 'map' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "text-slate-400 hover:text-slate-600"
                )}
              >
                <MapIcon size={20} />
              </button>
            </div>

            <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
              {['All', 'Villa', 'Apartment', 'House'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={cn(
                    "px-5 py-2 rounded-xl text-sm font-bold transition-all",
                    filterType === type ? "bg-slate-100 text-indigo-600" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setIsCompareOpen(true)}
              className="relative bg-white border border-slate-200 px-6 py-3.5 rounded-2xl text-sm font-bold shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-all"
            >
              <Layers size={18} />
              Compare
              {comparedProperties.length > 0 && (
                <span className="w-5 h-5 bg-indigo-600 text-white text-[10px] rounded-full flex items-center justify-center">
                  {comparedProperties.length}
                </span>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  onSelect={setSelectedProperty}
                  onCompare={handleCompare}
                  isCompared={comparedProperties.some(p => p.id === property.id)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="map"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <MapView properties={filteredProperties} onSelect={setSelectedProperty} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Market Trends Section */}
      <section className="bg-slate-100/50 py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <MarketTrends />
            </div>
            <div className="space-y-6">
              <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-200 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                    <TrendingUp size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Investment Insights</h3>
                  <p className="text-indigo-100 mb-8 leading-relaxed">
                    Our AI-driven analytics help you identify properties with the highest growth potential. Get weekly reports delivered to your inbox.
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Real-time price valuations',
                      'Rental yield projections',
                      'Neighborhood growth analysis',
                      'Investment risk scores'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-indigo-100 font-medium">
                        <CheckCircle2 size={18} className="text-white" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="w-full bg-white text-indigo-600 font-bold py-4 rounded-2xl mt-12 hover:bg-indigo-50 transition-all shadow-lg active:scale-95">
                  Subscribe to Reports
                </button>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <Search size={22} />
                  </div>
                  <h4 className="font-bold text-slate-900">Custom Alerts</h4>
                </div>
                <p className="text-slate-500 text-sm mb-6">Never miss a listing. Set up custom alerts for your preferred neighborhood and price range.</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="Your Email" className="flex-1 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                  <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">Set Alert</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm block mb-4">Testimonials</span>
            <h2 className="text-4xl font-black mb-4">What Our Clients Say</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <motion.div 
                key={t.id}
                whileHover={{ y: -5 }}
                className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 relative group"
              >
                <div className="absolute top-8 right-10 text-slate-200 group-hover:text-indigo-100 transition-colors">
                  <Quote size={48} />
                </div>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 text-xl font-medium leading-relaxed mb-8 relative z-10">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} className="w-14 h-14 rounded-2xl object-cover shadow-md" alt={t.name} />
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-slate-500 text-sm font-medium">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhood Guides */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Neighborhood Guides</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Explore the best places to live based on lifestyle, schools, safety, and amenities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {neighborhoods.map((n) => (
              <motion.div 
                key={n.id}
                whileHover={{ y: -5 }}
                className="group relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 cursor-pointer"
              >
                <img src={n.image} alt={n.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-indigo-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter">Top Rated</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(s => <Star key={s} size={12} className="fill-amber-400 text-amber-400" />)}
                    </div>
                  </div>
                  <h3 className="text-4xl font-black mb-3">{n.name}</h3>
                  <p className="text-white/70 mb-8 max-w-md line-clamp-2 text-lg leading-relaxed">{n.description}</p>
                  <div className="grid grid-cols-3 gap-8 border-t border-white/20 pt-8">
                    <div>
                      <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-widest mb-2">
                        <Footprints size={14} /> Walk Score
                      </div>
                      <div className="text-2xl font-black">{n.walkScore}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-widest mb-2">
                        <ShieldCheck size={14} /> Safety
                      </div>
                      <div className="text-2xl font-black">{n.safetyScore}%</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-widest mb-2">
                        <TrendingUp size={14} /> Growth
                      </div>
                      <div className="text-2xl font-black text-emerald-400">+{n.priceGrowth}%</div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-10 right-10 w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <ArrowRight className="text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 text-center md:text-left">
            <div>
              <h2 className="text-4xl font-black mb-4">Meet Our Expert Agents</h2>
              <p className="text-slate-500 text-lg leading-relaxed max-w-md">Dedicated professionals helping you find your perfect home with years of market expertise.</p>
            </div>
            <button className="flex items-center gap-3 font-black text-indigo-600 hover:gap-5 transition-all group bg-slate-50 px-8 py-4 rounded-2xl">
              View All Agents <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-slate-50 rounded-[2.5rem] p-8 flex flex-col sm:flex-row gap-8 items-center group hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all border border-transparent hover:border-slate-100">
                <div className="relative shrink-0">
                  <div className="w-48 h-48 rounded-3xl overflow-hidden ring-12 ring-white shadow-xl">
                    <img src={agent.image} alt={agent.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-[1.25rem] shadow-xl flex items-center gap-1.5 border border-slate-100">
                    <Star size={16} className="fill-amber-400 text-amber-400" />
                    <span className="font-black text-slate-900">{agent.rating}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-8 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2">
                      <CheckCircle2 size={14} /> Verified Professional
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">{agent.name}</h3>
                    <p className="text-slate-500 font-bold mb-4">{agent.role}</p>
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-xs font-bold text-slate-600 shadow-sm border border-slate-100">
                      <LayoutGrid size={14} className="text-indigo-600" /> {agent.listingsCount} Properties Active
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 py-4 rounded-2xl font-black text-slate-700 hover:bg-slate-50 transition-all text-sm active:scale-95 shadow-sm">
                      <Phone size={18} /> Call
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-indigo-600 py-4 rounded-2xl font-black text-white hover:bg-indigo-700 transition-all text-sm active:scale-95 shadow-lg shadow-indigo-100">
                      <Mail size={18} /> Email
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">Ready to Find Your <span className="text-indigo-400">Dream Home</span>?</h2>
            <p className="text-slate-400 text-xl mb-12 leading-relaxed">Join thousands of happy homeowners who found their perfect living space through EstateLuxe.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 active:scale-95">
                Start Exploring
              </button>
              <button className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition-all active:scale-95">
                Contact an Agent
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Property Detail Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-lg"
              onClick={() => setSelectedProperty(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-6xl h-[92vh] rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row"
            >
              <button 
                onClick={() => setSelectedProperty(null)}
                className="absolute top-8 right-8 z-10 p-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:bg-white transition-all active:scale-95"
              >
                <X size={28} />
              </button>

              {/* Media Section */}
              <div className="lg:w-3/5 relative h-1/2 lg:h-full group">
                <img src={selectedProperty.imageUrl} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 flex gap-4">
                  <button className="bg-white/95 backdrop-blur-md px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-white transition-all shadow-2xl active:scale-95">
                    <PlayCircle size={24} className="text-indigo-600" /> Virtual 360° Tour
                  </button>
                  <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-2xl active:scale-95">
                    <Navigation size={24} /> View Location
                  </button>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-2/5 h-1/2 lg:h-full overflow-y-auto p-10 lg:p-14 bg-white">
                <div className="mb-10">
                  <div className="flex items-center gap-2 text-indigo-600 font-black mb-4 uppercase tracking-[0.2em] text-xs">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" /> New Listing • {selectedProperty.location}
                  </div>
                  <h2 className="text-4xl font-black mb-4 leading-tight">{selectedProperty.title}</h2>
                  <div className="text-5xl font-black text-slate-900 mb-8">{formatCurrency(selectedProperty.price)}</div>
                  <p className="text-slate-500 leading-relaxed mb-10 text-lg">{selectedProperty.description}</p>

                  <div className="grid grid-cols-2 gap-6 mb-10">
                    {selectedProperty.features.map(f => (
                      <div key={f} className="flex items-center gap-3 text-slate-800 font-bold bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <CheckCircle2 size={18} className="text-indigo-600 shrink-0" /> <span className="text-sm truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-10">
                  <MortgageCalculator price={selectedProperty.price} />
                  
                  <div className="pt-10 border-t border-slate-100">
                    <h4 className="text-2xl font-black mb-6">Inquire About Listing</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="First Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all" />
                        <input type="text" placeholder="Last Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all" />
                      </div>
                      <input type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all" />
                      <textarea placeholder="I'm interested in viewing this property next week..." rows={4} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none resize-none transition-all" />
                      <button 
                        onClick={() => {
                          toast.success('Your message has been sent to ' + agents[0].name);
                          setSelectedProperty(null);
                        }}
                        className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-2xl hover:bg-slate-800 transition-all active:scale-95 text-lg"
                      >
                        Schedule a Tour
                      </button>
                      <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">
                        By clicking schedule tour, you agree to our terms of service
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ComparisonTool 
        selected={comparedProperties} 
        onRemove={(id) => setComparedProperties(prev => prev.filter(p => p.id !== id))} 
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-slate-950 text-white pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                  <Home size={32} />
                </div>
                <span className="text-3xl font-black tracking-tighter">EstateLuxe</span>
              </div>
              <p className="text-slate-400 max-w-md mb-10 text-lg leading-relaxed">
                Redefining the real estate experience with modern technology, expert advice, and a curated selection of exceptional properties.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map(social => (
                  <button key={social} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-all group active:scale-90">
                    <div className="w-6 h-6 bg-white/40 rounded-[4px] group-hover:bg-white transition-colors" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black text-xl mb-10 tracking-tight">Navigation</h4>
              <ul className="space-y-6 text-slate-400">
                {['Market Trends', 'Find an Agent', 'New Listings', 'Neighborhoods', 'Comparison Tool'].map(link => (
                  <li key={link} className="hover:text-indigo-400 cursor-pointer transition-colors font-medium">{link}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xl mb-10 tracking-tight">Support</h4>
              <ul className="space-y-6 text-slate-400">
                {['Help Center', 'Mortgage Rates', 'Contact Us', 'Privacy Policy', 'Accessibility'].map(link => (
                  <li key={link} className="hover:text-indigo-400 cursor-pointer transition-colors font-medium">{link}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm font-bold uppercase tracking-widest">
            <p>© 2024 EstateLuxe Real Estate. All rights reserved.</p>
            <div className="flex gap-12">
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
              <span className="hover:text-white cursor-pointer transition-colors">Cookie Policy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}