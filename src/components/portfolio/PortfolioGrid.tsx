"use client";

import { PortfolioImage } from "@/types";
import { motion, useInView } from "framer-motion";
import React, { useRef, useState } from "react";
import { ImageLightbox } from "./ImageLightbox";
import { PortfolioCard } from "./PortfolioCard";
import { Reveal } from "@/components/motion/Reveal";

interface PortfolioGridProps {
  images: PortfolioImage[];
  emptyMessage?: string;
}

// Rhythm pattern: true = full-width spanning item, false = single col
// Pattern repeats every 7 images: [wide, normal, normal, wide, normal, normal, normal]
function getLayout(idx: number): { colSpan: string; aspect: "landscape" | "portrait" | "square" | "natural" } {
  const pos = idx % 7;
  if (pos === 0) return { colSpan: "md:col-span-2", aspect: "landscape" };
  if (pos === 3) return { colSpan: "md:col-span-2", aspect: "landscape" };
  if (pos === 2 || pos === 5) return { colSpan: "col-span-1", aspect: "portrait" };
  return { colSpan: "col-span-1", aspect: "natural" };
}

export function PortfolioGrid({
  images,
  emptyMessage = "This collection is currently being updated with new photographs.",
}: PortfolioGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [triggerRef, setTriggerRef] = useState<React.RefObject<HTMLButtonElement | null> | undefined>();

  const handleOpen = (index: number, ref: React.RefObject<HTMLButtonElement | null>) => {
    setLightboxIndex(index);
    setTriggerRef(ref);
  };

  if (images.length === 0) {
    return (
      <Reveal className="py-24 text-center max-w-lg mx-auto">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold block mb-3">
          Coming Soon
        </span>
        <p className="font-serif text-xl text-ivory">{emptyMessage}</p>
      </Reveal>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-surface-border">
        {images.map((image, idx) => {
          const { colSpan, aspect } = getLayout(idx);
          return (
            <GridItem key={image.id} colSpan={colSpan} idx={idx}>
              <PortfolioCard
                image={image}
                index={idx}
                aspect={aspect}
                priority={idx < 4}
                onOpenLightbox={handleOpen}
              />
            </GridItem>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={images}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
          triggerElementRef={triggerRef}
        />
      )}
    </>
  );
}

function GridItem({
  children,
  colSpan,
  idx,
}: {
  children: React.ReactNode;
  colSpan: string;
  idx: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: (idx % 3) * 0.08 }}
      className={`bg-background ${colSpan}`}
    >
      {children}
    </motion.div>
  );
}
