import React from 'react';
import { DAYS } from '../utils/mockData';
import { Beef, Droplets, Wheat } from 'lucide-react';

function WeeklySummary({ macros }) {
  const totals = DAYS.reduce((acc, day) => {
    acc.calories += Number(macros[day].calories) || 0;
    acc.protein += Number(macros[day].protein) || 0;
    acc.fats += Number(macros[day].fats) || 0;
    acc.carbs += Number(macros[day].carbs) || 0;
    return acc;
  }, { calories: 0, protein: 0, fats: 0, carbs: 0 });

  const totalGrams = totals.protein + totals.fats + totals.carbs;
  const pPct = totalGrams ? (totals.protein / totalGrams) * 100 : 0;
  const fPct = totalGrams ? (totals.fats / totalGrams) * 100 : 0;
  const cPct = totalGrams ? (totals.carbs / totalGrams) * 100 : 0;

  // SVG parameters
  const radius = 15.9155;
  const circumference = 100; // 2 * PI * 15.9155
  
  const pOffset = 25;
  const fOffset = 25 - pPct;
  const cOffset = 25 - pPct - fPct;

  // Professional Colors
  const COLOR_PROTEIN = '#005F6A'; // Petrol Green
  const COLOR_FATS = '#64748B';    // Slate
  const COLOR_CARBS = '#0EA5E9';   // Sky Blue

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 print-avoid-break">
      <h2 className="text-xl font-bold text-[#005F6A] mb-8 tracking-tight text-center border-b border-slate-100 pb-4">Weekly Macros</h2>
      
      <div className="relative w-48 h-48 mx-auto mb-10">
        <svg viewBox="0 0 42 42" className="w-full h-full transform -rotate-90">
          <circle cx="21" cy="21" r={radius} fill="transparent" stroke="#f1f5f9" strokeWidth="6"></circle>
          
          {pPct > 0 && (
            <circle cx="21" cy="21" r={radius} fill="transparent" stroke={COLOR_PROTEIN} strokeWidth="6" 
              strokeDasharray={`${pPct} ${circumference - pPct}`} strokeDashoffset={pOffset} 
              className="transition-all duration-1000 ease-out" />
          )}
          
          {fPct > 0 && (
            <circle cx="21" cy="21" r={radius} fill="transparent" stroke={COLOR_FATS} strokeWidth="6" 
              strokeDasharray={`${fPct} ${circumference - fPct}`} strokeDashoffset={fOffset} 
              className="transition-all duration-1000 ease-out" />
          )}

          {cPct > 0 && (
            <circle cx="21" cy="21" r={radius} fill="transparent" stroke={COLOR_CARBS} strokeWidth="6" 
              strokeDasharray={`${cPct} ${circumference - cPct}`} strokeDashoffset={cOffset} 
              className="transition-all duration-1000 ease-out" />
          )}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-slate-800 tracking-tighter">{totals.calories}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Calories</span>
        </div>
      </div>

      <div className="space-y-4">
        <LegendRow 
          label="Protein" 
          value={totals.protein} 
          percent={pPct} 
          color={COLOR_PROTEIN} 
          icon={<Beef className="w-4 h-4 text-white" strokeWidth={2} />} 
        />
        <LegendRow 
          label="Fats" 
          value={totals.fats} 
          percent={fPct} 
          color={COLOR_FATS} 
          icon={<Droplets className="w-4 h-4 text-white" strokeWidth={2} />} 
        />
        <LegendRow 
          label="Carbohydrates" 
          value={totals.carbs} 
          percent={cPct} 
          color={COLOR_CARBS} 
          icon={<Wheat className="w-4 h-4 text-white" strokeWidth={2} />} 
        />
      </div>
    </div>
  );
}

function LegendRow({ label, value, percent, color, icon }) {
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded-md" style={{ backgroundColor: color }}>
          {icon}
        </div>
        <span className="text-sm font-semibold text-slate-700">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-500 font-medium w-10 text-right">{percent.toFixed(0)}%</span>
        <span className="text-sm font-bold text-slate-800 w-12 text-right">{value}g</span>
      </div>
    </div>
  );
}

export default WeeklySummary;
