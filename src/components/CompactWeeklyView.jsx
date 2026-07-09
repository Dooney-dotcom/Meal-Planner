import React from 'react';
import { DAYS } from '../utils/mockData';

export default function CompactWeeklyView({ meals, mealOrders, categories }) {

  const getCategoryClass = (catName) => {
    const cat = categories?.find(c => c.name === catName);
    return cat ? cat.color : 'border-slate-300 bg-slate-100';
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 p-4 sm:p-6 print-avoid-break">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-6 xl:gap-4">
        {DAYS.map(day => {
          const dayMeals = meals[day] || {};
          const order = mealOrders[day] || [];

          return (
            <div key={day} className="flex flex-col gap-3">
              <h3 className="text-sm font-black text-[#005F6A] uppercase tracking-widest text-center border-b-2 border-slate-100 pb-3 sticky top-0 bg-white/90 backdrop-blur-md z-10">
                {day}
              </h3>

              <div className="flex flex-col gap-3 md:gap-2.5">
                {order.map(slot => {
                  const foods = dayMeals[slot] || [];
                  if (foods.length === 0) return null; // Skip empty slots

                  return (
                    <div key={slot} className="bg-slate-50/40 rounded-2xl p-4 md:p-3 border border-slate-100/60 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-[#005F6A]/20 hover:bg-white group">
                      <h4 className="text-[11px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 md:mb-2 group-hover:text-[#005F6A] transition-colors">{slot}</h4>
                      <ul className="flex flex-col gap-3 md:gap-2">
                        {foods.map(food => (
                          <li key={food.id} className="text-xs text-slate-700 flex items-start gap-2 leading-tight">
                            <span
                              className={`w-2 h-2 md:w-1.5 md:h-1.5 rounded-full mt-1 flex-shrink-0 border shadow-sm ${getCategoryClass(food.category)}`}
                              title={food.category}
                            />
                            <div className="flex flex-col">
                              <span className="font-semibold text-slate-800">{food.name} <span className="font-normal text-slate-500">({food.quantity})</span></span>
                              {food.alt && (
                                <span className="text-[10px] text-slate-400 italic mt-0.5">
                                  or: {food.alt}
                                </span>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
                {order.every(slot => (dayMeals[slot] || []).length === 0) && (
                  <div className="text-center text-sm md:text-xs text-slate-400 italic py-6 md:py-4 bg-slate-50/50 rounded-xl border border-slate-100/50 border-dashed">
                    Empty Day
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
