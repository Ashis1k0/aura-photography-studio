import React from "react";
import { Button } from "../ui/Button";
import { Hero3DExperience } from "./Hero3DExperience";

export function HeroSection() {
  return (
    <section
      aria-label="Hero Introduction"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Subtle background ambient texture */}
      <div className="absolute inset-0 bg-radial-gradient from-surface-elevated/40 via-background to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Editorial Statement & CTAs */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8 animate-fade-in">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-gold" />
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">
              Fine Art & Editorial
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl text-ivory font-normal tracking-tight leading-[1.05]">
            Stories of light, emotion & movement.
          </h1>

          <p className="text-base sm:text-lg text-ivory-muted font-light leading-relaxed max-w-lg">
            Documenting authentic human devotion, timeless unions, and high-fashion narratives with an editorial sensitivity crafted for generations to come.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button href="/portfolio" variant="primary" size="lg">
              View My Work
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Start a Project
            </Button>
          </div>

          {/* Social Proof / Recognition Teaser */}
          <div className="pt-6 border-t border-surface-border flex items-center space-x-6 text-xs text-ivory-dim tracking-wider uppercase">
            <div>
              <span className="block font-serif text-lg text-ivory font-normal">12+</span>
              <span>Years Documenting</span>
            </div>
            <div className="w-px h-8 bg-surface-border" />
            <div>
              <span className="block font-serif text-lg text-ivory font-normal">24</span>
              <span>Global Destinations</span>
            </div>
            <div className="w-px h-8 bg-surface-border" />
            <div>
              <span className="block font-serif text-lg text-gold font-normal">Vogue</span>
              <span>Featured Artist</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Spatial Experience with Progressive Fallback */}
        <div className="lg:col-span-6 xl:col-span-7 w-full h-full flex items-center justify-center">
          <Hero3DExperience />
        </div>
      </div>

      {/* Downward scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-[0.3em] text-ivory-dim">Explore</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-gold to-transparent animate-pulse" />
      </div>
    </section>
  );
}
