"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CategoryInfo } from "@/types";

interface CategoryHoverRailProps {
  categories: CategoryInfo[];
}

export function CategoryHoverRail({ categories }: CategoryHoverRailProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-16 items-start">

        {/* Left: category list */}
        <nav
          className="w-full lg:w-80 shrink-0"
          aria-label="Portfolio categories"
        >
          <ol className="divide-y divide-surface-border border-y border-surface-border">
            {categories.map((cat, i) => (
              <li key={cat.id}>
                <Link
                  href={`/portfolio/${cat.slug}`}
                  onMouseEnter={() => setActiveIdx(i)}
                  onFocus={() => setActiveIdx(i)}
                  data-cursor="view"
                  className={`group flex items-center justify-between py-5 px-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded ${
                    activeIdx === i ? "text-ivory" : "text-ivory-dim hover:text-ivory"
                  }`}
                  aria-label={`View ${cat.name} collection`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono tracking-widest text-gold/60 w-6">
                      0{cat.order}
                    </span>
                    <span className={`font-serif text-xl sm:text-2xl transition-colors duration-300 ${
                      activeIdx === i ? "text-gold" : ""
                    }`}>
                      {cat.name}
                    </span>
                  </div>
                  <motion.span
                    animate={{ x: activeIdx === i ? 0 : -6, opacity: activeIdx === i ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-gold text-lg"
                    aria-hidden="true"
                  >
                    →
                  </motion.span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        {/* Right: image preview */}
        <div className="hidden lg:block flex-1 relative aspect-[4/3] overflow-hidden bg-surface">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 1.06, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0% 0 0)" }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={categories[activeIdx]?.coverImage ?? ""}
                alt={categories[activeIdx]?.name ?? ""}
                fill
                sizes="60vw"
                className="object-cover"
                priority={activeIdx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />

              {/* Bottom caption */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.div
                  key={`caption-${activeIdx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                >
                  <span className="block text-[9px] uppercase tracking-[0.3em] text-gold mb-1">
                    Collection 0{categories[activeIdx]?.order}
                  </span>
                  <span className="block font-serif text-2xl text-ivory">
                    {categories[activeIdx]?.name}
                  </span>
                  <span className="block text-xs text-ivory-muted mt-1 font-light">
                    {categories[activeIdx]?.subtitle}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile: thumbnail grid */}
        <div className="lg:hidden grid grid-cols-2 gap-3 mt-6 w-full">
          {categories.slice(0, 4).map((cat) => (
            <Link
              key={cat.id}
              href={`/portfolio/${cat.slug}`}
              className="relative aspect-[4/3] overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={`View ${cat.name} collection`}
            >
              <Image
                src={cat.coverImage}
                alt={cat.name}
                fill
                sizes="50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-background/50 group-hover:bg-background/30 transition-colors" />
              <span className="absolute bottom-3 left-3 font-serif text-sm text-ivory">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
