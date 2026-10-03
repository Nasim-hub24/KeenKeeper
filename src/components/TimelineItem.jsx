import React from 'react';
import { Phone, MessageSquare, Video, Users, Calendar } from 'lucide-react';

/**
 * TimelineItem component
 * Renders an interaction row matching Figma Page 3 & FR5
 */
export const TimelineItem = ({ entry }) => {
  const type = (entry.type || '').toLowerCase();

  const getTypeDetails = () => {
    switch (type) {
      case 'call':
        return {
          icon: Phone,
          color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
          badgeText: 'Call'
        };
      case 'text':
        return {
          icon: MessageSquare,
          color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
          badgeText: 'Text'
        };
      case 'video':
        return {
          icon: Video,
          color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
          badgeText: 'Video'
        };
      case 'meetup':
      default:
        return {
          icon: Users,
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
          badgeText: 'Meetup'
        };
    }
  };

  const { icon: Icon, color, badgeText } = getTypeDetails();

  return (
    <div className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#121927]/80 hover:bg-[#172235] border border-slate-800/80 hover:border-slate-700 transition-all duration-200 shadow-md">
      <div className="flex items-center gap-4">
        {/* Interaction Icon Box */}
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-sm ${color} transition-transform group-hover:scale-105`}>
          <Icon className="w-5 h-5" />
        </div>

        {/* Title and metadata */}
        <div>
          <h4 className="text-sm sm:text-base font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors">
            {entry.title}
          </h4>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {entry.date}
            </span>
          </div>
        </div>
      </div>

      {/* Pill Badge */}
      <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60 uppercase tracking-wider">
        {badgeText}
      </span>
    </div>
  );
};

export default TimelineItem;
