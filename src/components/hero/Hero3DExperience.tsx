"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { SceneFallback } from "../three/SceneFallback";

// Lazy load Three.js canvas without blocking initial page render
const FloatingGalleryCanvas = dynamic(
  () =>
    import("../three/FloatingGalleryCanvas").then((mod) => mod.FloatingGalleryCanvas),
  {
    ssr: false,
    loading: () => <SceneFallback />,
  }
);

export function Hero3DExperience() {
  const [shouldRender3D, setShouldRender3D] = useState<boolean | null>(null);

  useEffect(() => {
    // 1. Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setShouldRender3D(false);
      return;
    }

    // 2. Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setShouldRender3D(false);
        return;
      }
    } catch {
      setShouldRender3D(false);
      return;
    }

    // 3. Fall back to static on small screens for maximum battery & mobile performance
    if (window.innerWidth < 768) {
      setShouldRender3D(false);
      return;
    }

    setShouldRender3D(true);
  }, []);

  // During SSR or initial mount, display high-performance static fallback
  if (shouldRender3D === null || !shouldRender3D) {
    return <SceneFallback />;
  }

  return <FloatingGalleryCanvas />;
}
