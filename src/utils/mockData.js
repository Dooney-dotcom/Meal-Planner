const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_SLOTS = ['Breakfast', 'Snack 1', 'Lunch', 'Snack 2', 'Dinner'];

export const initialMealOrders = (() => {
  const orders = {};
  DAYS.forEach(day => {
    orders[day] = [...MEAL_SLOTS];
  });
  return orders;
})();

export const generateEmptyMeals = () => {
  const meals = {};
  DAYS.forEach(day => {
    meals[day] = {};
    MEAL_SLOTS.forEach(slot => {
      meals[day][slot] = [];
    });
  });
  return meals;
};

export const generateEmptyMacros = () => {
  const macros = {};
  DAYS.forEach(day => {
    macros[day] = { calories: '', protein: '', fats: '', carbs: '' };
  });
  return macros;
};

const mockMeals = generateEmptyMeals();
mockMeals['Monday']['Breakfast'] = [
  { id: '1', name: 'Oats', quantity: '50g', alt: 'Quinoa', category: 'Carboidrati' },
  { id: '2', name: 'Almond Milk', quantity: '200ml', alt: 'Oat Milk', category: 'Altro' }
];
mockMeals['Monday']['Lunch'] = [
  { id: '3', name: 'Chicken Breast', quantity: '150g', alt: 'Tofu', category: 'Carne' },
  { id: '4', name: 'Rice', quantity: '100g', alt: 'Sweet Potato', category: 'Carboidrati' }
];
mockMeals['Tuesday']['Dinner'] = [
  { id: '5', name: 'Salmon', quantity: '200g', alt: 'White Fish', category: 'Pesce' },
  { id: '6', name: 'Broccoli', quantity: '150g', alt: 'Asparagus', category: 'Verdura' }
];

const mockMacros = generateEmptyMacros();
mockMacros['Monday'] = { calories: 2100, protein: 150, fats: 60, carbs: 240 };
mockMacros['Tuesday'] = { calories: 1950, protein: 140, fats: 55, carbs: 220 };

export const initialMealsState = mockMeals;
export const initialMacrosState = mockMacros;
export { DAYS, MEAL_SLOTS };
