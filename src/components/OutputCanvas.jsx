'use client';

import React, { useState } from 'react';
import {
  Copy,
  Check,
  Maximize2,
  Sparkles,
  Download,
  Share2,
  RotateCcw,
  Sliders,
  ZoomIn,
} from 'lucide-react';

export default function OutputCanvas({
  batches,
  isGenerating,
  generatingPrompt,
  generatingModel,
  onOpenImage,
  onUsePrompt,
  onCopyPrompt,
  copiedPromptId,
}) {
  const [expandedPrompts, setExpandedPrompts] = useState({});

  const toggleExpand = (id) => {
    setExpandedPrompts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <main className="flex-1 min-w-0 flex flex-col gap-6">
      {/* Active Generating Shimmer Skeleton Card (Non-blocking queue feedback) */}
      {isGenerating && (
        <div className="bg-white/80 dark:bg-[#14161b]/80 backdrop-blur-md rounded-3xl p-4 md:p-5 border border-[#de896c]/40 shadow-sm animate-pulse flex flex-col md:flex-row gap-4">
          {/* Skeleton Prompt Card */}
          <div className="md:w-72 lg:w-80 p-4 rounded-2xl bg-[#faf4ed] dark:bg-[#1c1f26] border border-[#f0e4d7] dark:border-[#2a2e38] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#de896c] animate-spin" />
                <span className="text-xs font-semibold text-[#de896c]">
                  Generating 4 variations...
                </span>
              </div>
              <p className="text-xs text-[#52453c] dark:text-[#cfc6be] italic line-clamp-5">
                "{generatingPrompt}"
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#ebdacf] dark:border-[#2b2f3a]">
              <span className="text-[10px] text-[#9c8e82]">Diffusion Engine</span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#f3e7dc] dark:bg-[#252932] text-[#6b5d51] dark:text-[#d3ccc4]">
                {generatingModel}
              </span>
            </div>
          </div>

          {/* Skeleton 4-Image Grid with shimmer waves */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-2xl bg-gradient-to-tr from-[#f3e7dc] to-[#e8d7c8] dark:from-[#1e2129] dark:to-[#292d37] animate-pulse flex items-center justify-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                <Sparkles className="w-5 h-5 text-[#de896c]/50" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generation Batches matching the exact mockup layout */}
      {batches.map((batch) => (
        <section
          key={batch.id}
          className="flex flex-col xl:flex-row gap-3.5 items-stretch group"
        >
          {/* Left Prompt Card */}
          <div className="w-full xl:w-72 xl:min-w-[280px] p-4 rounded-2xl bg-[#fbf5f0] dark:bg-[#16181d] border border-[#efe3d6] dark:border-[#262932] flex flex-col justify-between shadow-2xs hover:border-[#de896c]/60 transition-colors">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[#a39487] dark:text-[#7f8695] uppercase tracking-wider">
                  Prompt
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onCopyPrompt(batch.prompt, batch.id)}
                    className="p-1 text-[#8c7e73] hover:text-[#de896c] rounded-md hover:bg-white dark:hover:bg-[#222630] transition-colors"
                    title="Copy Prompt"
                  >
                    {copiedPromptId === batch.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => onUsePrompt(batch.prompt, batch.model)}
                    className="p-1 text-[#8c7e73] hover:text-[#de896c] rounded-md hover:bg-white dark:hover:bg-[#222630] transition-colors"
                    title="Remix / Edit in Prompt Box"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <p
                  className={`text-xs leading-relaxed text-[#3b322c] dark:text-[#ede4dc] font-normal select-text transition-all ${
                    !expandedPrompts[batch.id] ? 'line-clamp-5' : ''
                  }`}
                >
                  {batch.prompt}
                </p>
                {batch.prompt.length > 180 && (
                  <button
                    type="button"
                    onClick={() => toggleExpand(batch.id)}
                    className="mt-1.5 text-[10px] font-semibold text-[#de896c] hover:underline cursor-pointer"
                  >
                    {expandedPrompts[batch.id] ? 'Show less' : 'Show more...'}
                  </button>
                )}
              </div>
            </div>

            {/* Model Badge at bottom right matching the mockup */}
            <div className="flex items-center justify-end mt-4 pt-2 border-t border-[#f0e3d6] dark:border-[#262a34]">
              <span className="text-[11px] font-medium px-3 py-1 rounded-lg bg-white dark:bg-[#21242d] border border-[#ebdcd0] dark:border-[#2d313c] text-[#4d4239] dark:text-[#d3cbd2] shadow-2xs">
                Model: {batch.model}
              </span>
            </div>
          </div>

          {/* Right Image Variations Grid */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {batch.images.map((image, idx) => (
              <div
                key={image.id || idx}
                onClick={() => onOpenImage(image, batch)}
                className="group/img relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#f0e6dc] dark:bg-[#1a1c22] border border-[#ede1d5] dark:border-[#262933] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
              >
                <img
                  src={image.url}
                  alt={image.alt || 'Generated image'}
                  className="w-full h-full object-cover group-hover/img:scale-103 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Subtle gradient vignette overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
                  <div className="flex justify-end">
                    <span className="text-[10px] bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-full font-mono">
                      {image.resolution || '2K'}
                    </span>
                  </div>

                  {/* Quick Action Buttons on Image Hover */}
                  <div className="flex items-center justify-between gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUsePrompt(batch.prompt, batch.model);
                      }}
                      className="px-2 py-1 rounded-lg bg-white/90 hover:bg-white text-black text-[11px] font-medium flex items-center gap-1 shadow-sm transition-all"
                      title="Use as variation base"
                    >
                      <Sparkles className="w-3 h-3 text-[#de896c]" />
                      <span>Remix</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenImage(image, batch);
                        }}
                        className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
                        title="Zoom / Inspect"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={image.url}
                        download={`fomi-render-${image.id}.jpg`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
                        title="Download"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
