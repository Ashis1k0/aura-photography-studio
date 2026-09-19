"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "view" | "drag" | "open" | "hidden";

const CURSOR_LABELS: Record<CursorState, string> = {
  default: "",
  view: "VIEW",
  drag: "DRAG",
  open: "OPEN",
  hidden: "",
};

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("hidden");
  const [isPointer, setIsPointer] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // Smooth spring following
  const sx = useSpring(mx, { damping: 26, stiffness: 300, mass: 0.5 });
  const sy = useSpring(my, { damping: 26, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    // Only run on desktop (pointer device)
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    // Hide native cursor via global style
    document.documentElement.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (state === "hidden") setState("default");

      const target = e.target as HTMLElement;
      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor") as CursorState | null;
      const isBtn = !!target.closest("button, a, [role='button']");
      const isCursorEl = !!target.closest("[data-cursor]");

      if (cursorAttr) {
        setState(cursorAttr as CursorState);
      } else if (isBtn) {
        setState("open");
      } else {
        setState("default");
      }

      setIsPointer(isBtn && !isCursorEl);
    };

    const leave = () => setState("hidden");

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const label = CURSOR_LABELS[state];
  const hasLabel = label.length > 0;
  const isHidden = state === "hidden";

  return (
    <motion.div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed z-[9999] top-0 left-0 select-none"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      {/* Outer ring */}
      <motion.div
        animate={{
          width: hasLabel ? 72 : isPointer ? 40 : 10,
          height: hasLabel ? 72 : isPointer ? 40 : 10,
          opacity: isHidden ? 0 : 1,
          borderColor: hasLabel ? "rgba(212,175,55,0.9)" : isPointer ? "rgba(246,244,240,0.5)" : "rgba(246,244,240,0.3)",
          backgroundColor: hasLabel ? "rgba(212,175,55,0.08)" : "transparent",
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-full border flex items-center justify-center"
      >
        {hasLabel && (
          <motion.span
            key={label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18 }}
            className="text-[9px] tracking-[0.2em] uppercase text-gold font-medium font-sans leading-none"
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      {/* Dot */}
      <motion.div
        animate={{
          opacity: isHidden || hasLabel ? 0 : 1,
          scale: isPointer ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-ivory"
      />
    </motion.div>
  );
}
