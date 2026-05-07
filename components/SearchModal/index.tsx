'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type { SearchItem } from '@/lib/searchIndex';

interface SearchModalProps {
  items: SearchItem[];
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ items, open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as SearchItem[];
    const seen = new Set<string>();
    return items
      .filter((it) => {
        const hay = `${it.title} ${it.description ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
        const key = `${it.title}|${it.permalink}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 12);
  }, [query, items]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-16 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        /* iOS dark-mode visibility: previous bg matched --brand-bg (the page
           background), so the modal "disappeared" against the page. Use white
           in light mode and --brand-card-dark in dark mode for clear contrast. */
        className="w-full max-w-[640px] rounded-[24px] bg-white p-2 shadow-[0_24px_64px_rgba(0,0,0,0.35)] [[data-theme=dark]_&]:bg-[color:var(--brand-card-dark)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 rounded-[20px] bg-white px-4 py-3 [[data-theme=dark]_&]:bg-[#15191C]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="flex-shrink-0 text-[#15191C] [[data-theme=dark]_&]:text-white"
          >
            <path d="M10 4a6 6 0 1 0 3.74 10.7l4.78 4.78a1 1 0 0 0 1.42-1.42l-4.78-4.78A6 6 0 0 0 10 4Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, talks, speakers…"
            className="flex-1 border-none bg-transparent font-onest text-base font-normal tracking-oai text-[#15191C] outline-none placeholder:text-[rgba(21,25,28,0.5)] [[data-theme=dark]_&]:text-white [[data-theme=dark]_&]:placeholder:text-[rgba(255,255,255,0.5)]"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-[#15191C] hover:bg-black/5 [[data-theme=dark]_&]:text-white [[data-theme=dark]_&]:hover:bg-white/10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-2 max-h-[60vh] overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="px-3 py-6 font-onest text-sm text-[rgba(21,25,28,0.5)] [[data-theme=dark]_&]:text-[rgba(255,255,255,0.5)]">
              Start typing to search across events, talks, speakers, and pages.
            </div>
          ) : results.length === 0 ? (
            <div className="px-3 py-6 font-onest text-sm text-[rgba(21,25,28,0.5)] [[data-theme=dark]_&]:text-[rgba(255,255,255,0.5)]">
              No results for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {results.map((r, i) => (
                <li key={`${r.permalink}-${i}`}>
                  <Link
                    href={r.permalink}
                    onClick={onClose}
                    className="flex flex-col gap-1 rounded-[12px] px-3 py-2 no-underline transition-colors hover:bg-black/5 [[data-theme=dark]_&]:hover:bg-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-brand-green/20 px-2 py-0.5 font-onest text-[10px] font-bold uppercase tracking-oai text-brand-green">
                        {r.type}
                      </span>
                      <span className="font-onest text-base font-semibold tracking-oai text-[#15191C] [[data-theme=dark]_&]:text-white">
                        {r.title}
                      </span>
                    </div>
                    {r.description && (
                      <span className="font-onest text-sm font-normal tracking-oai text-[rgba(21,25,28,0.6)] [[data-theme=dark]_&]:text-[rgba(255,255,255,0.6)]">
                        {r.description}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
