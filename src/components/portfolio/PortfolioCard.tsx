"use client";

import { PortfolioImage } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

interface PortfolioCardProps {
  image: PortfolioImage;
  index: number;
  onOpenLightbox: (index: number, triggerRef: React.RefObject<HTMLButtonElement | null>) => void;
  aspect?: "natural" | "portrait" | "landscape" | "square";
  priority?: boolean;
}

export function PortfolioCard({
  image,
  index,
  onOpenLightbox,
  aspect = "natural",
  priority = false,
}: PortfolioCardProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const aspectClass = {
    natural: "aspect-[3/2]",
    portrait: "aspect-[4/5]",
    landscape: "aspect-[16/10]",
    square: "aspect-square",
  }[aspect];

  return (
    <div className="group relative overflow-hidden bg-surface border border-surface-border">
      {/* Lightbox trigger button */}
      <button
        ref={buttonRef}
        onClick={() => onOpenLightbox(index, buttonRef)}
        aria-label={`View enlarged photograph: ${image.name}`}
        className="w-full text-left block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className={`relative w-full ${aspectClass} overflow-hidden`}>
          <Image
            src={image.url}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Editorial hover overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-medium mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              {image.category}
            </span>
            <h3 className="font-serif text-lg sm:text-xl text-ivory font-normal tracking-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
              {image.name}
            </h3>
            {image.location && (
              <span className="text-xs text-ivory-muted mt-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-100 font-light">
                {image.location}
              </span>
            )}
            <div className="mt-4 flex items-center justify-between text-xs text-ivory-dim border-t border-surface-border pt-3">
              <span className="uppercase tracking-widest text-[10px]">Click to Expand</span>
              <span className="text-gold font-mono">&rarr;</span>
            </div>
          </div>
        </div>
      </button>

      {/* Optional direct project link badge if image is attached to a project */}
      {image.projectSlug && (
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            href={`/portfolio/project/${image.projectSlug}`}
            aria-label={`Go to ${image.name} project story`}
            className="px-3 py-1.5 bg-background/80 hover:bg-gold hover:text-background text-ivory text-[10px] uppercase tracking-widest backdrop-blur-md border border-surface-border transition-colors duration-200"
          >
            Story
          </Link>
        </div>
      )}
    </div>
  );
}
