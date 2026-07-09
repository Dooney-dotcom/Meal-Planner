import React, { useMemo, useState } from 'react';
import ShoppingItem from './ShoppingItem';
import { DAYS } from '../utils/mockData';
import { Trash2, ShoppingBag } from 'lucide-react';
import { getCategoryColor } from '../utils/categories';

function ShoppingList({ meals, categories }) {
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [hiddenItems, setHiddenItems] = useState(new Set());

  const groupedList = useMemo(() => {
    const categoriesMap = {};

    DAYS.forEach(day => {
      Object.values(meals[day]).forEach(slotFoods => {
        slotFoods.forEach(food => {
          const cat = food.category || 'Altro';
          if (!categoriesMap[cat]) categoriesMap[cat] = {};

          const key = food.name.toLowerCase().trim();
          if (!categoriesMap[cat][key]) {
            categoriesMap[cat][key] = {
              name: food.name,
              quantities: [],
              alts: new Set()
            };
          }
          if (food.quantity) categoriesMap[cat][key].quantities.push(food.quantity);
          if (food.alt) categoriesMap[cat][key].alts.add(food.alt);
        });
      });
    });

    const result = [];
    Object.keys(categoriesMap).sort().forEach(cat => {
      const items = Object.values(categoriesMap[cat]).map((item, index) => ({
        id: `shop-${cat}-${index}`,
        name: item.name,
        quantity: Object.entries(item.quantities.reduce((acc, q) => { acc[q] = (acc[q] || 0) + 1; return acc; }, {})).map(([quantity, count]) => count > 1 ? `${count}x${quantity}` : quantity).join(' + '),
        alts: Array.from(item.alts).join(', ')
      })).sort((a, b) => a.name.localeCompare(b.name));

      if (items.length > 0) {
        result.push({ category: cat, items });
      }
    });

    return result;
  }, [meals]);

  const toggleCheck = (id) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const clearChecked = () => {
    const newHidden = new Set(hiddenItems);
    checkedItems.forEach(id => newHidden.add(id));
    setHiddenItems(newHidden);
    setCheckedItems(new Set());
  };

  const hasItems = groupedList.some(group => group.items.some(item => !hiddenItems.has(item.id)));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-8 max-w-4xl mx-auto mb-8 print-avoid-break">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-[#005F6A] flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-[#005F6A]" /> Shopping List
        </h2>
        {checkedItems.size > 0 && (
          <button
            onClick={clearChecked}
            className="no-print flex items-center gap-2 px-4 py-2 min-h-[44px] bg-slate-50 text-slate-600 border border-slate-200 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors text-sm font-medium active:scale-95"
          >
            <Trash2 className="w-5 h-5 sm:w-4 sm:h-4" /> Clear Checked ({checkedItems.size})
          </button>
        )}
      </div>

      {!hasItems ? (
        <div className="text-center py-20 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-4 border border-slate-100">
            <ShoppingBag className="w-10 h-10 text-slate-300" />
          </div>
          <p className="text-slate-600 text-lg font-bold">Your shopping list is empty.</p>
          <p className="text-slate-400 mt-2 text-sm font-medium">Plan your meals to automatically generate the list.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {groupedList.map(group => {
            const displayItems = group.items.filter(item => !hiddenItems.has(item.id));
            if (displayItems.length === 0) return null;

            return (
              <div key={group.category} className="print-avoid-break">
                <h3 className={`inline-block px-4 py-1.5 rounded-lg text-xs font-black tracking-widest uppercase mb-4 shadow-sm border ${getCategoryColor(categories, group.category)}`}>
                  {group.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {displayItems.map(item => (
                    <ShoppingItem
                      key={item.id}
                      item={item}
                      isChecked={checkedItems.has(item.id)}
                      onToggle={() => toggleCheck(item.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ShoppingList;
