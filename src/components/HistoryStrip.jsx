'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function HistoryStrip({
  historyItems,
  onSelectHistory,
  isGenerating,
  selectedHistoryId,
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to dynamically show/hide navigation arrows
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
  };

  // Auto-scroll to beginning when generating starts or new item is added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [isGenerating, historyItems.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Attach non-passive wheel listener for high-speed horizontal mouse wheel scroll
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 2.2;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('scroll', checkScroll, { passive: true });

    checkScroll();

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('scroll', checkScroll);
    };
  }, [historyItems]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full px-4 md:px-6 pt-3 pb-2">
      <div className="bg-white dark:bg-[#14161a] rounded-2xl p-2.5 shadow-sm border border-[#ede3d8] dark:border-[#21242c] flex items-center gap-3 relative group overflow-hidden">
        {/* Left 'History - View All' Card */}
        <div className="flex flex-col items-center justify-center px-4 py-2 bg-[#faf6f1] dark:bg-[#1a1c22] rounded-xl border border-[#efe5da] dark:border-[#282c35] min-w-[88px] cursor-pointer hover:border-[#de896c] transition-all flex-shrink-0 z-20 shadow-2xs">
          <div className="flex items-center gap-1">
            <span className="font-bold text-xs text-[#2b2420] dark:text-[#f2ebe4]">History</span>
          </div>
          <span className="text-[10px] text-[#9c8e82] dark:text-[#a09489] hover:underline mt-0.5">
            View All
          </span>
        </div>

        {/* Dynamic Left Arrow with Soft Fade: Hidden at initial scroll position */}
        <div
          className={`absolute left-[100px] z-20 h-full flex items-center pr-4 pl-1 bg-gradient-to-r from-white via-white/90 to-transparent dark:from-[#14161a] dark:via-[#14161a]/90 dark:to-transparent transition-opacity duration-200 ${
            canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={() => scroll('left')}
            className="w-7 h-7 rounded-full bg-white dark:bg-[#20242e] shadow-md border border-[#e5ded5] dark:border-[#2c313d] flex items-center justify-center text-[#594d44] dark:text-[#d3ccc4] hover:text-[#df795d] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Thumbnails Scroll Container with High-Speed Wheel Support */}
        <div
          ref={scrollRef}
          className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5 flex-1 relative"
        >
          {/* Active Generation Shimmer Slot in History */}
          {isGenerating && (
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 border-[#df795d] bg-[#fbf2ed] dark:bg-[#2b1f1a] animate-pulse flex flex-col items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-[#df795d] animate-spin mb-0.5" />
              <span className="text-[8px] font-bold text-[#df795d] uppercase tracking-wider">
                Cooking
              </span>
            </div>
          )}

          {historyItems.map((item) => {
            const isSelected = selectedHistoryId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectHistory(item)}
                className={`relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden flex-shrink-0 group/item border transition-all duration-200 cursor-pointer shadow-xs focus:outline-none ${
                  isSelected
                    ? 'ring-2 ring-[#df795d] border-[#df795d] scale-105'
                    : 'border-[#ebe1d5] dark:border-[#2b2f38] hover:border-[#df795d] hover:scale-105'
                }`}
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
            );
          })}
        </div>

        {/* Dynamic Right Arrow with Soft Fade: Hidden at end of scroll */}
        <div
          className={`absolute right-0 z-20 h-full flex items-center pl-4 pr-3 bg-gradient-to-l from-white via-white/90 to-transparent dark:from-[#14161a] dark:via-[#14161a]/90 dark:to-transparent transition-opacity duration-200 ${
            canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={() => scroll('right')}
            className="w-7 h-7 rounded-full bg-white dark:bg-[#20242e] shadow-md border border-[#e5ded5] dark:border-[#2c313d] flex items-center justify-center text-[#594d44] dark:text-[#d3ccc4] hover:text-[#de896c] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
