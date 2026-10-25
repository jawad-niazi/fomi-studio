// Mock data for FOMI AI Creative Studio

export const INITIAL_HISTORY = [
  {
    id: 'hist-1',
    title: 'Woman in Library',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    prompt: 'Young woman in vintage tweed sitting by sunlit mahogany bookshelves, warm dust motes in golden light, 35mm film photography',
    model: 'FOMI Realism v2',
    aspectRatio: '1:1',
    numImages: 4,
  },
  {
    id: 'hist-2',
    title: 'Alpine Mountain Road',
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80',
    prompt: 'Winding asphalt road through misty Swiss Alps, towering snow peaks, dramatic moody overcast skies, cinematic National Geographic style',
    model: 'FLUX.1 Pro',
    aspectRatio: '16:9',
    numImages: 4,
  },
  {
    id: 'hist-3',
    title: 'Fairytale Pine Forest',
    thumbnail: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=300&q=80',
    prompt: 'Enchanted deep emerald pine forest, bioluminescent moss on winding trail, morning mist rays filtering through tall trees',
    model: 'FOMI Realism v2',
    aspectRatio: '1:1',
    numImages: 4,
  },
  {
    id: 'hist-4',
    title: 'Mirror Reflection',
    thumbnail: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    prompt: 'Avant-garde portrait of blonde woman looking into antique circular bronze mirror, muted green couture coat, Vogue editorial',
    model: 'SDXL Ultra',
    aspectRatio: '1:1',
    numImages: 4,
  },
  {
    id: 'hist-5',
    title: 'Prism Face Art',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    prompt: 'Surreal beauty portrait with rainbow prism glass reflections, delicate skin texture, iridescent crystalline highlights',
    model: 'FLUX.1 Pro',
    aspectRatio: '1:1',
    numImages: 4,
  },
  {
    id: 'hist-6',
    title: 'High Fashion Orchid',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    prompt: 'Minimalist high-fashion editorial, porcelain skin model with exotic orchid petal headpiece, studio lighting',
    model: 'FOMI Realism v2',
    aspectRatio: '1:1',
    numImages: 4,
  },
  {
    id: 'hist-7',
    title: 'Pastel Paris Clouds',
    thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80',
    prompt: 'Eiffel Tower surrounded by soft candy-pink and lavender pastel cumulus clouds, dreamy sunset, oil painting aesthetic',
    model: 'Midjourney v6',
    aspectRatio: '1:1',
    numImages: 4,
  },
  {
    id: 'hist-8',
    title: 'Silhouette in Window',
    thumbnail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    prompt: 'Film noir silhouette of man in fedora hat seated beside rustic wooden window, harsh warm shafts of light hitting floorboards',
    model: 'FLUX.1 Pro',
    aspectRatio: '1:1',
    numImages: 4,
  },
  {
    id: 'hist-9',
    title: 'Twilight Golden Hour',
    thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    prompt: 'Candid 90s cinema photograph of young woman leaning on vintage car at twilight, nostalgic amber sodium streetlights',
    model: 'FOMI Realism v2',
    aspectRatio: '1:1',
    numImages: 4,
  },
  {
    id: 'hist-10',
    title: 'Cute Cat Hello World',
    thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80',
    prompt: 'Fluffy ginger tabby cat sitting upright on chair holding small cardboard sign that says Hello World, studio portrait',
    model: 'FLUX.1 Pro',
    aspectRatio: '1:1',
    numImages: 4,
  },
  {
    id: 'hist-11',
    title: 'Neon Gas Station',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80',
    prompt: 'Isolated retro gas station glowing in teal and neon green in the midnight desert, wet reflective road, cinematic Edward Hopper mood',
    model: 'SDXL Ultra',
    aspectRatio: '16:9',
    numImages: 4,
  },
  {
    id: 'hist-12',
    title: 'Misty Lake Siren',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80',
    prompt: 'Ethereal woman standing in calm alpine lake waters enveloped in early morning fog, ripples on water surface, dreamlike',
    model: 'FLUX.1 Pro',
    aspectRatio: '1:1',
    numImages: 4,
  },
];

// Initial mock generation batch matching the exact mockup
export const INITIAL_BATCHES = [
  {
    id: 'batch-mockup-1',
    timestamp: 'Just now',
    prompt:
      'A professional portrait photograph of a smiling 31-year-old redheaded woman with warm brown eyes and softly tousled auburn hair framing her face. She is turned slightly towards the viewer, offering a genuine and approachable expression. She is wearing a cream-colored cashmere sweater and delicate gold earrings. The background is a softly blurred expanse of muted gray and beige tones, suggesting a modern art gallery. There is subtle directional lighting',
    model: 'FOMI Realism v2',
    aspectRatio: '3:4',
    images: [
      {
        id: 'img-1-1',
        url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85',
        alt: 'Smiling redheaded woman in cream sweater variant 1',
        resolution: '2048 x 2730',
        seed: '8492041',
      },
      {
        id: 'img-1-2',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
        alt: 'Smiling redheaded woman in cream sweater variant 2',
        resolution: '2048 x 2730',
        seed: '8492042',
      },
      {
        id: 'img-1-3',
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=85',
        alt: 'Smiling redheaded woman in cream sweater variant 3',
        resolution: '2048 x 2730',
        seed: '8492043',
      },
      {
        id: 'img-1-4',
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=85',
        alt: 'Smiling redheaded woman in cream sweater variant 4',
        resolution: '2048 x 2730',
        seed: '8492044',
      },
    ],
  },
  {
    id: 'batch-mockup-2',
    timestamp: '10 mins ago',
    prompt:
      'Close-up studio beauty portrait variations of a cheerful 31-year-old redheaded woman with natural freckles, warm smile, wearing minimalist gold hoops and cream knit sweater, soft gallery ambient light',
    model: 'FOMI Realism v2',
    aspectRatio: '3:4',
    images: [
      {
        id: 'img-2-1',
        url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=85',
        alt: 'Redhead close-up smile variant 1',
        resolution: '2048 x 2730',
        seed: '8492051',
      },
      {
        id: 'img-2-2',
        url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=85',
        alt: 'Redhead close-up smile variant 2',
        resolution: '2048 x 2730',
        seed: '8492052',
      },
      {
        id: 'img-2-3',
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=85',
        alt: 'Redhead close-up smile variant 3',
        resolution: '2048 x 2730',
        seed: '8492053',
      },
      {
        id: 'img-2-4',
        url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=85',
        alt: 'Redhead close-up smile variant 4',
        resolution: '2048 x 2730',
        seed: '8492054',
      },
    ],
  },
];

export const AVAILABLE_MODELS = [
  { id: 'fomi-realism-v2', name: 'FOMI Realism v2', badge: 'Recommended', speed: 'Fast' },
  { id: 'flux-1-pro', name: 'FLUX.1 Pro', badge: 'Ultra Quality', speed: 'Medium' },
  { id: 'sdxl-turbo', name: 'SDXL Turbo', badge: 'Low Latency', speed: 'Instant' },
  { id: 'fomi-cine-v1', name: 'FOMI Cinematic v1', badge: '8K Film', speed: 'Medium' },
];

export const ASPECT_RATIOS = [
  { id: '1:1', label: '1:1', desc: 'Square (Instagram, Avatar)' },
  { id: '3:4', label: '3:4', desc: 'Portrait (Editorial, Phone)' },
  { id: '9:16', label: '9:16', desc: 'Story / Reel / TikTok' },
  { id: '16:9', label: '16:9', desc: 'Widescreen (Cinematic, Hero)' },
];

export const STYLE_PRESETS = [
  { id: 'photorealistic', label: 'Photorealistic', tag: '35mm photography, natural skin texture, 8k resolution' },
  { id: 'cinematic', label: 'Cinematic', tag: 'anamorphic lens flare, moody color grading, film grain' },
  { id: 'anime', label: 'Studio Ghibli', tag: 'hand-drawn anime aesthetic, lush watercolor scenery, whimsical' },
  { id: 'cyberpunk', label: 'Cyberpunk', tag: 'neon volumetric fog, futuristic urban dystopia, chromatic aberration' },
  { id: '3d-octane', label: '3D Render', tag: 'Octane render, subsurface scattering, raytraced reflections' },
  { id: 'vintage', label: 'Vintage 70s', tag: 'Kodak Kodachrome film stock, warm retro tones, subtle vignette' },
];

// Pool of high quality images returned by mock API for user generated prompts
export const MOCK_GENERATION_POOLS = [
  [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=85',
  ],
  [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
  ],
  [
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=85',
  ],
];
