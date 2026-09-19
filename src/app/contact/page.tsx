import { ContactInquiryForm } from "@/components/forms/ContactInquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact & Bookings",
  description:
    "Inquire about availability for destination weddings, editorials, and portrait commissions worldwide.",
};

// ─── Replace with the photographer's real WhatsApp number ───
const WHATSAPP_NUMBER = "919820000000"; // Format: country code + number, no +
const WHATSAPP_MSG = encodeURIComponent(
  "Hi! I came across your portfolio and would love to discuss a photography session."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

export default function ContactPage() {
  return (
    <div className="pb-24 overflow-hidden">

      {/* ── Full-screen opening ── */}
      <div className="relative h-[65vh] min-h-[460px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop"
            alt="Ready to create something beautiful"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 sm:px-10 w-full pb-14">
          <Reveal>
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-3">
              Let&rsquo;s Create Together
            </span>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,6rem)] text-ivory font-normal leading-[0.95] tracking-tight max-w-2xl">
              Ready to create something beautiful?
            </h1>
          </Reveal>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

          {/* Left — info & direct contacts */}
          <div className="lg:col-span-4 space-y-12">

            <Reveal>
              <h2 className="font-serif text-2xl text-ivory mb-3 font-normal">
                Start a Conversation
              </h2>
              <p className="text-sm text-ivory-muted font-light leading-relaxed">
                Once your inquiry arrives I review my calendar and prepare a personal response within 24–48 hours. Every session is a collaboration — I&rsquo;d love to hear about yours.
              </p>
            </Reveal>

            {/* WhatsApp CTA — prominent */}
            <Reveal delay={0.1}>
              <div className="border-t border-surface-border pt-8">
                <span className="text-[9px] uppercase tracking-[0.3em] text-gold block mb-4">
                  Fastest Response
                </span>
                <MagneticButton>
                  <Link
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="open"
                    className="flex items-center gap-4 px-6 py-4 border border-[#25D366]/40 bg-[#25D366]/5 hover:bg-[#25D366]/10 hover:border-[#25D366]/70 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                    aria-label="Chat on WhatsApp"
                  >
                    {/* WhatsApp icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 shrink-0 text-[#25D366]"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.25em] text-[#25D366] font-medium">
                        Chat on WhatsApp
                      </span>
                      <span className="block text-xs text-ivory-muted font-light mt-0.5">
                        Typically replies within an hour
                      </span>
                    </div>
                    <span className="ml-auto text-[#25D366]/60 group-hover:text-[#25D366] transition-colors text-sm">→</span>
                  </Link>
                </MagneticButton>
              </div>
            </Reveal>

            {/* Direct contact details */}
            <Reveal delay={0.15}>
              <div className="space-y-6 border-t border-surface-border pt-8">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-gold block mb-1.5">Email</span>
                  <a
                    href="mailto:hello@aura-atelier.com"
                    className="text-sm text-ivory hover:text-gold transition-colors font-light"
                  >
                    hello@aura-atelier.com
                  </a>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-gold block mb-1.5">Phone</span>
                  <a
                    href="tel:+919820000000"
                    className="text-sm text-ivory hover:text-gold transition-colors font-mono"
                  >
                    +91 98200 00000
                  </a>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-gold block mb-1.5">Studios</span>
                  <p className="text-sm text-ivory-muted font-light">
                    Worli Sea Face, Mumbai<br />Rue Saint-Honoré, Paris
                  </p>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-gold block mb-1.5">Response Time</span>
                  <p className="text-sm text-ivory-muted font-light">Within 24–48 hours</p>
                </div>
              </div>
            </Reveal>

            {/* Quick FAQ */}
            <Reveal delay={0.2}>
              <div className="border-t border-surface-border pt-8 space-y-5">
                <span className="text-[9px] uppercase tracking-[0.3em] text-gold block">Quick Answers</span>
                {[
                  { q: "Do you travel internationally?", a: "Yes — 60%+ of my shoots are destination bookings." },
                  { q: "How far ahead should I book?", a: "6–18 months for weddings. Reach out early." },
                ].map((item) => (
                  <div key={item.q}>
                    <span className="font-serif text-sm text-ivory block mb-1">{item.q}</span>
                    <span className="text-xs text-ivory-muted font-light">{item.a}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — inquiry form */}
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <ContactInquiryForm />
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
