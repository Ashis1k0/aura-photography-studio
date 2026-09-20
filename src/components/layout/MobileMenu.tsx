"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { label: string; href: string }[];
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close when route changes
  useEffect(() => {
    onClose();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "Tab" && menuRef.current) {
        const els = menuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-50 flex flex-col bg-background"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-surface-border shrink-0">
        <Link
          href="/"
          onClick={onClose}
          className="font-serif text-base tracking-[0.25em] text-ivory uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
          aria-label="Aura Atelier — Home"
        >
          Aura Atelier
        </Link>

        {/* Close button — large tap target */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close menu"
          className="flex items-center justify-center w-10 h-10 text-ivory-muted hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav links — vertically centred, full height */}
      <nav className="flex-1 flex flex-col justify-center px-8 overflow-y-auto" aria-label="Mobile Navigation">
        <ul className="flex flex-col gap-2">
          {navItems.map((item, index) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-baseline gap-4 py-4 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded ${
                    active ? "text-gold" : "text-ivory hover:text-gold"
                  }`}
                >
                  <span className="text-[10px] font-mono tracking-widest text-ivory-dim w-5 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-4xl xs:text-5xl font-normal leading-none">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom strip */}
      <div className="shrink-0 px-8 py-6 border-t border-surface-border flex flex-col xs:flex-row xs:items-center justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold font-medium mb-0.5">
            Now Booking 2026 &amp; 2027
          </p>
          <p className="text-xs text-ivory-muted font-light">Worldwide Commissions</p>
        </div>
        <Link
          href="/contact"
          onClick={onClose}
          className="inline-flex items-center justify-center text-[11px] uppercase tracking-[0.25em] bg-gold text-background px-7 py-3.5 hover:bg-gold-hover transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold shrink-0"
        >
          Start a Project
        </Link>
      </div>
    </div>
  );
}
