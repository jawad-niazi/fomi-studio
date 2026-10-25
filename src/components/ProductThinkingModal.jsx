'use client';

import React from 'react';
import { X, FileText, CheckCircle2, Sparkles, Lightbulb, Compass, Award } from 'lucide-react';

export default function ProductThinkingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#fcfbf9] dark:bg-[#121418] border border-[#e8ded2] dark:border-[#2b2f3a] rounded-3xl max-w-4xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-[#efe5d9] dark:border-[#232731] flex items-center justify-between bg-white dark:bg-[#16181f]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#faeee8] dark:bg-[#2c201a] flex items-center justify-center text-[#de896c]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold text-[#2d2520] dark:text-[#f2ebe5]">
                FOMI Assessment — Product Thinking Rationale
              </h2>
              <p className="text-xs text-[#8e8074] dark:text-[#9ea6b5]">
                Design decisions, UX trade-offs & architectural vision for FOMI Creative Studio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#efe4d8] dark:hover:bg-[#242833] text-[#7d7065] dark:text-[#a0a9b8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-[#382f28] dark:text-[#d8d0c7] text-xs md:text-sm leading-relaxed">
          {/* Question 1 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#161920] border border-[#eee4d8] dark:border-[#242833]">
            <div className="flex items-center gap-2 mb-2 text-[#de896c] font-semibold text-xs tracking-wide uppercase">
              <Lightbulb className="w-4 h-4" />
              <span>1. Target User & Problem Statement</span>
            </div>
            <h3 className="font-bold text-sm md:text-base text-[#251f1a] dark:text-white mb-2">
              Who is this designed for, and what problem are we solving?
            </h3>
            <p className="mb-2">
              <strong>User:</strong> Professional concept artists, visual directors, agency designers, and marketers who generate dozens of assets daily.
            </p>
            <p>
              <strong>Problem:</strong> Standard AI generators treat creation like a turn-based chatbot—type, submit, wait, repeat. For professionals, this introduces severe <em>creative inertia</em>. We solved this by turning the interface into a continuous, keyboard-first <strong>iterative workstation</strong> where tweaking parameters, branching variants, and recalling past runs requires zero repetitive typing.
            </p>
          </div>

          {/* Question 2 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#161920] border border-[#eee4d8] dark:border-[#242833]">
            <div className="flex items-center gap-2 mb-2 text-[#de896c] font-semibold text-xs tracking-wide uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>2. Three Critical UX Decisions</span>
            </div>
            <h3 className="font-bold text-sm md:text-base text-[#251f1a] dark:text-white mb-2">
              Key product decisions and why they were made
            </h3>
            <ul className="space-y-3 list-disc pl-4">
              <li>
                <strong>Active History Time-Machine:</strong> Rather than a passive decorative carousel, clicking any past thumbnail instantly repopulates the prompt box, model selection, and aspect ratio. Creators can instantly pivot off past successes without digging through archives.
              </li>
              <li>
                <strong>Non-Blocking Background Queue:</strong> When you press generate, the card immediately enters a skeleton rendering state in the main canvas and clears the prompt input. Power users can queue up 3-4 concept directions simultaneously without waiting.
              </li>
              <li>
                <strong>Adjacent Prompt-to-Variant Spatial Mapping:</strong> Pairing the prompt metadata card directly side-by-side with its 4 generated variants allows immediate visual comparison of cause (prompt keywords) and effect (visual output).
              </li>
            </ul>
          </div>

          {/* Question 3 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#161920] border border-[#eee4d8] dark:border-[#242833]">
            <div className="flex items-center gap-2 mb-2 text-[#de896c] font-semibold text-xs tracking-wide uppercase">
              <Compass className="w-4 h-4" />
              <span>3. Features Intentionally Left Out</span>
            </div>
            <h3 className="font-bold text-sm md:text-base text-[#251f1a] dark:text-white mb-2">
              What we simplified or omitted to protect professional focus
            </h3>
            <ul className="space-y-2 list-disc pl-4">
              <li>
                <strong>Social Community Discovery Feed inside Workspace:</strong> We left public discovery walls out of the studio. Crowding the canvas with others' images distracts professionals working on confidential client briefs.
              </li>
              <li>
                <strong>Exposed Math Knobs (CFG steps, denoising curves):</strong> Tucked deep engineering sliders into an expandable accordion with production defaults. Maximum capability, minimum cognitive clutter.
              </li>
              <li>
                <strong>Modal Interruptions on Generation:</strong> No popups blocking the screen; everything flows natively in the canvas.
              </li>
            </ul>
          </div>

          {/* Question 4 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#161920] border border-[#eee4d8] dark:border-[#242833]">
            <div className="flex items-center gap-2 mb-2 text-[#de896c] font-semibold text-xs tracking-wide uppercase">
              <Sparkles className="w-4 h-4" />
              <span>4. Product Inspirations & Improvements</span>
            </div>
            <h3 className="font-bold text-sm md:text-base text-[#251f1a] dark:text-white mb-2">
              What inspired us, and how we improved upon them
            </h3>
            <p className="mb-2">
              <strong>Krea.ai & Magnific:</strong> We admired their crisp dark UI and focus on image quality. However, parameter tweaking often feels separated from output inspection. We improved this by keeping the control bar permanently dockable while the output feed updates smoothly.
            </p>
            <p>
              <strong>Cursor & Linear:</strong> Borrowed high-velocity keyboard ergonomics (<kbd className="px-1.5 py-0.5 rounded bg-[#f0e4d7] dark:bg-[#252833] font-mono text-xs">⌘ + Enter</kbd>, quick enhance, instant toasts) so creators never feel bogged down by a slow interface.
            </p>
          </div>

          {/* Question 5 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#161920] border border-[#eee4d8] dark:border-[#242833]">
            <div className="flex items-center gap-2 mb-2 text-[#de896c] font-semibold text-xs tracking-wide uppercase">
              <Lightbulb className="w-4 h-4" />
              <span>5. 1-Month Roadmap Improvements</span>
            </div>
            <h3 className="font-bold text-sm md:text-base text-[#251f1a] dark:text-white mb-2">
              If given another 30 days to build:
            </h3>
            <ul className="space-y-2 list-disc pl-4">
              <li>
                <strong>Infinite Whiteboard/Canvas Mode:</strong> Let creators freely drag, pan, zoom, and arrange 50+ images across an endless canvas to build movie storyboards and moodboards.
              </li>
              <li>
                <strong>Localized Inpainting Brush:</strong> Brush over a character's eyes or clothes to change specific items with zero disruption to the rest of the generated image.
              </li>
              <li>
                <strong>Multi-Model Side-by-Side Comparison:</strong> Run one prompt through FLUX and SDXL simultaneously to compare latency and aesthetics side-by-side.
              </li>
            </ul>
          </div>

          {/* Question 6 */}
          <div className="p-5 rounded-2xl bg-[#faeee8] dark:bg-[#231b17] border border-[#f2d8cd] dark:border-[#382720]">
            <div className="flex items-center gap-2 mb-2 text-[#de896c] font-semibold text-xs tracking-wide uppercase">
              <Award className="w-4 h-4" />
              <span>6. The Core Differentiator</span>
            </div>
            <h3 className="font-bold text-sm md:text-base text-[#251f1a] dark:text-white mb-2">
              "Fork & Iterate" Creative Branching
            </h3>
            <p>
              Traditional AI tools treat each generation as a disposable roll of the dice. In FOMI Studio, every output maintains an immutable link to its exact seed, prompt, and model. Clicking <strong>Remix / Fork</strong> instantly locks the character facial geometry and color palette as a subtle img2img anchor while letting the creator change the mood, camera lens, or action in seconds.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#efe5d9] dark:border-[#232731] flex justify-end bg-white dark:bg-[#16181f]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#de896c] hover:bg-[#cf7b5e] text-white font-medium text-xs shadow-sm transition-all"
          >
            Back to Studio
          </button>
        </div>
      </div>
    </div>
  );
}
