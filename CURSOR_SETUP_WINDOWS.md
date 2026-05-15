# Cursor setup for the Drömleendet project (Windows)

This guide is for a **non-developer** who will edit Remotion reels and Swedish copy using Cursor's AI chat. Total setup time: ~15 minutes.

**Prerequisites you should already have done** (from the main README):
- Git for Windows installed
- Node.js LTS installed
- GitHub CLI installed and authenticated (`gh auth login`)
- The repo cloned: `git clone https://github.com/viestursmeiksans-dot/ig-dentalbridge.git`
- `npm install` ran successfully inside the project folder

If any of those is missing, finish them first.

---

## Step 1 — Install Cursor

1. Open https://cursor.com in your browser
2. Click **Download for Windows**
3. Run the downloaded `Cursor Setup x.x.x.exe`
4. **Leave all installer options at default** and click through. It auto-launches when done.

## Step 2 — Sign in (use GitHub)

1. Cursor opens to a welcome screen
2. Click **Sign in**
3. Choose **Continue with GitHub** (use the same GitHub account you authenticated `gh` with — `viestursmeiksans-dot` or whichever was set up for you)
4. Browser opens → click **Authorize** → return to Cursor

## Step 3 — Pick a plan

Cursor's first screen offers:

| Plan | Cost | Realistic use |
|---|---|---|
| **Hobby (Free)** | $0 | ~50 AI requests/month with strong models. Enough for trying it out. |
| **Pro** | $20/month | Effectively unlimited daily edits — the realistic choice once you're editing reels weekly. |

**Recommendation:** start with **Hobby** to confirm it works, upgrade to **Pro** the first time you hit the limit.

## Step 4 — Open the project folder

1. In Cursor's top menu: **File → Open Folder…**
2. Navigate to where you cloned the repo (likely `C:\Users\<your-name>\ig-dentalbridge`)
3. Click **Select Folder**
4. If Cursor asks "Do you trust the authors of the files in this folder?" → click **Yes, I trust the authors**

You'll see the file tree on the left and a welcome page in the center.

## Step 5 — Pick the AI model

1. Look at the bottom-right of the Cursor window → there's a small selector showing the current model
2. Click it and choose **Claude Sonnet 4.6**

Why: it's the strongest model for the kind of edits you'll make (reading Swedish copy, understanding the Remotion code, proposing precise diffs). It's also the same model the project owner uses.

## Step 6 — Open the AI chat

Press **Ctrl + L** — a chat panel slides in on the right side of the window.

You'll know `.cursorrules` is active when:
- The chat sidebar shows a small **Rules** indicator at the top
- The AI's first response references the Drömleendet project context without you explaining it

Try it now: type *"What does this project do?"* → press Enter. The reply should mention Drömleendet, Swedish, Remotion reels, dental tourism to Riga.

## Step 7 — Start the Remotion Studio (in parallel)

You'll want a live preview of your changes. In Cursor's bottom menu: **Terminal → New Terminal** (or press **Ctrl + `**).

In the terminal that appears, type:
```bash
npm run studio
```

Wait ~10 seconds. A browser tab auto-opens at **http://localhost:3000** showing all 8 compositions. **Leave it open** while you work.

## Step 8 — Try your first edit

In the Cursor chat panel (Ctrl+L), type something simple:

> *"In Reel 6 (SameDayTrip), change the headline 'Hela behandlingen klar på en dag' to 'Klar samma dag — hem till middagen'"*

What Cursor does:
1. Reads `src/compositions/SameDayTrip.tsx`
2. Finds the right line
3. Shows you a **diff** — red strike-through old text, green new text — in a preview pane
4. Two buttons at the bottom of the diff: **Accept** and **Reject**

Click **Accept** → file is saved → switch to your browser tab → Studio auto-refreshes within 1 second → scrub the timeline to see your change.

If it looks wrong: press **Ctrl + Z** in Cursor's editor pane to undo.

## Step 9 — Commit and push (no terminal needed)

After accepting your changes:

1. Click the **Source Control** icon in Cursor's left sidebar (looks like a branching arrow, or press **Ctrl + Shift + G**)
2. You'll see a list of changed files under "Changes"
3. Type a short message in the **Message** box at the top, e.g. `Reel 6: better Swedish headline`
4. Click the **✓ Commit** button
5. Then click the **... menu** at the top of the panel → **Push**

Your changes are now on GitHub. Viesturs will see them next time he pulls.

## Daily workflow summary

Every day you sit down to edit:

```
1. Open Cursor                              (1 click)
2. Source Control panel → Pull              (gets latest from GitHub)
3. Open a terminal → npm run studio         (1 command)
4. Chat (Ctrl+L) → describe your edit       (English or Swedish)
5. Accept the diff
6. Preview in browser
7. Source Control → Commit + Push           (when happy)
```

## Things to know about the rules (`.cursorrules`)

Cursor automatically reads this file from the repo root. It tells the AI:

- **Refuse** to edit `src/shared/brand.ts`, `research/transcript-DWooSQkkQe2.txt`, and `research/launch-dromleendet.md` without explicit confirmation (these contain verified May 2026 data — prices, exchange rates, Försäkringskassan rules)
- **Flag** forbidden Swedish phrases — especially **"Det perfekta leendet"** (it's the title of a damaging Sveriges Radio investigation; never use it)
- Use second-person `du`/`ditt`, numbers-driven copy, no fake urgency
- Never auto-render MP4s
- Never auto-push to GitHub (you push manually)

If the AI ever says something like *"This file contains verified May 2026 data, please confirm with Viesturs..."* — that's the rules working. Ask Viesturs before overriding.

## Troubleshooting

| Problem | Fix |
|---|---|
| Cursor's chat says "rate limit reached" | You're on Hobby tier — wait until tomorrow, or upgrade to Pro |
| Studio shows red error screen | Look at the terminal — there's an error message. Paste it into the Cursor chat: *"What does this error mean and how do I fix it?"* |
| "Permission denied" when pushing | Run `gh auth login` in the terminal again |
| Cursor can't find `npm` in the terminal | Close Cursor completely (right-click the tray icon → Quit), reopen — it picks up Node.js after a restart |
| Changes don't appear in the Studio | Save the file (Ctrl+S). Studio reloads only on save, not on edit. |
| You edited the wrong thing | Press Ctrl+Z to undo in Cursor's editor pane. If already committed, ask Viesturs to help revert. |

## Asking for help

When something doesn't work, paste **the exact error message** (don't paraphrase) into the Cursor chat and ask what it means. The AI is good at diagnosing.

If the AI can't fix it, screenshot the terminal + Cursor chat and send to Viesturs.

## What's safe to experiment with

✅ Edit Swedish text in any `.tsx` file in `src/compositions/`
✅ Change colors *within* a single composition (overriding shared brand for one reel)
✅ Adjust durations, font sizes, positions (top, bottom, left, right values)
✅ Add new carousel briefs in `briefs/*.json`
✅ Create new reels — ask Cursor to "scaffold a new reel" and follow its lead

## What requires Viesturs's sign-off

❌ Editing `src/shared/brand.ts` (prices, EUR→SEK rate, hotel/flight data)
❌ Editing `package.json` or installing new packages
❌ Renaming files
❌ Deleting files
❌ Force-pushing or rewriting Git history

---

That's it. Save this guide as a bookmark — you'll reference it the first few times.
