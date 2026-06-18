import React from 'react';
import { DAYS } from '../utils/mockData';

export default function CompactWeeklyView({ meals, mealOrders, categories }) {

  const getCategoryClass = (catName) => {
    const cat = categories?.find(c => c.name === catName);
    return cat ? cat.color : 'border-slate-300 bg-slate-100';
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 p-4 sm:p-6 overflow-x-auto print-avoid-break">
      <div className="min-w-[900px] grid grid-cols-7 gap-3 xl:gap-4">
        {DAYS.map(day => {
          const dayMeals = meals[day] || {};
          const order = mealOrders[day] || [];

          return (
            <div key={day} className="flex flex-col gap-3">
              <h3 className="text-xs xl:text-sm font-extrabold text-[#005F6A] uppercase tracking-wider text-center border-b border-slate-100 pb-2 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
                {day}
              </h3>

              <div className="flex flex-col gap-2.5">
                {order.map(slot => {
                  const foods = dayMeals[slot] || [];
                  if (foods.length === 0) return null; // Skip empty slots

                  return (
                    <div key={slot} className="bg-slate-50/50 rounded-xl p-2.5 border border-slate-100/50 shadow-sm transition-shadow hover:shadow">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">{slot}</h4>
                      <ul className="flex flex-col gap-2">
                        {foods.map(food => (
                          <li key={food.id} className="text-[11px] xl:text-xs text-slate-700 flex items-start gap-1.5 leading-tight">
                            <span
                              className={`w-2 h-2 rounded-full mt-0.5 flex-shrink-0 border shadow-sm ${getCategoryClass(food.category)}`}
                              title={food.category}
                            />
                            <div className="flex flex-col">
                              <span className="font-semibold text-slate-800">{food.name} <span className="font-normal text-slate-500">({food.quantity})</span></span>
                              {food.alt && (
                                <span className="text-[9px] xl:text-[10px] text-slate-400 italic mt-0.5">
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
                  <div className="text-center text-xs text-slate-400 italic py-4 bg-slate-50/50 rounded-xl border border-slate-100/50 border-dashed">
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
