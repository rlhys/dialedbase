import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal } from "@/components/Reveal";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact and free quote",
  description:
    "Request a free removals quote from Kim Logistics. Call 02477 360236 or email info@kimlogistics.co.uk.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about the move."
        support="Fill in the form for a free, no-obligation quote, or call the Coventry team directly."
      />

      <section className="site-shell grid gap-12 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24">
        <Reveal>
          <h2 className="font-display text-3xl tracking-tight text-ink">Talk to us</h2>
          <dl className="mt-8 space-y-6">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-moss">Phone</dt>
              <dd className="mt-2">
                <a className="text-xl font-semibold text-ink hover:text-signal" href={contact.phoneHref}>
                  {contact.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-moss">Mobile</dt>
              <dd className="mt-2">
                <a className="text-xl font-semibold text-ink hover:text-signal" href={contact.mobileHref}>
                  {contact.mobileDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-moss">Email</dt>
              <dd className="mt-2">
                <a className="text-xl font-semibold text-ink hover:text-signal" href={contact.emailHref}>
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-moss">Working hours</dt>
              <dd className="mt-3 space-y-2 text-base text-steel">
                {contact.hours.map((row) => (
                  <p key={row.label}>
                    <span className="font-semibold text-ink">{row.label}:</span> {row.value}
                  </p>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="rounded-[1.25rem] border border-ink/10 bg-paper/90 p-6 shadow-[var(--shadow)] md:p-8">
          <h2 className="font-display text-3xl tracking-tight text-ink">Free quote form</h2>
          <p className="mt-2 text-steel">
            Accessible, mobile-first form. Until a backend is wired, submit opens an email draft to
            the inbox on the live site.
          </p>
          <div className="mt-8">
            <QuoteForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
