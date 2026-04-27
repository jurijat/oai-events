'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import EventCard from '../EventCard';
import { asset } from '@/lib/basePath';
import SpeakerCard from '../SpeakerCard';
import OaiFooter from '../OaiFooter';
import PhotoLightbox from '../PhotoLightbox';

interface Speaker {
  name: string;
  position: string;
  photo: string;
}

interface EventItem {
  title: string;
  permalink: string;
  date: string;
  location: string;
  type: string;
  status: string;
  image: string;
  speakers: Speaker[];
}

interface EventsListProps {
  items: EventItem[];
}

export default function EventsList({ items }: EventsListProps) {
  // Separate featured (active) from other events
  const featured = items.find((i) => i.status === 'active') || items[0];
  const otherEvents = items.filter((i) => i !== featured);

  // Collect all unique speakers
  const allSpeakers = items.reduce<Speaker[]>((acc, item) => {
    for (const s of item.speakers) {
      if (!acc.some((existing) => existing.name === s.name)) {
        acc.push(s);
      }
    }
    return acc;
  }, []);

  // Sample photos for the gallery
  const photos = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1600',
    'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=1600',
  ];
  const [galleryOpen, setGalleryOpen] = useState(false);

  // Scroll-driven hero expansion
  const heroRef = useRef<HTMLDivElement>(null);
  const initialHeightRef = useRef<number>(0);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.innerWidth < 1024) return;

    if (initialHeightRef.current === 0) {
      initialHeightRef.current = hero.offsetHeight;
    }

    let rafId: number;
    let lastScrollY = -1;
    const tick = () => {
      const scrollY = document.documentElement.scrollTop;
      if (scrollY !== lastScrollY) {
        lastScrollY = scrollY;
        const extra = Math.min(scrollY * 0.3, 300);
        hero.style.minHeight = `${initialHeightRef.current + extra}px`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-brand-bg">
        {/* Hero Section */}
        <section ref={heroRef} className="relative pb-12 pt-16 md:pb-20 md:pt-24">
          <div className="relative z-10 mx-auto max-w-[1360px] px-6 md:px-20">
            <div className="flex items-start gap-[75px]">
              {/* Green vertical accent bar with entrance animation */}
              <div
                className="animate-slide-down mt-3 hidden w-[5px] flex-shrink-0 rounded-full bg-brand-green md:block"
                style={{ height: 80 }}
              />
              <div className="flex-1">
                {/* Heading with entrance animation */}
                <h1 className="animate-fade-in-up m-0 font-onest text-[48px] font-bold leading-[100%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[80px] md:leading-[96px]">
                  OpenAPI events
                </h1>
                {/* Subtitle with staggered entrance animation */}
                <p className="animate-fade-in-up animation-delay-200 m-0 mt-2 max-w-[1200px] font-onest text-xl font-normal leading-[120%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[32px]">
                  Join the OpenAPI Conference, where we bring the latest OpenAPI innovations to
                  audiences around the world
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Section */}
        <section className="relative z-10 mx-auto mb-12 max-w-[1360px]">
          <h2 className="m-0 mb-10 px-6 font-onest text-[44px] font-bold leading-[110%] tracking-oai text-[color:var(--ifm-font-color-base)] md:px-20 md:text-[48px]">
            Upcoming
          </h2>

          {/* Featured Event — edge-to-edge on mobile, padded on desktop */}
          {featured && (
            <div className="mb-6 md:px-20">
              <EventCard
                title={featured.title}
                date={featured.date}
                location={featured.location}
                image={featured.image}
                type={featured.type}
                permalink={featured.permalink}
                status={featured.status as 'active' | 'upcoming' | 'finished'}
                featured
              />
            </div>
          )}

          {/* Other Events Grid — edge-to-edge on mobile, padded on desktop */}
          {otherEvents.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:px-20">
              {otherEvents.map((item) => (
                <EventCard
                  key={item.permalink}
                  title={item.title}
                  date={item.date}
                  location={item.location}
                  image={item.image}
                  type={item.type}
                  permalink={item.permalink}
                  status={item.status as 'active' | 'upcoming' | 'finished'}
                />
              ))}

              {/* "New events soon" placeholder */}
              <div className="flex h-[340px] flex-col items-center justify-center rounded-4xl border border-white/[0.06] bg-brand-card md:h-[375px] dark:border-white/[0.06]">
                <span
                  className="mb-2 text-2xl"
                  style={{ color: 'var(--ifm-font-color-base)', opacity: 0.2 }}
                >
                  &#x2726;
                </span>
                <span
                  className="font-onest text-[36px] font-bold tracking-oai"
                  style={{ color: 'var(--ifm-font-color-base)', opacity: 0.2 }}
                >
                  New events soon
                </span>
              </div>
            </div>
          )}

          {/* Past events button */}
          <div className="mt-12 px-6 md:px-20">
            <Link
              href="/past-events"
              className="inline-flex h-[64px] w-[164px] items-center justify-center whitespace-nowrap rounded-[20px] bg-brand-green px-4 py-1.5 font-onest text-lg font-bold tracking-oai text-black no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-green-light hover:shadow-[0_8px_24px_rgba(101,209,0,0.4)] active:translate-y-0 active:bg-brand-green-dark active:shadow-none disabled:pointer-events-none disabled:opacity-50"
            >
              Past events
              <svg
                className="ml-2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 3l5 5-5 5" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Featured Speakers Section */}
        {allSpeakers.length > 0 && (
          <section id="speakers" className="overflow-hidden py-16 md:py-20">
            <div className="mx-auto mb-10 max-w-[1360px] px-6 md:px-20">
              <h2 className="m-0 font-onest text-[36px] font-bold leading-[110%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[48px]">
                Featured Speakers
              </h2>
              <p className="m-0 mt-2 font-onest text-xl font-normal leading-[120%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[32px]">
                The finest minds in the industry
              </p>
            </div>

            {/* Desktop: Marquee rows | Mobile: Grid layout */}
            <div className="mb-6 hidden md:block">
              {/* Marquee row 1 — scrolls left */}
              <div className="speakers-marquee speakers-marquee--left mb-6">
                <div className="speakers-marquee__track">
                  {[...allSpeakers, ...allSpeakers, ...allSpeakers].map((s, i) => (
                    <div key={`r1-${i}`} className="speakers-marquee__item">
                      <SpeakerCard variant="dark" {...s} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Marquee row 2 — scrolls right */}
              <div className="speakers-marquee speakers-marquee--right mb-10">
                <div className="speakers-marquee__track">
                  {[...allSpeakers, ...allSpeakers, ...allSpeakers].map((s, i) => (
                    <div key={`r2-${i}`} className="speakers-marquee__item">
                      <SpeakerCard variant="dark" {...s} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile: Vertical speaker list */}
            <div className="mb-10 grid grid-cols-1 gap-4 md:hidden">
              {allSpeakers.map((s) => (
                <div key={s.name}>
                  <SpeakerCard variant="dark" {...s} />
                </div>
              ))}
            </div>

            {/* Become a Speaker link */}
            <div className="mx-auto max-w-[1360px] px-6 md:px-20">
              <a
                href="#"
                className="hover:bg-brand-card-dark/80 inline-flex items-center gap-3 rounded-full bg-brand-card-dark py-2 pl-3 pr-5 font-onest text-base font-semibold tracking-oai text-brand-green no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(101,209,0,0.25)] active:translate-y-0 active:shadow-none"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 48 48"
                  fill="none"
                  className="flex-shrink-0"
                >
                  {/* Speech bubble body with sharp triangular tail at bottom-left */}
                  <path
                    d="M21 6a16 16 0 1 1 0 32 16.2 16.2 0 0 1-5.9-1.1L5 42l3.2-9.1A16 16 0 0 1 21 6z"
                    fill="#65D100"
                  />
                  {/* Inner dark target: thick ring + center dot */}
                  <circle cx="21" cy="22" r="7.2" fill="#15191C" />
                  <circle cx="21" cy="22" r="4" fill="#65D100" />
                  <circle cx="21" cy="22" r="1.8" fill="#15191C" />
                  {/* Outer satellite dot */}
                  <circle cx="41" cy="8" r="4.5" fill="#65D100" />
                </svg>
                Become a Speaker
              </a>
            </div>
          </section>
        )}

        {/* Sponsor Section — uses background2.svg which contains concentric rings,
            "Sponsored by" label, boomi wordmark, and "Powering the Data Economy" tagline.
            Crop the square SVG to a 765px-tall band per Figma spec. */}
        <section className="relative flex h-[600px] items-center justify-center overflow-hidden md:h-[765px]">
          <img
            src={asset('/img/background2.svg')}
            alt="Sponsored by Boomi — Powering the Data Economy"
            className="boomi-bg pointer-events-none absolute left-1/2 block h-auto w-full max-w-[1728px] -translate-x-1/2 select-none"
          />
        </section>

        {/* Photos Section */}
        <section id="photos" className="mx-auto max-w-[1360px] px-6 py-16 md:px-20 md:py-20">
          <div className="mb-10">
            <h2 className="m-0 font-onest text-[36px] font-bold leading-[110%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[48px]">
              Photos
            </h2>
            <p className="m-0 mt-2 font-onest text-xl font-normal leading-[120%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[32px]">
              Past events and activities
            </p>
          </div>

          {/* Photo gallery — varied widths per Figma spec (509.53, 518, 283.64, 647) × 384, 24px gap */}
          <div className="flex flex-row gap-6 overflow-x-auto pb-4">
            {photos.map((src, i) => {
              const widths = [
                'w-[300px] md:w-[509.53px]',
                'w-[300px] md:w-[518px]',
                'w-[200px] md:w-[283.64px]',
                'w-[300px] md:w-[647px]',
              ];
              return (
                <div
                  key={i}
                  className={`flex-shrink-0 ${widths[i] ?? 'w-[300px] md:w-[400px]'} h-[280px] rounded-4xl bg-brand-card-dark bg-cover bg-center md:h-[384px]`}
                  style={{ backgroundImage: `url(${src})` }}
                />
              );
            })}
          </div>

          {/* View gallery button */}
          <div className="mt-12">
            <button
              type="button"
              onClick={() => setGalleryOpen(true)}
              className="inline-flex h-[64px] w-[164px] cursor-pointer items-center justify-center whitespace-nowrap rounded-[20px] border-none bg-brand-green px-4 py-1.5 font-onest text-lg font-bold tracking-oai text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-green-light hover:shadow-[0_8px_24px_rgba(101,209,0,0.4)] active:translate-y-0 active:bg-brand-green-dark active:shadow-none disabled:pointer-events-none disabled:opacity-50"
            >
              View gallery
              <svg
                className="ml-2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="#15191C"
                strokeWidth="2"
              >
                <path d="M6 3l5 5-5 5" />
              </svg>
            </button>
          </div>
        </section>

        {/* Footer with Subscribe + Social + Bottom bar */}
        <OaiFooter />

        {galleryOpen && (
          <PhotoLightbox photos={photos} startIndex={0} onClose={() => setGalleryOpen(false)} />
        )}
      </main>
    </>
  );
}
