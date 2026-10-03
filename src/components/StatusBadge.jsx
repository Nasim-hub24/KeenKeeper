import React from 'react';

/**
 * StatusBadge component
 * Follows PRD section 5.3 & Non-functional Accessibility requirements:
 * - overdue: Red
 * - almost due: Amber / Orange
 * - on-track: Green
 * Includes text and icon/dot indicator so status is not conveyed by color alone.
 */
export const StatusBadge = ({ status, size = 'sm' }) => {
  const normalized = (status || '').toLowerCase().trim();

  let config = {
    label: 'On-Track',
    bgColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    dotColor: 'bg-emerald-400',
    icon: '●'
  };

  if (normalized === 'overdue') {
    config = {
      label: 'Overdue',
      bgColor: 'bg-red-500/10 text-red-400 border-red-500/30',
      dotColor: 'bg-red-400',
      icon: '●'
    };
  } else if (normalized === 'almost due' || normalized === 'almost_due' || normalized === 'almost') {
    config = {
      label: 'Almost Due',
      bgColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      dotColor: 'bg-amber-400',
      icon: '●'
    };
  }

  const sizeClasses = size === 'lg' 
    ? 'px-3.5 py-1 text-sm font-medium gap-1.5' 
    : 'px-2.5 py-0.5 text-xs font-medium gap-1.5';

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-sm ${config.bgColor} ${sizeClasses}`}
      aria-label={`Status: ${config.label}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor} animate-pulse`} />
      <span>{config.label}</span>
    </span>
  );
};

export default StatusBadge;
