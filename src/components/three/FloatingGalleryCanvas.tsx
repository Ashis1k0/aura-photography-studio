"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { SceneFallback } from "./SceneFallback";

interface FrameData {
  mesh: THREE.Mesh;
  border: THREE.LineSegments;
  initialPos: [number, number, number];
  initialRot: [number, number, number];
  speed: number;
}

interface FloatingGalleryCanvasProps {
  onFallback?: () => void;
}

export function FloatingGalleryCanvas({ onFallback }: FloatingGalleryCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Verify WebGL support using a temporary probe canvas
    //    (Do NOT probe on the main canvas — that would consume the context slot
    //     before Three.js can acquire it, causing a second null-context crash.)
    try {
      const probe = document.createElement("canvas");
      const gl =
        probe.getContext("webgl2") ||
        probe.getContext("webgl") ||
        (probe.getContext("experimental-webgl") as WebGLRenderingContext | null);
      if (!gl) {
        setHasError(true);
        onFallback?.();
        return;
      }
      // Release the probe context immediately
      const ext = gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
    } catch {
      setHasError(true);
      onFallback?.();
      return;
    }

    let animFrameId: number;
    let isDisposed = false;
    let renderer: THREE.WebGLRenderer;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // 2. Initialize WebGLRenderer safely inside try/catch
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "default",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    } catch (err) {
      console.warn("[Three.js] WebGL renderer instantiation failed, using static fallback:", err);
      setHasError(true);
      onFallback?.();
      return;
    }

    // 3. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xfff5e6, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 5. Frames Setup
    const textureLoader = new THREE.TextureLoader();
    const frameConfigs = [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
        pos: [0, 0, 0] as [number, number, number],
        rot: [0, 0, 0] as [number, number, number],
        scale: 1.25,
        speed: 0.9,
      },
      {
        url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop",
        pos: [-1.8, 0.35, -0.7] as [number, number, number],
        rot: [0, 0.22, -0.06] as [number, number, number],
        scale: 0.95,
        speed: 0.65,
      },
      {
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop",
        pos: [1.8, -0.3, -0.5] as [number, number, number],
        rot: [0, -0.22, 0.06] as [number, number, number],
        scale: 0.95,
        speed: 0.75,
      },
    ];

    const frames: FrameData[] = [];
    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];
    const texturesToDispose: THREE.Texture[] = [];

    const planeGeo = new THREE.PlaneGeometry(1.5, 2.0);
    const edgesGeo = new THREE.EdgesGeometry(planeGeo);
    geometriesToDispose.push(planeGeo, edgesGeo);

    const borderMat = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.35,
    });
    materialsToDispose.push(borderMat);

    frameConfigs.forEach((cfg) => {
      const texture = textureLoader.load(cfg.url);
      texture.generateMipmaps = true;
      texturesToDispose.push(texture);

      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide,
      });
      materialsToDispose.push(mat);

      const mesh = new THREE.Mesh(planeGeo, mat);
      mesh.scale.set(cfg.scale, cfg.scale, 1);
      mesh.position.set(...cfg.pos);
      mesh.rotation.set(...cfg.rot);

      const border = new THREE.LineSegments(edgesGeo, borderMat);
      border.scale.set(cfg.scale, cfg.scale, 1);
      border.position.set(...cfg.pos);
      border.rotation.set(...cfg.rot);

      scene.add(mesh);
      scene.add(border);

      frames.push({
        mesh,
        border,
        initialPos: cfg.pos,
        initialRot: cfg.rot,
        speed: cfg.speed,
      });
    });

    // 6. Pointer Tracking with Smooth Lerp
    let targetPointerX = 0;
    let targetPointerY = 0;
    let currentPointerX = 0;
    let currentPointerY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetPointerX = Math.max(-1, Math.min(1, x));
      targetPointerY = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    // 7. Resize Handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 8. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer lerp
      currentPointerX += (targetPointerX - currentPointerX) * 0.05;
      currentPointerY += (targetPointerY - currentPointerY) * 0.05;

      // Animate floating frames
      frames.forEach((frame) => {
        const t = elapsedTime * frame.speed;
        const floatY = Math.sin(t) * 0.07;
        const posX = frame.initialPos[0] + currentPointerX * 0.18;
        const posY = frame.initialPos[1] + floatY + currentPointerY * 0.12;

        frame.mesh.position.x = posX;
        frame.mesh.position.y = posY;
        frame.border.position.x = posX;
        frame.border.position.y = posY;

        const rotY = frame.initialRot[1] + currentPointerX * 0.12;
        const rotX = frame.initialRot[0] - currentPointerY * 0.08;

        frame.mesh.rotation.y = rotY;
        frame.mesh.rotation.x = rotX;
        frame.border.rotation.y = rotY;
        frame.border.rotation.x = rotX;
      });

      try {
        renderer.render(scene, camera);
        animFrameId = requestAnimationFrame(animate);
      } catch (err) {
        console.warn("[Three.js] Render error, switching to fallback:", err);
        setHasError(true);
        onFallback?.();
      }
    };

    animate();

    // 9. Resource Cleanup (safe for React Strict Mode)
    return () => {
      isDisposed = true;
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);

      frames.forEach((f) => {
        scene.remove(f.mesh);
        scene.remove(f.border);
      });

      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      texturesToDispose.forEach((t) => t.dispose());

      if (renderer) {
        renderer.dispose();
      }
    };
  }, [onFallback]);

  if (hasError) {
    return <SceneFallback />;
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[420px] lg:min-h-[560px] relative flex items-center justify-center select-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
