'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

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
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!target) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!target) return null;
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
  const cardHeight = featured ? 'h-[402px] md:h-[765px]' : 'h-[340px] md:h-[375px]';
  const greenWidth = featured ? '80%' : '80%';
  const greenRadius = featured ? '0 400px 400px 0' : '0 200px 200px 0';
  const greenPadding = featured ? 'p-5 md:py-16 md:pl-16 md:pr-32' : 'p-6 md:py-6 md:pl-6 md:pr-16';
  const titleSize = featured
    ? 'text-[40px] leading-[100%] md:text-[80px] md:leading-[96%]'
    : 'text-[28px] md:text-[36px] md:leading-[120%]';
  const dateSize = featured ? 'text-lg md:text-[32px]' : 'text-base md:text-lg';
  const locationSize = featured ? 'text-lg md:text-[32px]' : 'text-base md:text-lg';
  const typeSize = featured ? 'text-base md:text-lg' : 'text-base md:text-lg';

  const card = (
    <div
      className={`relative w-full ${cardHeight} group overflow-hidden rounded-4xl bg-brand-card-dark`}
    >
      {/* Full-width background image */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      {/* Green info block — sits on top of image */}
      <div
        className={`relative z-10 flex flex-col items-start ${greenPadding} h-full min-w-80 max-w-[506px] justify-between gap-3 bg-brand-green md:max-w-max md:gap-6 lg:min-w-[860px]`}
        style={{ width: greenWidth, borderRadius: greenRadius }}
      >
        <div className="flex flex-1 flex-col items-start gap-2 md:gap-3">
          {/* Type badge */}
          <div className="flex flex-row items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="flex-shrink-0 text-black"
            >
              <path d="M10 0l2.39 7.36H20l-6.18 4.49L16.18 19 10 14.51 3.82 19l2.36-7.15L0 7.36h7.61L10 0z" />
            </svg>
            <span
              className={`font-onest font-semibold ${typeSize} leading-[120%] tracking-oai text-black`}
            >
              {type}
            </span>
          </div>

          {/* Title */}
          <h3 className={`font-onest font-bold ${titleSize} m-0 tracking-oai text-black`}>
            {title}
          </h3>
        </div>

        {/* Date + Location */}
        <div className="flex flex-col gap-1">
          <span
            className={`font-onest font-bold ${dateSize} leading-[120%] tracking-oai text-black`}
          >
            {date}
          </span>
          <span
            className={`font-onest font-normal ${locationSize} leading-[120%] tracking-oai text-black`}
          >
            {location}
          </span>
        </div>

        {/* Get a free ticket (featured) or Free entry tag */}
        {featured ? (
          <div className="flex w-full flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-12">
            <button className="inline-flex cursor-pointer items-center justify-center self-start rounded-3xl border-none bg-black px-10 py-5 font-onest text-lg font-bold tracking-oai text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/80 hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)] active:translate-y-0 active:bg-black active:shadow-none disabled:pointer-events-none disabled:opacity-50 md:px-12 md:py-6 md:text-2xl">
              Get a free ticket
            </button>
            {countdown && (
              <div className="flex w-full flex-row gap-3 font-mono font-bold tabular-nums tracking-oai text-white md:w-auto md:gap-3">
                <span className="pr-10 text-[16px] leading-none md:text-[32px]">
                  {countdown.d}
                  <span className="ml-0.5 align-super text-sm">d</span>
                </span>
                <div className="flex flex-row items-end gap-2 md:gap-3">
                  <span className="text-[16px] leading-none md:text-[32px]">
                    {pad(countdown.h)}
                  </span>
                  <span className="text-[16px] leading-none opacity-60 md:text-[32px]">:</span>
                  <span className="text-[16px] leading-none md:text-[32px]">
                    {pad(countdown.m)}
                  </span>
                  <span className="text-[16px] leading-none opacity-60 md:text-[32px]">:</span>
                  <span className="text-[16px] leading-none md:text-[32px]">
                    {pad(countdown.s)}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="inline-flex items-center justify-center rounded-[12px] border border-white px-3 py-1.5 text-white">
            <span className="font-onest text-lg font-bold leading-[120%] tracking-oai">
              Free entry
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (permalink) {
    return (
      <Link href={permalink} className="block no-underline hover:no-underline">
        {card}
      </Link>
    );
  }

  return card;
}
