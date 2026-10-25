'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Home,
  ImageIcon,
  Video,
  Wand2,
  Folder,
  LayoutGrid,
  Headphones,
  Moon,
  Sun,
  Settings,
  CreditCard,
  Key,
  LogOut,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export default function TopNavbar({
  isDark,
  toggleTheme,
  activeTab,
  setActiveTab,
  creditsLeft = 78,
  maxCredits = 100,
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full h-16 px-4 md:px-6 flex items-center justify-between border-b transition-colors duration-200 z-30 select-none bg-[#fbf9f6] dark:bg-[#0e0f11] border-[#f0e8df] dark:border-[#1e2024]">
      {/* Left: Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-2xl tracking-tighter text-black dark:text-white cursor-pointer hover:opacity-80 transition-opacity">
          F
        </div>
        <span className="hidden sm:inline-block font-bold text-sm tracking-widest text-[#2d2825] dark:text-[#ede7e1] uppercase">
          FOMI
        </span>
      </div>

      {/* Center: Usage/Quota meter + Navigation Tools */}
      <div className="flex flex-col items-center gap-1.5">
        {/* Credit/Usage Pill Bar matching mockup */}
        <div
          className="flex items-center gap-2 group cursor-pointer"
          title={`${creditsLeft} of ${maxCredits} Fast Generations left today`}
        >
          <div className="w-44 md:w-60 h-2 bg-[#f0e3d8] dark:bg-[#25282e] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-[#de896c] rounded-full transition-all duration-500"
              style={{ width: `${(creditsLeft / maxCredits) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-semibold text-[#8e8278] dark:text-[#a09a93] tracking-wide">
            {creditsLeft}/{maxCredits}
          </span>
        </div>

        {/* Workspace Mode Icons */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`p-1.5 rounded-lg transition-colors ${
              activeTab === 'home'
                ? 'text-[#de896c] bg-[#faeee8] dark:bg-[#2b1f1a]'
                : 'text-[#8e8278] hover:text-black dark:hover:text-white'
            }`}
            title="Home"
          >
            <Home className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`p-1.5 rounded-lg transition-colors ${
              activeTab === 'image'
                ? 'text-[#de896c] bg-[#faeee8] dark:bg-[#2b1f1a]'
                : 'text-[#8e8278] hover:text-black dark:hover:text-white'
            }`}
            title="Image Generation Studio"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`p-1.5 rounded-lg transition-colors ${
              activeTab === 'video'
                ? 'text-[#de896c] bg-[#faeee8] dark:bg-[#2b1f1a]'
                : 'text-[#8e8278] hover:text-black dark:hover:text-white'
            }`}
            title="Video Generation Studio"
          >
            <Video className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            className={`p-1.5 rounded-lg transition-colors ${
              activeTab === 'edit'
                ? 'text-[#de896c] bg-[#faeee8] dark:bg-[#2b1f1a]'
                : 'text-[#8e8278] hover:text-black dark:hover:text-white'
            }`}
            title="AI Inpainting & Canvas Editor"
          >
            <Wand2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`p-1.5 rounded-lg transition-colors ${
              activeTab === 'projects'
                ? 'text-[#de896c] bg-[#faeee8] dark:bg-[#2b1f1a]'
                : 'text-[#8e8278] hover:text-black dark:hover:text-white'
            }`}
            title="Project Folders"
          >
            <Folder className="w-4 h-4" />
          </button>
        </nav>
      </div>

      {/* Right: Actions, Theme, & User Profile Dropdown */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Gallery */}
        <button
          className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-[#f2e7dc] dark:hover:bg-[#1c1e22] text-[#685c53] dark:text-[#c7bfb6] transition-colors"
          title="Community Showcase"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Gallery</span>
        </button>

        {/* Support */}
        <button
          className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-[#f2e7dc] dark:hover:bg-[#1c1e22] text-[#685c53] dark:text-[#c7bfb6] transition-colors"
          title="Help & Support"
        >
          <Headphones className="w-3.5 h-3.5" />
          <span>Support</span>
        </button>

        {/* Dark / Light Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-[#f2e7dc] dark:hover:bg-[#1c1e22] text-[#685c53] dark:text-[#c7bfb6] transition-all cursor-pointer active:scale-90"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="w-4 h-4 hover:-rotate-12 transition-transform" />
          )}
        </button>

        {/* Profile Avatar with Interactive Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-1 cursor-pointer focus:outline-none"
            title="Account Menu"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#de896c]/50 hover:ring-[#de896c] transition-all relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Creator Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-[#0e0f11]" />
          </button>

          {/* Account Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#181a20] border border-[#e8ded3] dark:border-[#2b2f3a] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* User Header */}
              <div className="px-4 py-3 border-b border-[#f0e6dc] dark:border-[#262933]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2d2520] dark:text-[#f2ebe5]">
                    Hamza Tariq
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#faeee8] dark:bg-[#2b1f1a] text-[#de896c] border border-[#f0d5c8] dark:border-[#42291f]">
                    PRO
                  </span>
                </div>
                <p className="text-[11px] text-[#8e8074] dark:text-[#9ea6b5] truncate mt-0.5">
                  creator@fomi.art
                </p>

                {/* Quota in Dropdown */}
                <div className="mt-2.5 pt-2 border-t border-[#f2e9e0] dark:border-[#242730]">
                  <div className="flex justify-between text-[10px] text-[#786c62] dark:text-[#9ea6b5] mb-1">
                    <span>Fast Generations</span>
                    <span className="font-semibold text-[#de896c]">{creditsLeft}/{maxCredits}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#f0e3d8] dark:bg-[#25282e] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#de896c] rounded-full"
                      style={{ width: `${(creditsLeft / maxCredits) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Menu Links */}
              <div className="py-1 text-xs text-[#52453c] dark:text-[#d3cbd2]">
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full px-4 py-2 flex items-center gap-2.5 hover:bg-[#faf4ed] dark:hover:bg-[#22252e] transition-colors text-left"
                >
                  <Settings className="w-3.5 h-3.5 text-[#8e8074]" />
                  <span>Workspace Settings</span>
                </button>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full px-4 py-2 flex items-center gap-2.5 hover:bg-[#faf4ed] dark:hover:bg-[#22252e] transition-colors text-left"
                >
                  <Key className="w-3.5 h-3.5 text-[#8e8074]" />
                  <span>API Keys & Webhooks</span>
                </button>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full px-4 py-2 flex items-center gap-2.5 hover:bg-[#faf4ed] dark:hover:bg-[#22252e] transition-colors text-left"
                >
                  <CreditCard className="w-3.5 h-3.5 text-[#8e8074]" />
                  <span>Billing & Subscription</span>
                </button>
              </div>

              {/* Sign Out */}
              <div className="pt-1 mt-1 border-t border-[#f0e6dc] dark:border-[#262933]">
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full px-4 py-2 flex items-center gap-2.5 text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors text-left font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
