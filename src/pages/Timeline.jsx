import React, { useState, useMemo } from 'react';
import { useTimeline } from '../context/TimelineContext';
import TimelineItem from '../components/TimelineItem';
import { Filter, Search, ArrowUpDown, History, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Timeline = () => {
  const { timeline } = useTimeline();
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'

  // Filter and sort timeline entries
  const filteredTimeline = useMemo(() => {
    return timeline
      .filter((entry) => {
        // Type filter
        if (filterType !== 'all' && (entry.type || '').toLowerCase() !== filterType.toLowerCase()) {
          return false;
        }
        // Search query filter (matches title or date)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = entry.title?.toLowerCase().includes(q);
          const matchDate = entry.date?.toLowerCase().includes(q);
          return matchTitle || matchDate;
        }
        return true;
      })
      .sort((a, b) => {
        const timeA = a.timestamp || new Date(a.date).getTime() || 0;
        const timeB = b.timestamp || new Date(b.date).getTime() || 0;
        return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
      });
  }, [timeline, filterType, searchQuery, sortOrder]);

  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Call', value: 'call' },
    { label: 'Text', value: 'text' },
    { label: 'Video', value: 'video' },
    { label: 'Meetup', value: 'meetup' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Timeline
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            A chronological record of every conversation, message, and catch-up
          </p>
        </div>
        <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 self-start sm:self-auto">
          {filteredTimeline.length} {filteredTimeline.length === 1 ? 'Interaction' : 'Interactions'}
        </div>
      </div>

      {/* Controls Bar: Filter Pills, Search Bar, and Sort Order */}
      <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-4 mb-8 space-y-4 shadow-lg shadow-black/20">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by friend or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          {/* Sort Button */}
          <button
            onClick={() => setSortOrder(prev => (prev === 'newest' ? 'oldest' : 'newest'))}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors self-end sm:self-auto"
            aria-label="Toggle sort order"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span>Sort: {sortOrder === 'newest' ? 'Newest first' : 'Oldest first'}</span>
          </button>
        </div>

        {/* Filter Badges (Challenge C2) */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3 text-slate-500" />
            Filter:
          </span>
          {filterOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setFilterType(option.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
                filterType === option.value
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-950 font-semibold'
                  : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/60'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Entries List */}
      {filteredTimeline.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {filteredTimeline.map((entry) => (
            <TimelineItem key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-12 text-center my-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 mb-4">
            <History className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">
            No interactions found
          </h3>
          <p className="mt-1 text-sm text-slate-400 max-w-sm mx-auto">
            {searchQuery || filterType !== 'all'
              ? 'No entries match your current search or filter criteria. Try clearing filters.'
              : 'You have not logged any check-ins yet. Start by logging a call, text, or video with a friend!'}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            {(searchQuery || filterType !== 'all') ? (
              <button
                onClick={() => {
                  setFilterType('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                Clear Filters
              </button>
            ) : (
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                Find a Friend to Contact
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;
