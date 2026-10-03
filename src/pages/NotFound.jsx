import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-950/20">
          <Compass className="w-12 h-12 stroke-[1.5] animate-spin-slow" />
        </div>
      </div>
      <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase font-semibold">
        404 Error
      </span>
      <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
        Lost in the Connection?
      </h1>
      <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-md mx-auto">
        We couldn't find the page or friend profile you were looking for. Let's get you back to your connections.
      </p>
      <div className="mt-8 flex items-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-900/40 hover:-translate-y-0.5"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
