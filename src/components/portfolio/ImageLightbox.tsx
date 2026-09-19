"use client";

import { PortfolioImage } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface ImageLightboxProps {
  images: PortfolioImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  triggerElementRef?: React.RefObject<HTMLElement | null>;
}

export function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  triggerElementRef,
}: ImageLightboxProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const currentImage = images[currentIndex];

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    const newIdx = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onNavigate(newIdx);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    const newIdx = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIdx);
  }, [currentIndex, images.length, onNavigate]);

  // Keyboard navigation and Focus Trap
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button initially
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          onClose();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handlePrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          handleNext();
          break;
        case "Tab":
          if (modalRef.current) {
            const focusables = modalRef.current.querySelectorAll<HTMLElement>(
              'button, [href], [tabindex]:not([tabindex="-1"])'
            );
            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last?.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first?.focus();
            }
          }
          break;
      }
    };

    const triggerEl = triggerElementRef?.current;

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      // Restore focus to triggering element
      triggerEl?.focus();
    };
  }, [isOpen, onClose, handlePrev, handleNext, triggerElementRef]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Minimum swipe threshold 50px
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  if (!isOpen || !currentImage) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Lightbox: ${currentImage.name}`}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 animate-fade-in select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center space-x-4">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-mono">
            {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
          <span className="hidden sm:inline-block w-px h-4 bg-surface-border" />
          <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-ivory-dim">
            {currentImage.category}
          </span>
        </div>

        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close fullscreen view (Escape)"
          className="p-3 text-ivory-muted hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 my-4 flex items-center justify-center overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous photograph (Left arrow)"
          className="absolute left-2 sm:left-4 z-20 p-3 sm:p-4 rounded-full bg-background/40 hover:bg-surface text-ivory-muted hover:text-ivory backdrop-blur-md border border-surface-border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Display Image with optimized Next.js Image */}
        <div className="relative w-full h-full max-w-6xl max-h-[75vh]">
          <Image
            src={currentImage.url}
            alt={currentImage.alt}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-contain transition-opacity duration-300"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next photograph (Right arrow)"
          className="absolute right-2 sm:right-4 z-20 p-3 sm:p-4 rounded-full bg-background/40 hover:bg-surface text-ivory-muted hover:text-ivory backdrop-blur-md border border-surface-border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Bottom Metadata Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10 pt-4 border-t border-surface-border">
        <div className="max-w-2xl">
          <h3 className="font-serif text-lg sm:text-xl text-ivory font-normal">
            {currentImage.name}
          </h3>
          {currentImage.caption && (
            <p className="text-xs sm:text-sm text-ivory-muted mt-1 font-light">
              {currentImage.caption}
            </p>
          )}
          {currentImage.location && (
            <span className="text-[11px] uppercase tracking-wider text-gold mt-1 block">
              {currentImage.location}
            </span>
          )}
        </div>

        {currentImage.projectSlug && (
          <div className="shrink-0">
            <Link
              href={`/portfolio/project/${currentImage.projectSlug}`}
              onClick={onClose}
              className="text-xs uppercase tracking-widest text-ivory hover:text-gold transition-colors underline underline-offset-4"
            >
              Explore Full Story &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
