import React from 'react';
import { Check } from 'lucide-react';

function ShoppingItem({ item, isChecked, onToggle }) {
  return (
    <div 
      onClick={onToggle}
      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
        isChecked 
          ? 'bg-slate-50 border-slate-200 opacity-60' 
          : 'bg-white border-slate-200 shadow-sm hover:border-[#005F6A]'
      }`}
    >
      <div className={`no-print shrink-0 w-5 h-5 rounded flex items-center justify-center border transition-colors ${
        isChecked ? 'bg-[#005F6A] border-[#005F6A] text-white' : 'border-slate-300 bg-white'
      }`}>
        {isChecked && <Check className="w-3.5 h-3.5" />}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-semibold truncate transition-all ${isChecked ? 'line-through text-slate-500' : 'text-slate-800'}`}>
          {item.name}
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
