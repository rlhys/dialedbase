"use client";

import { FormEvent, useState } from "react";
import { contact } from "@/content/site";
import { cx } from "@/lib/utils";

const fieldClass =
  "mt-1.5 w-full rounded-[var(--radius-sm)] border border-[var(--line)] bg-chalk px-3.5 py-3 text-base text-bark outline-none transition focus:border-sky focus:ring-2 focus:ring-sky/40";

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const lines = [
      "Kim Logistics quote request",
      `First name: ${data.get("firstName") || ""}`,
      `Last name: ${data.get("lastName") || ""}`,
      `Phone: ${data.get("phone") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Moving from: ${data.get("from") || ""}`,
      `Moving to: ${data.get("to") || ""}`,
      `Moving date: ${data.get("date") || ""}`,
      `Number of rooms: ${data.get("rooms") || ""}`,
    ];
    const body = encodeURIComponent(lines.join("\n"));
    const subject = encodeURIComponent("Quote request from kimlogistics.co.uk rebuild");
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`, "_self");
    setStatus("sent");
    form.reset();
  }

  if (status === "sent") {
    return (
      <div
        className="rounded-[var(--radius-md)] border border-[var(--line)] bg-sky/25 p-6"
        role="status"
        aria-live="polite"
      >
        <p className="font-display text-2xl text-bark">Thanks. Your email draft should be open.</p>
        <p className="mt-2 text-stone">
          If nothing opened, email{" "}
          <a className="font-semibold text-bark underline" href={contact.emailHref}>
            {contact.email}
          </a>{" "}
          or call{" "}
          <a className="font-semibold text-bark underline" href={contact.phoneHref}>
            {contact.phoneDisplay}
          </a>
          .
        </p>
        <button
          type="button"
          className="btn-dwell btn-ghost mt-5"
          onClick={() => setStatus("idle")}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cx("grid gap-4", compact ? "" : "md:grid-cols-2")}>
      <label className="block text-sm font-medium text-bark">
        First name
        <input className={fieldClass} name="firstName" type="text" autoComplete="given-name" required />
      </label>
      <label className="block text-sm font-medium text-bark">
        Last name
        <input className={fieldClass} name="lastName" type="text" autoComplete="family-name" required />
      </label>
      <label className="block text-sm font-medium text-bark">
        Phone
        <input className={fieldClass} name="phone" type="tel" autoComplete="tel" required />
      </label>
      <label className="block text-sm font-medium text-bark">
        Email
        <input className={fieldClass} name="email" type="email" autoComplete="email" required />
      </label>
      <label className="block text-sm font-medium text-bark">
        Moving from
        <input className={fieldClass} name="from" type="text" required />
      </label>
      <label className="block text-sm font-medium text-bark">
        Moving to
        <input className={fieldClass} name="to" type="text" required />
      </label>
      <label className="block text-sm font-medium text-bark">
        Moving date
        <input className={fieldClass} name="date" type="date" required />
      </label>
      <label className="block text-sm font-medium text-bark">
        Number of rooms
        <input className={fieldClass} name="rooms" inputMode="numeric" />
      </label>
      <div
        className={cx(
          "flex flex-col gap-3",
          compact ? "" : "md:col-span-2 md:flex-row md:items-center md:justify-between",
        )}
      >
        <p className="text-sm text-stone">
          Free, no-obligation quote. Or call{" "}
          <a className="font-semibold text-bark underline" href={contact.phoneHref}>
            {contact.phoneDisplay}
          </a>
          .
        </p>
        <button type="submit" className="btn-dwell btn-signal px-5 py-3">
          Request free quote
        </button>
      </div>
    </form>
  );
}
