"use client";

import { useState, type FormEvent } from "react";
import type { ContactCopy, Locale } from "../lib/content";

type SubmissionState = "idle" | "sending" | "success" | "error" | "rate-limited";

export function ContactForm({ locale, copy }: { locale: Locale; copy: ContactCopy }) {
  const [state, setState] = useState<SubmissionState>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setState("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          contact: data.get("contact"),
          message: data.get("message"),
          website: data.get("website"),
          locale,
        }),
      });

      if (response.status === 429) {
        setState("rate-limited");
        return;
      }

      if (!response.ok) throw new Error("Contact request failed");

      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  }

  const status = state === "success"
    ? copy.success
    : state === "rate-limited"
      ? copy.rateLimited
      : state === "error"
        ? copy.error
        : "";

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="contact-form-grid">
        <label className="form-field">
          <span>{copy.name}</span>
          <input name="name" type="text" autoComplete="name" required minLength={2} maxLength={100} placeholder={copy.namePlaceholder} />
        </label>

        <label className="form-field">
          <span>{copy.contact}</span>
          <input name="contact" type="text" autoComplete="tel" required minLength={3} maxLength={200} placeholder={copy.contactPlaceholder} />
        </label>
      </div>

      <label className="form-field form-field-message">
        <span>{copy.message}</span>
        <textarea name="message" required minLength={10} maxLength={2000} rows={5} placeholder={copy.messagePlaceholder} />
      </label>

      <label className="form-honeypot" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="contact-form-footer">
        <button className="button button-primary form-submit" type="submit" disabled={state === "sending"}>
          {state === "sending" ? copy.sending : copy.action}
          <span aria-hidden="true">↗</span>
        </button>
        <small>{copy.response}</small>
      </div>

      <p className={`form-status form-status-${state}`} role="status" aria-live="polite">{status}</p>
    </form>
  );
}
