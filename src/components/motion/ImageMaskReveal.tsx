"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface ImageMaskRevealProps {
  src: string;
  alt: string;
  delay?: number;
  duration?: number;
  className?: string;
  wrapperClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Direction the mask sweeps: left-to-right or top-to-bottom */
  direction?: "horizontal" | "vertical";
}

export function ImageMaskReveal({
  src,
  alt,
  delay = 0,
  duration = 1.0,
  className = "",
  wrapperClassName = "",
  sizes = "100vw",
  priority = false,
  direction = "horizontal",
}: ImageMaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 });

  const maskVariants = {
    hidden:
      direction === "horizontal"
        ? { clipPath: "inset(0 100% 0 0)" }
        : { clipPath: "inset(100% 0 0 0)" },
    visible: {
      clipPath: "inset(0 0% 0 0)",
      transition: {
        duration,
        delay,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const imageVariants = {
    hidden:
      direction === "horizontal"
        ? { scale: 1.12, x: 20 }
        : { scale: 1.12, y: 20 },
    visible: {
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        duration: duration + 0.3,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${wrapperClassName}`}>
      <motion.div
        variants={maskVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="absolute inset-0"
      >
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={`object-cover ${className}`}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
