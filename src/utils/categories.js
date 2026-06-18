export const PRESET_COLORS = [
  { id: 'blue', value: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Blue' },
  { id: 'rose', value: 'bg-rose-100 text-rose-800 border-rose-200', label: 'Rose' },
  { id: 'cyan', value: 'bg-cyan-100 text-cyan-800 border-cyan-200', label: 'Cyan' },
  { id: 'emerald', value: 'bg-emerald-100 text-emerald-800 border-emerald-200', label: 'Emerald' },
  { id: 'amber', value: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Amber' },
  { id: 'green', value: 'bg-green-100 text-green-800 border-green-200', label: 'Green' },
  { id: 'orange', value: 'bg-orange-100 text-orange-800 border-orange-200', label: 'Orange' },
  { id: 'indigo', value: 'bg-indigo-100 text-indigo-800 border-indigo-200', label: 'Indigo' },
  { id: 'purple', value: 'bg-purple-100 text-purple-800 border-purple-200', label: 'Purple' },
  { id: 'pink', value: 'bg-pink-100 text-pink-800 border-pink-200', label: 'Pink' },
  { id: 'stone', value: 'bg-stone-100 text-stone-800 border-stone-200', label: 'Stone' }
];

export const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'Proteins', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { id: 'cat-2', name: 'Meat', color: 'bg-rose-100 text-rose-800 border-rose-200' },
  { id: 'cat-3', name: 'Fish', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
  { id: 'cat-4', name: 'Legumes', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { id: 'cat-5', name: 'Carbs', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { id: 'cat-6', name: 'Veggies', color: 'bg-green-100 text-green-800 border-green-200' },
  { id: 'cat-7', name: 'Fruits', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { id: 'cat-8', name: 'Dairy', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  { id: 'cat-9', name: 'Other', color: 'bg-stone-100 text-stone-800 border-stone-200' }
];

export const getCategoryColor = (categories, categoryName) => {
  const cat = categories.find(c => c.name === categoryName);
  return cat ? cat.color : 'bg-stone-100 text-stone-800 border-stone-200';
};
