"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** How much the image moves relative to scroll (0 = none, 1 = full) */
  speed?: number;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  sizes?: string;
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.15,
  className = "",
  wrapperClassName = "",
  priority = false,
  sizes = "100vw",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Image moves up slower than scroll = parallax depth
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `-${speed * 100}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${wrapperClassName}`}>
      <motion.div style={{ y }} className="absolute inset-[-20%] will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover ${className}`}
        />
      </motion.div>
    </div>
  );
}
