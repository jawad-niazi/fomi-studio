# FOMI — Frontend Engineer Assessment Submission
**Applicant:** Jawad Niazi  
**Email:** jawadniaziniazi@gmail.com  
**Company:** FOMI (National Science & Technology Park - NSTP, Islamabad)  
**Role:** Product-Minded Frontend Engineer  
**Live Vercel Application:** [https://fomi-studio.vercel.app](https://fomi-studio.vercel.app)  
**GitHub Repository:** [https://github.com/jawad-niazi/fomi-studio](https://github.com/jawad-niazi/fomi-studio)  

---

## Part A: Implementation Summary
- **Framework:** Next.js (App Router, Turbopack)
- **Language:** JavaScript
- **Styling:** Tailwind CSS v4, CSS Modules
- **Design Accuracy:** Recreated the official mockup pixel-for-pixel, including top navigation, credit quota meter, history filmstrip, floating generation control panel, and adjacent prompt-to-4-variant grid.
- **Responsiveness:** Fluid adaptation across mobile, tablet, desktop, and large displays with no horizontal overflow.
- **Theme Support:** Polished warm porcelain light mode and deep studio slate dark mode.

---

## Part B: Product Thinking Document

### 1. What problem were you trying to solve? What type of user did you design for?
* **Target User:** Professional concept artists, visual directors, agencies, and digital marketers who spend 4 to 8 hours daily generating visual assets.
* **Problem Statement:** Standard AI generators function like turn-based chatbots (prompt → wait → repeat). For professionals working on tight deadlines, this introduces severe *creative inertia* and repetitive friction. We transformed the interface into a continuous, keyboard-first **iterative studio** where branching variations, parameter tweaking, and asset reuse require zero repetitive typing.

---

### 2. What are the three most important UX decisions you made? Why?
1. **Interactive History Filmstrip as a "Time Machine":**
   * *Why:* Rather than treating past generations as a passive gallery, clicking any past thumbnail immediately rehydrates the prompt box, model choice, aspect ratio, and seed. Creators can instantly pivot off previous ideas without searching through history logs.
2. **Non-Blocking Background Generation Queue:**
   * *Why:* Instead of locking the screen while an AI model synthesizes, the prompt field immediately unblocks and places a shimmering skeleton card into the workspace feed. This allows power users to queue multiple concept directions back-to-back.
3. **Spatial Cause-and-Effect Layout:**
   * *Why:* Pairing the prompt metadata card directly adjacent to its resulting 4-variant grid provides instant visual correlation between prompt keywords and output imagery.

---

### 3. Which features did you intentionally leave out? Why?
1. **Cluttered Social Feeds / Community Explore Walls:**
   * *Why:* The workspace is dedicated to the user’s active project. Crowding the canvas with public generations creates distraction and visual fatigue for professionals working on confidential client briefs.
2. **Exposed Math Sliders (CFG Scale, Sampler steps, Denoising curves):**
   * *Why:* Following FOMI's principle of *"Maximum capability, Minimum complexity"*, we grouped deep model mechanics inside an expandable `Advance` accordion with smart defaults, avoiding cognitive overload while keeping power controls accessible.
3. **Interruptive Full-Screen Popups on Generation:**
   * *Why:* Every action happens contextually in-place or via smooth non-blocking canvas cards so creators maintain spatial awareness.

---

### 4. Which existing products inspired your thinking? What did you like? What would you improve?
* **Krea.ai & Magnific:**
  * *Liked:* Crisp dark aesthetic, clean card rounding, and high-fidelity renders.
  * *Improved:* Traditional tools make it cumbersome to compare prompt variations side-by-side. We kept the control bar dockable while keeping generation cards directly beside their prompt recipes.
* **Cursor & Linear (IDE):**
  * *Liked:* Speed, keyboard responsiveness, and subtle micro-interactions.
  * *Improved:* Brought software engineering workflow velocity (`Cmd + Enter` to generate, instant toasts, AI magic enhance) into visual creative software.

---

### 5. If you had another month to work on this product, what would you improve?
1. **Infinite Whiteboard Canvas (Like Figma / Miro):** Let creators freely drag, pan, zoom, and arrange 50+ images across an endless canvas to storyboard film sequences and moodboards.
2. **Localized Inpainting Brush:** Brush over specific areas of a generated portrait (e.g., swapping sunglasses or earrings) while preserving facial identity and lighting consistency.
3. **Multi-Model Blind Comparison:** Generate 1 prompt simultaneously across FLUX, Midjourney, and SDXL to compare latency and output quality side-by-side.

---

### 6. What is the single feature or workflow you believe differentiates your workspace from existing AI creative platforms?
* **"Fork & Iterate" (Persistent Creative Branching):**
  * In standard AI tools, each generation is an isolated roll of the dice. In this workspace, every generation maintains a visible, active link between the exact prompt parameters and output variations. Users can click any image variant and hit "Fork", which locks the facial features or color palette as an img2img reference while letting them modify the setting, action, or lighting in seconds.
