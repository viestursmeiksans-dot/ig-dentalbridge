"""
DentalBridge IG content orchestrator (stub).

Pipeline:
  1. Read a topic brief (Markdown or short prompt) from briefs/.
  2. Ask Claude API to expand it into:
       - One Reel brief (StatReveal props)
       - One carousel brief (5 slides)
  3. Render the carousel via `node carousels/render.js`.
  4. Render the reel via `npx remotion render`.
  5. Drop everything into outputs/<date>-<topic>/ for human review.
  6. (Later) post via Instagram Graph API.

Run:
  python orchestrate.py briefs/<topic>.md
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).parent
BRIEFS_DIR = ROOT / "briefs"
OUTPUTS_DIR = ROOT / "outputs"


def expand_brief_with_claude(brief_text: str) -> dict:
    """Call Claude API to turn a topic into reel + carousel JSON briefs.

    TODO: wire to anthropic SDK once ANTHROPIC_API_KEY is set. For now this
    function returns a placeholder structure so the rest of the pipeline runs
    end-to-end.
    """
    return {
        "reel": {
            "hook": "EU dental clinics are bleeding cash.",
            "stat": "78",
            "statSuffix": "%",
            "context": "of clinics overpay for supplies — without ever knowing.",
            "cta": "DentalBridge fixes that.",
            "brand": "dentalbridge.eu",
        },
        "carousel_brief_path": str(BRIEFS_DIR / "supply-overpay.example.json"),
    }


def render_carousel(brief_path: Path) -> None:
    subprocess.run(
        ["node", "carousels/render.js", str(brief_path)],
        cwd=ROOT,
        check=True,
    )


def render_reel(props: dict, out_path: Path) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    props_json = json.dumps(props)
    subprocess.run(
        [
            "npx",
            "remotion",
            "render",
            "src/index.ts",
            "StatReveal",
            str(out_path),
            "--props",
            props_json,
        ],
        cwd=ROOT,
        check=True,
    )


def main() -> None:
    if len(sys.argv) < 2:
        print("usage: python orchestrate.py briefs/<topic>.md")
        sys.exit(1)

    brief_path = Path(sys.argv[1])
    brief_text = brief_path.read_text() if brief_path.exists() else sys.argv[1]

    expanded = expand_brief_with_claude(brief_text)

    stamp = date.today().isoformat()
    topic = brief_path.stem if brief_path.exists() else "adhoc"
    run_dir = OUTPUTS_DIR / f"{stamp}-{topic}"
    run_dir.mkdir(parents=True, exist_ok=True)

    print(f"[orchestrate] rendering carousel from {expanded['carousel_brief_path']}")
    render_carousel(Path(expanded["carousel_brief_path"]))

    print(f"[orchestrate] rendering reel to {run_dir / 'reel.mp4'}")
    render_reel(expanded["reel"], run_dir / "reel.mp4")

    print(f"[orchestrate] done. review files in {run_dir} and outputs/carousels/")


if __name__ == "__main__":
    main()
