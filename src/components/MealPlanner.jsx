import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import DayCard from './DayCard';
import WeeklySummary from './WeeklySummary';
import { DAYS } from '../utils/mockData';

function MealPlanner({ meals, computedDailyMacros, computedWeeklyMacros, mealOrders, categories, setCategories, clipboard, setClipboard, addFood, updateFood, removeFood, reorderFoods, reorderMeals, swapDays }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    if (activeType === 'food' && overType === 'food') {
      const { day, slot } = active.data.current;
      const overDay = over.data.current?.day;
      const overSlot = over.data.current?.slot;

      // We only support reordering within the same meal slot
      if (day === overDay && slot === overSlot) {
        const items = meals[day][slot];
        const oldIndex = items.findIndex(f => f.id === active.id);
        const newIndex = items.findIndex(f => f.id === over.id);
        reorderFoods(day, slot, oldIndex, newIndex);
      }
    } else if (activeType === 'meal' && overType === 'meal') {
      const { day } = active.data.current;
      const overDay = over.data.current?.day;

      if (day === overDay) {
        const oldIndex = mealOrders[day].indexOf(active.data.current.slot);
        const newIndex = mealOrders[day].indexOf(over.data.current.slot);
        reorderMeals(day, oldIndex, newIndex);
      }
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          {DAYS.map(day => (
            <DayCard
              key={day}
              day={day}
              meals={meals[day]}
              macros={computedDailyMacros[day] || {calories:0, protein:0, carbs:0, fats:0}}
              mealOrders={mealOrders}
              categories={categories}
              setCategories={setCategories}
              clipboard={clipboard}
              setClipboard={setClipboard}
              addFood={addFood}
              updateFood={updateFood}
              removeFood={removeFood}
              swapDays={swapDays}
            />
          ))}
        </div>
        <div className="w-full lg:w-80">
          <div className="sticky top-24">
            <WeeklySummary macros={computedWeeklyMacros} />
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default MealPlanner;
