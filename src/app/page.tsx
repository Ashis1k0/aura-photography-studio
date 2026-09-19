import { HeroSection } from "@/components/hero/HeroSection";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { TESTIMONIALS } from "@/lib/data/services";
import { getCategoryList, getFeaturedImages } from "@/lib/google-drive/provider";
import Link from "next/link";
import { CategoryHoverRail } from "@/components/portfolio/CategoryHoverRail";
import { FeaturedWorkRow } from "@/components/portfolio/FeaturedWorkRow";

export default async function HomePage() {
  const featuredImages = await getFeaturedImages(6);
  const categories = getCategoryList();

  return (
    <div className="flex flex-col">

      {/* ── 1. Cinematic Hero ── */}
      <HeroSection />

      {/* ── 2. Featured Work — editorial rhythm layout ── */}
      <section aria-label="Featured Photography" className="pt-32 pb-24 overflow-hidden">
        <Reveal className="max-w-screen-2xl mx-auto px-6 sm:px-10 mb-16 flex items-end justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-3">
              Selected Work
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-ivory font-normal leading-tight">
              Recent Stories
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden sm:inline-flex text-[10px] uppercase tracking-[0.25em] text-ivory-muted hover:text-gold transition-colors shrink-0"
            data-cursor="view"
          >
            All Work &rarr;
          </Link>
        </Reveal>

        <FeaturedWorkRow images={featuredImages} />
      </section>

      {/* ── 3. Category Hover Rail ── */}
      <section aria-label="Photography Collections" className="py-24 bg-surface border-y border-surface-border overflow-hidden">
        <Reveal className="max-w-screen-2xl mx-auto px-6 sm:px-10 mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-3">
            Disciplines
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-ivory font-normal">
            The Collections
          </h2>
        </Reveal>
        <CategoryHoverRail categories={categories} />
      </section>

      {/* ── 4. Philosophy — full-bleed image with overlaid text ── */}
      <section aria-label="Philosophy" className="relative h-[70vh] min-h-[500px] overflow-hidden flex items-center">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop"
          alt="Cinematic wedding moment"
          speed={0.12}
          wrapperClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/20" />

        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 sm:px-10 w-full">
          <Reveal delay={0.1}>
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-6">
              My Approach
            </span>
          </Reveal>
          <Reveal delay={0.25}>
            <blockquote className="font-serif text-[clamp(1.6rem,4vw,3.5rem)] text-ivory font-normal leading-[1.15] max-w-2xl">
              &ldquo;I don&rsquo;t direct your emotions —<br />
              I simply wait for them,<br />
              and then I&rsquo;m there.&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.4} className="mt-10">
            <MagneticButton>
              <Link
                href="/about"
                className="inline-flex text-[10px] uppercase tracking-[0.25em] border border-ivory/30 text-ivory px-7 py-3.5 hover:border-gold hover:text-gold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                My Story
              </Link>
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* ── 5. Process ── */}
      <section aria-label="How We Work" className="py-28 max-w-screen-2xl mx-auto px-6 sm:px-10 w-full">
        <Reveal className="mb-20">
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-3">
            A Seamless Journey
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-ivory font-normal">
            How We Work Together
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-surface-border">
          {[
            { n: "01", title: "Connect", body: "We meet over coffee or video to understand your day, your emotions, and what you want to remember." },
            { n: "02", title: "Prepare", body: "I study your venue's light, map the timeline, and coordinate quietly so nothing is left to chance." },
            { n: "03", title: "Capture", body: "On the day I'm invisible — present enough to catch everything, unobtrusive enough for you to forget I'm there." },
            { n: "04", title: "Deliver", body: "Your gallery arrives within 6–8 weeks. Every image individually edited, yours to keep forever." },
          ].map((step, i) => (
            <Reveal key={step.n} delay={i * 0.1} className="bg-background p-10 lg:p-12">
              <span className="text-gold font-mono text-[11px] tracking-widest block mb-6">{step.n}</span>
              <h3 className="font-serif text-2xl text-ivory mb-4 font-normal">{step.title}</h3>
              <p className="text-sm text-ivory-muted font-light leading-relaxed">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 6. Testimonials — cinematic dark cards ── */}
      <section aria-label="Client Testimonials" className="py-28 bg-surface border-y border-surface-border">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <Reveal className="mb-20">
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-3">
              Kind Words
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-ivory font-normal">
              What Couples Say
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-surface-border">
            {TESTIMONIALS.slice(0, 2).map((t, i) => (
              <Reveal key={t.id} delay={i * 0.15} className="bg-background p-10 sm:p-14 flex flex-col justify-between gap-10">
                <div className="flex gap-0.5" aria-label="5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} className="text-gold text-sm">★</span>
                  ))}
                </div>
                <blockquote className="font-serif text-xl sm:text-2xl text-ivory font-normal leading-relaxed italic flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-end justify-between border-t border-surface-border pt-6">
                  <div>
                    <span className="font-serif text-base text-ivory block">{t.client}</span>
                    <span className="text-xs text-ivory-dim mt-0.5 block">{t.roleOrEvent} · {t.location}</span>
                  </div>
                  <span className="font-mono text-xs text-gold tracking-widest">{t.year}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Booking CTA — full-bleed image ── */}
      <section aria-label="Book a Session" className="relative h-[60vh] min-h-[440px] flex items-center justify-center overflow-hidden">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop"
          alt="Portrait photography"
          speed={0.1}
          wrapperClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-background/75" />

        <Reveal className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-5">
            Limited Dates · 2026 &amp; 2027
          </span>
          <h2 className="font-serif text-[clamp(2rem,5vw,4.5rem)] text-ivory font-normal leading-tight mb-8">
            Let&rsquo;s capture your story together.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>
              <Link
                href="/contact"
                data-cursor="open"
                className="inline-flex text-[11px] uppercase tracking-[0.25em] bg-gold text-background px-8 py-4 hover:bg-gold-hover transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Check Availability
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/services"
                className="inline-flex text-[11px] uppercase tracking-[0.25em] border border-ivory/30 text-ivory px-8 py-4 hover:border-gold hover:text-gold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                See Packages
              </Link>
            </MagneticButton>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
