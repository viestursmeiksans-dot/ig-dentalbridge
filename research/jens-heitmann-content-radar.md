# Jens Heitmann — Claude Code "Content Radar" system

**Source:** https://www.instagram.com/jens.heitmann/reel/DWooSQkkQe2/
**Caption:** "You can make Claude Code your Content Strategist that scans every platform, analyzes top creators, and generates personalized viral scripts automatically. Here's how I'm doing it."
**Hashtags:** #claudecode #claude #aitools #vibemarketing
**Duration:** 50s

## Verbatim transcript (Whisper, base model)

> I fully delegate out my short-form content ideas to my Claude Code. Here's the system I built and then the three-step process of how it gets me the ideas to video.
>
> I created a project in my Claude Code, which is called my Content Radar. And the main skill of this is called a Pulse Check. And it does a pulse across all social media platforms for current trending topics or ideas that are currently popular on the internet.
>
> Next, I have those trending topics analyzed against something I call Creator Packs, which are groupings of creators that might have already covered those topics to see how they performed and how the audience reacted to them.
>
> After validation states, I will use my skills that I built, which is my "ID and Make Viral" skill, which will create the content in my voice and for my script. And then also apply hooks and storytelling that are viral, respectively.
>
> Now, it does a good bit more, but these are the core systems that get my videos off the ground.

## System breakdown — 3 stages

| Stage | Skill name | Input | Output | Purpose |
|---|---|---|---|---|
| 1. Discovery | **Pulse Check** | (cron / on demand) | List of trending topics/ideas across all platforms | Find the wave before it crests |
| 2. Validation | **Creator Pack analysis** | Topic from stage 1 | Performance data: which creators in which "pack" covered it, how it landed (views, comments, sentiment) | Filter signal from noise — only proceed if real audience pull exists |
| 3. Production | **ID & Make Viral** | Validated topic | Full script in his voice, with proven hook + storytelling structure | Turn validated topic into shootable script |

### Why each stage matters

- **Pulse Check** is breadth. It scans many platforms so the input pool is wider than any one creator could manually scrape.
- **Creator Packs** are the validation gate. By grouping creators by niche/style, he can see *how the same topic performs across different framings* — telling him whether it's the topic that's hot or just one creator's execution.
- **ID & Make Viral** is the personalization layer. Generic AI scripts sound generic; this layer enforces *his* voice and reuses *proven* hook structures.

## Why this is good design (vs. naive "ChatGPT, write me a viral script")

1. **Topic selection is decoupled from script generation.** Most creators jump straight to script — Jens validates topic-market fit *first*.
2. **Validation uses real performance data, not LLM speculation.** Creator Packs are an empirical layer, not vibes.
3. **Voice is an explicit skill, not a prompt.** Means he can iterate on voice independently from the rest.
4. **It's a Claude Code project**, not a one-shot prompt — so each stage is a reusable skill, scheduled, with state.

## Adapted to DentalBridge

Three skills inside `ig-dentalbridge/.claude/skills/`:

### 1. `pulse-check` — dental tourism + clinic-supply trend scanner
Scan daily:
- TikTok: `#TurkeyTeeth` (700M+ views), `#DentalTourism`, `#TeethAbroad`, `#dentalimplants`
- Instagram Reels: same hashtags + competitor accounts (clinic chains in TR/HU/PL)
- Reddit: r/turkeyteeth, r/askdentists, r/Dentistry
- YouTube: top dental-tourism vlogs from the past 7 days
- Google News: UK NHS dental crisis stories (proven traffic driver)
- Twitter/X: dental influencers + UK consumer journalism

Output: `outputs/pulse/<date>.json` — top 20 trending topics, ranked by 7-day velocity.

### 2. `creator-packs` — dental space competitor groupings
Define packs:
- **Pack A — UK testimonial creators** (post-procedure storytellers, e.g. "I went to Turkey for my teeth")
- **Pack B — Clinic accounts** (Turkish/Hungarian clinic chains running official IG)
- **Pack C — Dental educators** (UK/US dentists doing myth-bust reels)
- **Pack D — Cost-comparison creators** (price-reveal format)
- **Pack E — Industry/B2B** (DSO operators, supply chain commentators — DentalBridge's actual buyers)

For each topic from stage 1, fetch top 5 reels in each relevant pack, log views/likes/comments, flag what's working (hook style, format, length).

Output: `outputs/validation/<topic>.md` — go/no-go + chosen format.

### 3. `id-and-make-viral` — DentalBridge voice + viral structures
Voice profile (define once in `voice.md`):
- **Tone:** authoritative but plain-spoken; numbers-driven; mildly contrarian about brokers/markups
- **POV:** "We see what clinics get charged. Here's what's wrong."
- **Forbidden:** emoji walls, fake urgency, gimmicky transitions

Hook library (curated from validated viral reels):
- Pattern interrupt: "78% of clinics overpay — and don't know it."
- Stat reveal: open with a number, defend it
- Myth bust: "Everyone says X. Here's what the invoices show."
- Cost callout: "This crown costs €40 to make. Here's what your patient pays."

Output: full script (hook → body → CTA) + props for the right Remotion/carousel template.

## What's worth stealing vs. ignoring

| Idea | Steal? | Why |
|---|---|---|
| 3-stage pipeline (discover → validate → produce) | **Yes** | Cleanly separates concerns; every stage independently improvable |
| Creator Packs as validation primitive | **Yes** | Specific enough to be actionable; replaces vibes with data |
| Voice as a skill, not a prompt | **Yes** | We have a clear DentalBridge POV — codify it once |
| "It does a good bit more" — implied posting/scheduling | **Skip for now** | Don't automate posting until 10+ pieces have been hand-reviewed |
| Multi-platform scanning | **Partial** | Start with TikTok + IG + Reddit; YouTube+News later |

## Build order (recommended)

1. `voice.md` — write the DentalBridge brand voice once (1 hour)
2. `creator-packs.json` — list 3–5 accounts per pack, hand-curated (1 hour)
3. `pulse-check` skill — script that scrapes hashtags, ranks by velocity (half day)
4. `creator-packs` analysis skill — for a given topic, pull top reels in each pack (half day)
5. `id-and-make-viral` skill — assembles topic + voice + hook library → script + render brief (half day)
6. Wire all three into `orchestrate.py` — replacing the current stub
