import React from 'react';
import { useTimeline } from '../context/TimelineContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BarChart3, MessageSquare, Phone, Video, Users, Sparkles, TrendingUp, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Stats = () => {
  const { timeline, stats } = useTimeline();

  // Aggregate counts by interaction type
  const counts = timeline.reduce((acc, entry) => {
    const type = (entry.type || 'other').toLowerCase();
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const total = timeline.length;

  // Chart data matching Figma Page 4
  const data = [
    { name: 'Text', value: counts['text'] || 0, color: '#38bdf8' },
    { name: 'Call', value: counts['call'] || 0, color: '#10b981' },
    { name: 'Video', value: counts['video'] || 0, color: '#a855f7' },
    { name: 'Meetup', value: counts['meetup'] || 0, color: '#f59e0b' }
  ].filter(item => item.value > 0);

  // Identify most frequent type
  const topType = [...data].sort((a, b) => b.value - a.value)[0]?.name || 'None';

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
      return (
        <div className="bg-[#0f172a] border border-slate-700 p-3 rounded-xl shadow-xl text-xs text-white">
          <p className="font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.payload.color }} />
            {item.name}: <span className="text-emerald-400">{item.value}</span>
          </p>
          <p className="text-slate-400 mt-1">{percentage}% of total interactions</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Page Heading */}
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center justify-center sm:justify-start gap-3">
          <BarChart3 className="w-8 h-8 text-emerald-400" />
          <span>Friendship Analytics</span>
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Insights into how you communicate and nurture your relationships over time
        </p>
      </div>

      {total > 0 ? (
        <div className="space-y-8">
          {/* Main Chart Card matching Figma Page 4 */}
          <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/20">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-5 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">
                  By Interaction Type
                </h2>
                <p className="text-xs text-slate-400">
                  Distribution of calls, texts, video chats, and meetups
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {total} Total
              </span>
            </div>

            {/* Recharts Pie Chart Container */}
            <div className="h-72 sm:h-80 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={105}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="#111827"
                    strokeWidth={3}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center Donut Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black text-white">{total}</span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                  Actions
                </span>
              </div>
            </div>

            {/* Custom Legend matching Figma */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-slate-800/80">
              {data.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                  <span className="text-slate-500 font-mono">({item.value})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metric Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 text-center">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center mb-2">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold text-white capitalize">{topType}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Preferred Channel</div>
            </div>

            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 text-center">
              <div className="w-8 h-8 rounded-full bg-sky-500/10 text-sky-400 mx-auto flex items-center justify-center mb-2">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold text-white">{timeline[0]?.date ? timeline[0].date.split(',')[0] : 'None'}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Latest Catch-Up</div>
            </div>

            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 text-center">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-400 mx-auto flex items-center justify-center mb-2">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold text-white">{stats.onTrackCount} / {stats.totalFriends}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">On-Track Ratio</div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-12 text-center my-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 mb-4">
            <BarChart3 className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">
            No analytics data yet
          </h3>
          <p className="mt-1 text-sm text-slate-400 max-w-sm mx-auto">
            Log check-ins with friends to see breakdown charts and communication insights.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
            >
              Start Connecting
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
