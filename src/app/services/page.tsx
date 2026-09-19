import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ServiceChapter } from "@/components/services/ServiceChapter";
import { SERVICES } from "@/lib/data/services";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Wedding, pre-wedding, portrait, fashion, and commercial photography — each a visual chapter tailored entirely to you.",
};

export default function ServicesPage() {
  return (
    <div className="pb-24">

      {/* Page hero */}
      <div className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden mb-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
            alt="What I shoot"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 sm:px-10 w-full pb-14">
          <Reveal>
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-3">What I Shoot</span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-ivory font-normal leading-none tracking-tight">
              Services
            </h1>
          </Reveal>
        </div>
      </div>

      {/* Visual chapters — one per service */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
        {SERVICES.map((service, i) => (
          <ServiceChapter key={service.id} service={service} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 mt-24">
        <Reveal className="border-t border-surface-border pt-20 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-4">
              Something Bespoke
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-ivory font-normal max-w-lg leading-tight">
              Need something unique? Let&rsquo;s talk.
            </h2>
          </div>
          <MagneticButton>
            <Link
              href="/contact"
              data-cursor="open"
              className="inline-flex text-[11px] uppercase tracking-[0.25em] bg-gold text-background px-10 py-4 hover:bg-gold-hover transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background whitespace-nowrap"
            >
              Start a Conversation
            </Link>
          </MagneticButton>
        </Reveal>
      </div>
    </div>
  );
}
