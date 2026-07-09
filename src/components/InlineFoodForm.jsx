import React, { useState, useEffect, useRef } from 'react';
import { Settings, Check, X, Search, Loader2, AlertCircle } from 'lucide-react';
import CategoriesModal from './CategoriesModal';
import { parseQuantityAndCalculateMacros } from '../utils/macroCalculator';
import { searchFood } from '../utils/openFoodFactsApi';

export default function InlineFoodForm({ initialData, onSave, onCancel, categories, setCategories }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    alt: '',
    category: 'Altro',
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  });
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Open Food Facts API states
  const [apiResults, setApiResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showApiSuggestions, setShowApiSuggestions] = useState(false);
  const [selectedBaseMacros, setSelectedBaseMacros] = useState(null);
  const [quantityError, setQuantityError] = useState('');

  const searchTimeoutRef = useRef(null);

  const filteredCategories = categories?.filter(c =>
    c.name.toLowerCase().includes((formData.category || '').toLowerCase())
  ) || [];

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        quantity: initialData.quantity || '',
        alt: initialData.alt || '',
        category: initialData.category || 'Altro',
        calories: initialData.macros?.calories ?? '',
        protein: initialData.macros?.protein ?? '',
        carbs: initialData.macros?.carbs ?? '',
        fats: initialData.macros?.fats ?? ''
      });
    } else if (categories && categories.length > 0) {
      setFormData(prev => ({ ...prev, category: categories[0].name }));
    }
  }, [initialData, categories]);

  // Auto-calculate macros when quantity or selected API product changes
  useEffect(() => {
    if (selectedBaseMacros && formData.quantity) {
      const parsed = parseQuantityAndCalculateMacros(formData.quantity, selectedBaseMacros);
      if (parsed.isValid && parsed.macros) {
        setFormData(prev => ({
          ...prev,
          calories: parsed.macros.calories,
          protein: parsed.macros.protein,
          carbs: parsed.macros.carbs,
          fats: parsed.macros.fats
        }));
      }
    }
  }, [formData.quantity, selectedBaseMacros]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'quantity') {
      setQuantityError('');
    }

    if (name === 'name') {
      setSelectedBaseMacros(null); // Reset API product if they type manually

      if (value.length > 2) {
        setShowApiSuggestions(true);
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

        searchTimeoutRef.current = setTimeout(async () => {
          setIsSearching(true);
          try {
            const products = await searchFood(value, 15);
            setApiResults(products);
          } finally {
            setIsSearching(false);
          }
        }, 500);
      } else {
        setApiResults([]);
        setShowApiSuggestions(false);
      }
    }
  };

  const handleSelectApiProduct = (product) => {
    const nutriments = product.nutriments || {};
    const baseMacros = {
      calories: nutriments['energy-kcal_100g'] || 0,
      protein: nutriments['proteins_100g'] || 0,
      carbs: nutriments['carbohydrates_100g'] || 0,
      fats: nutriments['fat_100g'] || 0
    };

    setFormData(prev => ({ ...prev, name: product.product_name || 'Prodotto Sconosciuto' }));
    setSelectedBaseMacros(baseMacros);
    setShowApiSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity) return;

    // Just validate quantity string (pass null for baseMacros)
    const parsed = parseQuantityAndCalculateMacros(formData.quantity, null);

    if (!parsed.isValid) {
      setQuantityError('Formato non valido. Usa "g" o "ml" (es. "150g", "200 ml")');
      return;
    }

    onSave({
      name: formData.name,
      quantity: formData.quantity,
      alt: formData.alt,
      category: formData.category,
      macros: {
        calories: Number(formData.calories) || 0,
        protein: Number(formData.protein) || 0,
        carbs: Number(formData.carbs) || 0,
        fats: Number(formData.fats) || 0
      }
    });
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] border border-slate-100/80 relative no-print transform transition-all duration-300 overflow-visible z-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-8 flex flex-col gap-1.5 relative">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1 flex justify-between">
              <span>Food Name</span>
              {selectedBaseMacros && <span className="text-[#005F6A] flex items-center gap-1"><Check className="w-3 h-3" /> Database</span>}
            </label>
            <div className="relative">
              <input
                autoFocus
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => setTimeout(() => setShowApiSuggestions(false), 200)}
                placeholder="e.g., Petto di Pollo"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005F6A]/20 focus:border-[#005F6A] transition-all bg-slate-50/50 focus:bg-white pr-10"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </div>
            </div>

            {showApiSuggestions && (apiResults.length > 0 || isSearching) && (
              <ul className="absolute top-full mt-1 left-0 right-0 z-[100] bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-auto py-1">
                {isSearching && apiResults.length === 0 && (
                  <li className="px-4 py-3 text-sm text-slate-500 text-center">Ricerca in corso...</li>
                )}
                {apiResults.map(p => (
                  <li
                    key={p.id || p.code}
                    className="px-4 py-2 hover:bg-[#005F6A]/5 cursor-pointer border-b border-slate-50 last:border-0"
                    onClick={() => handleSelectApiProduct(p)}
                  >
                    <div className="text-sm font-medium text-slate-800">{p.product_name || 'Senza nome'}</div>
                    <div className="text-xs text-slate-500 flex gap-2 mt-0.5">
                      <span>{p.brands ? p.brands.split(',')[0] : ''}</span>
                      {p.nutriments?.['energy-kcal_100g'] ? (
                        <span>{Math.round(p.nutriments['energy-kcal_100g'])} kcal/100g</span>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="sm:col-span-4 flex flex-col gap-1.5 relative">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Quantity</label>
            <input
              required
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g., 150g"
              className={`w-full px-3.5 py-2.5 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 ${quantityError
                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20 text-red-900'
                : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#005F6A] focus:ring-[#005F6A]/20 text-slate-800 placeholder:text-slate-400'
                }`}
            />
            {quantityError && (
              <div className="absolute top-full mt-1 left-0 flex items-start gap-1 text-[10px] text-red-500 font-medium">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{quantityError}</span>
              </div>
            )}
          </div>
        </div>

        {/* Editable Macros Section */}
        <div className="grid grid-cols-4 gap-3 mt-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-[#005F6A] uppercase tracking-wider ml-1">Kcal</label>
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              placeholder="0"
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#005F6A]/30 focus:border-[#005F6A] bg-white transition-all text-center"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-blue-600 uppercase tracking-wider ml-1">Proteins</label>
            <input
              type="number"
              name="protein"
              value={formData.protein}
              onChange={handleChange}
              placeholder="0"
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500 bg-white transition-all text-center"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-amber-600 uppercase tracking-wider ml-1">Fats</label>
            <input
              type="number"
              name="fats"
              value={formData.fats}
              onChange={handleChange}
              placeholder="0"
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500 bg-white transition-all text-center"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-purple-600 uppercase tracking-wider ml-1">Carbs</label>
            <input
              type="number"
              name="carbs"
              value={formData.carbs}
              onChange={handleChange}
              placeholder="0"
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500/30 focus:border-purple-500 bg-white transition-all text-center"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-2">
          <div className="sm:col-span-6 flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Category</label>
            <div className="flex gap-2 items-start">
              <div className="relative flex-1">
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="e.g., Proteins, Veggies..."
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005F6A]/20 focus:border-[#005F6A] transition-all bg-slate-50/50 focus:bg-white"
                />
                {showSuggestions && filteredCategories.length > 0 && (
                  <ul className="absolute z-[90] w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-auto py-1">
                    {filteredCategories.map(cat => (
                      <li
                        key={cat.id}
                        className="px-3.5 py-2 text-sm text-slate-700 hover:bg-[#005F6A]/5 hover:text-[#005F6A] cursor-pointer transition-colors"
                        onClick={() => {
                          setFormData({ ...formData, category: cat.name });
                          setShowSuggestions(false);
                        }}
                      >
                        {cat.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {setCategories && (
                <button
                  type="button"
                  onClick={() => setIsCategoriesModalOpen(true)}
                  className="flex-shrink-0 flex items-center justify-center w-10 h-10 text-[#005F6A] bg-[#e6eff0] hover:bg-[#cce0e3] rounded-xl transition-all border border-[#005F6A]/10 shadow-sm active:scale-95"
                  title="Manage Categories"
                >
                  <Settings className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="sm:col-span-6 flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Alternative (Optional)</label>
            <input
              type="text"
              name="alt"
              value={formData.alt}
              onChange={handleChange}
              placeholder="e.g., Tofu for vegans"
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005F6A]/20 focus:border-[#005F6A] transition-all bg-slate-50/50 focus:bg-white"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-3 pt-4 border-t border-slate-100">
          <button type="button" onClick={onCancel} className="flex items-center gap-1.5 px-5 py-2.5 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 font-medium rounded-full transition-all active:scale-95">
            <X className="w-4 h-4" /> Cancel
          </button>
          <button type="submit" className="flex items-center gap-1.5 px-6 py-2.5 bg-[#005F6A] text-sm text-white font-medium rounded-full hover:bg-[#004d56] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95">
            <Check className="w-4 h-4" /> Save Food
          </button>
        </div>
      </form>

      {isCategoriesModalOpen && setCategories && (
        <CategoriesModal
          isOpen={isCategoriesModalOpen}
          onClose={() => setIsCategoriesModalOpen(false)}
          categories={categories}
          setCategories={setCategories}
        />
      )}
    </div>
  );
}
