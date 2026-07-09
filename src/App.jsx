import React, { useState, useEffect } from 'react';
import AppLayout from './components/AppLayout';
import MealPlanner from './components/MealPlanner';
import ShoppingList from './components/ShoppingList';
import CompactWeeklyView from './components/CompactWeeklyView';
import { initialMealsState, initialMealOrders } from './utils/mockData';
import { INITIAL_CATEGORIES } from './utils/categories';
import { computeWeeklyMacros, computeDailyMacros } from './utils/macroCalculator';

const loadSavedState = (key, defaultState) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultState;
  } catch (e) {
    return defaultState;
  }
};

function App() {
  const [currentView, setCurrentView] = useState('planner'); // 'planner', 'shopping', or 'compact'

  const [meals, setMeals] = useState(() => loadSavedState('mealPlanner_meals', initialMealsState));
  const [mealOrders, setMealOrders] = useState(() => loadSavedState('mealPlanner_mealOrders', initialMealOrders));
  const [categories, setCategories] = useState(() => loadSavedState('mealPlanner_categories', INITIAL_CATEGORIES));
  const [clipboard, setClipboard] = useState(null); // { type: 'food'|'meal', data: any }

  useEffect(() => {
    localStorage.setItem('mealPlanner_meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem('mealPlanner_mealOrders', JSON.stringify(mealOrders));
  }, [mealOrders]);

  useEffect(() => {
    localStorage.setItem('mealPlanner_categories', JSON.stringify(categories));
  }, [categories]);

  // Compute actual macros dynamically based on meals
  const computedWeeklyMacros = computeWeeklyMacros(meals);
  const computedDailyMacros = {};
  Object.keys(meals).forEach(day => {
    computedDailyMacros[day] = computeDailyMacros(meals[day]);
  });

  const addFood = (day, meal, food) => {
    setMeals(prev => {
      const dayMeals = prev[day];
      const mealSlot = dayMeals[meal];
      return {
        ...prev,
        [day]: {
          ...dayMeals,
          [meal]: [...mealSlot, { ...food, id: food.id || crypto.randomUUID() }]
        }
      };
    });
  };

  const updateFood = (day, meal, id, updatedFood) => {
    setMeals(prev => {
      const dayMeals = prev[day];
      const mealSlot = dayMeals[meal];
      return {
        ...prev,
        [day]: {
          ...dayMeals,
          [meal]: mealSlot.map(f => f.id === id ? { ...f, ...updatedFood } : f)
        }
      };
    });
  };

  const removeFood = (day, meal, id) => {
    setMeals(prev => {
      const dayMeals = prev[day];
      const mealSlot = dayMeals[meal];
      return {
        ...prev,
        [day]: {
          ...dayMeals,
          [meal]: mealSlot.filter(f => f.id !== id)
        }
      };
    });
  };

  const reorderFoods = (day, slot, startIndex, endIndex) => {
    setMeals(prev => {
      const dayMeals = prev[day];
      const mealSlot = [...dayMeals[slot]];
      const [removed] = mealSlot.splice(startIndex, 1);
      mealSlot.splice(endIndex, 0, removed);
      return {
        ...prev,
        [day]: {
          ...dayMeals,
          [slot]: mealSlot
        }
      };
    });
  };

  const reorderMeals = (day, startIndex, endIndex) => {
    setMealOrders(prev => {
      const orders = [...prev[day]];
      const [removed] = orders.splice(startIndex, 1);
      orders.splice(endIndex, 0, removed);
      return {
        ...prev,
        [day]: orders
      };
    });
  };

  const swapDays = (dayA, dayB) => {
    setMeals(prev => {
      const newMeals = { ...prev };
      const temp = newMeals[dayA];
      newMeals[dayA] = newMeals[dayB];
      newMeals[dayB] = temp;
      return newMeals;
    });

    setMealOrders(prev => {
      const newOrders = { ...prev };
      const temp = newOrders[dayA];
      newOrders[dayA] = newOrders[dayB];
      newOrders[dayB] = temp;
      return newOrders;
    });
  };

  return (
    <AppLayout currentView={currentView} setCurrentView={setCurrentView}>
      {currentView === 'planner' ? (
        <MealPlanner
          meals={meals}
          computedDailyMacros={computedDailyMacros}
          computedWeeklyMacros={computedWeeklyMacros}
          mealOrders={mealOrders}
          categories={categories}
          setCategories={setCategories}
          clipboard={clipboard}
          setClipboard={setClipboard}
          addFood={addFood}
          updateFood={updateFood}
          removeFood={removeFood}
          reorderFoods={reorderFoods}
          reorderMeals={reorderMeals}
          swapDays={swapDays}
        />
      ) : currentView === 'compact' ? (
        <CompactWeeklyView
          meals={meals}
          mealOrders={mealOrders}
          categories={categories}
        />
      ) : (
        <ShoppingList meals={meals} categories={categories} />
      )}
    </AppLayout>
  );
}

export default App;
