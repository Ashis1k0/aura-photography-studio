"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export function SplitText({
  text,
  className = "",
  stagger = 0.04,
  delay = 0,
  once = true,
  as: Tag = "div",
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once, amount: 0.3 });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} aria-label={text}>
      <Tag aria-hidden="true" className="flex flex-wrap gap-x-[0.25em]">
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block" style={{ perspective: 800 }}>
            <motion.span
              className="inline-block will-change-transform"
              initial={{ opacity: 0, y: "110%", rotateX: -15 }}
              animate={
                isInView
                  ? { opacity: 1, y: "0%", rotateX: 0 }
                  : { opacity: 0, y: "110%", rotateX: -15 }
              }
              transition={{
                duration: 0.75,
                delay: delay + i * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
