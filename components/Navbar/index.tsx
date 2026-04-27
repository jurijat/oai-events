'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { asset } from '@/lib/basePath';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      data-navbar
      data-scrolled={scrolled ? 'true' : 'false'}
      className={`sticky top-0 z-30 flex items-center justify-between px-6 transition-[height,background-color,box-shadow] duration-200 ease-out md:px-10 ${
        scrolled
          ? 'h-12 bg-[color:var(--brand-bg)] shadow-[0_1px_0_var(--brand-separator)]'
          : 'h-16 bg-transparent shadow-none'
      }`}
    >
      <Link href="/" data-navbar-logo className="flex items-center no-underline">
        <img
          src={asset('/img/openlogo.svg')}
          alt="OpenAPI Initiative"
          className={`navbar-logo-img w-auto transition-[height] duration-200 ease-out ${
            scrolled ? 'h-9' : 'h-12'
          }`}
        />
      </Link>

      <div className="flex items-center gap-2">
        <ThemeToggle scrolled={scrolled} />
        <SearchButton />
      </div>
    </nav>
  );
}

function SearchButton() {
  return (
    <button
      type="button"
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
