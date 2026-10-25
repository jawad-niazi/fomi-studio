'use client';

import React, { useState, useEffect } from 'react';
import TopNavbar from '../components/TopNavbar';
import HistoryStrip from '../components/HistoryStrip';
import ControlPanel from '../components/ControlPanel';
import OutputCanvas from '../components/OutputCanvas';
import ImageModal from '../components/ImageModal';
import ProductThinkingModal from '../components/ProductThinkingModal';
import {
  INITIAL_HISTORY,
  INITIAL_BATCHES,
  MOCK_GENERATION_POOLS,
} from '../data/mockData';

export default function FomiStudioPage() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('image');
  const [mode, setMode] = useState('image');
  const [prompt, setPrompt] = useState(
    'A professional portrait photograph of a smiling 31-year-old redheaded woman with warm brown eyes and softly tousled auburn hair framing her face. She is turned slightly towards the viewer, offering a genuine and approachable expression. She is wearing a cream-colored cashmere sweater and delicate gold earrings. The background is a softly blurred expanse of muted gray and beige tones, suggesting a modern art gallery. There is subtle directional lighting'
  );
  const [numImages, setNumImages] = useState(4);
  const [aspectRatio, setAspectRatio] = useState('3:4');
  const [selectedModel, setSelectedModel] = useState('FOMI Realism v2');
  const [historyItems, setHistoryItems] = useState(INITIAL_HISTORY);
  const [batches, setBatches] = useState(INITIAL_BATCHES);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingPrompt, setGeneratingPrompt] = useState('');
  const [generatingModel, setGeneratingModel] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [copiedPromptId, setCopiedPromptId] = useState(null);
  const [creditsLeft, setCreditsLeft] = useState(78);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const [seed, setSeed] = useState('');

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Handle dark mode toggle
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2400);
  };

  // AI Prompt Enhancement feature
  const handleEnhancePrompt = () => {
    if (!prompt.trim()) {
      setPrompt('Hyper-realistic cinematic portrait, 85mm f/1.4 lens, natural skin micro-texture, golden hour soft rim lighting, photorealistic 8k');
      showToast('Generated base photographic prompt');
      return;
    }
    const enhancements = [
      '35mm vintage photography, subtle dust motes, warm ambient rim light, 8k resolution, photorealistic',
      'anamorphic cinematic lens, volumetric soft lighting, rich micro-contrast, masterpiece',
      'shallow depth of field, hyper-detailed texture, soft diffused studio light, award-winning composition',
    ];
    const chosen = enhancements[Math.floor(Math.random() * enhancements.length)];
    setPrompt((prev) => `${prev.trim()}, ${chosen}`);
    showToast('✨ AI Enhanced prompt with camera & lighting details!');
  };

  // Generation flow with mock API
  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratingPrompt(prompt);
    setGeneratingModel(selectedModel);
    setCreditsLeft((prev) => Math.max(0, prev - 2));

    // Simulate realistic AI diffusion synthesis delay (1.8 seconds)
    setTimeout(() => {
      const poolIndex = Math.floor(Math.random() * MOCK_GENERATION_POOLS.length);
      const chosenPool = MOCK_GENERATION_POOLS[poolIndex];

      const newImages = chosenPool.slice(0, numImages).map((url, i) => ({
        id: `gen-${Date.now()}-${i}`,
        url: url,
        alt: `${prompt} variation ${i + 1}`,
        resolution: '2048 x 2730',
        seed: Math.floor(Math.random() * 8999999 + 1000000).toString(),
      }));

      const newBatch = {
        id: `batch-${Date.now()}`,
        timestamp: 'Just now',
        prompt: prompt,
        model: selectedModel,
        aspectRatio: aspectRatio,
        images: newImages,
      };

      // Add to main canvas feed
      setBatches((prev) => [newBatch, ...prev]);

      // Also add to top History strip
      const newHistoryItem = {
        id: `hist-${Date.now()}`,
        title: prompt.slice(0, 24) + '...',
        thumbnail: newImages[0].url,
        prompt: prompt,
        model: selectedModel,
        aspectRatio: aspectRatio,
        numImages: numImages,
      };
      setHistoryItems((prev) => [newHistoryItem, ...prev]);

      setIsGenerating(false);
      showToast('✨ Successfully synthesized 4 new variations!');
    }, 1800);
  };

  // 1-Click History Recall
  const handleSelectHistory = (item) => {
    setSelectedHistoryId(item.id);
    setPrompt(item.prompt);
    if (item.model) setSelectedModel(item.model);
    if (item.aspectRatio) setAspectRatio(item.aspectRatio);
    showToast(`Loaded prompt: "${item.prompt.slice(0, 30)}..."`);
  };

  // Use prompt and seed from batch or image modal
  const handleUsePrompt = (promptText, modelText, seedVal) => {
    setPrompt(promptText);
    if (modelText) setSelectedModel(modelText);
    if (seedVal) setSeed(seedVal);
    showToast(seedVal ? `Loaded prompt & seed #${seedVal}` : 'Loaded prompt into editor');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Copy prompt
  const handleCopyPrompt = (promptText, batchId) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPromptId(batchId);
    showToast('Prompt copied to clipboard');
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''} bg-[#fdfbf9] dark:bg-[#0d0f12] text-[#2d2621] dark:text-[#ede6df] transition-colors duration-200`}>
      {/* 1. Top Navigation Bar */}
      <TopNavbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        creditsLeft={creditsLeft}
        maxCredits={100}
      />

      {/* 2. Top History Filmstrip Carousel */}
      <HistoryStrip
        historyItems={historyItems}
        onSelectHistory={handleSelectHistory}
        isGenerating={isGenerating}
        selectedHistoryId={selectedHistoryId}
      />

      {/* 3. Main Studio Workspace Layout */}
      <div className="w-full px-4 md:px-6 py-4 flex flex-col lg:flex-row gap-5 items-start flex-1">
        {/* Left Floating Control Panel */}
        <ControlPanel
          mode={mode}
          setMode={setMode}
          prompt={prompt}
          setPrompt={setPrompt}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          numImages={numImages}
          setNumImages={setNumImages}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          onEnhancePrompt={handleEnhancePrompt}
          seed={seed}
          setSeed={setSeed}
        />

        {/* Right Output Feed Canvas */}
        <OutputCanvas
          batches={batches}
          isGenerating={isGenerating}
          generatingPrompt={generatingPrompt}
          generatingModel={generatingModel}
          onOpenImage={(img, batch) => {
            setSelectedImage(img);
            setSelectedBatch(batch);
          }}
          onUsePrompt={handleUsePrompt}
          onCopyPrompt={handleCopyPrompt}
          copiedPromptId={copiedPromptId}
        />
      </div>

      {/* High-Resolution Inspection & Upscale Lightbox Modal */}
      {selectedImage && selectedBatch && (
        <ImageModal
          image={selectedImage}
          batch={selectedBatch}
          onClose={() => {
            setSelectedImage(null);
            setSelectedBatch(null);
          }}
          onUsePrompt={handleUsePrompt}
        />
      )}

      {/* Product Thinking Documentation Modal (Answers to all 6 evaluation questions) */}
      <ProductThinkingModal
        isOpen={isDocOpen}
        onClose={() => setIsDocOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#242730] text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-lg border border-[#373c49] animate-in fade-in slide-in-from-bottom-2 flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
