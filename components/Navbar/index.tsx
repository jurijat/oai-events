'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { asset } from '@/lib/basePath';
import SearchModal from '@/components/SearchModal';
import type { SearchItem } from '@/lib/searchIndex';

export default function Navbar({ searchItems = [] }: { searchItems?: SearchItem[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleShare = async () => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    const text = `Check out this OpenAPI event: ${url}`;
    // Native Web Share API (iOS Safari, Android Chrome, modern desktop browsers
    // with sharing integrations). Falls back to clipboard if unsupported or if
    // the user dismisses the sheet.
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: document.title, text, url });
        return;
      } catch {
        // user cancelled or share failed — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // last-resort fallback for very old browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 2000);
  };

  return (
    <>
      {/* iOS: switched from `position: sticky` → `fixed` because sticky is
          unreliable on iOS Safari when the URL bar collapses/expands.
          env(safe-area-inset-top) keeps the bar below the notch / Dynamic Island. */}
      <nav
        data-navbar
        data-scrolled={scrolled ? 'true' : 'false'}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
        className={`fixed inset-x-0 top-0 z-30 flex items-center justify-between px-2 transition-[height,background-color,box-shadow] duration-200 ease-out md:px-10 ${
          scrolled
            ? 'h-12 bg-[color:var(--brand-bg)] shadow-[0_1px_0_var(--brand-separator)]'
            : 'h-16 bg-transparent shadow-none'
        }`}
      >
        <div className="flex items-center gap-2">
          {!isHome && (
            <Link
              href="/"
              aria-label="Back to home"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border-none bg-transparent text-[color:var(--ifm-font-color-base)] no-underline transition-colors hover:bg-black/5 hover:text-brand-green md:hidden"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 12H4" />
                <path d="M10 6l-6 6 6 6" />
              </svg>
            </Link>
          )}
          <Link href="/" data-navbar-logo className="flex items-center no-underline">
            <img
              src={asset('/img/openlogo.svg')}
              alt="OpenAPI Initiative"
              className={`navbar-logo-img w-auto transition-[height] duration-200 ease-out ${
                scrolled ? 'h-9' : 'h-12'
              }`}
            />
          </Link>
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-8 md:flex">
          <ShareButton onClick={handleShare} />
          <SearchButton onClick={() => setSearchOpen(true)} />
          <ThemeToggle scrolled={scrolled} />
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent text-[color:var(--ifm-font-color-base)] transition-colors hover:bg-black/5 hover:text-brand-green md:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Spacer reserves the navbar's height in the document flow so the
          fixed-positioned navbar doesn't overlap page content.
          iOS: include safe-area-inset-top in the height — the navbar adds
          that as padding so the bar clears the notch / Dynamic Island. */}
      <div
        aria-hidden
        style={{ height: 'calc(4rem + env(safe-area-inset-top))' }}
      />
      {menuOpen && (
        <div
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
          className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between bg-white px-6 [[data-theme=dark]_&]:bg-[#15191c] md:hidden"
        >
          <div className="flex items-center gap-6 text-[#15191c] [[data-theme=dark]_&]:text-white">
            <button
              type="button"
              aria-label="Search"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent text-current transition-colors hover:text-brand-green"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 4a6 6 0 1 0 3.74 10.7l4.78 4.78a1 1 0 0 0 1.42-1.42l-4.78-4.78A6 6 0 0 0 10 4Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Share this page"
              onClick={() => {
                setMenuOpen(false);
                handleShare();
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent text-current transition-colors hover:text-brand-green"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="m33 19-9-9h-1v4l-1 1Q10 16 6 27v1h2q5-5 11-5h3l1 1v4h1zq1 0 0 0"
                />
              </svg>
            </button>
            <MobileMenuThemeToggle />
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent text-[#15191c] transition-colors hover:text-brand-green [[data-theme=dark]_&]:text-white"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <SearchModal items={searchItems} open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* "Link copied!" toast — fades out after 2s.
         pointer-events-none so it never blocks clicks under it. */}
      <div
        aria-live="polite"
        role="status"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-[1100] -translate-x-1/2 rounded-full bg-[#15191c] px-5 py-3 font-onest text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-opacity duration-300 [[data-theme=dark]_&]:bg-white [[data-theme=dark]_&]:text-[#15191c] ${
          toastVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Link copied!
      </div>
    </>
  );
}

function MobileMenuThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <button
      type="button"
      aria-label="Toggle color mode"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="navbar-theme-toggle"
      style={{
        background: `url('${asset('/img/whitedarkbutton.svg')}') center/contain no-repeat`,
        border: 'none',
        cursor: 'pointer',
        width: 32,
        height: 32,
        padding: 0,
        color: 'transparent',
      }}
    />
  );
}

function ShareButton({ onClick, className = '' }: { onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Share this page"
      className={`inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent text-[color:var(--ifm-font-color-base)] transition-colors hover:bg-black/5 hover:text-brand-green ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          fill="currentColor"
          d="m33 19-9-9h-1v4l-1 1Q10 16 6 27v1h2q5-5 11-5h3l1 1v4h1zq1 0 0 0"
        />
      </svg>
    </button>
  );
}

function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Search"
      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent text-[color:var(--ifm-font-color-base)] transition-colors hover:bg-black/5 hover:text-brand-green"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 4a6 6 0 1 0 3.74 10.7l4.78 4.78a1 1 0 0 0 1.42-1.42l-4.78-4.78A6 6 0 0 0 10 4Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
      </svg>
    </button>
  );
}

function ThemeToggle({ scrolled }: { scrolled: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const size = scrolled ? 32 : 40;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color mode"
      className="navbar-theme-toggle"
      style={{
        background: `url('${asset('/img/whitedarkbutton.svg')}') center/contain no-repeat`,
        border: 'none',
        cursor: 'pointer',
        width: size,
        height: size,
        padding: 0,
        margin: '0 4px',
        color: 'transparent',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.2s ease, width 0.2s ease, height 0.2s ease',
      }}
    />
  );
}
