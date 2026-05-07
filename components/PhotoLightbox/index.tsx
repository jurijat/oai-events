'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';

interface PhotoLightboxProps {
  photos: string[];
  startIndex: number;
  onClose: () => void;
}

export default function PhotoLightbox({ photos, startIndex, onClose }: PhotoLightboxProps) {
  const [index, setIndex] = useState(startIndex);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % photos.length);
  }, [photos.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;

    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    // Vertical swipe down to dismiss (only when downward motion dominates).
    if (dy > 80 && absY > absX) {
      onClose();
      return;
    }

    // Horizontal swipe to navigate prev/next (>50px and dominant axis).
    if (absX > 50 && absX > absY) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, goPrev, goNext]);

  return (
    <div
      /* iOS: 100dvh keeps the lightbox the size of the visible viewport when
         the URL bar collapses; otherwise the bottom of the photo can hide
         under the URL bar on iPhones. */
      style={{ height: '100dvh' }}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black/90"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none bg-white text-[#15191c] transition-colors hover:bg-white/90 md:right-6 md:top-6"
        aria-label="Close"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Main photo area */}
      <div
        className="relative flex w-full flex-1 items-center justify-center px-6 py-6 md:px-16 md:py-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev — desktop only */}
        {photos.length > 1 && (
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-none bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6 md:flex md:h-12 md:w-12"
            aria-label="Previous photo"
          >
            ‹
          </button>
        )}

        <img
          src={photos[index]}
          alt={`Photo ${index + 1} of ${photos.length}`}
          className="max-h-[70vh] max-w-full rounded-[24px] object-contain md:rounded-2xl"
        />

        {/* Next — desktop only */}
        {photos.length > 1 && (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-none bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6 md:flex md:h-12 md:w-12"
            aria-label="Next photo"
          >
            ›
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      {photos.length > 1 && (
        <div className="w-full px-4 pb-6 pt-2 md:px-16" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-start gap-2 overflow-x-auto md:justify-center md:gap-3">
            {photos.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`relative flex-shrink-0 cursor-pointer rounded-lg border-none bg-cover bg-center p-0 transition-all ${
                  i === index
                    ? 'h-16 w-20 opacity-100 after:absolute after:bottom-[-8px] after:left-1/2 after:h-[3px] after:w-8 after:-translate-x-1/2 after:rounded-full after:bg-brand-green after:content-[""] md:h-20 md:w-28'
                    : 'h-16 w-20 opacity-60 hover:opacity-100 md:h-20 md:w-28'
                }`}
                style={{ backgroundImage: `url(${src})` }}
                aria-label={`View photo ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
