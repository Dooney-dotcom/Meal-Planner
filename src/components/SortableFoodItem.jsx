import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit2, Trash2, Copy } from 'lucide-react';
import { getCategoryColor } from '../utils/categories';
import InlineFoodForm from './InlineFoodForm';

export default function SortableFoodItem({ food, categories, setCategories, day, slot, updateFood, removeFood, copyFood }) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: food.id, 
    data: { type: 'food', food, day, slot },
    disabled: isEditing 
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 100 : 'auto',
  };

  if (isEditing) {
    return (
      <li ref={setNodeRef} style={style} className="block list-none z-[100] relative">
        <InlineFoodForm 
          initialData={food}
          onSave={(updatedData) => {
            updateFood(updatedData);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
          categories={categories}
          setCategories={setCategories}
        />
      </li>
    );
  }

  return (
    <li 
      ref={setNodeRef} 
      style={style} 
      className={`flex flex-col sm:flex-row sm:justify-between sm:items-center p-3.5 rounded-2xl border group transition-all duration-300 ${isDragging ? 'bg-white border-[#005F6A] shadow-2xl shadow-[#005F6A]/20 scale-105 rotate-1' : 'bg-white hover:bg-slate-50/80 border-slate-100/80 shadow-sm hover:shadow-md hover:border-slate-200'}`}
    >
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button className="text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing p-2 -ml-2 min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0" {...attributes} {...listeners}>
          <GripVertical className="w-5 h-5" />
        </button>
        <div className="flex flex-col gap-0.5 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-semibold text-slate-800 text-[15px]">{food.name} <span className="text-slate-400 font-medium ml-1 text-[13px]">({food.quantity})</span></span>
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border shadow-sm ${getCategoryColor(categories, food.category)}`}>
              {food.category}
            </span>
          </div>
          {food.alt && <span className="text-[13px] text-slate-500 font-medium">Alt: <span className="text-slate-400 italic">{food.alt}</span></span>}
          {food.macros && (
            <div className="flex flex-wrap gap-2 text-[10px] font-bold tracking-wider mt-1.5">
              <span className="bg-[#005F6A]/10 text-[#005F6A] px-2 py-1 rounded-lg border border-[#005F6A]/10">{food.macros.calories} <span className="opacity-70 font-medium">kcal</span></span>
              <span className="bg-blue-500/10 text-blue-600 px-2 py-1 rounded-lg border border-blue-500/10">{food.macros.protein}<span className="opacity-70 font-medium">g P</span></span>
              <span className="bg-amber-500/10 text-amber-600 px-2 py-1 rounded-lg border border-amber-500/10">{food.macros.fats}<span className="opacity-70 font-medium">g F</span></span>
              <span className="bg-purple-500/10 text-purple-600 px-2 py-1 rounded-lg border border-purple-500/10">{food.macros.carbs}<span className="opacity-70 font-medium">g C</span></span>
            </div>
          )}
        </div>
      </div>
      <div className="no-print flex gap-2 justify-end sm:opacity-0 sm:group-hover:opacity-100 transition-opacity mt-3 sm:mt-0 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
        <button onClick={() => copyFood(food)} className="text-slate-400 hover:text-blue-600 p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-blue-50 transition-all active:scale-95 flex-shrink-0" title="Copy Food"><Copy className="w-5 h-5 sm:w-4 sm:h-4" /></button>
        <button onClick={() => setIsEditing(true)} className="text-slate-400 hover:text-[#005F6A] p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-[#005F6A]/5 transition-all active:scale-95 flex-shrink-0" title="Edit"><Edit2 className="w-5 h-5 sm:w-4 sm:h-4" /></button>
        <button onClick={() => removeFood(food.id)} className="text-slate-400 hover:text-red-600 p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-red-50 transition-all active:scale-95 flex-shrink-0" title="Delete"><Trash2 className="w-5 h-5 sm:w-4 sm:h-4" /></button>
      </div>
    </li>
  );
}
