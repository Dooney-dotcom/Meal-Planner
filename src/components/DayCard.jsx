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
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden print-avoid-break mb-8 transition-all duration-300 hover:shadow-xl hover:shadow-[#005F6A]/5 hover:border-slate-300">
      <div 
        className="bg-gradient-to-r from-slate-50 via-white to-slate-50 px-4 py-4 md:px-7 md:py-5 border-b border-slate-100/80 flex justify-between items-center cursor-pointer hover:bg-slate-50/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl font-extrabold text-[#005F6A] tracking-tight flex items-center gap-2">
          {day}
        </h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowSwapMenu(!showSwapMenu); }}
              className={`text-slate-400 hover:text-[#005F6A] transition-colors p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full active:scale-95 ${showSwapMenu ? 'bg-[#005F6A]/10 text-[#005F6A]' : 'hover:bg-[#005F6A]/10'}`}
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
            className="text-slate-400 hover:text-[#005F6A] transition-colors p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-[#005F6A]/10 active:scale-95"
            aria-label={isExpanded ? "Collapse day" : "Expand day"}
          >
            {isExpanded ? <ChevronUp className="w-5 h-5 md:w-6 md:h-6" /> : <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 md:p-7 space-y-6 md:space-y-7">
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
          <div className="pt-8 border-t border-slate-100 no-print">
            <div className="flex items-center gap-3 mb-5">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Daily Actual Macros
              </h4>
              <div className="h-px bg-gradient-to-r from-slate-200 to-transparent flex-1"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-slate-50 to-white px-5 py-4 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#005F6A]/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <span className="block text-[10px] font-bold text-[#005F6A] uppercase tracking-widest mb-1.5 relative z-10">Calories</span>
                <span className="text-2xl font-black text-slate-800 tracking-tight relative z-10">{macros.calories || 0} <span className="text-sm font-semibold text-slate-400">kcal</span></span>
              </div>
              <div className="bg-gradient-to-br from-blue-50/80 to-white px-5 py-4 rounded-2xl border border-blue-100/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <span className="block text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1.5 relative z-10">Protein</span>
                <span className="text-2xl font-black text-slate-800 tracking-tight relative z-10">{macros.protein || 0} <span className="text-sm font-semibold text-slate-400">g</span></span>
              </div>
              <div className="bg-gradient-to-br from-amber-50/80 to-white px-5 py-4 rounded-2xl border border-amber-100/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <span className="block text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1.5 relative z-10">Fats</span>
                <span className="text-2xl font-black text-slate-800 tracking-tight relative z-10">{macros.fats || 0} <span className="text-sm font-semibold text-slate-400">g</span></span>
              </div>
              <div className="bg-gradient-to-br from-purple-50/80 to-white px-5 py-4 rounded-2xl border border-purple-100/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <span className="block text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-1.5 relative z-10">Carbs</span>
                <span className="text-2xl font-black text-slate-800 tracking-tight relative z-10">{macros.carbs || 0} <span className="text-sm font-semibold text-slate-400">g</span></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DayCard;
