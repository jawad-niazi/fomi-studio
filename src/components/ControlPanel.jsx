'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  ChevronDown,
  Wand,
  Sliders,
  Palette,
  Shuffle,
  X,
  Check,
  Layers,
  Square,
  RectangleVertical,
  RectangleHorizontal,
  Smartphone,
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
  seed: externalSeed,
  setSeed: externalSetSeed,
}) {
  const [showAdvance, setShowAdvance] = useState(false);
  const [showStyles, setShowStyles] = useState(false);
  const [negativePrompt, setNegativePrompt] = useState('blurry, deformed, low quality, bad anatomy, text, watermark');
  const [internalSeed, setInternalSeed] = useState('');
  const seed = externalSeed !== undefined ? externalSeed : internalSeed;
  const setSeed = externalSetSeed || setInternalSeed;
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [activeStyles, setActiveStyles] = useState(['photorealistic']);

  // Auto-open Advanced when a seed is imported/forked from an image
  useEffect(() => {
    if (externalSeed) {
      setShowAdvance(true);
    }
  }, [externalSeed]);

  // Custom Dropdown Menus state
  const [openDropdown, setOpenDropdown] = useState(null); // 'images' | 'ratio' | 'model' | null
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      if (!prompt.includes(tag.split(',')[0])) {
        setPrompt((prev) => (prev ? `${prev}, ${tag.split(',')[0]}` : tag.split(',')[0]));
      }
    }
  };

  const getRatioIcon = (ratio) => {
    switch (ratio) {
      case '1:1':
        return <Square className="w-3.5 h-3.5" />;
      case '3:4':
        return <RectangleVertical className="w-3.5 h-3.5" />;
      case '9:16':
        return <Smartphone className="w-3.5 h-3.5" />;
      case '16:9':
        return <RectangleHorizontal className="w-3.5 h-3.5" />;
      default:
        return <Square className="w-3.5 h-3.5" />;
    }
  };

  return (
    <aside className="w-full lg:w-[360px] xl:w-[380px] flex-shrink-0 flex flex-col gap-3 select-none">
      {/* Main Control Card */}
      <div className="bg-[#fcf8f4] dark:bg-[#16181d] rounded-3xl p-4 md:p-5 border border-[#f2eae0] dark:border-[#252830] shadow-sm flex flex-col gap-3.5 transition-all">
        {/* Mode Switcher: Image / Video */}
        <div className="flex items-center justify-between p-1 bg-[#efe7de] dark:bg-[#20232b] rounded-2xl w-full">
          <button
            onClick={() => setMode('image')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 text-center ${
              mode === 'image'
                ? 'bg-white dark:bg-[#2c303b] text-[#2c2420] dark:text-white shadow-xs scale-100'
                : 'text-[#8b7d72] dark:text-[#9ea4b0] hover:text-black dark:hover:text-white hover:bg-white/40'
            }`}
          >
            Image
          </button>
          <button
            onClick={() => setMode('video')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 text-center ${
              mode === 'video'
                ? 'bg-white dark:bg-[#2c303b] text-[#2c2420] dark:text-white shadow-xs scale-100'
                : 'text-[#8b7d72] dark:text-[#9ea4b0] hover:text-black dark:hover:text-white hover:bg-white/40'
            }`}
          >
            Video
          </button>
        </div>

        {/* Prompt Input Section */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-[#8a7d72] dark:text-[#9da6b6] ml-1">
            Prompt
          </label>
          <div className="bg-white dark:bg-[#1e2128] rounded-2xl border border-[#e8ded3] dark:border-[#2a2e38] p-3 focus-within:border-[#df795d] focus-within:ring-3 focus-within:ring-[#df795d]/15 transition-all duration-200 shadow-2xs">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={5}
              placeholder="Describe your imaginations to be converted to piece of art..."
              className="w-full bg-transparent resize-none text-xs md:text-sm text-[#2b2521] dark:text-[#ede6df] placeholder-[#a6998f] dark:placeholder-[#787f8d] outline-none leading-relaxed custom-scrollbar pr-1"
            />
          </div>
        </div>

        {/* Action Row below prompt: Enhance on left, Refined Gradient Generate button on right */}
        <div className="flex items-center justify-between px-0.5">
          <button
            type="button"
            onClick={onEnhancePrompt}
            className="group text-xs font-semibold text-[#df795d] dark:text-[#ea8a71] hover:text-[#c96246] flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            title="AI Magic Enhance: enrich prompt with lighting & camera details"
          >
            <Sparkles className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <span className="group-hover:underline">Enhance</span>
          </button>

          {/* Refined Warm Sunset Terracotta Generate Button */}
          <button
            onClick={onGenerate}
            disabled={isGenerating || !prompt.trim()}
            className={`group relative overflow-hidden px-5 py-2.5 rounded-2xl font-semibold text-xs tracking-wide text-white transition-all duration-200 cursor-pointer ${
              isGenerating || !prompt.trim()
                ? 'bg-[#df795d]/50 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-[#e28065] to-[#d26b4e] hover:from-[#d87459] hover:to-[#c65e41] shadow-sm hover:shadow-md hover:shadow-[#e28065]/25 active:scale-96 active:shadow-inner'
            }`}
          >
            <div className="flex items-center gap-1.5 relative z-10">
              <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : 'transition-transform duration-300 group-hover:rotate-12'}`} />
              <span>{isGenerating ? 'Synthesizing...' : 'Generate'}</span>
            </div>
            {/* Subtle light sweep animation on button hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
          </button>
        </div>


        {/* Custom Premium Dropdown Selectors Row */}
        <div className="grid grid-cols-3 gap-2 relative" ref={dropdownRef}>
          {/* 1. Custom # Images Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'images' ? null : 'images')}
              className={`w-full flex items-center justify-between bg-white dark:bg-[#1e2128] border text-[#2b2521] dark:text-[#ede6df] text-xs font-semibold py-2 px-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                openDropdown === 'images'
                  ? 'border-[#df795d] ring-2 ring-[#df795d]/15 shadow-xs'
                  : 'border-[#e8ded3] dark:border-[#2a2e38] hover:border-[#df795d]/60'
              }`}
            >
              <span>{numImages} {numImages === 1 ? 'image' : 'images'}</span>
              <ChevronDown className={`w-3 h-3 text-[#9c8e82] transition-transform duration-150 ${openDropdown === 'images' ? 'rotate-180 text-[#df795d]' : ''}`} />
            </button>

            {/* Floating Images Popover Menu */}
            {openDropdown === 'images' && (
              <div className="absolute left-0 mt-1.5 w-36 rounded-xl bg-white dark:bg-[#1c1f26] border border-[#e5dcd1] dark:border-[#2c313d] shadow-xl py-1 z-40 animate-in fade-in zoom-in-95 duration-150">
                {[1, 2, 4].map((count) => (
                  <button
                    key={count}
                    onClick={() => {
                      setNumImages(count);
                      setOpenDropdown(null);
                    }}
                    className={`w-full px-3 py-1.5 flex items-center justify-between text-xs transition-colors cursor-pointer ${
                      numImages === count
                        ? 'text-[#df795d] bg-[#fbf3ef] dark:bg-[#2b1f1a] font-bold'
                        : 'text-[#4a4038] dark:text-[#d3cbd2] hover:bg-[#faf4ed] dark:hover:bg-[#232731]'
                    }`}
                  >
                    <span>{count} {count === 1 ? 'image' : 'images'}</span>
                    {numImages === count && <Check className="w-3.5 h-3.5 text-[#df795d]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Custom Aspect Ratio Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'ratio' ? null : 'ratio')}
              className={`w-full flex items-center justify-between bg-white dark:bg-[#1e2128] border text-[#2b2521] dark:text-[#ede6df] text-xs font-semibold py-2 px-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                openDropdown === 'ratio'
                  ? 'border-[#df795d] ring-2 ring-[#df795d]/15 shadow-xs'
                  : 'border-[#e8ded3] dark:border-[#2a2e38] hover:border-[#df795d]/60'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[#8e8278]">{getRatioIcon(aspectRatio)}</span>
                <span>{aspectRatio}</span>
              </div>
              <ChevronDown className={`w-3 h-3 text-[#9c8e82] transition-transform duration-150 ${openDropdown === 'ratio' ? 'rotate-180 text-[#df795d]' : ''}`} />
            </button>

            {/* Floating Aspect Ratio Popover Menu */}
            {openDropdown === 'ratio' && (
              <div className="absolute left-0 mt-1.5 w-48 rounded-xl bg-white dark:bg-[#1c1f26] border border-[#e5dcd1] dark:border-[#2c313d] shadow-xl py-1 z-40 animate-in fade-in zoom-in-95 duration-150">
                {ASPECT_RATIOS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setAspectRatio(r.id);
                      setOpenDropdown(null);
                    }}
                    className={`w-full px-3 py-2 flex items-center justify-between text-xs transition-colors cursor-pointer ${
                      aspectRatio === r.id
                        ? 'text-[#df795d] bg-[#fbf3ef] dark:bg-[#2b1f1a] font-bold'
                        : 'text-[#4a4038] dark:text-[#d3cbd2] hover:bg-[#faf4ed] dark:hover:bg-[#232731]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {getRatioIcon(r.id)}
                      <div>
                        <div className="font-semibold">{r.label}</div>
                        <div className="text-[10px] text-[#9c8e82] font-normal">{r.desc.split('(')[0]}</div>
                      </div>
                    </div>
                    {aspectRatio === r.id && <Check className="w-3.5 h-3.5 text-[#df795d]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Custom Model Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'model' ? null : 'model')}
              className={`w-full flex items-center justify-between bg-white dark:bg-[#1e2128] border text-[#2b2521] dark:text-[#ede6df] text-xs font-semibold py-2 px-2 rounded-xl cursor-pointer transition-all duration-150 ${
                openDropdown === 'model'
                  ? 'border-[#df795d] ring-2 ring-[#df795d]/15 shadow-xs'
                  : 'border-[#e8ded3] dark:border-[#2a2e38] hover:border-[#df795d]/60'
              }`}
            >
              <span className="truncate pr-1">{selectedModel.replace('FOMI ', '')}</span>
              <ChevronDown className={`w-3 h-3 text-[#9c8e82] flex-shrink-0 transition-transform duration-150 ${openDropdown === 'model' ? 'rotate-180 text-[#df795d]' : ''}`} />
            </button>

            {/* Floating Model Popover Menu */}
            {openDropdown === 'model' && (
              <div className="absolute right-0 mt-1.5 w-56 rounded-xl bg-white dark:bg-[#1c1f26] border border-[#e5dcd1] dark:border-[#2c313d] shadow-xl py-1 z-40 animate-in fade-in zoom-in-95 duration-150">
                {AVAILABLE_MODELS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedModel(m.name);
                      setOpenDropdown(null);
                    }}
                    className={`w-full px-3 py-2 flex items-center justify-between text-xs transition-colors cursor-pointer text-left ${
                      selectedModel === m.name
                        ? 'text-[#df795d] bg-[#fbf3ef] dark:bg-[#2b1f1a] font-bold'
                        : 'text-[#4a4038] dark:text-[#d3cbd2] hover:bg-[#faf4ed] dark:hover:bg-[#232731]'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{m.name}</div>
                      <div className="text-[10px] text-[#9c8e82] font-normal flex items-center gap-1.5 mt-0.5">
                        <span className="px-1.5 py-0.2 rounded bg-[#f4ebe2] dark:bg-[#282d38] text-[9px] font-medium text-[#6e5f52] dark:text-[#c4ccd8]">
                          {m.badge}
                        </span>
                        <span>• {m.speed}</span>
                      </div>
                    </div>
                    {selectedModel === m.name && <Check className="w-3.5 h-3.5 text-[#df795d] flex-shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Advanced Accordion */}
        <div className="w-full">
          <button
            onClick={() => setShowAdvance(!showAdvance)}
            className="w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-white dark:bg-[#1e2128] border border-[#e8ded3] dark:border-[#2a2e38] text-xs font-semibold text-[#4a4038] dark:text-[#d3ccc4] hover:border-[#df795d]/60 transition-colors cursor-pointer"
          >
            <span>Advanced</span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#8e8278] dark:text-[#888e9b] transition-transform duration-200 ${showAdvance ? 'rotate-180' : ''}`} />
          </button>

          {showAdvance && (
            <div className="mt-2 p-3 bg-white dark:bg-[#1b1e25] rounded-xl border border-[#ebdcd0] dark:border-[#2b2f3a] flex flex-col gap-3 text-xs animate-in fade-in duration-150">
              <div>
                <label className="block text-[11px] font-medium text-[#7d7065] dark:text-[#a09489] mb-1">
                  Negative Prompt
                </label>
                <input
                  type="text"
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  placeholder="Things to avoid in output..."
                  className="w-full bg-white dark:bg-[#222630] border border-[#e8ded3] dark:border-[#2e333e] rounded-lg p-2 text-xs text-[#2b2521] dark:text-[#ede6df] outline-none focus:border-[#df795d]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-medium text-[#7d7065] dark:text-[#a09489]">CFG Scale</span>
                    <span className="text-[10px] font-semibold text-[#c85a3c] dark:text-[#ea7352] font-mono">{guidanceScale.toFixed(1)}</span>
                  </div>
                  <div className="py-1">
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="0.5"
                      value={guidanceScale}
                      onChange={(e) => setGuidanceScale(parseFloat(e.target.value))}
                    />
                  </div>
                  {/* Quick Preset Buttons */}
                  <div className="flex items-center gap-1 mt-1">
                    {[
                      { val: 4.0, label: 'Soft' },
                      { val: 7.5, label: 'Default' },
                      { val: 11.0, label: 'Intense' },
                    ].map((preset) => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => setGuidanceScale(preset.val)}
                        className={`flex-1 py-0.5 text-[9px] rounded-md transition-colors cursor-pointer ${
                          guidanceScale === preset.val
                            ? 'bg-[#c85a3c] text-white font-bold shadow-2xs'
                            : 'bg-[#f4eee7] dark:bg-[#252a34] text-[#6d5f52] dark:text-[#b8c0cc] hover:bg-[#ebdcd0]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-medium text-[#7d7065] dark:text-[#a09489]">Seed</span>
                    <button
                      type="button"
                      onClick={() => setSeed(Math.floor(Math.random() * 9999999).toString())}
                      className="text-[10px] text-[#c85a3c] dark:text-[#ea7352] flex items-center gap-0.5 hover:underline cursor-pointer"
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
            className="w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-white dark:bg-[#1e2128] border border-[#e8ded3] dark:border-[#2a2e38] text-xs font-semibold text-[#4a4038] dark:text-[#d3ccc4] hover:border-[#df795d]/60 transition-colors cursor-pointer"
          >
            <span>Styles</span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#8e8278] dark:text-[#888e9b] transition-transform duration-200 ${showStyles ? 'rotate-180' : ''}`} />
          </button>

          {showStyles && (
            <div className="mt-2 p-3 bg-white dark:bg-[#1b1e25] rounded-xl border border-[#ebdcd0] dark:border-[#2b2f3a] flex flex-wrap gap-1.5 animate-in fade-in duration-150">
              {STYLE_PRESETS.map((style) => {
                const isActive = activeStyles.includes(style.id);
                return (
                  <button
                    key={style.id}
                    onClick={() => toggleStyle(style.id, style.tag)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#df795d] text-white shadow-xs'
                        : 'bg-white dark:bg-[#232732] border border-[#e8ded3] dark:border-[#2e333e] text-[#5c5046] dark:text-[#b8c0cc] hover:border-[#df795d]'
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
