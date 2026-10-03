import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import FriendCard from '../components/FriendCard';
import Loader from '../components/Loader';
import { useTimeline } from '../context/TimelineContext';

export const Home = () => {
  const { friends } = useTimeline();
  const [loading, setLoading] = useState(true);

  // Simulated fetch delay as specified in PRD FR3 & FR8
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Banner with 4 summary cards */}
      <Banner />

      {/* Your Friends Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Your Friends
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Select a friend to view connection history or log a quick check-in
            </p>
          </div>
          <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {friends.length} Connections
          </span>
        </div>

        {/* Loading State or Friend Grid */}
        {loading ? (
          <Loader message="Fetching your friendship circle..." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 animate-in fade-in duration-300">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
