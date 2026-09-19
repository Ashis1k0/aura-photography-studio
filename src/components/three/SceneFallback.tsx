import Image from "next/image";
import React from "react";

export function SceneFallback() {
  return (
    <div className="relative w-full h-full min-h-[420px] lg:min-h-[560px] flex items-center justify-center overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-gradient from-gold/5 via-background/40 to-background pointer-events-none" />

      {/* Layered Floating Editorial Frames (Static Photographic Composition) */}
      <div className="relative w-full max-w-lg lg:max-w-xl h-[380px] sm:h-[460px] flex items-center justify-center">
        {/* Background Depth Frame (Left) */}
        <div className="absolute -left-4 sm:left-2 top-8 w-44 sm:w-56 h-60 sm:h-76 opacity-40 -rotate-6 transition-transform duration-700 hover:rotate-0 hover:opacity-80 border border-surface-border bg-surface overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
            alt="Fashion haute couture editorial preview"
            fill
            sizes="250px"
            className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Background Depth Frame (Right) */}
        <div className="absolute -right-4 sm:right-2 bottom-6 w-48 sm:w-60 h-64 sm:h-80 opacity-40 rotate-6 transition-transform duration-700 hover:rotate-0 hover:opacity-80 border border-surface-border bg-surface overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop"
            alt="Pre-wedding couple landscape preview"
            fill
            sizes="250px"
            className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Central Hero Frame (Primary) */}
        <div className="relative z-10 w-60 sm:w-76 h-80 sm:h-98 border border-gold/30 bg-surface overflow-hidden shadow-2xl shadow-black/80 transition-transform duration-500 hover:scale-[1.02]">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop"
            alt="Royal wedding moment preview"
            fill
            priority
            sizes="350px"
            className="object-cover"
          />
          {/* Subtle gold framing line */}
          <div className="absolute inset-2 border border-gold/20 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
