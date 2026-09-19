import Link from "next/link";
import React from "react";
import { Button } from "../ui/Button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { label: "Wedding", href: "/portfolio/wedding" },
    { label: "Pre-Wedding", href: "/portfolio/pre-wedding" },
    { label: "Portrait", href: "/portfolio/portrait" },
    { label: "Fashion", href: "/portfolio/fashion" },
    { label: "Events", href: "/portfolio/events" },
    { label: "Birthday", href: "/portfolio/birthday" },
    { label: "Commercial", href: "/portfolio/commercial" },
  ];

  const quickLinks = [
    { label: "Portfolio", href: "/portfolio" },
    { label: "About the Artist", href: "/about" },
    { label: "Services & Process", href: "/services" },
    { label: "Journal & Stories", href: "/journal" },
    { label: "Book a Session", href: "/contact" },
  ];

  return (
    <footer className="bg-surface border-t border-surface-border pt-20 pb-12 text-ivory-muted">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Editorial Banner */}
        <div className="pb-16 border-b border-surface-border flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-3 block">
              Commissions & Inquiries
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory font-normal leading-tight">
              Let’s create something unforgettable together.
            </h2>
          </div>
          <div className="shrink-0">
            <Button href="/contact" variant="gold" size="lg">
              Start a Project
            </Button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <span className="font-serif text-xl tracking-[0.2em] text-ivory uppercase block">
              Aura Atelier
            </span>
            <p className="text-sm leading-relaxed text-ivory-dim font-light">
              Fine art & editorial photography dedicated to capturing light, human devotion, and timeless stories across the globe.
            </p>
            <div className="pt-2 text-xs uppercase tracking-widest text-gold">
              Available Worldwide
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-ivory font-medium mb-6">
              Portfolio Collections
            </h3>
            <ul className="space-y-3 text-sm">
              {categories.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="hover:text-gold transition-colors duration-200 block"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-ivory font-medium mb-6">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-gold transition-colors duration-200 block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Studio Connect */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-ivory font-medium mb-6">
              Studio Connect
            </h3>
            <div className="space-y-4 text-sm font-light">
              <p>
                <span className="block text-xs uppercase tracking-wider text-ivory-dim">Location</span>
                Mumbai &bull; Paris &bull; Worldwide
              </p>
              <p>
                <span className="block text-xs uppercase tracking-wider text-ivory-dim">Inquiries</span>
                <a
                  href="mailto:inquiries@aura-atelier.com"
                  className="hover:text-gold transition-colors"
                >
                  inquiries@aura-atelier.com
                </a>
              </p>
              <div className="pt-2 flex items-center space-x-4 text-xs tracking-wider uppercase">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Instagram
                </a>
                <span>&bull;</span>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Pinterest
                </a>
                <span>&bull;</span>
                <a
                  href="https://vimeo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Vimeo
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="pt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between text-xs text-ivory-dim gap-4">
          <p>&copy; {currentYear} Aura Atelier. All photographs reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-ivory transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ivory transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
