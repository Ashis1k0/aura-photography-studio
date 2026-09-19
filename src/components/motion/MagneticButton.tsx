"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useCallback, useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  /** Strength of the magnetic pull (0–1) */
  strength?: number;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    },
    [disabled, strength, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
