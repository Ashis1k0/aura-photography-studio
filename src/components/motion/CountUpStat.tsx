"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface CountUpStatProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function CountUpStat({ value, suffix = "", duration = 1.8 }: CountUpStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [isInView, value, duration, count]);

  return (
    <span ref={ref} className="font-serif text-4xl sm:text-5xl text-gold font-normal">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
