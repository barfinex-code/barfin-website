import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.BARFIN_BASE_URL;
const cases = [
  { path: "/", lang: "kk", title: "Біз мүмкін еместі жасаймыз.", accent: "Және оны жүйелі етеміз.", footer: "Болашақты жақындатамыз.", focus: "Цифрлық өнімдер. Жүйелі тәсіл.", searchTitle: "ЖИ, финтех және цифрлық өнімдер", ogLocale: "kk_KZ" },
  { path: "/ru", lang: "ru", title: "Создаём невозможное.", accent: "И превращаем в системное.", footer: "Приближаем будущее.", focus: "Цифровые продукты. Системный подход.", searchTitle: "ИИ, финтех и цифровые продукты", ogLocale: "ru_RU" },
  { path: "/en", lang: "en", title: "We create the impossible.", accent: "And make it systemic.", footer: "Bringing the future closer.", focus: "Digital products. A systemic approach.", searchTitle: "AI, fintech and digital products", ogLocale: "en_US" },
];

async function render(path = "/", extraHeaders = {}) {
  const headers = { accept: "text/html", ...extraHeaders };
  if (baseUrl) {
    return fetch(new URL(path, baseUrl), { headers, redirect: "manual", signal: AbortSignal.timeout(20000) });
  }
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

function decode(value) {
  return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
function visibleText(html) {
  return decode(html.replace(/<!--[\s\S]*?-->/g, "").replace(/<br\s*\/?>/gi, " ").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim());
}
function tags(html, tag) {
  return [...html.matchAll(new RegExp(`<${tag}\\b([^>]*?)>`, "gi"))].map((match) =>
    Object.fromEntries([...match[1].matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key.toLowerCase(), decode(value)])),
  );
}
function meta(html, key) {
  const matches = tags(html, "meta").filter((tag) => tag.name === key || tag.property === key);
  assert.equal(matches.length, 1, `Expected one ${key} meta tag`);
  return matches[0].content;
}
// The runtime may serialize an origin without a final slash. Compare absolute
// URL identities, not equivalent root spellings; paths still match exactly.
function absoluteUrl(value) { return new URL(value).href; }

for (const entry of cases) {
  test(`${entry.lang}: approved slogans, meaningful visible content and links`, async () => {
    const response = await render(entry.path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    assert.doesNotMatch(response.headers.get("x-robots-tag") ?? "", /noindex/i);
    const html = await response.text();
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
    assert.equal(headings.length, 1);
    assert.equal(visibleText(headings[0][1]), `${entry.title} ${entry.accent}`);
    assert.equal(tags(html, "html")[0].lang, entry.lang, "Initial HTML language must match the URL");
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
    assert.ok(main, "A visible main region is required");
    assert.ok(visibleText(main).includes(entry.focus));
    assert.ok(visibleText(main).includes("Barfinex"));
    assert.ok(visibleText(main).includes("BaniBanani"));
    assert.match(main, /href="https:\/\/barfinex\.com\/"/);
    assert.match(main, /href="https:\/\/banibanani\.com\/(ru|en)"/);
    assert.equal(tags(main, "article").length, 5, "Three focus cards and two real projects");
    for (const id of ["focus", "projects", "approach", "contact"]) {
      assert.equal(tags(html, "section").filter((tag) => tag.id === id).length, 1);
      assert.ok(tags(html, "a").some((tag) => tag.href === `#${id}`));
    }
    assert.ok(visibleText(html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/i)?.[1] ?? "").includes(entry.footer));
    assert.match(html, /name="contact"/);
    assert.match(html, /name="message"/);
    assert.doesNotMatch(html, /info@barfin\.org|mailto:/i);
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
  });

  test(`${entry.lang}: localized search and social metadata`, async () => {
    const html = await (await render(entry.path)).text();
    const titles = [...html.matchAll(/<title>([\s\S]*?)<\/title>/gi)];
    assert.equal(titles.length, 1);
    assert.equal(visibleText(titles[0][1]), `${entry.searchTitle} · Barfin Network Limited`);
    const canonical = new URL(entry.path, "https://barfin.org").href;
    const links = tags(html, "link");
    assert.deepEqual(links.filter((tag) => tag.rel === "canonical").map((tag) => absoluteUrl(tag.href)), [canonical]);
    for (const [lang, path] of [["kk", "/"], ["ru", "/ru"], ["en", "/en"], ["x-default", "/"]]) {
      const alternate = links.filter((tag) => tag.rel === "alternate" && tag.hreflang === lang);
      assert.equal(alternate.length, 1);
      assert.equal(absoluteUrl(alternate[0].href), new URL(path, "https://barfin.org").href);
    }
    const description = meta(html, "description");
    assert.ok(description.includes("Barfinex") && description.includes("BaniBanani"));
    assert.ok(description.length >= 80 && description.length <= 180);
    assert.equal(meta(html, "og:description"), description);
    assert.equal(meta(html, "twitter:description"), description);
    assert.equal(meta(html, "og:title"), visibleText(titles[0][1]));
    assert.equal(meta(html, "twitter:title"), visibleText(titles[0][1]));
    assert.equal(absoluteUrl(meta(html, "og:url")), canonical);
    assert.equal(meta(html, "og:locale"), entry.ogLocale);
    assert.equal(meta(html, "og:type"), "website");
    assert.equal(meta(html, "twitter:card"), "summary_large_image");
    assert.equal(meta(html, "og:image"), "https://barfin.org/og.png");
    assert.ok(meta(html, "og:image:alt").length > 15);
    assert.match(meta(html, "robots"), /max-image-preview:large/);
    assert.doesNotMatch(meta(html, "robots"), /noindex|nofollow/);
  });

  test(`${entry.lang}: structured data matches visible company and projects`, async () => {
    const html = await (await render(entry.path)).text();
    const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
    assert.equal(scripts.length, 1);
    const data = JSON.parse(scripts[0][1]);
    assert.equal(data["@context"], "https://schema.org");
    const graph = data["@graph"];
    assert.equal(graph.length, 5);
    assert.equal(new Set(graph.map((node) => node["@id"])).size, graph.length);
    const organization = graph.find((node) => node["@type"] === "Organization");
    const page = graph.find((node) => node["@type"] === "WebPage");
    const website = graph.find((node) => node["@type"] === "WebSite");
    const mainText = visibleText(html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)[1]);
    assert.equal(organization.name, "Barfin Network Limited");
    assert.equal(organization.identifier.value, "221040900321");
    assert.ok(mainText.includes(organization.description));
    assert.equal(page.inLanguage, entry.lang);
    assert.equal(page.url, new URL(entry.path, "https://barfin.org").href);
    assert.equal(page.isPartOf["@id"], website["@id"]);
    assert.equal(page.mainEntity["@id"], organization["@id"]);
    assert.deepEqual(website.inLanguage, ["kk", "ru", "en"]);
    assert.equal(page.dateModified, "2026-09-20");
    const brands = graph.filter((node) => node["@type"] === "Brand");
    assert.deepEqual(brands.map((brand) => brand.name), ["Barfinex", "BaniBanani"]);
    for (const brand of brands) {
      assert.ok(mainText.includes(brand.description));
      assert.ok(tags(html, "a").some((tag) => tag.href === brand.url));
    }
    assert.doesNotMatch(scripts[0][1], /aggregateRating|reviewCount|priceCurrency|FAQPage|FinancialService/);
  });
}

test("URL language is not overridden by a visitor header", async () => {
  const html = await (await render("/ru", { "x-barfin-locale": "en", "accept-language": "en-US" })).text();
  assert.equal(tags(html, "html")[0].lang, "ru");
});

test("robots permits public content and advertises the sitemap", async () => {
  const response = await render("/robots.txt");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /text\/plain/i);
  const body = await response.text();
  assert.match(body, /User-Agent:\s*\*/i);
  assert.match(body, /Allow:\s*\//i);
  assert.match(body, /Disallow:\s*\/api\//i);
  assert.match(body, /Sitemap:\s*https:\/\/barfin\.org\/sitemap\.xml/i);
  assert.doesNotMatch(body, /^Disallow:\s*\/\s*$/im);
});

test("sitemap contains only the three canonical localized pages", async () => {
  const response = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /xml/i);
  const body = await response.text();
  const locations = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.deepEqual(locations.sort(), ["https://barfin.org/", "https://barfin.org/en", "https://barfin.org/ru"]);
  assert.match(body, /2026-09-20/);
  assert.equal((body.match(/hreflang="x-default"/g) ?? []).length, 3);
  assert.doesNotMatch(body, /localhost|\/api\/|#focus|#projects/);
});

test("unknown pages return a real 404", async () => {
  assert.equal((await render("/this-page-does-not-exist-seo-check")).status, 404);
});
