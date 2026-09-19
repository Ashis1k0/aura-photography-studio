import { Reveal } from "@/components/motion/Reveal";
import { ImageMaskReveal } from "@/components/motion/ImageMaskReveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { CountUpStat } from "@/components/motion/CountUpStat";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "A wedding and portrait photographer with 12+ years documenting love stories across 18 countries.",
};

const STATS = [
  { value: 350, suffix: "+", label: "Weddings Documented" },
  { value: 18, suffix: "", label: "Countries" },
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 4, suffix: "", label: "Vogue Features" },
];

const TENETS = [
  {
    n: "01",
    title: "I stay out of the way.",
    body: "The best photographs happen when people forget a camera is there. I move quietly and shoot instinctively — never interrupting a moment to manufacture one.",
  },
  {
    n: "02",
    title: "Light is everything.",
    body: "I study the light of every venue before the day begins — how it moves, where it pools, when it turns golden. That preparation is what makes your images feel the way they do.",
  },
  {
    n: "03",
    title: "Your gallery lasts generations.",
    body: "Every file is full-resolution, color-graded by hand, and formatted for museum-quality printing. These aren't Instagram crops — they're heirlooms.",
  },
];

const FAQ = [
  {
    q: "Do you travel for weddings?",
    a: "Yes — I'm based in Mumbai but travel internationally for destination weddings. Travel costs are discussed transparently during our consultation, with no surprises.",
  },
  {
    q: "How many photos will we receive?",
    a: "For a full-day wedding you can expect 600–900 individually edited, high-resolution images — every one color-graded and retouched before delivery.",
  },
  {
    q: "Do you offer videography as well?",
    a: "Yes. I work with a trusted cinematography partner to offer combined photo + film packages — a completely cohesive visual story in both formats.",
  },
  {
    q: "How far in advance should we book?",
    a: "Most couples book 12–18 months ahead. I recommend reaching out as soon as your date is confirmed, especially for peak-season weekends.",
  },
  {
    q: "When will we receive our gallery?",
    a: "Online galleries are delivered within 6–8 weeks. Sneak-peek previews are usually shared within 48–72 hours of the event.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-24 overflow-hidden">

      {/* ── Full-screen opening image ── */}
      <div className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop"
          alt="The photographer at work"
          speed={0.08}
          wrapperClassName="absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 sm:px-10 w-full pb-16">
          <Reveal>
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-4">
              The Person Behind the Frame
            </span>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="font-serif text-[clamp(2.5rem,7vw,7rem)] text-ivory font-normal leading-[0.95] tracking-tight max-w-3xl">
              I photograph the moments between the moments.
            </h1>
          </Reveal>
        </div>
      </div>

      {/* ── Story + portrait ── */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Portrait */}
          <div className="lg:col-span-5">
            <ImageMaskReveal
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop"
              alt="Photographer"
              wrapperClassName="aspect-[4/5]"
              direction="vertical"
            />
            <div className="mt-6 flex items-center gap-4 border-t border-surface-border pt-6">
              <div>
                <span className="font-serif text-sm text-ivory block">Aura Atelier</span>
                <span className="text-[10px] text-ivory-dim uppercase tracking-wider">Founder · Mumbai &amp; Paris</span>
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="lg:col-span-7 flex flex-col gap-7 pt-4 lg:pt-12">
            <Reveal>
              <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-1">Origin &amp; Craft</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-normal leading-tight">
                Hi — I&rsquo;m a wedding photographer who actually loves weddings.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base text-ivory-muted font-light leading-relaxed">
                I started shooting weddings over a decade ago because I believed something simple: the most important day of your life deserves to be remembered exactly as it felt — not as a perfect but hollow performance for a camera.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm text-ivory-muted font-light leading-relaxed">
                Since then I&rsquo;ve worked across India, Europe, and Southeast Asia — from intimate 30-person elopements in Rajasthan to 500-guest celebrations at Lake Como. Every single one has reinforced the same conviction: real moments are always more beautiful than staged ones.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-sm text-ivory-muted font-light leading-relaxed">
                When I&rsquo;m not shooting, I teach documentary photography at workshops in Mumbai and Paris. My work has appeared in Vogue India, Harper&rsquo;s Bazaar Bride, and Condé Nast Traveller.
              </p>
            </Reveal>

            {/* Info strip */}
            <Reveal delay={0.35} className="grid grid-cols-3 gap-6 border-t border-surface-border pt-6 mt-2">
              {[
                { label: "Based In", value: "Mumbai & Paris" },
                { label: "Available", value: "Worldwide" },
                { label: "Shooting With", value: "Digital & 35mm Film" },
              ].map((item) => (
                <div key={item.label}>
                  <span className="text-[9px] uppercase tracking-wider text-ivory-dim block mb-1">{item.label}</span>
                  <span className="font-serif text-sm text-ivory">{item.value}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="bg-surface border-y border-surface-border py-16">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-surface-border">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-6 px-4 text-center">
                <CountUpStat value={stat.value} suffix={stat.suffix} />
                <span className="text-[9px] uppercase tracking-[0.25em] text-ivory-dim mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Three non-negotiables ── */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 py-24">
        <Reveal className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-3">How I Work</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-ivory font-normal">
            Three Non-Negotiables
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-surface-border">
          {TENETS.map((t, i) => (
            <Reveal key={t.n} delay={i * 0.12} className="bg-background p-10 lg:p-12">
              <span className="font-mono text-[10px] text-gold tracking-widest block mb-6">{t.n}</span>
              <h3 className="font-serif text-xl text-ivory mb-4 font-normal">{t.title}</h3>
              <p className="text-sm text-ivory-muted font-light leading-relaxed">{t.body}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── As Featured In ── */}
      <div className="border-y border-surface-border py-14">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <Reveal className="flex flex-wrap items-center gap-y-4 gap-x-10 sm:gap-x-16">
            <span className="text-[9px] uppercase tracking-[0.35em] text-ivory-dim shrink-0">
              As Featured In
            </span>
            {["Vogue India", "Harper's Bazaar", "Condé Nast", "Brides Today", "The Wedding Filmer"].map(
              (p) => (
                <span
                  key={p}
                  className="font-serif text-lg sm:text-xl text-ivory-dim hover:text-ivory transition-colors duration-200"
                >
                  {p}
                </span>
              )
            )}
          </Reveal>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 py-24">
        <Reveal className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-3">Common Questions</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-ivory font-normal">
            Frequently Asked
          </h2>
        </Reveal>

        <div className="max-w-3xl space-y-0 divide-y divide-surface-border border-y border-surface-border">
          {FAQ.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <details className="group py-6 cursor-pointer list-none">
                <summary className="flex items-center justify-between gap-4 font-serif text-base sm:text-lg text-ivory font-normal select-none list-none focus-visible:outline-none focus-visible:text-gold [&::-webkit-details-marker]:hidden">
                  <span className="group-open:text-gold transition-colors duration-200">{item.q}</span>
                  <span className="shrink-0 text-gold text-xl font-light transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm text-ivory-muted font-light leading-relaxed pr-8">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
        <Reveal className="relative overflow-hidden border-t border-surface-border pt-20 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-4">Let&rsquo;s Work Together</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-ivory font-normal max-w-lg leading-tight">
              Ready to talk about your day?
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <MagneticButton>
              <Link
                href="/contact"
                data-cursor="open"
                className="inline-flex text-[11px] uppercase tracking-[0.25em] bg-gold text-background px-10 py-4 hover:bg-gold-hover transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Get in Touch
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/portfolio"
                className="inline-flex text-[11px] uppercase tracking-[0.25em] border border-surface-border text-ivory px-10 py-4 hover:border-gold hover:text-gold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                View Portfolio
              </Link>
            </MagneticButton>
          </div>
        </Reveal>
      </div>

    </div>
  );
}
