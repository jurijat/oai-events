'use client';

import React, { useEffect, useState, useCallback } from 'react';

interface PhotoLightboxProps {
  photos: string[];
  startIndex: number;
  onClose: () => void;
}

export default function PhotoLightbox({ photos, startIndex, onClose }: PhotoLightboxProps) {
  const [index, setIndex] = useState(startIndex);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % photos.length);
  }, [photos.length]);

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
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black/90"
      onClick={onClose}
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
        className="absolute right-4 top-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none bg-white/10 text-xl text-white transition-colors hover:bg-white/20 md:right-6 md:top-6"
        aria-label="Close"
      >
        ×
      </button>

      {/* Main photo area */}
      <div
        className="relative flex w-full flex-1 items-center justify-center px-4 py-4 md:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev */}
        {photos.length > 1 && (
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-none bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6 md:h-12 md:w-12"
            aria-label="Previous photo"
          >
            ‹
          </button>
        )}

        <img
          src={photos[index]}
          alt={`Photo ${index + 1} of ${photos.length}`}
          className="max-h-[75vh] max-w-full rounded-2xl object-contain"
        />

        {/* Next */}
        {photos.length > 1 && (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-none bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6 md:h-12 md:w-12"
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
                className={`h-14 w-20 flex-shrink-0 cursor-pointer rounded-lg border-2 bg-cover bg-center transition-all md:h-20 md:w-28 ${
                  i === index
                    ? 'border-brand-green opacity-100'
                    : 'border-transparent opacity-60 hover:opacity-100'
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
