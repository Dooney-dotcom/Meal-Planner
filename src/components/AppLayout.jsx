import { Calendar, ShoppingCart, Download, Activity, LayoutGrid } from 'lucide-react';

function AppLayout({ children, currentView, setCurrentView }) {

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/60 sticky top-0 z-40 no-print shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center">
              <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#005F6A] to-blue-700 flex items-center gap-2.5 tracking-tight">
                <Activity className="w-7 h-7 text-[#005F6A]" /> MealMaster
              </span>
            </div>
            <div className="flex items-center gap-6">
              <nav className="flex gap-1.5 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/50 shadow-inner">
                <button
                  onClick={() => setCurrentView('planner')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg transition-all font-semibold text-sm ${currentView === 'planner'
                    ? 'bg-white text-[#005F6A] shadow-sm border border-slate-200/50 scale-100'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 scale-95'
                    }`}
                >
                  <Calendar className="w-4 h-4" /> Planner
                </button>
                <button
                  onClick={() => setCurrentView('compact')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg transition-all font-semibold text-sm ${currentView === 'compact'
                    ? 'bg-white text-[#005F6A] shadow-sm border border-slate-200/50 scale-100'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 scale-95'
                    }`}
                >
                  <LayoutGrid className="w-4 h-4" /> Compact
                </button>
                <button
                  onClick={() => setCurrentView('shopping')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg transition-all font-semibold text-sm ${currentView === 'shopping'
                    ? 'bg-white text-[#005F6A] shadow-sm border border-slate-200/50 scale-100'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 scale-95'
                    }`}
                >
                  <ShoppingCart className="w-4 h-4" /> List
                </button>
              </nav>
              <div className="w-px h-8 bg-slate-200 hidden md:block"></div>
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
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
        {children}
      </main>
    </div>
  );
}

export default AppLayout;
