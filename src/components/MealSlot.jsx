import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, Clock, Copy, Clipboard, GripVertical } from 'lucide-react';
import InlineFoodForm from './InlineFoodForm';
import SortableFoodItem from './SortableFoodItem';

export default function MealSlot({ day, slot, foods, addFood, updateFood, removeFood, categories, setCategories, clipboard, setClipboard }) {
  const [isAdding, setIsAdding] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `${day}-${slot}`, data: { type: 'meal', day, slot } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : 'auto',
  };

  const handleAdd = (food) => {
    addFood(day, slot, food);
    setIsAdding(false);
  };

  const handleCopyMeal = () => {
    setClipboard({ type: 'meal', data: foods });
  };

  const handlePasteMeal = () => {
    if (clipboard?.type === 'meal') {
      clipboard.data.forEach(food => {
        addFood(day, slot, { ...food, id: crypto.randomUUID() });
      });
    } else if (clipboard?.type === 'food') {
      addFood(day, slot, { ...clipboard.data, id: crypto.randomUUID() });
    }
  };

  const handleCopyFood = (food) => {
    setClipboard({ type: 'food', data: food });
  };

  return (
    <div ref={setNodeRef} style={style} className={`bg-white rounded-2xl p-5 border ${isDragging ? 'border-[#005F6A] shadow-xl shadow-[#005F6A]/10 scale-[1.02]' : 'border-slate-100 shadow-sm hover:border-slate-200'} transition-all duration-200 group/slot`}>
      <div className="flex justify-between items-center mb-5 group">
        <div className="flex items-center gap-2.5">
          <button className="text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity -ml-2 p-1" {...attributes} {...listeners}>
            <GripVertical className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[#005F6A] shadow-inner">
            <Clock className="w-4 h-4" />
          </div>
          <h4 className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">{slot}</h4>
        </div>
        <div className="no-print flex gap-2 items-center">
          <button onClick={handleCopyMeal} className="text-slate-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-all" title="Copy Meal">
            <Copy className="w-4 h-4" />
          </button>
          <button 
            onClick={handlePasteMeal} 
            className={`p-2 rounded-full transition-all ${clipboard ? 'text-slate-600 hover:text-green-600 hover:bg-green-50' : 'text-slate-300 cursor-not-allowed'}`} 
            title="Paste Here"
            disabled={!clipboard}
          >
            <Clipboard className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="text-[13px] font-semibold text-[#005F6A] bg-[#005F6A]/5 hover:bg-[#005F6A]/15 px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all ml-2 active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add Food
          </button>
        </div>
      </div>
      
      {foods && foods.length > 0 ? (
        <SortableContext items={foods.map(f => f.id)} strategy={verticalListSortingStrategy}>
          <ul className="space-y-2.5">
            {foods.map(food => (
              <SortableFoodItem 
                key={food.id} 
                food={food} 
                categories={categories}
                setCategories={setCategories} 
                day={day}
                slot={slot}
                updateFood={(updatedFood) => updateFood(day, slot, food.id, updatedFood)} 
                removeFood={(id) => removeFood(day, slot, id)}
                copyFood={handleCopyFood}
              />
            ))}
          </ul>
        </SortableContext>
      ) : (
        <div className="py-6 px-4 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50 flex items-center justify-center text-slate-400 text-sm font-medium">
          No food planned for this slot.
        </div>
      )}

      {isAdding && (
        <div className="mt-4">
          <InlineFoodForm 
            onSave={handleAdd}
            onCancel={() => setIsAdding(false)}
            categories={categories}
            setCategories={setCategories}
          />
        </div>
      )}
    </div>
  );
}
