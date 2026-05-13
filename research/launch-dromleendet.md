# Launch package — @dromleendet (Drömleendet)

Ready-to-paste copy for Instagram setup, plus voice rules and the first 9-grid plan.

## Account identity (paste into IG)

| Field | Value |
|---|---|
| **Username (handle)** | `dromleendet` |
| **Display name** | `Drömleendet` |
| **Category** | Health & Wellness *(or "Health/Beauty")* |
| **Pronouns** | (leave blank) |
| **Account type** | Business or Creator (Business — needed for Graph API + Insights) |
| **Linked Page** | Required for Graph API posting later |

## Bio — 4 variants, pick one

Instagram bio = **150 characters max**. All 4 land at 130–148 chars. Pick by tone you want.

### A. Aspirational + promise *(recommended primary)*
```
Leendet du alltid drömt om — utan svenska tandvårdspriser.
Granskade kliniker. Riktiga priser. Riktiga resultat.
👇 Börja här
```

### B. Bold contrarian
```
Vad kostar drömleendet egentligen?
Vi visar priserna kliniker inte gärna delar.
Sverige • implantat • skalfasader
👇
```

### C. First-person / testimonial-coded
```
Smilet du gömmer behöver inte vara permanent.
Vi guidar dig — pris, klinik, resultat.
🇸🇪 Tusentals svenskar har redan gjort resan.
👇
```

### D. Numbers-driven
```
80 000 kr i Sverige. 18 000 kr utomlands. Samma resultat.
Vi visar hur — utan mellanhänder.
👇 Få din kostnadskalkyl
```

**My recommendation: A.** It carries emotion (drömt om) without making a claim we can't back. B and D are stronger hooks but lock the account into a price-comparison angle that may narrow content options later.

## Link in bio

Use a single link, not a Linktree. Send to a one-screen landing page that does **one thing only**:
- A 3-question form: *"Vad vill du göra? / Var bor du? / När?"*
- One CTA: *"Få kostnadsfri rådgivning"*
- Auto-routes lead to DentalBridge backend

URL slug suggestion: `dentalbridge.eu/sv/start` or a dedicated subdomain.

## Profile picture concept

Avoid:
- A literal smiling-mouth photo (clinic cliché, 1000 of these on IG)
- A logo with crown/tooth icon (dated)

Use one of:
- **Wordmark "D" or "DL"** — single bold letter on Drömleendet's brand color (deep teal `#0d9488` works against IG's white feed). Set in Inter Bold, slight letter-spacing tightening.
- **Brand color square** — solid teal with the lowercase "drömleendet" stacked at 8px size. Recognizable in a small avatar circle.

I'd start with the wordmark "D".

## Voice — locked rules

### POV
Second-person singular Swedish (`du`, `ditt`, `dina`). Never `ni` (too formal/corporate). Never `man` (too distant).

### Tone dial
- ✅ Direct, calm, numbers-specific
- ✅ Mildly contrarian: *"vad ingen säger högt"*, *"siffrorna kliniken inte visar"*
- ✅ Empathetic to the shame around hiding teeth
- ❌ No fake urgency (*"endast 3 platser kvar!"*)
- ❌ No emoji walls (1–2 per post max)
- ❌ No medical claims (*"riskfritt"*, *"garanterat"*)
- ❌ No comparing specific named clinics negatively (legal risk in Sverige)

### Forbidden phrases
- ❌ *"Det perfekta leendet"* — this is the headline of a damning Sveriges Radio investigation. Searching it surfaces consumer-protection journalism. Brand-poison.
- ❌ *"Hollywood smile"* — used by every dental tourism marketer; degraded.
- ❌ *"Riskfritt"*, *"smärtfritt"*, *"100% säkert"* — marknadsföringslagen risk.

### Required moves
- Lead with a number or a named pain point in the first 1.5 seconds.
- End every reel with a soft CTA — *"Skriv DRÖM så skickar vi listan"* — DM-keyword routing into a flow.
- Captions in Swedish only. Burn captions into video (vertical 9:16).

## Story highlights — 5 covers

Set up these 5 highlights immediately (empty highlights look unfinished but a fresh account with 5 named highlight rings looks intentional):

1. **Start här** — Pinned story with the "what this account is" pitch (15s)
2. **Priser** — Real cost breakdowns: implant, skalfasad, krona, Sverige vs utomlands
3. **Resultat** — Patient before/after sequences (consent-cleared)
4. **Resan** — What a dental trip actually looks like, day by day
5. **Frågor** — Recurring DM questions, answered

Use a single iconography style (Lucide line icons in white on teal squares), not stock photos.

## First 9-grid (the launch grid)

Instagram's default profile view shows a 3×3 grid. The first 9 posts establish identity. Don't post a tenth post until all 9 are live and reviewed.

| # | Type | Hook | Format | Render path |
|---|---|---|---|---|
| 1 | Reel | "80 000 kronor. Här är vad du faktiskt får för pengarna." | Stat reveal | Remotion `StatReveal` |
| 2 | Carousel | "De 4 mellanhänderna mellan dig och din krona." | 5-slide explainer | Puppeteer `listing.html` |
| 3 | Reel | "Jag flög till Budapest. Det här hände." | Personal narrative | Remotion (new template — `Story`) |
| 4 | Carousel | "Implantat: pris i Sverige vs Ungern vs Turkiet" | Price comparison | Puppeteer (new template — `PriceCompare`) |
| 5 | Reel | "Nej, billigt utomlands betyder inte sämre. Här är varför." | Myth bust | Remotion (new template — `MythBust`) |
| 6 | Carousel | "Så kollar du om en utländsk klinik är legitim — 6 saker." | Educational | Puppeteer `listing.html` |
| 7 | Reel | "En patient sparade 62 000 kr. Och fick samma resultat." | Case study | Remotion `StatReveal` (variant) |
| 8 | Carousel | "Vad kostar ett 'gratis' tandvårdsbidrag dig egentligen?" | Myth bust + numbers | Puppeteer `listing.html` |
| 9 | Reel | "Här är hur du börjar — utan att betala för en konsultation." | CTA / pinned | Remotion (new template — `CTACard`) |

Posts 3, 5, 9 require new Remotion templates beyond `StatReveal`. The carousel posts all use the existing `listing.html` template.

## Caption template (steal-and-fill)

```
[1-line hook — same line as on-screen text]

[2–4 lines body. One number per line if possible.]

[Single CTA, always the same: "Skriv DRÖM så skickar vi vår kostnadsguide gratis."]

—
#drömleendet #tandvård #tandimplantat #skalfasader #tandresan
```

## Hashtag set — 3 tiers, rotate

Swedish IG hashtags are smaller volume than English; use a tighter set (8–12) rather than 30.

**Tier 1 — Brand + niche (always include):**
`#drömleendet #tandvård #estetisktandvård #leende`

**Tier 2 — Procedure (pick 2–3 per post):**
`#tandimplantat #skalfasader #tandkrona #tandblekning #invisalign #porslinsfasader`

**Tier 3 — Audience signal (pick 1–2 per post):**
`#tandvårdiSverige #tandresan #sparapengar #tandvårdsbidrag`

## Posting cadence (first 30 days)

- Week 1: post 3 of the 9-grid (Mon/Wed/Fri)
- Week 2: post 3 more
- Week 3: post final 3 + start daily Stories
- Week 4: review Insights, double down on best-performing format

Goal for month 1: **10 posts, not viral.** The first 100 followers come from format consistency + DM responsiveness, not from one viral hit.

## What to set up now (in this order)

1. ✅ Decide handle — done: `@dromleendet`
2. Register IG account, switch to Business, link to FB Page
3. Paste bio variant A
4. Upload wordmark profile picture
5. Create 5 empty story highlights with the names above
6. Run `npm run render:reel` and `node carousels/render.js briefs/supply-overpay.example.json` — re-skinned for `Drömleendet` brand color
7. Build the 3 missing Remotion templates: `Story`, `MythBust`, `CTACard`
8. Build the 1 missing carousel template: `PriceCompare`
9. Generate posts 1–9 via the orchestrator
10. Hand-review every post in `outputs/` before scheduling

## Brand mark — minimum viable

Until a real designer is involved:
- **Primary color:** `#0d9488` (teal-600) — confident, medical, distinct from the pink/gold most clinics use
- **Secondary:** `#0a0a0a` (near-black) for typography
- **Accent:** `#fef3c7` (warm cream) for highlights/eyebrow text
- **Typeface:** Inter (already in our pipeline)
- **Wordmark:** lowercase `drömleendet` — set tight, `tracking-tight`, weight 700

These tokens slot into both the Remotion compositions and the Puppeteer carousel template without changes to layout.
