import React, { createContext, useContext, useState, useEffect } from 'react';
import initialFriends from '../data/friends.json';

const TimelineContext = createContext();

// Pre-seeded timeline matching the design mockup (Page 3)
const SEED_TIMELINE = [
  {
    id: "seed-1",
    friendId: 10,
    type: "meetup",
    title: "meetup with Tom Baker",
    date: "March 29, 2026",
    timestamp: new Date("2026-03-29").getTime()
  },
  {
    id: "seed-2",
    friendId: 5,
    type: "text",
    title: "text with Sarah Chen",
    date: "March 28, 2026",
    timestamp: new Date("2026-03-28").getTime()
  },
  {
    id: "seed-3",
    friendId: 8,
    type: "meetup",
    title: "meetup with Olivia Martinez",
    date: "March 26, 2026",
    timestamp: new Date("2026-03-26").getTime()
  },
  {
    id: "seed-4",
    friendId: 7,
    type: "video",
    title: "video with Aisha Patel",
    date: "March 23, 2026",
    timestamp: new Date("2026-03-23").getTime()
  },
  {
    id: "seed-5",
    friendId: 5,
    type: "meetup",
    title: "meetup with Sarah Chen",
    date: "March 21, 2026",
    timestamp: new Date("2026-03-21").getTime()
  },
  {
    id: "seed-6",
    friendId: 6,
    type: "call",
    title: "Call with Marcus Johnson",
    date: "March 19, 2026",
    timestamp: new Date("2026-03-19").getTime()
  },
  {
    id: "seed-7",
    friendId: 7,
    type: "meetup",
    title: "meetup with Aisha Patel",
    date: "March 17, 2026",
    timestamp: new Date("2026-03-17").getTime()
  },
  {
    id: "seed-8",
    friendId: 8,
    type: "text",
    title: "text with Olivia Martinez",
    date: "March 13, 2026",
    timestamp: new Date("2026-03-13").getTime()
  },
  {
    id: "seed-9",
    friendId: 3,
    type: "call",
    title: "Call with Lisa Nakamura",
    date: "March 11, 2026",
    timestamp: new Date("2026-03-11T14:00:00").getTime()
  },
  {
    id: "seed-10",
    friendId: 5,
    type: "call",
    title: "Call with Sarah Chen",
    date: "March 11, 2026",
    timestamp: new Date("2026-03-11T10:00:00").getTime()
  },
  {
    id: "seed-11",
    friendId: 6,
    type: "video",
    title: "video with Marcus Johnson",
    date: "March 6, 2026",
    timestamp: new Date("2026-03-06").getTime()
  },
  {
    id: "seed-12",
    friendId: 9,
    type: "video",
    title: "video with Ryan O'Brien",
    date: "February 24, 2026",
    timestamp: new Date("2026-02-24").getTime()
  }
];

export const TimelineProvider = ({ children }) => {
  const [friends, setFriends] = useState(() => {
    try {
      const saved = localStorage.getItem('keenkeeper_friends');
      return saved ? JSON.parse(saved) : initialFriends;
    } catch {
      return initialFriends;
    }
  });

  const [timeline, setTimeline] = useState(() => {
    try {
      const saved = localStorage.getItem('keenkeeper_timeline');
      return saved ? JSON.parse(saved) : SEED_TIMELINE;
    } catch {
      return SEED_TIMELINE;
    }
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('keenkeeper_friends', JSON.stringify(friends));
    } catch (e) {
      console.error("Failed to save friends to localStorage:", e);
    }
  }, [friends]);

  useEffect(() => {
    try {
      localStorage.setItem('keenkeeper_timeline', JSON.stringify(timeline));
    } catch (e) {
      console.error("Failed to save timeline to localStorage:", e);
    }
  }, [timeline]);

  // Log a check-in action (Call, Text, Video)
  const logCheckIn = (friendId, type) => {
    const friend = friends.find(f => f.id === Number(friendId));
    if (!friend) return null;

    const formattedType = type.charAt(0).toUpperCase() + type.slice(1);
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    // ISO next due date calculation based on friend's goal
    const nextDate = new Date(now.getTime() + (friend.goal || 30) * 24 * 60 * 60 * 1000);
    const nextDueDateStr = nextDate.toISOString().split('T')[0];

    const newEntry = {
      id: Date.now().toString(),
      friendId: friend.id,
      type: type.toLowerCase(),
      title: `${formattedType} with ${friend.name}`,
      date: formattedDate,
      timestamp: now.getTime()
    };

    // Prepend newest entry
    setTimeline(prev => [newEntry, ...prev]);

    // Update friend status and days since contact
    setFriends(prev =>
      prev.map(f => {
        if (f.id === friend.id) {
          return {
            ...f,
            days_since_contact: 0,
            status: 'on-track',
            next_due_date: nextDueDateStr
          };
        }
        return f;
      })
    );

    return newEntry;
  };

  // Add friend
  const addFriend = (newFriend) => {
    const friend = {
      ...newFriend,
      id: Date.now(),
      days_since_contact: 0,
      status: 'on-track',
      next_due_date: new Date(Date.now() + (newFriend.goal || 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    setFriends(prev => [friend, ...prev]);
    return friend;
  };

  // Reset to original data
  const resetData = () => {
    setFriends(initialFriends);
    setTimeline(SEED_TIMELINE);
    localStorage.removeItem('keenkeeper_friends');
    localStorage.removeItem('keenkeeper_timeline');
  };

  // Computed summary metrics
  const totalFriends = friends.length;
  const onTrackCount = friends.filter(f => f.status === 'on-track').length;
  const needAttentionCount = friends.filter(f => f.status === 'overdue' || f.status === 'almost due').length;
  // Interactions in recent 30-day window or total
  const interactionsThisMonth = timeline.length;

  return (
    <TimelineContext.Provider
      value={{
        friends,
        timeline,
        logCheckIn,
        addFriend,
        resetData,
        stats: {
          totalFriends,
          onTrackCount,
          needAttentionCount,
          interactionsThisMonth
        }
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimeline = () => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error('useTimeline must be used within a TimelineProvider');
  }
  return context;
};
