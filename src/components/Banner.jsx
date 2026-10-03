import React, { useState } from 'react';
import { Plus, Users, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import SummaryCard from './SummaryCard';
import AddFriendModal from './AddFriendModal';
import { useTimeline } from '../context/TimelineContext';

export const Banner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { stats } = useTimeline();

  return (
    <section className="relative pt-12 pb-8 sm:pt-16 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Heading */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 max-w-3xl mx-auto">
        Friends to keep close in your life
      </h1>

      {/* Subtitle */}
      <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
        Your personal shelf of meaningful connections. Browse, tend, and nurture the
        relationships that matter most.
      </p>

      {/* Action Button: + Add a Friend */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-emerald-700/80 hover:bg-emerald-600 text-white font-medium text-sm transition-all duration-300 shadow-lg shadow-emerald-950/50 hover:shadow-emerald-900/40 hover:-translate-y-0.5 active:translate-y-0 border border-emerald-500/30"
          aria-label="Add a new friend"
        >
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
          <span>Add a Friend</span>
        </button>
      </div>

      {/* 4 Summary Cards Grid */}
      <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <SummaryCard
          value={stats.totalFriends}
          label="Total Friends"
          icon={Users}
          accent="emerald"
        />
        <SummaryCard
          value={stats.onTrackCount}
          label="On Track"
          icon={CheckCircle2}
          accent="emerald"
        />
        <SummaryCard
          value={stats.needAttentionCount}
          label="Need Attention"
          icon={AlertCircle}
          accent="amber"
        />
        <SummaryCard
          value={stats.interactionsThisMonth}
          label="Interactions This Month"
          icon={MessageSquare}
          accent="blue"
        />
      </div>

      {/* Add Friend Dialog */}
      <AddFriendModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Banner;
