import React, { useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ChevronDown, ChevronUp, ArrowRightLeft } from 'lucide-react';
import MealSlot from './MealSlot';
import { DAYS } from '../utils/mockData';

function DayCard({ day, meals, macros, mealOrders, categories, setCategories, clipboard, setClipboard, addFood, updateFood, removeFood, swapDays }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showSwapMenu, setShowSwapMenu] = useState(false);

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
          
          {/* Actual Computed Macros */}
          <div className="pt-7 border-t border-slate-100 no-print">
            <h4 className="text-[11px] font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2">
              Daily Actual Macros
              <div className="h-px bg-slate-100 flex-1"></div>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-100">
                <span className="block text-[10px] font-bold text-[#005F6A] uppercase tracking-wider mb-1">Calories</span>
                <span className="text-xl font-extrabold text-slate-700">{macros.calories || 0} <span className="text-sm font-medium text-slate-400">kcal</span></span>
              </div>
              <div className="bg-blue-50/50 px-4 py-3 rounded-xl border border-blue-100/50">
                <span className="block text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Protein</span>
                <span className="text-xl font-extrabold text-slate-700">{macros.protein || 0} <span className="text-sm font-medium text-slate-400">g</span></span>
              </div>
              <div className="bg-amber-50/50 px-4 py-3 rounded-xl border border-amber-100/50">
                <span className="block text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">Fats</span>
                <span className="text-xl font-extrabold text-slate-700">{macros.fats || 0} <span className="text-sm font-medium text-slate-400">g</span></span>
              </div>
              <div className="bg-purple-50/50 px-4 py-3 rounded-xl border border-purple-100/50">
                <span className="block text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-1">Carbs</span>
                <span className="text-xl font-extrabold text-slate-700">{macros.carbs || 0} <span className="text-sm font-medium text-slate-400">g</span></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DayCard;
