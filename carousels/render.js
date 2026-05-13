// Carousel renderer: takes a brief JSON, fills the HTML template per slide,
// renders each slide to a 1080x1350 PNG via Puppeteer.
//
// Usage: node carousels/render.js briefs/<brief>.json
//
// Brief shape:
// {
//   "name": "supply-overpay",
//   "slides": [
//     { "kind": "hook",   "eyebrow": "...", "headline": "...", "body": "...", "footer_left": "Swipe →", "cta": "..." },
//     ...
//   ]
// }

const fs = require("node:fs");
const path = require("node:path");
const puppeteer = require("puppeteer");

const TEMPLATE_PATH = path.join(__dirname, "templates", "listing.html");
const OUTPUT_DIR = path.join(__dirname, "..", "outputs", "carousels");

function fillTemplate(template, vars) {
  return template.replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => {
    const v = vars[key];
    if (v === undefined) {
      console.warn(`[render] missing var: ${key}`);
      return "";
    }
    return String(v);
  });
}

async function main() {
  const briefArg = process.argv[2];
  if (!briefArg) {
    console.error("usage: node carousels/render.js <brief.json>");
    process.exit(1);
  }
  const briefPath = path.resolve(briefArg);
  const brief = JSON.parse(fs.readFileSync(briefPath, "utf8"));
  const template = fs.readFileSync(TEMPLATE_PATH, "utf8");

  const outDir = path.join(OUTPUT_DIR, brief.name);
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1080, height: 1350, deviceScaleFactor: 1 },
  });

  try {
    for (let i = 0; i < brief.slides.length; i++) {
      const slide = brief.slides[i];
      const html = fillTemplate(template, {
        KIND: slide.kind ?? "body",
        SLIDE_INDEX: String(i + 1).padStart(2, "0"),
        SLIDE_TOTAL: String(brief.slides.length).padStart(2, "0"),
        EYEBROW: slide.eyebrow ?? "",
        HEADLINE: slide.headline ?? "",
        BODY: slide.body ?? "",
        FOOTER_LEFT: slide.footer_left ?? "",
        CTA: slide.cta ?? "Learn more",
      });

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });
      // Wait for Tailwind CDN + fonts to settle.
      await new Promise((r) => setTimeout(r, 400));
      const slideEl = await page.$("#slide");
      const out = path.join(outDir, `slide-${String(i + 1).padStart(2, "0")}.png`);
      await slideEl.screenshot({ path: out, omitBackground: false });
      console.log(`[render] wrote ${out}`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
