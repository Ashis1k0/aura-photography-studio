"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { PortfolioImage } from "@/types";

interface FeaturedWorkRowProps {
  images: PortfolioImage[];
}

// Editorial layout map — desktop grid is 3 columns
const LAYOUTS: { wrapperClass: string; offsetClass: string }[] = [
  { wrapperClass: "col-span-2 aspect-[4/3]", offsetClass: "" },
  { wrapperClass: "col-span-1 aspect-[3/4]", offsetClass: "mt-16" },
  { wrapperClass: "col-span-1 aspect-square", offsetClass: "-mt-8" },
  { wrapperClass: "col-span-1 aspect-[3/4]", offsetClass: "mt-6" },
  { wrapperClass: "col-span-2 aspect-[16/9]", offsetClass: "" },
  { wrapperClass: "col-span-1 aspect-square", offsetClass: "mt-10" },
];

export function FeaturedWorkRow({ images }: FeaturedWorkRowProps) {
  if (images.length === 0) return null;

  return (
    <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
      {/* Desktop editorial grid */}
      <div className="hidden sm:grid grid-cols-3 gap-4 sm:gap-6 auto-rows-auto">
        {images.slice(0, 6).map((img, i) => {
          const layout = LAYOUTS[i] ?? LAYOUTS[2];
          return (
            <FeaturedCard
              key={img.id}
              image={img}
              index={i}
              wrapperClass={layout.wrapperClass}
              offsetClass={layout.offsetClass}
            />
          );
        })}
      </div>

      {/* Mobile: stacked portrait images */}
      <div className="sm:hidden flex flex-col gap-4">
        {images.slice(0, 4).map((img, i) => (
          <div key={img.id} className="relative aspect-[3/2] overflow-hidden">
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturedCard({
  image,
  index,
  wrapperClass,
  offsetClass,
}: {
  image: PortfolioImage;
  index: number;
  wrapperClass: string;
  offsetClass: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden group ${wrapperClass} ${offsetClass}`}
    >
      <Link
        href={image.projectSlug ? `/portfolio/project/${image.projectSlug}` : "/portfolio"}
        data-cursor="view"
        className="block w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label={`View ${image.name}`}
      >
        {/* Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={index < 2}
          />
        </motion.div>

        {/* Gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Metadata reveal */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
          <span className="block text-[9px] uppercase tracking-[0.3em] text-gold mb-1">
            {image.category}
          </span>
          <span className="block font-serif text-sm text-ivory leading-snug">{image.name}</span>
          {image.location && (
            <span className="block text-[10px] text-ivory-muted mt-0.5">{image.location}</span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
