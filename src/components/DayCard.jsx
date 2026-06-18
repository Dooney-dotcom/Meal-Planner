import React, { useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ChevronDown, ChevronUp, ArrowRightLeft } from 'lucide-react';
import MealSlot from './MealSlot';
import { DAYS } from '../utils/mockData';

function DayCard({ day, meals, macros, mealOrders, categories, setCategories, clipboard, setClipboard, addFood, updateFood, removeFood, updateMacros, swapDays }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showSwapMenu, setShowSwapMenu] = useState(false);
  
  const handleMacroChange = (e) => {
    updateMacros(day, { ...macros, [e.target.name]: e.target.value });
  };

  const currentMealSlots = mealOrders[day] || [];

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 overflow-hidden print-avoid-break mb-8 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      <div 
        className="bg-gradient-to-r from-slate-50 to-white px-7 py-5 border-b border-slate-100 flex justify-between items-center cursor-pointer hover:bg-slate-50/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl font-extrabold text-[#005F6A] tracking-tight flex items-center gap-2">
          {day}
        </h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowSwapMenu(!showSwapMenu); }}
              className={`text-slate-400 hover:text-[#005F6A] transition-colors p-1.5 rounded-full ${showSwapMenu ? 'bg-[#005F6A]/10 text-[#005F6A]' : 'hover:bg-[#005F6A]/10'}`}
              aria-label="Swap day"
              title="Swap day"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>
            
            {showSwapMenu && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
              >
                <div className="px-3 py-2 border-b border-slate-50 bg-slate-50/50">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Swap with...</span>
                </div>
                <div className="py-1 max-h-48 overflow-y-auto">
                  {DAYS.filter(d => d !== day).map(targetDay => (
                    <button
                      key={targetDay}
                      onClick={() => {
                        swapDays(day, targetDay);
                        setShowSwapMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-[#005F6A]/5 hover:text-[#005F6A] transition-colors"
                    >
                      {targetDay}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button 
            className="text-slate-400 hover:text-[#005F6A] transition-colors p-1 rounded-full hover:bg-[#005F6A]/10"
            aria-label={isExpanded ? "Collapse day" : "Expand day"}
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-7 space-y-7">
          <SortableContext items={currentMealSlots.map(slot => `${day}-${slot}`)} strategy={verticalListSortingStrategy}>
            <div className="space-y-5">
              {currentMealSlots.map(slot => (
                <MealSlot 
                  key={`${day}-${slot}`} 
                  day={day}
                  slot={slot} 
                  foods={meals[slot]} 
                  categories={categories}
                  setCategories={setCategories}
                  clipboard={clipboard}
                  setClipboard={setClipboard}
                  addFood={addFood}
                  updateFood={updateFood}
                  removeFood={removeFood}
                />
              ))}
            </div>
          </SortableContext>
          
          {/* Macros Input */}
          <div className="pt-7 border-t border-slate-100 no-print">
            <h4 className="text-[11px] font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2">
              Daily Target Macros
              <div className="h-px bg-slate-100 flex-1"></div>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="group">
                <label className="block text-xs font-bold text-slate-500 mb-1.5 ml-1 transition-colors group-focus-within:text-[#005F6A]">Calories</label>
                <input type="number" name="calories" value={macros.calories} onChange={handleMacroChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#005F6A]/20 focus:border-[#005F6A] text-slate-800 bg-slate-50/50 focus:bg-white transition-all shadow-sm" placeholder="kcal" />
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-slate-500 mb-1.5 ml-1 transition-colors group-focus-within:text-blue-500">Protein</label>
                <input type="number" name="protein" value={macros.protein} onChange={handleMacroChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 bg-slate-50/50 focus:bg-white transition-all shadow-sm" placeholder="g" />
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-slate-500 mb-1.5 ml-1 transition-colors group-focus-within:text-amber-500">Fats</label>
                <input type="number" name="fats" value={macros.fats} onChange={handleMacroChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-800 bg-slate-50/50 focus:bg-white transition-all shadow-sm" placeholder="g" />
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-slate-500 mb-1.5 ml-1 transition-colors group-focus-within:text-purple-500">Carbs</label>
                <input type="number" name="carbs" value={macros.carbs} onChange={handleMacroChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-800 bg-slate-50/50 focus:bg-white transition-all shadow-sm" placeholder="g" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DayCard;
