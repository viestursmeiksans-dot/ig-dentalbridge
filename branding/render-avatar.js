const path = require("node:path");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1080, height: 1080, deviceScaleFactor: 1 },
  });
  try {
    const page = await browser.newPage();
    await page.goto("file://" + path.join(__dirname, "profile-picture.html"), {
      waitUntil: "networkidle0",
    });
    await new Promise((r) => setTimeout(r, 400));
    const el = await page.$("#avatar");
    const out = path.join(__dirname, "..", "outputs", "branding", "profile-picture.png");
    await el.screenshot({ path: out });
    console.log("[branding] wrote", out);
  } finally {
    await browser.close();
  }
})();
