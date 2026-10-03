import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Loader component
 * Shown during simulated network fetch per FR3 and FR8
 */
export const Loader = ({ message = "Loading your connections..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-emerald-500 animate-spin" />
        <Loader2 className="absolute w-7 h-7 text-emerald-400 animate-pulse" />
      </div>
      <p className="mt-4 text-sm font-medium text-slate-400 tracking-wide animate-pulse">
        {message}
      </p>

      {/* Subtle Skeleton Grid Preview */}
      <div className="w-full max-w-5xl mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 opacity-30 pointer-events-none">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-64 rounded-2xl bg-slate-800/40 border border-slate-700/30 animate-pulse flex flex-col items-center p-6 justify-between">
            <div className="w-20 h-20 rounded-full bg-slate-700/60" />
            <div className="w-28 h-4 rounded bg-slate-700/60" />
            <div className="w-16 h-3 rounded bg-slate-700/40" />
            <div className="w-20 h-6 rounded-full bg-slate-700/50" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
