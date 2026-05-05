'use client';

import React, { useState } from 'react';
import EventCard from '../EventCard';
import OaiFooter from '../OaiFooter';

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

interface PastEventsListProps {
  items: EventItem[];
}

export default function PastEventsList({ items }: PastEventsListProps) {
  const [displayCount, setDisplayCount] = useState(6);

  const displayedEvents = items.slice(0, displayCount);
  const hasMore = displayCount < items.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 6);
  };

  return (
    <main className="min-h-screen bg-brand-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-12 pt-16 md:pb-20 md:pt-24">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-20">
          <div className="flex items-start gap-5">
            {/* Green vertical accent bar (hidden on mobile) */}
            <div
              className="mt-2 hidden w-[4px] flex-shrink-0 rounded-full bg-brand-green md:block"
              style={{ height: 48 }}
            />
            <div className="flex-1">
              <h1 className="m-0 font-onest text-[48px] font-bold leading-[100%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[80px]">
                Past events
              </h1>
              <p className="text-[color:var(--ifm-font-color-base)]/90 m-0 mt-6 max-w-[800px] font-onest text-xl font-normal leading-[140%] tracking-oai md:text-[28px]">
                Explore events and conferences from previous years
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid Section */}
      <section className="mx-auto mb-12 max-w-[1200px] md:px-20">
        {displayedEvents.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {displayedEvents.map((item) => (
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
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-12 flex justify-center px-6 md:px-0">
            <button
              onClick={handleLoadMore}
              className="inline-flex cursor-pointer items-center rounded-[20px] border-2 border-none border-brand-green bg-transparent px-6 py-4 font-onest text-lg font-bold tracking-oai text-brand-green no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-green hover:text-brand-bg hover:shadow-[0_8px_24px_rgba(101,209,0,0.35)] active:translate-y-0 active:border-brand-green-dark active:bg-brand-green-dark active:shadow-none disabled:pointer-events-none disabled:opacity-50"
              style={{
                background: 'transparent',
                border: '2px solid #65D100',
                color: '#65D100',
              }}
            >
              More
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
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <OaiFooter />
    </main>
  );
}
