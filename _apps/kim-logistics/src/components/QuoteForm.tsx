"use client";

import { FormEvent, useState } from "react";
import { contact, services } from "@/content/site";
import { cx } from "@/lib/utils";

const fieldClass =
  "mt-1.5 w-full border border-ink/15 bg-paper px-3.5 py-3 text-base text-ink outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/25";

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const lines = [
      "Kim Logistics quote request",
      `Name: ${data.get("name") || ""}`,
      `Phone: ${data.get("phone") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Service: ${data.get("service") || ""}`,
      `From: ${data.get("from") || ""}`,
      `To: ${data.get("to") || ""}`,
      `Preferred date: ${data.get("date") || ""}`,
      `Details: ${data.get("details") || ""}`,
    ];
    const body = encodeURIComponent(lines.join("\n"));
    const subject = encodeURIComponent("Quote request from kimlogistics.co.uk rebuild");
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`, "_self");
    setStatus("sent");
    form.reset();
  }

  if (status === "sent") {
    return (
      <div className="border border-ink/15 bg-paper p-6" role="status" aria-live="polite">
        <p className="font-display text-2xl text-ink">Thanks. Your email draft should be open.</p>
        <p className="mt-2 text-mute">
          If nothing opened, email{" "}
          <a className="font-semibold text-ink underline" href={contact.emailHref}>
            {contact.email}
          </a>{" "}
          or call{" "}
          <a className="font-semibold text-ink underline" href={contact.phoneHref}>
            {contact.phoneDisplay}
          </a>
          .
        </p>
        <button
          type="button"
          className="btn-solid mt-5 bg-ink px-4 py-2.5 text-sm text-paper hover:bg-ink-soft"
          onClick={() => setStatus("idle")}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cx("grid gap-4", compact ? "" : "md:grid-cols-2")}>
      <label className="block text-sm font-medium text-ink">
        Full name
        <input className={fieldClass} name="name" type="text" autoComplete="name" required />
      </label>
      <label className="block text-sm font-medium text-ink">
        Phone
        <input className={fieldClass} name="phone" type="tel" autoComplete="tel" required />
      </label>
      <label className="block text-sm font-medium text-ink md:col-span-2">
        Email
        <input className={fieldClass} name="email" type="email" autoComplete="email" required />
      </label>
      <label className="block text-sm font-medium text-ink">
        Service needed
        <select className={fieldClass} name="service" defaultValue="" required>
          <option value="" disabled>
            Choose a service
          </option>
          {services.map((service) => (
            <option key={service.id} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </label>
      <label className="block text-sm font-medium text-ink">
        Preferred move date
        <input className={fieldClass} name="date" type="date" />
      </label>
      <label className="block text-sm font-medium text-ink">
        Moving from
        <input className={fieldClass} name="from" type="text" placeholder="Town or postcode" required />
      </label>
      <label className="block text-sm font-medium text-ink">
        Moving to
        <input className={fieldClass} name="to" type="text" placeholder="Town or postcode" required />
      </label>
      <label className="block text-sm font-medium text-ink md:col-span-2">
        Anything else we should know?
        <textarea
          className={cx(fieldClass, "min-h-28 resize-y")}
          name="details"
          rows={4}
          placeholder="Property size, stairs, parking, packing help..."
        />
      </label>
      <div
        className={cx(
          "flex flex-col gap-3",
          compact ? "" : "md:col-span-2 md:flex-row md:items-center md:justify-between",
        )}
      >
        <p className="text-sm text-mute">
          Free, no-obligation quote. Or call{" "}
          <a className="font-semibold text-ink underline" href={contact.phoneHref}>
            {contact.phoneDisplay}
          </a>
          .
        </p>
        <button type="submit" className="btn-solid btn-signal px-5 py-3">
          Request free quote
        </button>
      </div>
    </form>
  );
}
