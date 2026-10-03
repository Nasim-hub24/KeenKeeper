import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Phone, MessageSquare, Video, Clock, ArrowLeft, Bell, Archive, 
  Trash2, Mail, Edit3, Calendar, Award, CheckCircle, Sparkles 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useTimeline } from '../context/TimelineContext';
import StatusBadge from '../components/StatusBadge';

export const FriendDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { friends, logCheckIn } = useTimeline();
  const [imgError, setImgError] = useState(false);

  // Find friend by id
  const friend = friends.find(f => f.id === Number(id));

  // If friend not found, show not-found state with link to home
  if (!friend) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
          <Trash2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Friend Not Found</h2>
        <p className="text-sm text-slate-400 max-w-md mb-6">
          The friend profile you are looking for does not exist or may have been removed.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors shadow-lg shadow-emerald-900/40"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Friends
        </Link>
      </div>
    );
  }

  // Format next due date nicely if available
  const formatDueDate = (dateStr) => {
    if (!dateStr) return 'Not set';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Handle Quick Check-In
  const handleCheckIn = (type) => {
    const formattedType = type.charAt(0).toUpperCase() + type.slice(1);
    logCheckIn(friend.id, type);

    toast.success(`${formattedType} logged with ${friend.name}!`, {
      icon: '🎉',
      duration: 3500,
      style: {
        background: '#111827',
        color: '#f8fafc',
        border: '1px solid #10b981',
        borderRadius: '16px',
        padding: '12px 18px',
        fontWeight: '500'
      }
    });
  };

  // UI-only placeholders per PRD Section FR4
  const handleUiOnlyAction = (actionName) => {
    toast(`${actionName} action is a UI preview.`, {
      icon: 'ℹ️',
      style: {
        background: '#162032',
        color: '#cbd5e1',
        border: '1px solid #334155'
      }
    });
  };

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Back button */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors p-1 rounded-lg hover:bg-slate-800/40"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Friends</span>
        </button>
      </div>

      {/* Two columns layout (stacks on mobile per FR4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Info Card (4 cols on lg) */}
        <div className="lg:col-span-4 bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/40 text-center relative overflow-hidden">
          {/* Subtle accent light */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />

          {/* Picture */}
          <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 mb-5">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-800 shadow-xl bg-slate-800 flex items-center justify-center">
              {!imgError && friend.picture ? (
                <img
                  src={friend.picture}
                  alt={friend.name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-800 to-slate-900 text-emerald-200 font-bold text-3xl">
                  {getInitials(friend.name)}
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <h1 className="text-2xl font-bold text-white mb-2">
            {friend.name}
          </h1>

          {/* Status Badge */}
          <div className="flex justify-center mb-3">
            <StatusBadge status={friend.status} size="lg" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-5">
            {friend.tags && friend.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/80"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bio Quote */}
          {friend.bio && (
            <div className="my-5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-sm text-slate-300 italic text-center">
              "{friend.bio}"
            </div>
          )}

          {/* Preferred contact & email */}
          <div className="pt-2 pb-6 border-b border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="flex items-center justify-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>Preferred: email</span>
            </div>
            <div className="text-slate-300 font-mono text-[11px] truncate">
              {friend.email}
            </div>
          </div>

          {/* Action buttons (UI only per PRD) */}
          <div className="mt-6 space-y-2.5">
            <button
              onClick={() => handleUiOnlyAction('Snooze 2 weeks')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold tracking-wide border border-slate-700/80 transition-all hover:scale-[1.01]"
            >
              <Bell className="w-3.5 h-3.5 text-slate-400" />
              <span>Snooze 2 weeks</span>
            </button>
            <button
              onClick={() => handleUiOnlyAction('Archive')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold tracking-wide border border-slate-700/80 transition-all hover:scale-[1.01]"
            >
              <Archive className="w-3.5 h-3.5 text-slate-400" />
              <span>Archive</span>
            </button>
            <button
              onClick={() => handleUiOnlyAction('Delete')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 text-xs font-semibold tracking-wide border border-rose-500/20 transition-all hover:scale-[1.01]"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Right Column (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-6">

          {/* 1. Stats cards (3): Days Since Contact, Goal (days), Next Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Days Since Contact */}
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 text-center shadow-lg shadow-black/20">
              <div className="text-3xl sm:text-4xl font-black text-white">
                {friend.days_since_contact}
              </div>
              <div className="mt-2 text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                Days Since Contact
              </div>
            </div>

            {/* Goal (Days) */}
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 text-center shadow-lg shadow-black/20">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                {friend.goal}
              </div>
              <div className="mt-2 text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                Goal (Days)
              </div>
            </div>

            {/* Next Due */}
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 text-center shadow-lg shadow-black/20">
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {formatDueDate(friend.next_due_date)}
              </div>
              <div className="mt-2 text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                Next Due
              </div>
            </div>
          </div>

          {/* 2. Relationship Goal Card */}
          <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-lg shadow-black/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                Relationship Goal
              </h3>
              <button
                onClick={() => handleUiOnlyAction('Edit Goal')}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors inline-flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit
              </button>
            </div>
            <p className="text-sm sm:text-base text-slate-300 font-medium">
              Connect every <span className="text-emerald-400 font-semibold">{friend.goal} days</span> to keep this bond active and thriving.
            </p>
          </div>

          {/* 3. Quick Check-In Card */}
          <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-lg shadow-black/20">
            <div className="mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Quick Check-In
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Log an interaction with one click to update contact metrics and add to timeline
              </p>
            </div>

            {/* 3 Check-In Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Call Button */}
              <button
                onClick={() => handleCheckIn('call')}
                className="group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-[#162032] hover:bg-emerald-950/40 border border-slate-700/80 hover:border-emerald-500/50 text-white transition-all duration-200 shadow-md hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label={`Log call check-in with ${friend.name}`}
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-slate-100 group-hover:text-emerald-300">
                  Call
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">
                  Record phone call
                </span>
              </button>

              {/* Text Button */}
              <button
                onClick={() => handleCheckIn('text')}
                className="group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-[#162032] hover:bg-sky-950/40 border border-slate-700/80 hover:border-sky-500/50 text-white transition-all duration-200 shadow-md hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-label={`Log text message with ${friend.name}`}
              >
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 group-hover:bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3 transition-colors">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-slate-100 group-hover:text-sky-300">
                  Text
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">
                  Record message
                </span>
              </button>

              {/* Video Button */}
              <button
                onClick={() => handleCheckIn('video')}
                className="group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-[#162032] hover:bg-purple-950/40 border border-slate-700/80 hover:border-purple-500/50 text-white transition-all duration-200 shadow-md hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label={`Log video chat with ${friend.name}`}
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 transition-colors">
                  <Video className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-slate-100 group-hover:text-purple-300">
                  Video
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">
                  Record video chat
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FriendDetails;
