"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { site } from "@/content/site";

type Status = "idle" | "sent" | "error";

export function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const from = String(data.get("from") || "").trim();
    const to = String(data.get("to") || "").trim();
    const date = String(data.get("date") || "").trim();
    const notes = String(data.get("notes") || "").trim();
    const service = String(data.get("service") || "").trim();

    if (!name || !phone) {
      setStatus("error");
      return;
    }

    const body = [
      `Quote request from the ${site.name} website`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service: ${service || "Not specified"}`,
      `From: ${from || "Not specified"}`,
      `To: ${to || "Not specified"}`,
      `Preferred date: ${date || "Flexible"}`,
      `Notes: ${notes || "None"}`,
    ].join("\n");

    const mailto = `mailto:?subject=${encodeURIComponent(
      `Move quote request - ${name}`,
    )}&body=${encodeURIComponent(body)}`;

    // Opens the visitor's mail client until a server endpoint is wired.
    window.location.href = mailto;
    setStatus("sent");
    form.reset();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
      noValidate
      aria-describedby="quote-form-help"
    >
      <p id="quote-form-help" className="text-sm text-steel">
        Tell us the basics and we will come back with a clear quote. Required
        fields are marked.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" required>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="field"
            placeholder="Alex Smith"
          />
        </Field>
        <Field label="Phone" htmlFor="phone" required>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            className="field"
            placeholder="07..."
          />
        </Field>
      </div>

      <Field label="Service" htmlFor="service">
        <select id="service" name="service" className="field" defaultValue="">
          <option value="" disabled>
            Choose a service
          </option>
          <option value="Domestic move">Domestic move</option>
          <option value="Commercial move">Commercial move</option>
          <option value="Packing">Packing</option>
          <option value="Overseas move">Overseas move</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Moving from" htmlFor="from">
          <input
            id="from"
            name="from"
            className="field"
            placeholder="Town or postcode"
            autoComplete="address-level2"
          />
        </Field>
        <Field label="Moving to" htmlFor="to">
          <input
            id="to"
            name="to"
            className="field"
            placeholder="Town, postcode, or country"
          />
        </Field>
      </div>

      <Field label="Preferred date" htmlFor="date">
        <input id="date" name="date" type="date" className="field" />
      </Field>

      <Field label="Anything else we should know?" htmlFor="notes">
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className="field resize-y"
          placeholder="Stairs, piano, packing help, access notes..."
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-signal">
          Send quote request
        </button>
        <a
          href={`tel:${site.phoneTel}`}
          className="text-sm font-medium text-ink underline-offset-2 hover:underline"
        >
          Or call {site.phoneDisplay}
        </a>
      </div>

      {status === "sent" ? (
        <p className="text-sm text-ink-soft" role="status">
          Your mail app should open with the quote details. If it does not, call{" "}
          {site.phoneDisplay}.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-700" role="alert">
          Please add your name and phone number so we can reach you.
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm" htmlFor={htmlFor}>
      <span className="mb-1.5 block font-medium text-ink">
        {label}
        {required ? (
          <span className="text-signal-deep" aria-hidden>
            {" "}
            *
          </span>
        ) : null}
      </span>
      {children}
    </label>
  );
}
