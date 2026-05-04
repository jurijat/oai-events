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

  return (
    <>
      <nav
        data-navbar
        data-scrolled={scrolled ? 'true' : 'false'}
        className={`sticky top-0 z-30 flex items-center justify-between px-2 transition-[height,background-color,box-shadow] duration-200 ease-out md:px-10 ${
          scrolled
            ? 'h-12 bg-[color:var(--brand-bg)] shadow-[0_1px_0_var(--brand-separator)]'
            : 'h-16 bg-transparent shadow-none'
        }`}
      >
        <div className="flex items-center gap-3">
          {!isHome && (
            <button
              type="button"
              onClick={() => window.history.back()}
              aria-label="Back"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent text-[color:var(--ifm-font-color-base)] transition-colors hover:bg-black/5 hover:text-brand-green md:hidden"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 12H4" />
                <path d="M10 6l-6 6 6 6" />
              </svg>
            </button>
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
          {!isHome && <HomeButton />}
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

      {menuOpen && (
        <div className="sticky top-12 z-20 flex flex-col gap-1 border-b border-[color:var(--brand-separator)] bg-[color:var(--brand-bg)] px-4 py-3 md:hidden">
          {!isHome && (
            <Link
              href="/"
              className="rounded-lg px-3 py-3 font-onest text-base font-semibold tracking-oai text-[color:var(--ifm-font-color-base)] no-underline transition-colors hover:bg-black/5 hover:text-brand-green"
            >
              Home
            </Link>
          )}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen(true);
            }}
            className="rounded-lg border-none bg-transparent px-3 py-3 text-left font-onest text-base font-semibold tracking-oai text-[color:var(--ifm-font-color-base)] transition-colors hover:bg-black/5 hover:text-brand-green"
          >
            Search
          </button>
          <MobileThemeToggle />
        </div>
      )}

      <SearchModal items={searchItems} open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function MobileThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="rounded-lg border-none bg-transparent px-3 py-3 text-left font-onest text-base font-semibold tracking-oai text-[color:var(--ifm-font-color-base)] transition-colors hover:bg-black/5 hover:text-brand-green"
    >
      {resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}
    </button>
  );
}

function HomeButton() {
  return (
    <Link
      href="/"
      aria-label="Back to home"
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border-none bg-transparent text-[color:var(--ifm-font-color-base)] no-underline transition-colors hover:bg-black/5 hover:text-brand-green"
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
    </Link>
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
