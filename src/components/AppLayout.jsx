import { Calendar, ShoppingCart, Download, Activity, LayoutGrid, User, Dumbbell } from 'lucide-react';

function AppLayout({ children, currentView, setCurrentView }) {

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
      <header className="glass-panel sticky top-0 z-40 no-print transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#005F6A] via-[#008f9e] to-blue-600 flex items-center gap-2.5 tracking-tighter drop-shadow-sm">
                <div className="p-1.5 bg-gradient-to-br from-[#005F6A] to-blue-600 rounded-xl shadow-md">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                MealMaster
              </span>
            </div>
            <div className="flex items-center gap-6">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex gap-1.5 bg-slate-100/60 p-1.5 rounded-2xl border border-slate-200/50 shadow-inner backdrop-blur-sm">
                <button
                  onClick={() => setCurrentView('planner')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all font-bold text-sm ${currentView === 'planner'
                    ? 'bg-white text-[#005F6A] shadow-md shadow-[#005F6A]/5 border border-slate-200/50 scale-100'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 scale-95 hover:scale-100'
                    }`}
                >
                  <Calendar className="w-4 h-4" /> Planner
                </button>
                <button
                  onClick={() => setCurrentView('compact')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all font-bold text-sm ${currentView === 'compact'
                    ? 'bg-white text-[#005F6A] shadow-md shadow-[#005F6A]/5 border border-slate-200/50 scale-100'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 scale-95 hover:scale-100'
                    }`}
                >
                  <LayoutGrid className="w-4 h-4" /> Compact
                </button>
                <button
                  onClick={() => setCurrentView('shopping')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all font-bold text-sm ${currentView === 'shopping'
                    ? 'bg-white text-[#005F6A] shadow-md shadow-[#005F6A]/5 border border-slate-200/50 scale-100'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 scale-95 hover:scale-100'
                    }`}
                >
                  <ShoppingCart className="w-4 h-4" /> List
                </button>
              </nav>
              <button
                onClick={handlePrint}
                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#005F6A] text-white font-semibold text-sm rounded-xl hover:bg-[#004d56] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
              >
                <Download className="w-4 h-4" /> Export PDF
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full pb-24 md:pb-12">
        {children}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200/60 flex justify-around items-center px-2 pb-safe pt-2 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-50 transition-all">
        <button
          onClick={() => setCurrentView('planner')}
          className={`flex flex-col items-center justify-center w-full min-h-[56px] gap-1 transition-all active:scale-95 ${currentView === 'planner'
            ? 'text-[#005F6A]'
            : 'text-slate-400 hover:text-slate-600'
            }`}
        >
          <Calendar className="w-6 h-6" />
          <span className="text-[10px] font-bold tracking-wide">Planner</span>
        </button>
        <button
          onClick={() => setCurrentView('compact')}
          className={`flex flex-col items-center justify-center w-full min-h-[56px] gap-1 transition-all active:scale-95 ${currentView === 'compact'
            ? 'text-[#005F6A]'
            : 'text-slate-400 hover:text-slate-600'
            }`}
        >
          <LayoutGrid className="w-6 h-6" />
          <span className="text-[10px] font-bold tracking-wide">Compact</span>
        </button>
        <button
          onClick={() => setCurrentView('shopping')}
          className={`flex flex-col items-center justify-center w-full min-h-[56px] gap-1 transition-all active:scale-95 ${currentView === 'shopping'
            ? 'text-[#005F6A]'
            : 'text-slate-400 hover:text-slate-600'
            }`}
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="text-[10px] font-bold tracking-wide">List</span>
        </button>
      </nav>
    </div>
  );
}

export default AppLayout;
