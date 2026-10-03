import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { User, Clock } from 'lucide-react';

/**
 * FriendCard component
 * Renders an interactive friend card in the grid per Figma Page 1 & FR3
 */
export const FriendCard = ({ friend }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const handleClick = () => {
    navigate(`/friend/${friend.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Generate fallback avatar background color based on name
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-[#121927]/90 hover:bg-[#172235] border border-slate-800/90 hover:border-emerald-500/40 transition-all duration-300 shadow-lg shadow-black/25 hover:shadow-emerald-950/30 hover:-translate-y-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-[#090d16]"
      aria-label={`View relationship details for ${friend.name}`}
    >
      {/* Glow highlight on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Avatar */}
      <div className="relative mb-4">
        <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden border-2 border-slate-700/80 group-hover:border-emerald-500/60 shadow-md transition-all duration-300 bg-slate-800 flex items-center justify-center">
          {!imgError && friend.picture ? (
            <img
              src={friend.picture}
              alt={friend.name}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-800 to-slate-900 text-emerald-200 font-bold text-xl">
              {getInitials(friend.name)}
            </div>
          )}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-emerald-300 transition-colors line-clamp-1">
        {friend.name}
      </h3>

      {/* Days since contact */}
      <div className="mt-1 flex items-center gap-1 text-xs text-slate-400 font-medium">
        <Clock className="w-3.5 h-3.5 text-slate-500" />
        <span>{friend.days_since_contact}d ago</span>
      </div>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-1.5 justify-center min-h-[1.75rem]">
        {friend.tags && friend.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Status Badge */}
      <div className="mt-4 pt-2 w-full flex justify-center">
        <StatusBadge status={friend.status} />
      </div>
    </div>
  );
};

export default FriendCard;
