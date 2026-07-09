import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Edit2, Trash2, Check } from 'lucide-react';
import { PRESET_COLORS } from '../utils/categories';

export default function CategoriesModal({ isOpen, onClose, categories, setCategories }) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState('');

  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState(PRESET_COLORS[0].value);

  if (!isOpen) return null;

  const handleAdd = () => {
    if (!newName.trim()) return;
    setCategories([
      ...categories,
      { id: crypto.randomUUID(), name: newName.trim(), color: newColor }
    ]);
    setNewName('');
    setNewColor(PRESET_COLORS[0].value);
  };

  const handleRemove = (id) => {
    if (categories.length === 1) return; // don't delete last one
    setCategories(categories.filter(c => c.id !== id));
  };

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditColor(cat.color);
  };

  const saveEdit = (id) => {
    if (!editName.trim()) return;
    setCategories(categories.map(c => c.id === id ? { ...c, name: editName.trim(), color: editColor } : c));
    setEditingId(null);
  };

  return createPortal(
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-[100] transition-opacity">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="px-7 py-5 border-b border-slate-100 flex justify-between items-center bg-white/50 backdrop-blur-sm">
          <h2 className="text-xl font-extrabold text-[#005F6A] tracking-tight">Manage Categories</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600 active:scale-95">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-7 overflow-y-auto flex-1 space-y-6">
          <div className="flex flex-col gap-3 pb-7 border-b border-slate-100">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Add New Category</label>
            <div className="flex gap-2.5">
              <input 
                type="text" 
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="Category Name"
                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005F6A]/20 focus:border-[#005F6A] transition-all bg-slate-50/50 focus:bg-white"
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              />
              <select 
                value={newColor}
                onChange={e => setNewColor(e.target.value)}
                className="w-28 px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#005F6A]/20 focus:border-[#005F6A] transition-all bg-slate-50/50 focus:bg-white cursor-pointer"
              >
                {PRESET_COLORS.map(c => (
                  <option key={c.id} value={c.value}>{c.label}</option>
                ))}
              </select>
              <button onClick={handleAdd} className="bg-[#005F6A] text-white p-2.5 px-4 rounded-xl hover:bg-[#004d56] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {newColor && (
              <div className="mt-2 flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-500">Preview:</span>
                <span className={`text-[11px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border shadow-sm ${newColor}`}>
                  {newName || 'Example'}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Existing Categories</label>
            <div className="space-y-2.5">
              {categories.map(cat => (
                <div key={cat.id} className="flex items-center justify-between p-3.5 border border-slate-100 rounded-xl bg-white shadow-sm hover:shadow transition-shadow">
                  {editingId === cat.id ? (
                    <div className="flex-1 flex gap-2 items-center mr-3">
                      <input 
                        type="text"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F6A]/20 focus:border-[#005F6A]"
                      />
                      <select 
                        value={editColor}
                        onChange={e => setEditColor(e.target.value)}
                        className="w-24 px-2 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F6A]/20 focus:border-[#005F6A]"
                      >
                        {PRESET_COLORS.map(c => (
                          <option key={c.id} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <span className={`text-[11px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border shadow-sm ${cat.color}`}>
                      {cat.name}
                    </span>
                  )}
                  
                  <div className="flex items-center gap-1.5">
                    {editingId === cat.id ? (
                      <button onClick={() => saveEdit(cat.id)} className="text-white bg-[#005F6A] p-1.5 hover:bg-[#004d56] rounded-lg transition-colors shadow-sm"><Check className="w-4 h-4" /></button>
                    ) : (
                      <button onClick={() => startEdit(cat)} className="text-slate-400 hover:text-[#005F6A] p-1.5 rounded-lg hover:bg-[#005F6A]/5 transition-colors"><Edit2 className="w-4 h-4" /></button>
                    )}
                    <button 
                      onClick={() => handleRemove(cat.id)} 
                      className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors"
                      disabled={categories.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
