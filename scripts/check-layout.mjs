import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const externalBase = process.env.BARFIN_BASE_URL;
const base = externalBase || "http://127.0.0.1:5174";
const output = externalBase ? "qa-screenshots/production" : "qa-screenshots/local";
await mkdir(output, { recursive: true });
const server = externalBase ? null : spawn("npm", ["run", "start", "--", "--hostname", "127.0.0.1", "--port", "5174"], { stdio: "inherit", detached: true });
let browser;
const results = [];
try {
  for (let attempt = 0; attempt < 45; attempt++) {
    try {
      const response = await fetch(base, { signal: AbortSignal.timeout(5000) });
      if (response.ok) break;
    } catch { /* Server startup is retried below. */ }
    assert.ok(attempt < 44, "Preview server did not become ready");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  browser = await chromium.launch({ headless: true });
  for (const [path, lang] of [["/", "kk"], ["/ru", "ru"], ["/en", "en"]]) {
    for (const width of [320, 390, 768, 1024, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 960 }, reducedMotion: "reduce" });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(new URL(path, base).href, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("html").getAttribute("lang"), lang);
      assert.equal(await page.locator("h1").count(), 1);
      assert.equal(await page.locator("#projects article").count(), 2);
      const problems = await page.evaluate(() => {
        const issues = [];
        if (document.documentElement.scrollWidth > innerWidth + 1) issues.push("Document overflows horizontally");
        for (const element of document.querySelectorAll(".editorial h2, .editorial h3, .editorial p, .editorial a, .site-header .brand, .language-switch")) {
          const rect = element.getBoundingClientRect();
          if (rect.width && (rect.left < -1 || rect.right > innerWidth + 1)) issues.push(`Out of viewport: ${element.textContent.slice(0, 70)}`);
          if (element.clientWidth && element.scrollWidth > element.clientWidth + 2) issues.push(`Clipped content: ${element.textContent.slice(0, 70)}`);
        }
        const nav = document.querySelector(".site-nav");
        if (getComputedStyle(nav).display !== "none") {
          const brand = document.querySelector(".site-header .brand").getBoundingClientRect();
          const navRect = nav.getBoundingClientRect();
          const languages = document.querySelector(".language-switch").getBoundingClientRect();
          if (brand.right > navRect.left + 1 || navRect.right > languages.left + 1) issues.push("Header navigation overlaps");
        }
        for (const link of document.querySelectorAll('a[href^="#"]')) {
          if (!document.getElementById(link.getAttribute("href").slice(1))) issues.push("Broken section anchor");
        }
        return issues;
      });
      await page.screenshot({ path: `${output}/${lang}-${width}.png`, fullPage: true });
      assert.deepEqual(problems, [], `${lang} at ${width}px`);
      assert.deepEqual(errors, [], `${lang} at ${width}px browser errors`);
      results.push({ path, lang, width, status: "passed" });
      console.log(`PASS ${lang} ${width}px: content, navigation, language, no clipping`);
      await page.close();
    }
  }
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const page = await noJs.newPage();
  await page.goto(new URL("/ru", base).href);
  assert.match(await page.locator("#focus").innerText(), /технологическая компания/);
  assert.equal(await page.locator("#projects article").count(), 2);
  console.log("PASS content and project links remain available without JavaScript");
  await noJs.close();
} finally {
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2));
  await browser?.close();
  if (server?.pid) {
    try { process.kill(-server.pid, "SIGTERM"); } catch { /* Already stopped. */ }
  }
}
