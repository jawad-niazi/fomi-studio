'use client';

import React from 'react';
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
  Sparkles,
  FileText,
} from 'lucide-react';

export default function TopNavbar({
  isDark,
  toggleTheme,
  activeTab,
  setActiveTab,
  creditsLeft = 78,
  maxCredits = 100,
  openDocModal,
}) {
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
        {/* Credit/Usage Pill Bar */}
        <div className="flex items-center gap-2 group cursor-pointer" title={`${creditsLeft} of ${maxCredits} Fast Generations left today`}>
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

      {/* Right: Actions, Theme, & User Profile */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Product Thinking Doc Button (Highlights candidate's product thinking) */}
        <button
          onClick={openDocModal}
          className="hidden lg:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full bg-[#f3eae0] dark:bg-[#1f2228] hover:bg-[#ede0d2] dark:hover:bg-[#2a2e36] text-[#6b5e52] dark:text-[#d3ccc4] transition-all border border-[#e5d8cb] dark:border-[#2d313a]"
          title="View Product Thinking & Design Rationale"
        >
          <FileText className="w-3.5 h-3.5 text-[#de896c]" />
          <span>Product Thinking Doc</span>
        </button>

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
          className="p-2 rounded-full hover:bg-[#f2e7dc] dark:hover:bg-[#1c1e22] text-[#685c53] dark:text-[#c7bfb6] transition-colors"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Profile Avatar */}
        <div className="relative cursor-pointer group">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#de896c]/40 group-hover:ring-[#de896c] transition-all">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Creator Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-[#0e0f11]" />
        </div>
      </div>
    </header>
  );
}
