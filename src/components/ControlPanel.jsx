'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ChevronDown,
  Wand,
  Sliders,
  Palette,
  Shuffle,
  X,
  Layers,
  Ratio,
  Cpu,
} from 'lucide-react';
import { AVAILABLE_MODELS, ASPECT_RATIOS, STYLE_PRESETS } from '../data/mockData';

export default function ControlPanel({
  mode,
  setMode,
  prompt,
  setPrompt,
  onGenerate,
  isGenerating,
  numImages,
  setNumImages,
  aspectRatio,
  setAspectRatio,
  selectedModel,
  setSelectedModel,
  onEnhancePrompt,
}) {
  const [showAdvance, setShowAdvance] = useState(false);
  const [showStyles, setShowStyles] = useState(false);
  const [negativePrompt, setNegativePrompt] = useState('blurry, deformed, low quality, bad anatomy, text, watermark');
  const [seed, setSeed] = useState('');
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [activeStyles, setActiveStyles] = useState(['photorealistic']);

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      onGenerate();
    }
  };

  const toggleStyle = (styleId, tag) => {
    if (activeStyles.includes(styleId)) {
      setActiveStyles(activeStyles.filter((s) => s !== styleId));
    } else {
      setActiveStyles([...activeStyles, styleId]);
      // If user clicks a style and prompt doesn't already contain it, optionally enrich prompt
      if (!prompt.includes(tag.split(',')[0])) {
        setPrompt((prev) => (prev ? `${prev}, ${tag.split(',')[0]}` : tag.split(',')[0]));
      }
    }
  };

  return (
    <aside className="w-full lg:w-[360px] xl:w-[390px] flex-shrink-0 flex flex-col gap-3">
      {/* Main Control Card matching the peach/cream mockup */}
      <div className="bg-[#fbf5f0] dark:bg-[#16181d] rounded-3xl p-4 md:p-5 border border-[#efe3d6] dark:border-[#262932] shadow-sm flex flex-col gap-4">
        {/* Mode Switcher: Image / Video */}
        <div className="flex items-center justify-between p-1 bg-[#efe2d4] dark:bg-[#20232b] rounded-full w-full">
          <button
            onClick={() => setMode('image')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all text-center ${
              mode === 'image'
                ? 'bg-white dark:bg-[#2c303b] text-[#2c2420] dark:text-white shadow-xs'
                : 'text-[#8b7d72] dark:text-[#9ea4b0] hover:text-black dark:hover:text-white'
            }`}
          >
            Image
          </button>
          <button
            onClick={() => setMode('video')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all text-center ${
              mode === 'video'
                ? 'bg-white dark:bg-[#2c303b] text-[#2c2420] dark:text-white shadow-xs'
                : 'text-[#8b7d72] dark:text-[#9ea4b0] hover:text-black dark:hover:text-white'
            }`}
          >
            Video
          </button>
        </div>

        {/* Prompt Input Box */}
        <div className="relative bg-white dark:bg-[#1f2229] rounded-2xl border border-[#ebdcd0] dark:border-[#2b2f3a] p-3.5 focus-within:border-[#de896c] focus-within:ring-2 focus-within:ring-[#de896c]/20 transition-all shadow-2xs">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={5}
            placeholder="Describe your imaginations to be converted to piece of art..."
            className="w-full bg-transparent resize-none text-xs md:text-sm text-[#2b2521] dark:text-[#ede6df] placeholder-[#a6998f] dark:placeholder-[#787f8d] outline-none leading-relaxed"
          />

          {/* Prompt Toolbar inside the box: AI Wand & Clear */}
          <div className="flex items-center justify-between pt-2 border-t border-[#f5ede4] dark:border-[#2a2e38] mt-1">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onEnhancePrompt}
                className="flex items-center gap-1 text-[11px] font-medium text-[#c4775d] dark:text-[#e89b82] hover:bg-[#faede6] dark:hover:bg-[#2e2320] px-2 py-1 rounded-md transition-colors"
                title="AI Magic Enhance: enrich prompt with lighting & camera details"
              >
                <Wand className="w-3 h-3" />
                <span>Enhance</span>
              </button>
              {prompt && (
                <button
                  type="button"
                  onClick={() => setPrompt('')}
                  className="p-1 text-[#a6998f] hover:text-black dark:hover:text-white rounded-md transition-colors"
                  title="Clear text"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Coral Generate Button matching the mockup */}
            <button
              onClick={onGenerate}
              disabled={isGenerating || !prompt.trim()}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-xs text-white shadow-sm transition-all duration-200 ${
                isGenerating || !prompt.trim()
                  ? 'bg-[#de896c]/60 cursor-not-allowed'
                  : 'bg-[#de896c] hover:bg-[#d07b5e] hover:shadow-md active:scale-98 cursor-pointer'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Synthesizing...' : 'Generate'}</span>
            </button>
          </div>
        </div>

        {/* Keyboard hint */}
        <div className="flex items-center justify-between text-[10px] text-[#9c8e82] dark:text-[#888e9b] px-1">
          <span>Pro tip: Press <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#21242c] border border-[#e8ded3] dark:border-[#2d313a] font-mono text-[9px] shadow-2xs">⌘ + Enter</kbd> to generate</span>
          <span>Fast Mode</span>
        </div>

        {/* Quick Parameters Row: # Images, Aspect Ratio, Model */}
        <div className="grid grid-cols-3 gap-2">
          {/* # Images Dropdown */}
          <div className="relative group">
            <select
              value={numImages}
              onChange={(e) => setNumImages(Number(e.target.value))}
              className="w-full appearance-none bg-white dark:bg-[#1f2229] border border-[#ebdcd0] dark:border-[#2b2f3a] text-[#2b2521] dark:text-[#ede6df] text-xs font-medium py-2 px-2.5 rounded-xl pr-6 cursor-pointer focus:outline-none focus:border-[#de896c]"
            >
              <option value={1}># 1 Image</option>
              <option value={2}># 2 Images</option>
              <option value={4}># 4 Images</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#9c8e82] dark:text-[#888e9b] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Aspect Ratio Dropdown */}
          <div className="relative group">
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="w-full appearance-none bg-white dark:bg-[#1f2229] border border-[#ebdcd0] dark:border-[#2b2f3a] text-[#2b2521] dark:text-[#ede6df] text-xs font-medium py-2 px-2.5 rounded-xl pr-6 cursor-pointer focus:outline-none focus:border-[#de896c]"
            >
              {ASPECT_RATIOS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#9c8e82] dark:text-[#888e9b] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Model Selector Dropdown */}
          <div className="relative group">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full appearance-none bg-white dark:bg-[#1f2229] border border-[#ebdcd0] dark:border-[#2b2f3a] text-[#2b2521] dark:text-[#ede6df] text-xs font-medium py-2 px-2 rounded-xl pr-6 cursor-pointer focus:outline-none focus:border-[#de896c] truncate"
            >
              {AVAILABLE_MODELS.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#9c8e82] dark:text-[#888e9b] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Advance Accordion */}
        <div className="w-full">
          <button
            onClick={() => setShowAdvance(!showAdvance)}
            className="w-full flex items-center justify-between py-2 px-4 rounded-xl bg-white dark:bg-[#1f2229] border border-[#ebdcd0] dark:border-[#2b2f3a] text-xs font-medium text-[#4a4038] dark:text-[#d3ccc4] hover:border-[#de896c] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-[#de896c]" />
              <span>Advance</span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#9c8e82] transition-transform duration-200 ${
                showAdvance ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showAdvance && (
            <div className="mt-2 p-3 bg-white/70 dark:bg-[#1b1e25] rounded-xl border border-[#ebdcd0] dark:border-[#2b2f3a] flex flex-col gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-[#7d7065] dark:text-[#a09489] mb-1">
                  Negative Prompt
                </label>
                <input
                  type="text"
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  placeholder="Things to avoid..."
                  className="w-full bg-white dark:bg-[#222630] border border-[#e8ded3] dark:border-[#2e333e] rounded-lg p-2 text-xs text-[#2b2521] dark:text-[#ede6df] outline-none focus:border-[#de896c]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-medium text-[#7d7065] dark:text-[#a09489]">CFG Scale</span>
                    <span className="text-[10px] text-[#9c8e82]">{guidanceScale}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.5"
                    value={guidanceScale}
                    onChange={(e) => setGuidanceScale(parseFloat(e.target.value))}
                    className="w-full accent-[#de896c]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-medium text-[#7d7065] dark:text-[#a09489]">Seed</span>
                    <button
                      type="button"
                      onClick={() => setSeed(Math.floor(Math.random() * 9999999).toString())}
                      className="text-[10px] text-[#de896c] flex items-center gap-0.5 hover:underline"
                    >
                      <Shuffle className="w-2.5 h-2.5" /> Random
                    </button>
                  </div>
                  <input
                    type="text"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                    placeholder="Random seed"
                    className="w-full bg-white dark:bg-[#222630] border border-[#e8ded3] dark:border-[#2e333e] rounded-lg p-1.5 text-xs text-[#2b2521] dark:text-[#ede6df] outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Styles Accordion */}
        <div className="w-full">
          <button
            onClick={() => setShowStyles(!showStyles)}
            className="w-full flex items-center justify-between py-2 px-4 rounded-xl bg-white dark:bg-[#1f2229] border border-[#ebdcd0] dark:border-[#2b2f3a] text-xs font-medium text-[#4a4038] dark:text-[#d3ccc4] hover:border-[#de896c] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Palette className="w-3.5 h-3.5 text-[#de896c]" />
              <span>Styles</span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#9c8e82] transition-transform duration-200 ${
                showStyles ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showStyles && (
            <div className="mt-2 p-3 bg-white/70 dark:bg-[#1b1e25] rounded-xl border border-[#ebdcd0] dark:border-[#2b2f3a] flex flex-wrap gap-1.5">
              {STYLE_PRESETS.map((style) => {
                const isActive = activeStyles.includes(style.id);
                return (
                  <button
                    key={style.id}
                    onClick={() => toggleStyle(style.id, style.tag)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#de896c] text-white shadow-2xs'
                        : 'bg-white dark:bg-[#232732] border border-[#e8ded3] dark:border-[#2e333e] text-[#5c5046] dark:text-[#b8c0cc] hover:border-[#de896c]'
                    }`}
                  >
                    {style.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
