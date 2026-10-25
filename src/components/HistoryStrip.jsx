'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

export default function HistoryStrip({ historyItems, onSelectHistory }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full px-4 md:px-6 pt-3 pb-2">
      <div className="bg-white dark:bg-[#14161a] rounded-2xl p-2.5 shadow-sm border border-[#ede3d8] dark:border-[#21242c] flex items-center gap-3 relative group">
        {/* Left 'History - View All' Card */}
        <div className="flex flex-col items-center justify-center px-4 py-2 bg-[#faf6f1] dark:bg-[#1a1c22] rounded-xl border border-[#efe5da] dark:border-[#282c35] min-w-[88px] cursor-pointer hover:border-[#de896c] transition-all flex-shrink-0">
          <div className="flex items-center gap-1">
            <span className="font-bold text-xs text-[#2b2420] dark:text-[#f2ebe4]">History</span>
          </div>
          <span className="text-[10px] text-[#9c8e82] dark:text-[#a09489] hover:underline mt-0.5">
            View All
          </span>
        </div>

        {/* Scroll Left Button */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-28 z-10 w-7 h-7 rounded-full bg-white/90 dark:bg-[#1e2128]/90 shadow-md items-center justify-center text-[#594d44] dark:text-[#d3ccc4] hover:scale-105 transition-all opacity-0 group-hover:opacity-100"
          title="Scroll Left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Thumbnails Scroll Container */}
        <div
          ref={scrollRef}
          className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5 flex-1"
        >
          {historyItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectHistory(item)}
              className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden flex-shrink-0 group/item border border-[#ebe1d5] dark:border-[#2b2f38] hover:border-[#de896c] hover:scale-105 transition-all duration-200 cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-[#de896c]"
              title={`Click to load: "${item.prompt}"`}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover/item:brightness-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[9px] text-white font-medium px-1 text-center line-clamp-2">
                  Use Prompt
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-3 z-10 w-7 h-7 rounded-full bg-white/90 dark:bg-[#1e2128]/90 shadow-md items-center justify-center text-[#594d44] dark:text-[#d3ccc4] hover:scale-105 transition-all opacity-0 group-hover:opacity-100"
          title="Scroll Right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
