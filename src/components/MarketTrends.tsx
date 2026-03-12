import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { marketTrendsData } from '../data/mockData';
import { formatCurrency } from '../lib/utils';

export const MarketTrends = () => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full uppercase flex items-center gap-1">
              <ArrowUpRight size={12} /> Hot Market
            </span>
            <h2 className="text-3xl font-bold text-slate-900">Market Trends</h2>
          </div>
          <p className="text-slate-500">Median sales price over the last 6 months in Coastal Heights</p>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Median Price</p>
            <p className="text-2xl font-bold text-slate-900">$890,000</p>
            <p className="text-sm text-green-600 font-medium flex items-center gap-1">
              <ArrowUpRight size={14} /> +12.4% <span className="text-slate-400 font-normal">vs last year</span>
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Avg. Days on Market</p>
            <p className="text-2xl font-bold text-slate-900">18 Days</p>
            <p className="text-sm text-red-600 font-medium flex items-center gap-1">
              <ArrowDownRight size={14} /> -4 days <span className="text-slate-400 font-normal">vs last month</span>
            </p>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={marketTrendsData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              formatter={(value: number) => [formatCurrency(value), 'Median Price']}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#4f46e5" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 flex items-center justify-between bg-slate-50 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <Info className="text-indigo-600" size={20} />
          <p className="text-sm text-slate-600">Inventory is currently low. Demand for luxury condos is increasing.</p>
        </div>
        <button className="text-indigo-600 font-semibold text-sm hover:underline">
          Download Full Report
        </button>
      </div>
    </div>
  );
};