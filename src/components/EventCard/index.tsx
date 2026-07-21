'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { asset } from '@/lib/basePath';

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  image?: string;
  type?: string;
  permalink?: string;
  status?: 'active' | 'upcoming' | 'finished';
  featured?: boolean;
  startDate?: string;
}

function useCountdown(target?: string) {
  const [now, setNow] = useState(0);
  useEffect(() => {
    if (!target) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!target || now === 0) return null;
  const t = new Date(target).getTime();
  const diff = Math.max(0, t - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

export default function EventCard({
  title,
  date,
  location,
  image,
  type = 'Conference',
  permalink,
  status = 'upcoming',
  featured = false,
  startDate,
}: EventCardProps) {
  const countdown = useCountdown(featured ? (startDate ?? '2026-05-19T09:00:00') : undefined);
  const pad = (n: number) => String(n).padStart(2, '0');
  const finished = status === 'finished';
  const cardHeight = featured ? 'h-[402px] md:h-[600px]' : 'h-[402px] md:h-[375px]';
  // Content box ≈ 3/4 of the card (min 380px), image ≈ 1/4. This width is fixed:
  // the hover animation lives on the block shape below, so the text never reflows.
  const greenWidth = 'w-full md:w-3/4 md:min-w-[380px]';
  // Past/finished events use a muted gray block instead of brand green.
  const blockColor = finished ? 'bg-[#c4c8cc]' : 'bg-brand-green';
  const greenRadius = featured
    ? 'rounded-r-[200px] md:rounded-tr-[400px] md:rounded-br-[400px]'
    : 'rounded-r-[200px]';
  const greenPadding = featured
    ? 'pl-6 pr-12 py-6 md:py-20 md:pl-20 md:pr-8'
    : 'pl-6 pr-12 py-6 md:py-6 md:pl-6 md:pr-16';
  const titleSize = featured
    ? 'text-[32px] leading-[120%] md:text-[64px] md:leading-[100%]'
    : 'text-[32px] leading-[120%] md:text-[36px] md:leading-[120%]';
  const dateSize = featured ? 'text-base md:text-[32px]' : 'text-base md:text-lg';
  const locationSize = featured ? 'text-base md:text-[32px]' : 'text-base md:text-lg';
  const typeSize = featured ? 'text-base md:text-lg' : 'text-base md:text-lg';

  const typeBadge = (
    <div className="flex flex-row items-center gap-2">
      {/* Type/category tag icon (replaces the old sparkle "AI"-looking star) */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        className="mt-px flex-shrink-0 text-black"
      >
        <path d="M20.59 13.41 11 3.82A2 2 0 0 0 9.59 3.24H4a1 1 0 0 0-1 1v5.59a2 2 0 0 0 .59 1.41l9.59 9.59a2 2 0 0 0 2.82 0l4.59-4.59a2 2 0 0 0 0-2.83Z" />
        <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
      <span
        className={`font-onest font-semibold ${typeSize} leading-[120%] tracking-oai text-black`}
      >
        {type}
      </span>
    </div>
  );

  const titleH3 = (
    <h3 className={`font-onest font-bold ${titleSize} m-0 tracking-oai text-black`}>{title}</h3>
  );

  const dateLocation = (
    <div className="flex flex-col gap-1">
      <span className={`font-onest font-bold ${dateSize} leading-[120%] tracking-oai text-black`}>
        {date}
      </span>
      <span
        className={`font-onest font-normal ${locationSize} leading-[120%] tracking-oai text-black`}
      >
        {location}
      </span>
    </div>
  );

  const card = (
    <div
      className={`relative w-full ${cardHeight} group tile-press overflow-hidden rounded-4xl bg-brand-card-dark`}
    >
      {/* Full-width background image */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${asset(image)})` }}
        />
      )}

      {/* Green info block — sits on top of image */}
      <div
        className={`relative z-10 flex h-full flex-col items-start overflow-hidden ${greenPadding} ${greenWidth} justify-between gap-3 md:gap-6`}
      >
        {/* The block shape, animated independently of the content box. It rests
            20px short of the 3/4 mark and grows out to the full 3/4 on hover.
            Keeping it separate is what stops the text re-wrapping mid-animation. */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 left-0 right-0 -z-10 ${greenRadius} ${blockColor} transition-[right] duration-300 ease-out md:right-5 md:group-hover:right-0`}
        />

        {featured ? (
          /* Featured: date + location sit directly beneath the title with a
             24px gap; the button drops to the bottom via justify-between. */
          <div className="flex flex-1 flex-col items-start">
            <div className="flex flex-col items-start gap-2 md:gap-3">
              {typeBadge}
              {titleH3}
            </div>
            <div className="mt-6">{dateLocation}</div>
          </div>
        ) : (
          <>
            <div className="flex flex-1 flex-col items-start gap-2 md:gap-3">
              {typeBadge}
              {titleH3}
            </div>
            {dateLocation}
          </>
        )}

        {/* Get a free ticket (featured) or Free entry tag */}
        {featured ? (
          <div className="flex w-full flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-8">
            <button className="inline-flex h-[56px] cursor-pointer items-center justify-center self-start rounded-[20px] border-none bg-[#15191c] px-6 py-1.5 font-onest text-base font-bold leading-[110%] tracking-oai text-white transition-colors duration-200 hover:bg-[#15191c]/85 active:bg-[#15191c]/95 disabled:pointer-events-none disabled:opacity-50 md:h-[80px] md:px-8 md:py-6 md:text-2xl md:leading-[110%]">
              Get a free ticket
            </button>
            {countdown && (
              <div className="flex flex-row items-end gap-2 font-onest font-bold tabular-nums tracking-oai text-black [[data-theme=dark]_&]:text-white">
                <span className="mr-4 text-[20px] leading-none md:text-[28px]">
                  {countdown.d}
                  <span className="ml-0.5 align-super text-xs">d</span>
                </span>
                <span className="text-[20px] leading-none md:text-[28px]">{pad(countdown.h)}</span>
                <span className="text-[20px] leading-none opacity-60 md:text-[28px]">:</span>
                <span className="text-[20px] leading-none md:text-[28px]">{pad(countdown.m)}</span>
                <span className="text-[20px] leading-none opacity-60 md:text-[28px]">:</span>
                <span className="text-[20px] leading-none md:text-[28px]">{pad(countdown.s)}</span>
              </div>
            )}
          </div>
        ) : finished ? null : (
          <div className="inline-flex items-center justify-center rounded-[12px] border border-white px-3 py-1.5 text-white">
            <span className="font-onest text-lg font-bold leading-[120%] tracking-oai">
              Free entry
            </span>
          </div>
        )}
      </div>

      {/* Tap feedback: 12% black over the whole card while pressed. Driven by
          the link's active state (group/press) so a tap anywhere on the card
          darkens it, including the image quarter. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 bg-black opacity-0 transition-opacity duration-100 group-active/press:opacity-[0.12]"
      />
    </div>
  );

  if (permalink) {
    return (
      <Link href={permalink} className="group/press block no-underline hover:no-underline">
        {card}
      </Link>
    );
  }

  return card;
}
