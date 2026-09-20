"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { MagneticButton } from "../motion/MagneticButton";

// Cinematic entrance sequence timings (seconds)
const T = {
  logoAppear: 0.3,
  imageReveal: 0.7,
  textEnter: 1.4,
  subEnter: 1.7,
  ctaEnter: 2.0,
  statsEnter: 2.2,
  scrollAppear: 2.6,
};

const ease = [0.76, 0, 0.24, 1] as const;
const easeOut = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { value: "350+", label: "Weddings" },
  { value: "18", label: "Countries" },
  { value: "12+", label: "Years" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  // Subtle mouse parallax on the hero image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 40, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 120 });
  const imgX = useTransform(springX, [-1, 1], ["-1.5%", "1.5%"]);
  const imgY = useTransform(springY, [-1, 1], ["-1.5%", "1.5%"]);

  useEffect(() => {
    // Small delay so page paint completes before sequence fires
    const id = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(id);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      aria-label="Hero — Aura Atelier Photography"
      className="relative w-full h-screen min-h-[600px] max-h-[1080px] overflow-hidden flex items-end"
    >
      {/* ── Black opening screen ── */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={entered ? { opacity: 0 } : {}}
        transition={{ duration: 0.9, delay: T.imageReveal + 0.5, ease }}
        className="absolute inset-0 z-30 bg-background pointer-events-none"
      />

      {/* ── Background photograph with parallax ── */}
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.08 }}
        animate={entered ? { clipPath: "inset(0 0 0% 0)", scale: 1 } : {}}
        transition={{ duration: 1.4, delay: T.imageReveal, ease }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <motion.div
          style={{ x: imgX, y: imgY }}
          className="absolute inset-[-4%] will-change-transform"
        >
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2400&auto=format&fit=crop"
            alt="Wedding couple in golden light"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        {/* Multi-layer gradient so text stays legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </motion.div>

      {/* ── Floating secondary frame — depth layer ── */}
      <motion.div
        initial={{ opacity: 0, x: 60, rotate: 3 }}
        animate={entered ? { opacity: 1, x: 0, rotate: 2 } : {}}
        transition={{ duration: 1.2, delay: T.imageReveal + 0.6, ease: easeOut }}
        className="absolute right-[6%] top-[18%] w-[22vw] max-w-[280px] aspect-[3/4] hidden lg:block z-10"
      >
        <div className="relative w-full h-full border border-gold/25 overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop"
            alt="Pre-wedding portrait"
            fill
            sizes="280px"
            className="object-cover grayscale-[20%]"
          />
        </div>
      </motion.div>

      {/* ── Third frame — further back ── */}
      <motion.div
        initial={{ opacity: 0, x: 40, rotate: -2 }}
        animate={entered ? { opacity: 0.55, x: 0, rotate: -1.5 } : {}}
        transition={{ duration: 1.4, delay: T.imageReveal + 0.9, ease: easeOut }}
        className="absolute right-[16%] top-[10%] w-[14vw] max-w-[180px] aspect-[3/4] hidden xl:block z-[5]"
      >
        <div className="relative w-full h-full border border-surface-border overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop"
            alt="Fashion editorial"
            fill
            sizes="180px"
            className="object-cover grayscale"
          />
        </div>
      </motion.div>

      {/* ── Main copy — bottom-left ── */}
      <div className="relative z-20 w-full pt-24 pb-16 md:pb-20 px-6 sm:px-10 max-w-screen-2xl mx-auto">

        {/* Eyebrow — appears early in sequence */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={entered ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: T.logoAppear, ease: easeOut }}
          className="flex items-center gap-3 mb-6 md:mb-8"
        >
          <span className="block w-8 h-[1px] bg-gold" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-medium">
            Fine Art &amp; Wedding Photography
          </span>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <div className="overflow-hidden mb-4 md:mb-5">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={entered ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 1.0, delay: T.textEnter, ease }}
            className="font-serif text-[clamp(2.8rem,7vw,6.5rem)] text-ivory font-normal leading-[0.95] tracking-[-0.02em] max-w-3xl"
          >
            Your story
            <br />
            <em className="not-italic text-gold">deserves</em>
            <br />
            to be felt.
          </motion.h1>
        </div>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={entered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: T.subEnter, ease: easeOut }}
          className="text-sm sm:text-base text-ivory-muted font-light max-w-sm leading-relaxed mb-8 md:mb-10"
        >
          Documenting love, light, and human emotion — beautifully, honestly, forever.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={entered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: T.ctaEnter, ease: easeOut }}
          className="flex flex-wrap items-center gap-4 mb-12 md:mb-14"
        >
          <MagneticButton>
            <Link
              href="/portfolio"
              data-cursor="view"
              className="inline-flex items-center gap-3 bg-ivory text-background text-[11px] uppercase tracking-[0.25em] px-8 py-4 hover:bg-gold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View My Work
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/contact"
              data-cursor="open"
              className="inline-flex items-center gap-3 border border-ivory/30 text-ivory text-[11px] uppercase tracking-[0.25em] px-8 py-4 hover:border-gold hover:text-gold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Book a Session
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: T.statsEnter, ease: easeOut }}
          className="flex items-center gap-8"
        >
          {STATS.map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <span className="block w-px h-6 bg-surface-border" />}
              <div>
                <span className="block font-serif text-xl sm:text-2xl text-ivory leading-none">{s.value}</span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-ivory-dim mt-1">{s.label}</span>
              </div>
            </React.Fragment>
          ))}
          <span className="block w-px h-6 bg-surface-border" />
          <div>
            <span className="block font-serif text-base text-gold leading-none">Vogue</span>
            <span className="block text-[9px] uppercase tracking-[0.25em] text-ivory-dim mt-1">Featured</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={entered ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: T.scrollAppear }}
        className="absolute bottom-8 right-8 md:right-12 hidden sm:flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-ivory-dim" style={{ writingMode: "vertical-rl" }}>
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-gold to-transparent origin-top"
        />
      </motion.div>
    </section>
  );
}
