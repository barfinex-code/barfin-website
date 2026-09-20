const base = process.env.BARFIN_BASE_URL;
if (!base) throw new Error("BARFIN_BASE_URL is required");
const deadline = Date.now() + 360000;
while (true) {
  try {
    const response = await fetch(new URL(`/ru?verify=${Date.now()}`, base), { signal: AbortSignal.timeout(15000) });
    const html = await response.text();
    if (response.ok && html.includes('id="focus-title"') && html.includes('id="barfin-structured-data"') && /<html[^>]*lang="ru"/.test(html)) {
      console.log("Updated public content is available; starting independent verification.");
      break;
    }
  } catch { /* A bounded wait covers the deployment window. */ }
  if (Date.now() >= deadline) throw new Error("Updated production content was not available within six minutes");
  console.log("Waiting for the production content update...");
  await new Promise((resolve) => setTimeout(resolve, 10000));
}
