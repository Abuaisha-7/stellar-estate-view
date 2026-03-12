import React, { useState, useMemo } from 'react';
import { Calculator, TrendingUp, Info } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export const MortgageCalculator = ({ price }: { price: number }) => {
  const [downPayment, setDownPayment] = useState(price * 0.2);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const monthlyPayment = useMemo(() => {
    const principal = price - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    if (monthlyRate === 0) return principal / numberOfPayments;
    
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    );
  }, [price, downPayment, interestRate, loanTerm]);

  return (
    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
          <Calculator size={22} />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Mortgage Calculator</h3>
          <p className="text-sm text-slate-500">Estimate your monthly payments</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-slate-700">Down Payment</label>
            <span className="text-sm font-bold text-indigo-600">{formatCurrency(downPayment)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={price}
            step={1000}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between mt-1 text-[10px] text-slate-400">
            <span>0%</span>
            <span>20% ({formatCurrency(price * 0.2)})</span>
            <span>100%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Loan Term (Years)</label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value={15}>15 Years</option>
              <option value={20}>20 Years</option>
              <option value={30}>30 Years</option>
            </select>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm">
          <div className="text-center">
            <span className="text-sm text-slate-500 uppercase font-bold tracking-wider">Estimated Monthly Payment</span>
            <div className="text-4xl font-bold text-slate-900 mt-1">{formatCurrency(monthlyPayment)}</div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <Info size={12} /> Includes P&I
            </div>
            <div className="text-xs text-indigo-600 font-medium text-right hover:underline cursor-pointer">
              Get Pre-Approved
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/50 p-3 rounded-xl">
          <TrendingUp size={14} className="text-green-500" />
          <span>Current market rates are at a 6-month low. Lock in your rate today!</span>
        </div>
      </div>
    </div>
  );
};