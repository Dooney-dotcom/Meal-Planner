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
      className={`flex justify-between items-center bg-white hover:bg-slate-50 p-3.5 rounded-xl border group transition-all duration-200 ${isDragging ? 'border-[#005F6A] shadow-lg shadow-[#005F6A]/10 scale-[1.02]' : 'border-slate-100 shadow-sm hover:shadow hover:border-slate-200'}`}
    >
      <div className="flex items-center gap-3">
        <button className="text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing p-1 -ml-1 flex-shrink-0" {...attributes} {...listeners}>
          <GripVertical className="w-4 h-4" />
        </button>
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-semibold text-slate-800 text-[15px]">{food.name} <span className="text-slate-400 font-medium ml-1 text-[13px]">({food.quantity})</span></span>
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border shadow-sm ${getCategoryColor(categories, food.category)}`}>
              {food.category}
            </span>
          </div>
          {food.alt && <span className="text-[13px] text-slate-500 font-medium">Alt: <span className="text-slate-400 italic">{food.alt}</span></span>}
          {food.macros && (
            <div className="flex gap-3 text-[11px] font-semibold tracking-wide mt-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100/50 w-fit">
              <span className="text-[#005F6A]">{food.macros.calories} <span className="font-medium text-slate-400">kcal</span></span>
              <span className="text-blue-500">{food.macros.protein}<span className="font-medium text-slate-400">g P</span></span>
              <span className="text-amber-500">{food.macros.fats}<span className="font-medium text-slate-400">g F</span></span>
              <span className="text-purple-500">{food.macros.carbs}<span className="font-medium text-slate-400">g C</span></span>
            </div>
          )}
        </div>
      </div>
      <div className="no-print flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => copyFood(food)} className="text-slate-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors flex-shrink-0" title="Copy Food"><Copy className="w-4 h-4" /></button>
        <button onClick={() => setIsEditing(true)} className="text-slate-400 hover:text-[#005F6A] p-2 rounded-full hover:bg-[#005F6A]/5 transition-colors flex-shrink-0" title="Edit"><Edit2 className="w-4 h-4" /></button>
        <button onClick={() => removeFood(food.id)} className="text-slate-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors flex-shrink-0" title="Delete"><Trash2 className="w-4 h-4" /></button>
      </div>
    </li>
  );
}
