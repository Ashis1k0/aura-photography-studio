import Link from "next/link";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";

export function Footer() {
  const year = new Date().getFullYear();

  const collections = [
    { label: "Wedding", href: "/portfolio/wedding" },
    { label: "Pre-Wedding", href: "/portfolio/pre-wedding" },
    { label: "Portrait", href: "/portfolio/portrait" },
    { label: "Fashion", href: "/portfolio/fashion" },
    { label: "Events", href: "/portfolio/events" },
    { label: "Birthday", href: "/portfolio/birthday" },
    { label: "Commercial", href: "/portfolio/commercial" },
  ];

  const nav = [
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-surface border-t border-surface-border" aria-label="Site footer">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">

        {/* Large editorial CTA */}
        <Reveal className="py-20 sm:py-28 border-b border-surface-border flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-5">
              Now Booking 2026 &amp; 2027
            </span>
            <p className="font-serif text-[clamp(2rem,5vw,4.5rem)] text-ivory font-normal leading-[0.95] max-w-2xl">
              Let&rsquo;s create something beautiful.
            </p>
          </div>
          <MagneticButton>
            <Link
              href="/contact"
              data-cursor="open"
              className="inline-flex text-[11px] uppercase tracking-[0.25em] bg-gold text-background px-10 py-4 hover:bg-gold-hover transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background whitespace-nowrap shrink-0"
            >
              Start a Project
            </Link>
          </MagneticButton>
        </Reveal>

        {/* Links row */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <span className="font-serif text-base tracking-[0.2em] text-ivory uppercase block">
              Aura Atelier
            </span>
            <p className="text-xs text-ivory-dim font-light leading-relaxed max-w-xs">
              Wedding &amp; portrait photographer based in Mumbai, traveling worldwide to document love beautifully.
            </p>
            <span className="text-[9px] uppercase tracking-widest text-gold/60 block">
              Est. 2013 · Available Worldwide
            </span>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-[9px] uppercase tracking-[0.25em] text-ivory font-medium mb-5">
              Collections
            </h3>
            <ul className="space-y-3">
              {collections.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-xs text-ivory-muted hover:text-gold transition-colors duration-200">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-[9px] uppercase tracking-[0.25em] text-ivory font-medium mb-5">
              Navigate
            </h3>
            <ul className="space-y-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-ivory-muted hover:text-gold transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[9px] uppercase tracking-[0.25em] text-ivory font-medium mb-5">
              Say Hello
            </h3>
            <div className="space-y-3 text-xs text-ivory-muted font-light">
              <p>Mumbai &bull; Paris &bull; Worldwide</p>
              <a href="mailto:hello@aura-atelier.com" className="hover:text-gold transition-colors block">
                hello@aura-atelier.com
              </a>
              {/* Social */}
              <div className="flex gap-4 pt-2 text-[9px] uppercase tracking-widest">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="Instagram">
                  Instagram
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="Pinterest">
                  Pinterest
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-ivory-dim">
          <p>&copy; {year} Aura Atelier. All photographs reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-ivory transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-ivory transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
