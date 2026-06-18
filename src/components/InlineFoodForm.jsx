import React, { useState, useEffect } from 'react';
import { Settings, Check, X } from 'lucide-react';
import CategoriesModal from './CategoriesModal';

export default function InlineFoodForm({ initialData, onSave, onCancel, categories, setCategories }) {
  const [formData, setFormData] = useState({ name: '', quantity: '', alt: '', category: 'Altro' });
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredCategories = categories?.filter(c => 
    c.name.toLowerCase().includes((formData.category || '').toLowerCase())
  ) || [];

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        quantity: initialData.quantity || '',
        alt: initialData.alt || '',
        category: initialData.category || 'Altro'
      });
    } else if (categories && categories.length > 0) {
      // Set default category to the first one if adding new
      setFormData(prev => ({ ...prev, category: categories[0].name }));
    }
  }, [initialData, categories]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity) return;
    onSave(formData);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] border border-slate-100/80 relative no-print transform transition-all duration-300">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-8 flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Food Name</label>
            <input 
              autoFocus
              required
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Chicken Breast"
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005F6A]/20 focus:border-[#005F6A] transition-all bg-slate-50/50 focus:bg-white"
            />
          </div>

          <div className="sm:col-span-4 flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Quantity</label>
            <input 
              required
              type="text" 
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g., 150g"
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005F6A]/20 focus:border-[#005F6A] transition-all bg-slate-50/50 focus:bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
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
                  <ul className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-auto py-1">
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
