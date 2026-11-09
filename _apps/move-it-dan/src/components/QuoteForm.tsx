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
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const from = String(data.get("from") || "").trim();
    const to = String(data.get("to") || "").trim();
    const date = String(data.get("date") || "").trim();
    const rooms = String(data.get("rooms") || "").trim();

    if (!name || !email || !phone) {
      setStatus("error");
      return;
    }

    const body = [
      `Quote request from the ${site.name} website`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Current address: ${from || "Not specified"}`,
      `New address: ${to || "Not specified"}`,
      `Move date: ${date || "Not sure yet"}`,
      `Rooms: ${rooms || "Not specified"}`,
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
        Same details as the current Move It Dan quote form. Required fields are marked.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required>
          <input id="name" name="name" required autoComplete="name" className="field" />
        </Field>
        <Field label="Email" htmlFor="email" required>
          <input id="email" name="email" type="email" required autoComplete="email" className="field" />
        </Field>
      </div>

      <Field label="Phone" htmlFor="phone" required>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          className="field"
        />
      </Field>

      <Field label="Address (street, city, postcode)" htmlFor="from">
        <input id="from" name="from" className="field" autoComplete="street-address" />
      </Field>

      <Field label="Address of your new home" htmlFor="to">
        <input id="to" name="to" className="field" />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Date of your move" htmlFor="date">
          <input id="date" name="date" type="date" className="field" />
        </Field>
        <Field label="How many rooms is your home?" htmlFor="rooms">
          <input id="rooms" name="rooms" inputMode="numeric" className="field" />
        </Field>
      </div>

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
          Please add your name, email, and phone number so we can reach you.
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
