"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { Button } from "../ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { label: string; href: string }[];
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Handle escape key and focus trap
  useEffect(() => {
    if (!isOpen) return;

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button initially
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-12 animate-fade-in"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          onClick={onClose}
          className="font-serif text-xl tracking-[0.2em] text-ivory uppercase"
        >
          Aura Atelier
        </Link>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close menu"
          className="p-3 text-ivory-muted hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav Links */}
      <nav className="my-auto py-8">
        <ul className="flex flex-col space-y-6">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`group flex items-baseline gap-4 text-3xl sm:text-5xl font-serif tracking-tight transition-colors duration-200 ${
                    isActive ? "text-gold" : "text-ivory hover:text-gold"
                  }`}
                >
                  <span className="text-xs font-sans tracking-widest text-ivory-dim font-mono">
                    0{index + 1}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer CTA & Contact Info */}
      <div className="pt-6 border-t border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-gold font-medium mb-1">
            Studio Inquiries
          </p>
          <p className="text-sm text-ivory-muted font-light">
            Worldwide Commissions & Editorial Sessions
          </p>
        </div>
        <Button
          href="/contact"
          variant="gold"
          size="md"
          onClick={onClose}
          className="w-full sm:w-auto"
        >
          Start a Project
        </Button>
      </div>
    </div>
  );
}
