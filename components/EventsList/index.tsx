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
          <div className="relative z-10 mx-auto max-w-[1360px] pl-2 pr-6 md:px-20">
            {/* Frame 2147256185 — flex row, items-center, gap 75px, frame height 180px */}
            <div className="flex flex-row items-center gap-3 md:h-[180px] md:gap-[75px]">
              {/* Green vertical accent bar with entrance animation */}
              <div
                className="animate-slide-down block h-[80px] w-[4px] flex-shrink-0 rounded-[10px] bg-brand-green md:w-[5px]"
              />
              <div className="flex-1">
                {/* Heading with entrance animation */}
                <h1 className="animate-fade-in-up m-0 font-onest text-[40px] font-bold leading-[120%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[80px] md:leading-[96px]">
                  OpenAPI events
                </h1>
                {/* Subtitle with staggered entrance animation */}
                <p className="animate-fade-in-up animation-delay-200 m-0 mt-2 max-w-[1200px] font-onest text-[24px] font-medium leading-[120%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[32px] md:font-normal">
                  Join the OpenAPI Conference, where we bring the latest OpenAPI innovations to
                  audiences around the world
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Section */}
        <section className="relative z-10 mx-auto mb-12 max-w-[1360px]">
          <h2 className="m-0 mb-10 px-6 font-onest text-[32px] font-bold leading-[110%] tracking-oai text-[color:var(--ifm-font-color-base)] md:px-20 md:text-[48px]">
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
              <div className="flex h-[340px] flex-col items-center justify-center rounded-[20px] bg-[rgba(21,25,28,0.08)] md:h-[375px]">
                <span
                  className="mb-2 text-2xl"
                  style={{ color: '#15191c', opacity: 0.08 }}
                >
                  &#x2726;
                </span>
                <span
                  className="text-center font-onest text-[36px] font-bold tracking-oai"
                  style={{ color: '#15191c', opacity: 0.08 }}
                >
                  New events soon
                </span>
              </div>
            </div>
          )}

          {/* Past events button — sits below the events grid, left-aligned with content */}
          <div className="mt-10 px-6 md:px-20">
            <Link
              href="/past-events"
              className="inline-flex h-[56px] w-full items-center justify-between gap-2.5 whitespace-nowrap rounded-[20px] bg-brand-green px-6 py-1.5 font-onest text-base font-bold tracking-oai text-[#15191c] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-green/90 hover:shadow-[0_8px_24px_rgba(101,209,0,0.4)] active:translate-y-0 active:shadow-none md:h-[64px] md:w-[159px] md:justify-center"
            >
              Past events
              <svg
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
              <h2 className="m-0 font-onest text-[40px] font-bold leading-[110%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[48px]">
                Featured Speakers
              </h2>
              <p className="m-0 mt-2 font-onest text-[24px] font-medium leading-[120%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[32px] md:font-normal">
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
            <div className="mb-10 grid grid-cols-1 gap-2.5 px-6 md:hidden">
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
                aria-label="Become a Speaker"
                className="inline-flex h-[64px] items-center gap-[10px] rounded-[20px] bg-transparent pl-[20px] pr-[24px] py-[24px] no-underline transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32" className="flex-shrink-0">
                  <path fill="#65d100" d="m16 5 5 1 1 3-3 3-3-1a5 5 0 1 0 4 2l3-3 3 1 1 5a11 11 0 0 1-17 9l-5 2 2-5-2-6Q6 6 16 5"/>
                  <circle cx="16" cy="16" r="3" fill="#65d100"/>
                  <circle cx="26" cy="6" r="3" fill="#65d100"/>
                </svg>
                <span className="font-onest text-[18px] font-semibold leading-[1.2] tracking-oai text-[#65d100]">
                  Become a Speaker
                </span>
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
            <h2 className="m-0 font-onest text-[40px] font-bold leading-[110%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[48px]">
              Photos
            </h2>
            <p className="m-0 mt-2 font-onest text-[24px] font-medium leading-[120%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[32px] md:font-normal">
              Past events and activities
            </p>
          </div>

          {/* Photo gallery — mobile: 345/351/192/438 × 260, 8px gap, varied rounding;
              desktop: 509.53/518/283.64/647 × 384, 24px gap */}
          <div className="flex flex-row gap-2 overflow-x-auto pb-4 md:gap-6">
            {photos.map((src, i) => {
              const widths = [
                'w-[345px] md:w-[509.53px]',
                'w-[345px] md:w-[518px]',
                'w-[192px] md:w-[283.64px]',
                'w-[438px] md:w-[647px]',
              ];
              const rounded = [
                'rounded-[40px]',
                'rounded-[40px]',
                'rounded-[20px] md:rounded-[40px]',
                'rounded-[20px] md:rounded-[40px]',
              ];
              return (
                <div
                  key={i}
                  className={`flex-shrink-0 ${widths[i] ?? 'w-[300px] md:w-[400px]'} ${rounded[i] ?? 'rounded-[40px]'} h-[260px] bg-brand-card-dark bg-cover bg-center md:h-[384px]`}
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
              className="inline-flex h-[56px] w-full cursor-pointer items-center justify-between gap-2.5 whitespace-nowrap rounded-[20px] border-none bg-brand-green px-6 py-1.5 font-onest text-base font-bold tracking-oai text-[#15191c] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-green-light hover:shadow-[0_8px_24px_rgba(101,209,0,0.4)] active:translate-y-0 active:bg-brand-green-dark active:shadow-none disabled:pointer-events-none disabled:opacity-50 md:h-[64px] md:w-[164px] md:justify-center md:text-lg"
            >
              View gallery
              <svg
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
