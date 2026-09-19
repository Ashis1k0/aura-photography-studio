import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About the Artist",
  description:
    "Discover the artistic philosophy, international experience, and quiet documentary approach of Aura Atelier.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 sm:px-8">
      <SectionHeading
        badge="The Artist"
        title="About Aura Atelier"
        subtitle="A quiet dialogue between sculptural shadow, delicate light, and genuine human connection."
      />

      {/* Grid: Portrait & Intro */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
        <div className="lg:col-span-5 relative aspect-[4/5] bg-surface overflow-hidden border border-surface-border shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop"
            alt="Photographer Portrait in Studio"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute bottom-4 left-4 right-4 p-4 bg-background/80 backdrop-blur-md border border-surface-border text-xs text-ivory-dim">
            <span className="text-ivory font-serif block text-sm">Aura Atelier</span>
            <span>Founder & Lead Creative Director</span>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
            Origin & Craft
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-normal leading-tight">
            &ldquo;Photography is the sacred discipline of paying undivided attention.&rdquo;
          </h2>
          <p className="text-base sm:text-lg text-ivory-muted font-light leading-relaxed">
            With over a decade spent traveling across Rajasthan, Europe, East Asia, and the Americas, our studio was built on a simple conviction: photographs should not look like fleeting trends, but like heirlooms unearthed fifty years from now.
          </p>
          <p className="text-sm sm:text-base text-ivory-muted font-light leading-relaxed">
            We avoid manufactured poses and abrasive flash setups that shatter the sacred intimacy of an event. Instead, we study how natural architectural light cascades across a room, anticipating the subtle glance, the trembling hand, and the unspoken weight of genuine devotion.
          </p>

          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-surface-border">
            <div>
              <span className="text-xs text-ivory-dim uppercase tracking-wider block mb-1">Base Studios</span>
              <span className="text-sm text-ivory font-serif">Mumbai & Paris</span>
            </div>
            <div>
              <span className="text-xs text-ivory-dim uppercase tracking-wider block mb-1">Coverage</span>
              <span className="text-sm text-ivory font-serif">Worldwide Destinations</span>
            </div>
            <div>
              <span className="text-xs text-ivory-dim uppercase tracking-wider block mb-1">Medium</span>
              <span className="text-sm text-ivory font-serif">Digital & 35mm Film</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pillars of Practice */}
      <div className="py-20 border-y border-surface-border mb-24">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium block mb-2">
            Core Tenets
          </span>
          <h3 className="font-serif text-3xl text-ivory">The Studio Tenets</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-surface border border-surface-border">
            <span className="text-gold font-mono text-xs block mb-3">01 / RESTRAINT</span>
            <h4 className="font-serif text-xl text-ivory mb-2">Editorial Restraint</h4>
            <p className="text-xs sm:text-sm text-ivory-muted font-light leading-relaxed">
              We never oversaturate or drown moments in heavy synthetic filters. Our color grading honors skin tones, natural daylight, and organic textures.
            </p>
          </div>

          <div className="p-8 bg-surface border border-surface-border">
            <span className="text-gold font-mono text-xs block mb-3">02 / INTIMACY</span>
            <h4 className="font-serif text-xl text-ivory mb-2">Unobtrusive Presence</h4>
            <p className="text-xs sm:text-sm text-ivory-muted font-light leading-relaxed">
              We move as quiet observers. Our clients frequently comment that they completely forgot a camera was present, allowing true vulnerability to surface.
            </p>
          </div>

          <div className="p-8 bg-surface border border-surface-border">
            <span className="text-gold font-mono text-xs block mb-3">03 / PERMANENCE</span>
            <h4 className="font-serif text-xl text-ivory mb-2">Archival Permanence</h4>
            <p className="text-xs sm:text-sm text-ivory-muted font-light leading-relaxed">
              Every deliverable is prepared with museum-grade archival longevity, from 16-bit uncompressed digital masters to hand-bound linen fine art albums.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium block">
          Begin A Conversation
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl text-ivory">
          Let’s discuss your vision.
        </h3>
        <p className="text-sm text-ivory-muted font-light leading-relaxed">
          Whether you are organizing a multi-day wedding celebration or an international commercial campaign, we welcome the opportunity to connect.
        </p>
        <div className="pt-2">
          <Button href="/contact" variant="gold" size="lg">
            Start a Project
          </Button>
        </div>
      </div>
    </div>
  );
}
