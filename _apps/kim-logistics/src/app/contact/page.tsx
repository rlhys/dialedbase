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

      <section className="bg-paper">
        <div className="site-shell grid gap-12 py-16 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:py-24">
          <Reveal>
            <h2 className="font-display text-3xl tracking-[-0.03em] text-ink">Talk to us</h2>
            <dl className="mt-10 space-y-7">
              <div className="border-b border-ink/10 pb-5">
                <dt className="text-[0.7rem] uppercase tracking-[0.28em] text-mute">Phone</dt>
                <dd className="mt-2">
                  <a className="text-xl font-semibold text-ink transition hover:text-signal" href={contact.phoneHref}>
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="border-b border-ink/10 pb-5">
                <dt className="text-[0.7rem] uppercase tracking-[0.28em] text-mute">Mobile</dt>
                <dd className="mt-2">
                  <a className="text-xl font-semibold text-ink transition hover:text-signal" href={contact.mobileHref}>
                    {contact.mobileDisplay}
                  </a>
                </dd>
              </div>
              <div className="border-b border-ink/10 pb-5">
                <dt className="text-[0.7rem] uppercase tracking-[0.28em] text-mute">Email</dt>
                <dd className="mt-2">
                  <a className="text-xl font-semibold text-ink transition hover:text-signal" href={contact.emailHref}>
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.7rem] uppercase tracking-[0.28em] text-mute">Working hours</dt>
                <dd className="mt-3 space-y-2 text-base text-mute">
                  {contact.hours.map((row) => (
                    <p key={row.label}>
                      <span className="font-semibold text-ink">{row.label}:</span> {row.value}
                    </p>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal className="border border-ink/12 bg-field/50 p-6 md:p-8">
            <h2 className="font-display text-3xl tracking-[-0.03em] text-ink">Free quote form</h2>
            <p className="mt-2 text-mute">
              Accessible, mobile-first form. Until a backend is wired, submit opens an email draft to
              the inbox on the live site.
            </p>
            <div className="mt-8">
              <QuoteForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
