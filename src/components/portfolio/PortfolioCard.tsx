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
    <div className="group relative overflow-hidden bg-surface">
      <button
        ref={buttonRef}
        onClick={() => onOpenLightbox(index, buttonRef)}
        data-cursor="view"
        aria-label={`View ${image.name}`}
        className="w-full text-left block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className={`relative w-full ${aspectClass} overflow-hidden`}>
          <Image
            src={image.url}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />

          {/* Overlay */}
          <div className="absolute inset-0 overlay-bottom opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5 sm:p-6">
            <span className="text-[9px] uppercase tracking-[0.3em] text-gold mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              {image.category}
            </span>
            <h3 className="font-serif text-base sm:text-lg text-ivory font-normal translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
              {image.name}
            </h3>
            {image.location && (
              <span className="text-[10px] text-ivory-muted mt-0.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-100 font-light block">
                {image.location}
              </span>
            )}
          </div>
        </div>
      </button>

      {/* Project story link */}
      {image.projectSlug && (
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            href={`/portfolio/project/${image.projectSlug}`}
            data-cursor="open"
            aria-label={`Go to ${image.name} project`}
            className="inline-block px-3 py-1.5 bg-background/75 hover:bg-gold hover:text-background text-ivory text-[9px] uppercase tracking-widest backdrop-blur-sm transition-colors duration-200"
          >
            Story
          </Link>
        </div>
      )}
    </div>
  );
}
