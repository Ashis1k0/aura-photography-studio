"use client";

import { PortfolioImage } from "@/types";
import React, { useState } from "react";
import { ImageLightbox } from "./ImageLightbox";
import { PortfolioCard } from "./PortfolioCard";

interface PortfolioGridProps {
  images: PortfolioImage[];
  emptyMessage?: string;
}

export function PortfolioGrid({
  images,
  emptyMessage = "This collection is currently being updated with new photographs.",
}: PortfolioGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [triggerRef, setTriggerRef] = useState<React.RefObject<HTMLButtonElement | null> | undefined>();

  const handleOpenLightbox = (
    index: number,
    buttonRef: React.RefObject<HTMLButtonElement | null>
  ) => {
    setLightboxIndex(index);
    setTriggerRef(buttonRef);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  if (images.length === 0) {
    return (
      <div className="py-24 text-center border border-surface-border bg-surface p-8 max-w-xl mx-auto my-12">
        <span className="text-xs uppercase tracking-[0.25em] text-gold block mb-3">
          Collection Notice
        </span>
        <p className="text-lg text-ivory font-serif">{emptyMessage}</p>
        <p className="text-xs text-ivory-dim mt-2 font-light">
          Please check back shortly or explore our other collections.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {images.map((image, idx) => {
          // Asymmetric editorial rhythm: every 5th image is a portrait aspect
          const aspect = idx % 5 === 0 ? "portrait" : idx % 3 === 0 ? "square" : "natural";

          return (
            <div
              key={image.id}
              className={idx % 7 === 0 ? "md:col-span-2 lg:col-span-2" : ""}
            >
              <PortfolioCard
                image={image}
                index={idx}
                aspect={idx % 7 === 0 ? "landscape" : aspect}
                priority={idx < 4}
                onOpenLightbox={handleOpenLightbox}
              />
            </div>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={images}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={handleCloseLightbox}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
          triggerElementRef={triggerRef}
        />
      )}
    </>
  );
}
