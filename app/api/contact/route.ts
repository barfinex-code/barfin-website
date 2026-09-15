const MAX_BODY_LENGTH = 12_000;
const MAX_NAME_LENGTH = 100;
const MAX_CONTACT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 2_000;
const MIN_INTERVAL_MS = 5_000;
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

type RateRecord = {
  count: number;
  windowStartedAt: number;
  lastRequestAt: number;
};

const requestsByIp = new Map<string, RateRecord>();

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function json(body: Record<string, unknown>, status: number): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function getClientIp(request: Request): string {
  return request.headers.get("cf-connecting-ip")
    ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const previous = requestsByIp.get(ip);

  if (!previous || now - previous.windowStartedAt >= WINDOW_MS) {
    requestsByIp.set(ip, { count: 1, windowStartedAt: now, lastRequestAt: now });
    return false;
  }

  const limited = now - previous.lastRequestAt < MIN_INTERVAL_MS
    || previous.count >= MAX_REQUESTS_PER_WINDOW;

  previous.count += 1;
  previous.lastRequestAt = now;
  requestsByIp.set(ip, previous);
  return limited;
}

export async function POST(request: Request): Promise<Response> {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return json({ ok: false, error: "invalid_content_type" }, 415);
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_LENGTH) {
    return json({ ok: false, error: "payload_too_large" }, 413);
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return json({ ok: true }, 200);
  }

  if (isRateLimited(getClientIp(request))) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const contact = typeof body.contact === "string" ? body.contact.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const locale = body.locale === "kk" || body.locale === "ru" || body.locale === "en"
    ? body.locale
    : "unknown";

  if (name.length < 2 || contact.length < 3 || message.length < 10) {
    return json({ ok: false, error: "missing_fields" }, 400);
  }

  if (name.length > MAX_NAME_LENGTH || contact.length > MAX_CONTACT_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
    return json({ ok: false, error: "field_too_long" }, 400);
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("[contact] Telegram configuration is missing");
    return json({ ok: false, error: "service_unavailable" }, 503);
  }

  const text = [
    "📩 <b>Новая заявка с Barfin.org</b>",
    `🌐 <b>Язык:</b> ${escapeHtml(locale)}`,
    "",
    `👤 <b>Имя:</b> ${escapeHtml(name)}`,
    `💬 <b>Контакт:</b> ${escapeHtml(contact)}`,
    `<b>Сообщение:</b>\n${escapeHtml(message)}`,
    "",
    "#barfin #website",
  ].join("\n");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error("[contact] Telegram rejected the notification", response.status);
      return json({ ok: false, error: "notification_failed" }, 502);
    }

    return json({ ok: true }, 200);
  } catch (error) {
    console.error("[contact] Telegram request failed", error instanceof Error ? error.name : "unknown");
    return json({ ok: false, error: "notification_failed" }, 502);
  } finally {
    clearTimeout(timer);
  }
}
