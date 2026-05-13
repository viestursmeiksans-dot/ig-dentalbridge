# DentalBridge IG content pipeline

Two render paths, one orchestrator.

## Layout

```
ig-dentalbridge/
├── src/                    # Remotion (Reels, 1080×1920, 9:16)
│   ├── index.ts
│   ├── Root.tsx
│   └── compositions/
│       └── StatReveal.tsx  # 15s animated stat reveal
├── carousels/              # Puppeteer (Carousels, 1080×1350, 4:5)
│   ├── render.js
│   └── templates/
│       └── listing.html    # Tailwind-based slide template
├── briefs/                 # Input briefs (JSON for carousels, MD for orchestrator)
├── outputs/                # All rendered MP4s + PNGs land here
└── orchestrate.py          # Brief → Claude → render reel + carousel
```

## First-time setup

```bash
cd ig-dentalbridge
npm install
```

## Render the example carousel

```bash
node carousels/render.js briefs/supply-overpay.example.json
# → outputs/carousels/supply-overpay/slide-01.png … slide-05.png
```

## Render the example reel

```bash
# Live preview in browser:
npm run studio

# Headless render to MP4:
npm run render:reel
# → outputs/reels/stat-reveal.mp4
```

Pass custom props at the CLI:

```bash
npx remotion render src/index.ts StatReveal outputs/reels/custom.mp4 \
  --props='{"hook":"...","stat":"42","statSuffix":"%","context":"...","cta":"...","brand":"dentalbridge.eu"}'
```

## End-to-end (orchestrator)

```bash
python orchestrate.py briefs/supply-overpay.md
```

Currently the Claude-API expansion step is a stub that returns the example
brief — wire `expand_brief_with_claude()` to the Anthropic SDK to make it
fully autonomous.

## Specs

| Format | Dimensions | Duration | Tool |
|---|---|---|---|
| Reel | 1080×1920 (9:16) | 15s @ 30fps | Remotion |
| Carousel slide | 1080×1350 (4:5) | static | Puppeteer + Tailwind |
| Single post | 1080×1080 (1:1) | static | Puppeteer + Tailwind (TODO) |

## What's next

1. Wire `expand_brief_with_claude()` to Anthropic SDK (use `claude-sonnet-4-6` for cost).
2. Add a 1080×1080 single-post template.
3. Build 2 more Remotion templates (testimonial card, before/after price).
4. Add Instagram Graph API posting (needs Business IG + linked FB Page).
