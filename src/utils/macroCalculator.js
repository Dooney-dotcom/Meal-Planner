/**
 * Parses a quantity string (e.g., "150g", "200 ml") and calculates the total macros
 * based on the base macros provided per 100g/ml.
 * 
 * @param {string} quantityString 
 * @param {Object} baseMacrosPer100g { calories, protein, carbs, fats }
 * @returns {Object} { isValid, parsedValue, unit, macros: { calories, protein, carbs, fats } }
 */
export const parseQuantityAndCalculateMacros = (quantityString, baseMacrosPer100g) => {
  if (!quantityString) return { isValid: false, macros: null };

  // Regex to match a number (integer or decimal) followed optionally by space, then "g" or "ml" (case insensitive)
  const regex = /^(\d+(?:\.\d+)?)\s*(g|ml)$/i;
  const match = quantityString.trim().match(regex);

  if (!match) {
    return { isValid: false, macros: null };
  }

  const amount = parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  if (!baseMacrosPer100g) {
    return { 
      isValid: true, 
      parsedValue: amount, 
      unit, 
      macros: { calories: 0, protein: 0, carbs: 0, fats: 0 } 
    };
  }

  const ratio = amount / 100;

  return {
    isValid: true,
    parsedValue: amount,
    unit,
    macros: {
      calories: Math.round((baseMacrosPer100g.calories || 0) * ratio),
      protein: Math.round((baseMacrosPer100g.protein || 0) * ratio * 10) / 10,
      carbs: Math.round((baseMacrosPer100g.carbs || 0) * ratio * 10) / 10,
      fats: Math.round((baseMacrosPer100g.fats || 0) * ratio * 10) / 10,
    }
  };
};

/**
 * Computes the total macros for a single day based on its meal slots.
 * 
 * @param {Object} dayMeals Object containing meal slots (e.g., { Breakfast: [...foods], Lunch: [...foods] })
 * @returns {Object} { calories, protein, carbs, fats }
 */
export const computeDailyMacros = (dayMeals) => {
  const totals = { calories: 0, protein: 0, carbs: 0, fats: 0 };
  
  if (!dayMeals) return totals;

  Object.values(dayMeals).forEach(slotFoods => {
    if (Array.isArray(slotFoods)) {
      slotFoods.forEach(food => {
        if (food.macros) {
          totals.calories += (food.macros.calories || 0);
          totals.protein += (food.macros.protein || 0);
          totals.carbs += (food.macros.carbs || 0);
          totals.fats += (food.macros.fats || 0);
        }
      });
    }
  });

  // Round results to 1 decimal place (calories to whole number)
  totals.calories = Math.round(totals.calories);
  totals.protein = Math.round(totals.protein * 10) / 10;
  totals.carbs = Math.round(totals.carbs * 10) / 10;
  totals.fats = Math.round(totals.fats * 10) / 10;

  return totals;
};

/**
 * Computes the total macros for the entire week.
 * 
 * @param {Object} meals Object containing days as keys and dayMeals as values
 * @returns {Object} { calories, protein, carbs, fats }
 */
export const computeWeeklyMacros = (meals) => {
  const totals = { calories: 0, protein: 0, carbs: 0, fats: 0 };
  
  if (!meals) return totals;

  Object.values(meals).forEach(dayMeals => {
    const daily = computeDailyMacros(dayMeals);
    totals.calories += daily.calories;
    totals.protein += daily.protein;
    totals.carbs += daily.carbs;
    totals.fats += daily.fats;
  });

  totals.calories = Math.round(totals.calories);
  totals.protein = Math.round(totals.protein * 10) / 10;
  totals.carbs = Math.round(totals.carbs * 10) / 10;
  totals.fats = Math.round(totals.fats * 10) / 10;

  return totals;
};
