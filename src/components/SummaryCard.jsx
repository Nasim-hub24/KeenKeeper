import React from 'react';

/**
 * SummaryCard component
 * Displays a single stat metric (Number + Label) matching Figma Page 1
 */
export const SummaryCard = ({ value, label, icon: Icon, accent = 'emerald' }) => {
  const accentStyles = {
    emerald: 'text-emerald-400 group-hover:text-emerald-300',
    amber: 'text-amber-400 group-hover:text-amber-300',
    red: 'text-rose-400 group-hover:text-rose-300',
    blue: 'text-sky-400 group-hover:text-sky-300'
  };

  return (
    <div className="group relative bg-[#131b2e]/70 hover:bg-[#18233c]/90 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 text-center transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-emerald-950/20 backdrop-blur-md">
      {Icon && (
        <div className="mx-auto mb-2 flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/60 text-slate-400 group-hover:bg-slate-800 transition-colors">
          <Icon className="w-4 h-4" />
        </div>
      )}
      <div className={`text-3xl sm:text-4xl font-extrabold tracking-tight transition-colors duration-200 text-slate-100 ${accentStyles[accent] || ''}`}>
        {value}
      </div>
      <div className="mt-2 text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

export default SummaryCard;
