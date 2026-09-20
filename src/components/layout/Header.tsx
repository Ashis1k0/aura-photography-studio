"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MobileMenu } from "./MobileMenu";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 40);
  });

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-lg border-b border-surface-border py-3 sm:py-4"
            : "bg-transparent py-5 sm:py-6 md:py-8"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-10 flex items-center justify-between gap-4">

          {/* ── Logo / Home ── */}
          <Link
            href="/"
            className="group flex flex-col shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            aria-label="Aura Atelier — Home"
          >
            <span className="font-serif text-sm sm:text-base lg:text-lg tracking-[0.25em] sm:tracking-[0.3em] text-ivory uppercase group-hover:text-gold transition-colors duration-300 leading-none">
              Aura Atelier
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.3em] sm:tracking-[0.4em] text-ivory-dim uppercase mt-0.5 group-hover:text-ivory-muted transition-colors">
              Cinematic Photography
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main Navigation">
            {NAV_ITEMS.filter((i) => i.href !== "/").map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded py-1 ${
                  isActive(item.href) ? "text-gold" : "text-ivory-muted hover:text-ivory"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gold"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* ── Right side: CTA + hamburger ── */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="hidden md:inline-flex text-[10px] uppercase tracking-[0.25em] text-ivory border border-surface-border px-4 lg:px-5 py-2.5 hover:border-gold hover:text-gold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold shrink-0"
              data-cursor="open"
            >
              Start a Project
            </Link>

            {/* Mobile hamburger — large tap target, clear icon */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Open navigation menu"
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] text-ivory hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            >
              <span className="block w-6 h-[2px] bg-current rounded-full transition-all duration-300" />
              <span className="block w-4 h-[2px] bg-current rounded-full transition-all duration-300" />
              <span className="block w-6 h-[2px] bg-current rounded-full transition-all duration-300" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={NAV_ITEMS}
      />
    </>
  );
}
