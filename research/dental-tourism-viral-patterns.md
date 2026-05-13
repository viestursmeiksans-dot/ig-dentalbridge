# Dental tourism viral patterns — what actually works on IG/TikTok

Synthesis of research conducted 2026-05-10. Sources at end.

## Market scale (why this niche matters)

- Global dental tourism market: **$12.48B (2024) → projected $65–98B by 2033–34**.
- `#TurkeyTeeth`: **700.8M views on TikTok, 18.2K Instagram posts**.
- UK is the dominant English-speaking source market — driven by NHS dental access crisis.
- Top destinations: **Turkey, Hungary, Poland, Mexico, Thailand, India**.

## What makes a dental-tourism reel viral (pattern catalogue)

### Hook patterns (first 1–2 seconds)
| Pattern | Example | Why it works |
|---|---|---|
| **Stat shock** | "78% of EU dental clinics overpay for supplies." | Curiosity gap + specific number |
| **Cost callout** | "I paid £400 for what they quoted me £6,000 for in the UK." | Triggers "wait, what?" |
| **Myth bust** | "Everything you know about Turkey teeth is wrong." | Forces engagement to defend self-image |
| **Identity hook** | "If you're a dentist watching this — you've been lied to." | Targets a tribe directly |
| **Pattern interrupt** | "Stop quoting your patients in pounds." | Imperative + counter-intuitive |
| **Before/after tease** | Hard-cut to a smile reveal at frame 1 | Visual payoff promise |

### Format patterns (most-used → least-used)

1. **Before/after transformation** — single most-saturated format. Easy to make, easy to copy. Diminishing returns unless you twist it (e.g. cost overlay, 6-month progression).
2. **Cost comparison reveal** — "UK quote vs. Turkey quote vs. actual lab cost." Underused at the *supply* layer (where DentalBridge lives).
3. **Recovery vlog** — patient documenting day-by-day. Trust-building. Hard to fake.
4. **Myth-bust series** — "Myth!" → reveal. Reusable template, low production cost, builds authority.
5. **Process explainer** — what actually happens in the chair. Authority + curiosity.
6. **Complication warning** — "Don't make this mistake." Risk-averse audience eats it.
7. **Behind-the-scenes** — clinic walkthroughs, sterilization process. B2B-adjacent.

### Length & technical
- Reels **under 30 seconds** outperform longer ones for cold reach
- **Vertical 9:16, 1080×1920**
- **Captions burned-in** (most users watch muted)
- **Trending audio** — bumps discovery substantially
- Hook must land **inside frame 0–45** (1.5s @ 30fps)

## Hashtag clusters

| Cluster | Tags | Volume |
|---|---|---|
| Tourism — UK angle | `#TurkeyTeeth #dentalholiday #teethabroad #nhsdental` | High, English |
| Procedure | `#dentalimplants #veneers #fullmouthrestoration #zirconia` | High, mixed |
| Country | `#dentaltourismturkey #dentalhungary #dentalpoland` | Medium |
| Industry/B2B | `#dentistry #dentalpractice #dso #dentaleconomics` | Lower, but DentalBridge's actual buyers |

## DentalBridge angle — what's underexploited

Most viral dental content is **patient-side**. The supply-cost story is **almost completely absent** from IG/TikTok. That's the opening.

Specifically underexploited angles:
1. **"What this crown actually costs to make vs. what you pay"** — supply-chain transparency reel
2. **"Why your dentist charges £900 for a £40 box of composite"** — invoice-receipt reveal
3. **"The 4 brokers between your clinic and the manufacturer"** — supply-chain map carousel
4. **"This UK clinic saves £80k/year just by buying direct"** — case study
5. **"Why Turkey is cheap (it's not what you think)"** — myth-bust reframing, ties to mainstream search demand

These ride existing search/hashtag traffic (tourism is the entry point) but **redirect viewers to the supply-cost insight** — which is DentalBridge's actual wedge.

## Content cadence proposal

Weekly mix (5 posts):
- **2× cost-reveal carousel** (1080×1350, listing template) — high-saving reels for clinics
- **2× myth-bust reel** (1080×1920, 15s, Remotion) — pulls in tourism searchers, redirects to supply story
- **1× behind-the-scenes / case study** (carousel or reel) — credibility

## Adapted Content Radar — what the 3 skills should output for us

### `pulse-check` daily output
JSON list of 20 candidate topics, each with:
- `topic` (string)
- `velocity_score` (engagement growth over last 7 days, 0–100)
- `source_platform`
- `top_3_reference_urls`
- `format_signal` (which format pattern is winning for this topic)
- `dentalbridge_angle` (how to twist toward supply-cost story; null if untwistable)

### `creator-packs` validation output
For each candidate topic:
- Pack-by-pack performance (median views, top-quartile views)
- Hook style breakdown
- Recommended format + length
- Go/No-Go with reasoning

### `id-and-make-viral` script output
- 15–30s reel script: `[hook][build][reveal][cta]` with frame timestamps
- OR 5-slide carousel brief (already supported by `carousels/render.js`)
- Caption + hashtag set
- Render-ready props for the matching template

## Sources

- Travel and Tour World, "Dental Health Tourism Explosion" (2026)
- BDJ / PMC: Contemporary dental tourism: review of UK media reporting (2025)
- TikTok hashtag stats: `#TurkeyTeeth` 700.8M views
- Buffer: 2026 Instagram algorithm guide
- Sociolyzer / Sendible / Lasso MD: 2026 dental social media playbooks
- Jens Heitmann reel: Content Radar system architecture (transcribed in `jens-heitmann-content-radar.md`)
