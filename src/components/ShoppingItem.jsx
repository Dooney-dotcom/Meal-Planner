import React from 'react';
import { Check } from 'lucide-react';

function ShoppingItem({ item, isChecked, onToggle }) {
  return (
    <div 
      onClick={onToggle}
      className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-300 group ${
        isChecked 
          ? 'bg-slate-50 border-slate-200 opacity-60 scale-[0.98]' 
          : 'bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-[#005F6A]/30 hover:scale-[1.01]'
      }`}
    >
      <div className={`no-print shrink-0 w-6 h-6 rounded-lg flex items-center justify-center border transition-all duration-300 ${
        isChecked ? 'bg-[#005F6A] border-[#005F6A] text-white shadow-sm' : 'border-slate-300 bg-white group-hover:border-[#005F6A]/50'
      }`}>
        {isChecked && <Check className="w-3.5 h-3.5" />}
      </div>
      
      <div className="flex-1 min-w-0 relative">
        <h4 className={`text-sm font-bold truncate transition-colors duration-300 relative inline-block ${isChecked ? 'text-slate-400' : 'text-slate-800'}`}>
          {item.name}
          <div className={`absolute left-0 top-1/2 h-0.5 bg-slate-400 transition-all duration-300 ease-out ${isChecked ? 'w-full' : 'w-0'}`}></div>
        </h4>
        {item.alts && (
          <p className="text-xs text-slate-500 italic mt-0.5 truncate">Alt: {item.alts}</p>
        )}
      </div>

      <div className="shrink-0 text-right">
        <span className={`inline-block px-2 py-1 rounded text-xs font-bold tracking-wide border ${
          isChecked ? 'bg-slate-100 text-slate-500 border-transparent' : 'bg-slate-50 text-slate-700 border-slate-200'
        }`}>
          {item.quantity}
        </span>
      </div>
    </div>
  );
}

export default ShoppingItem;
