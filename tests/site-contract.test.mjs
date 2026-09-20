import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

for (const [path, lang, title, titleAccent] of [
  ["/", "kk", "Біз мүмкін еместі жасаймыз.", "Және оны жүйелі етеміз."],
  ["/ru", "ru", "Создаём невозможное.", "И превращаем в системное."],
  ["/en", "en", "We create the impossible.", "And make it systemic."],
]) {
  test(`renders ${lang} landing page with the exact brand slogan`, async () => {
    const response = await render(path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();

    // Check the visible H1, not a matching string in serialized page data.
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
    assert.equal(headings.length, 1, "The page must have exactly one H1");
    const heading = headings[0][1]
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    assert.equal(heading, `${title} ${titleAccent}`);

    assert.match(html, /Barfin Network Limited/);
    assert.match(html, /name="contact"/);
    assert.match(html, /name="message"/);
    assert.doesNotMatch(html, /info@barfin\.org|mailto:/i);
    assert.match(html, new RegExp(`lang="${lang}"`));
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
  });
}
