'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Download,
  Copy,
  Check,
  Maximize2,
  Cpu,
  Layers,
  Zap,
} from 'lucide-react';

export default function ImageModal({ image, batch, onClose, onUsePrompt }) {
  const [isUpscaling, setIsUpscaling] = useState(false);
  const [isUpscaled, setIsUpscaled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!image || !batch) return null;

  const handleUpscale = () => {
    setIsUpscaling(true);
    setTimeout(() => {
      setIsUpscaling(false);
      setIsUpscaled(true);
    }, 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(batch.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [copiedSeed, setCopiedSeed] = useState(false);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 dark:bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#121418] border border-[#e8ded3] dark:border-[#2b2f3a] rounded-3xl overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl relative transition-colors duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/10 hover:bg-black/20 dark:bg-black/60 dark:hover:bg-black text-[#4a3f36] dark:text-white/80 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: High-Resolution Image Preview */}
        <div className="flex-1 bg-[#f7f0e8] dark:bg-black/40 flex items-center justify-center p-4 relative min-h-[320px] md:min-h-[500px]">
          <img
            src={image.url}
            alt={image.alt || 'Full Resolution Preview'}
            className={`max-h-[75vh] w-auto object-contain rounded-2xl shadow-xl transition-all duration-500 ${
              isUpscaled ? 'contrast-105 saturate-105' : ''
            }`}
          />

          {isUpscaled && (
            <div className="absolute bottom-6 left-6 px-3 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-semibold backdrop-blur-sm flex items-center gap-1.5 shadow-lg animate-in zoom-in-90">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upscaled to 4K Ultra (4096 x 5460)</span>
            </div>
          )}
        </div>

        {/* Right: Metadata & Pro Tools Panel */}
        <div className="w-full md:w-80 lg:w-96 p-6 flex flex-col justify-between bg-[#faf5ef] dark:bg-[#16181f] border-t md:border-t-0 md:border-l border-[#ebe0d4] dark:border-[#262933] text-[#2b2520] dark:text-[#ede6df]">
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-[11px] font-semibold text-[#8a7e73] dark:text-[#8b92a2] uppercase tracking-wider">
                Prompt Description
              </span>
              <p className="mt-1 text-xs sm:text-sm text-[#3c332b] dark:text-[#ded7cf] leading-relaxed max-h-40 overflow-y-auto pr-2 custom-scrollbar select-text">
                {batch.prompt}
              </p>
            </div>

            {/* Technical Specs */}
            <div className="p-3 bg-white dark:bg-[#1e222a] rounded-xl border border-[#eadfd4] dark:border-[#2a2f3a] flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between text-[#7d7065] dark:text-[#8f96a4]">
                <span>Model</span>
                <span className="text-[#2b2520] dark:text-white font-medium">{batch.model}</span>
              </div>
              <div className="flex items-center justify-between text-[#7d7065] dark:text-[#8f96a4]">
                <span>Resolution</span>
                <span className="text-[#2b2520] dark:text-white font-mono">
                  {isUpscaled ? '4096 x 5460 (4K)' : image.resolution || '2048 x 2730'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#7d7065] dark:text-[#8f96a4]">
                <span>Seed</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(image.seed || '8492043');
                    setCopiedSeed(true);
                    setTimeout(() => setCopiedSeed(false), 2000);
                  }}
                  className="text-[#c85a3c] dark:text-[#ea7352] font-mono hover:underline cursor-pointer flex items-center gap-1"
                  title="Click to copy Seed"
                >
                  <span>{image.seed || '8492043'}</span>
                  {copiedSeed ? (
                    <span className="text-[10px] text-emerald-500 font-sans font-semibold">✓ Copied</span>
                  ) : (
                    <Copy className="w-2.5 h-2.5 opacity-70" />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between text-[#7d7065] dark:text-[#8f96a4]">
                <span>Aspect Ratio</span>
                <span className="text-[#2b2520] dark:text-white font-medium">{batch.aspectRatio || '3:4'}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 mt-6 pt-4 border-t border-[#ebe0d4] dark:border-[#262933]">
            {/* Upscale Button */}
            <button
              onClick={handleUpscale}
              disabled={isUpscaling || isUpscaled}
              className={`w-full py-2.5 px-4 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isUpscaled
                  ? 'bg-emerald-600/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40 cursor-default'
                  : 'bg-gradient-to-r from-[#e28065] to-[#d26b4e] hover:from-[#d97357] hover:to-[#c55f42] text-white shadow-sm active:scale-98'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${isUpscaling ? 'animate-bounce' : ''}`} />
              <span>
                {isUpscaling
                  ? 'Enhancing Details (4K)...'
                  : isUpscaled
                  ? '✓ 4K Ultra Upscaled'
                  : 'AI Upscale to 4K'}
              </span>
            </button>

            {/* Fork / Edit in Prompt Box */}
            <button
              onClick={() => {
                onUsePrompt(batch.prompt, batch.model, image.seed);
                onClose();
              }}
              className="w-full py-2 px-4 rounded-xl font-medium text-xs bg-white dark:bg-[#242833] hover:bg-[#f3eae0] dark:hover:bg-[#2e3342] text-[#3c332b] dark:text-white flex items-center justify-center gap-2 transition-colors border border-[#e2d5c7] dark:border-[#343946] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c85a3c] dark:text-[#ea7352]" />
              <span>Fork & Iterate in Studio</span>
            </button>

            {/* Quick Actions Row */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopy}
                className="py-2 px-3 rounded-xl bg-white dark:bg-[#1e222a] hover:bg-[#f3eae0] dark:hover:bg-[#282d38] text-xs font-medium text-[#4a3f36] dark:text-[#c8d0de] flex items-center justify-center gap-1.5 transition-colors border border-[#e2d5c7] dark:border-[#2b303d] cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Prompt'}</span>
              </button>

              <a
                href={image.url}
                download="fomi-studio-render.jpg"
                className="py-2 px-3 rounded-xl bg-white dark:bg-[#1e222a] hover:bg-[#f3eae0] dark:hover:bg-[#282d38] text-xs font-medium text-[#4a3f36] dark:text-[#c8d0de] flex items-center justify-center gap-1.5 transition-colors border border-[#e2d5c7] dark:border-[#2b303d] cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
