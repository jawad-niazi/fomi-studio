# FOMI — AI Creative Studio

> **Responsive AI Content Generation Workspace** built for the FOMI Frontend Engineering Assessment.

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🎨 Overview

This project is a high-performance, responsive web application for **FOMI**, an AI-powered creative platform for image and video generation.

Designed around the core principle: **"Maximum capability. Minimum complexity. The workspace is the hero."**

It faithfully implements the official assessment mockup down to the pixel while introducing professional productivity workflows that transform it from a basic toy into an everyday workstation for creators, concept artists, and visual directors.

---

## ✨ Key Features & Productivity Workflows

### 1. 🔄 1-Click History Time-Machine
- **Problem Solved:** Creators waste hours copying and re-typing previous prompts.
- **Solution:** Clicking any past thumbnail in the top History carousel immediately rehydrates the prompt box, model, and aspect ratio into the generation engine.

### 2. ⚡ Non-Blocking Background Queue
- **Problem Solved:** Traditional AI tools lock the UI while synthesis runs.
- **Solution:** Pressing `Generate` instantly clears the prompt field and places an animated, shimmering skeleton card in the workspace canvas. Power users can queue multiple prompt directions concurrently.

### 3. ⌨️ Keyboard-First Ergonomics
- `⌘ + Enter` / `Ctrl + Enter` to trigger generation from the textarea.
- `Esc` to close modal overlays.

### 4. 🪄 AI Prompt Magic Enhancer
- One-click enhancement that enriches basic descriptions with professional photography terminology (35mm lens, volumetric rim lighting, natural skin texture, 8k resolution).

### 5. 🔍 High-Resolution Inspection & 4K Upscale
- Click any image variation to open the full-screen lightbox.
- Inspect prompt metadata, seed, aspect ratio, and resolution.
- Test the interactive **AI 4K Upscaler** and download full-res assets.

### 6. 🌗 Seamless Dark / Light Mode
- Tailored color palettes: warm porcelain/peach in light mode and deep studio slate in dark mode.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router, Turbopack)
- **Language:** JavaScript
- **Styling:** Tailwind CSS v4, CSS Modules
- **Icons:** Lucide React
- **Deployment:** Vercel

---

## 📋 Product Thinking Document (Assessment Part B)

### 1. What problem were you trying to solve? What type of user did you design for?
- **User:** Concept artists, visual directors, agencies, and marketers generating high volumes of visual assets daily.
- **Problem:** Eliminating **creative inertia**. Standard AI generators treat creation like a turn-based chatbot (prompt, wait, repeat). We designed an iterative studio where branching variations, parameter adjustments, and prompt reuse require zero repetitive typing.

### 2. What are the three most important UX decisions you made? Why?
1. **Interactive History Filmstrip:** Turns history from a passive archive into an active workflow accelerator.
2. **Non-Blocking Generation Queue:** Prevents screen locking, enabling rapid multi-prompt brainstorming.
3. **Spatial Cause-and-Effect Layout:** Displays the prompt metadata card directly adjacent to its 4 output variants for effortless visual comparison.

### 3. Which features did you intentionally leave out? Why?
1. **Social Community Discovery Wall:** Left out to protect the user's focus on confidential client work.
2. **Technical Math Sliders:** Tucked deep engineering controls (CFG scale, seed, negative prompts) into an expandable `Advance` accordion with sensible defaults to prevent cognitive fatigue.
3. **Interruptive Fullscreen Popups:** All workflows remain non-blocking within the canvas.

### 4. Which existing products inspired your thinking?
- **Krea & Magnific:** Inspired visual polish and render quality; improved upon their interface by keeping generation parameters permanently dockable.
- **Cursor & Linear:** Inspired software velocity, keyboard shortcuts, and responsive micro-interactions.

### 5. If you had another month to work on this product, what would you improve?
1. **Infinite Whiteboard Canvas:** Freedom to pan, zoom, and arrange 50+ images across an endless canvas to storyboard film sequences.
2. **Localized Inpainting Brush:** Brush over localized areas to swap hair, accessories, or objects while preserving character consistency.
3. **Multi-Model Blind Comparison:** Generate 1 prompt across FLUX and SDXL simultaneously to compare latency and aesthetics.

### 6. What is the single feature that differentiates your workspace?
- **"Fork & Iterate" Creative Branching:** Every generation maintains an immutable link to its prompt parameters and seed. Clicking **Remix** anchors the facial structure and palette while enabling instant mood or background exploration.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/fomi-studio.git
cd fomi-studio

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Deployment to Vercel

1. Push this repository to your GitHub account.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `fomi-studio` repository.
4. Framework preset: **Next.js**.
5. Click **Deploy**.
