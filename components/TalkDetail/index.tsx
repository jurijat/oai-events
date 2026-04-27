import React from 'react';
import Link from 'next/link';
import OaiFooter from '../OaiFooter';

interface Speaker {
  name: string;
  position: string;
  photo: string;
}

interface ScheduleSlot {
  time: string;
  title: string;
  permalink: string;
}

interface TalkDetailProps {
  title: string;
  description: string;
  time?: string;
  category?: string;
  speakers?: Speaker[];
  eventTitle?: string;
  eventDate?: string;
  schedule?: ScheduleSlot[];
}

export default function TalkDetail({
  title,
  description,
  time,
  category,
  speakers = [],
  eventTitle,
  eventDate,
  schedule = [],
}: TalkDetailProps) {
  // Extract start time from time string (e.g., "09:00 — 09:45" -> "09:00")
  const startTime = time?.split(' ')[0] || '';
  return (
    <main className="min-h-screen bg-brand-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-12 pt-16 md:pb-20 md:pt-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <div className="flex items-start gap-5">
            {/* Green vertical accent bar */}
            <div
              className="mt-2 hidden w-[4px] flex-shrink-0 rounded-full bg-brand-green md:block"
              style={{ height: 48 }}
            />

            <div className="flex-1">
              {/* Time tag with full range */}
              {time && (
                <div className="mb-6">
                  <span className="inline-flex items-center rounded-[12px] bg-brand-green px-4 py-1.5 font-onest text-xs font-semibold tracking-oai text-brand-bg">
                    {time}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="m-0 mb-6 font-onest text-[32px] font-bold leading-[120%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[48px]">
                {title}
              </h1>

              {/* Description */}
              {description && (
                <p className="text-[color:var(--ifm-font-color-base)]/70 m-0 mb-8 max-w-[800px] font-onest text-base font-normal tracking-oai md:text-lg">
                  {description}
                </p>
              )}

              {/* Speakers row and View Slides button */}
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                {/* Speakers row */}
                {speakers.length > 0 && (
                  <div className="flex flex-wrap gap-x-8 gap-y-4">
                    {speakers.map((speaker) => (
                      <div key={speaker.name} className="flex items-center gap-3">
                        {speaker.photo ? (
                          <img
                            src={speaker.photo}
                            alt={speaker.name}
                            className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-white/10" />
                        )}
                        <div>
                          <p className="m-0 font-onest text-sm font-semibold tracking-oai text-[color:var(--ifm-font-color-base)]">
                            {speaker.name}
                          </p>
                          {speaker.position && (
                            <p className="text-[color:var(--ifm-font-color-base)]/60 m-0 font-onest text-xs font-normal tracking-oai">
                              {speaker.position}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* LinkedIn/social button */}
                {speakers.length > 0 && (
                  <a
                    href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(speakers[0].name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[color:var(--ifm-font-color-base)]/60 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-brand-green hover:text-brand-green"
                    aria-label="LinkedIn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 0 1 2.063-2.065 2.062 2.062 0 0 1 2.062 2.065 2.062 2.062 0 0 1-2.062 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                    </svg>
                  </a>
                )}
              </div>

              {/* View Slides Button */}
              <button className="mt-6 w-fit cursor-pointer rounded-[20px] border-none bg-brand-green px-6 py-3 font-onest text-sm font-semibold tracking-oai text-brand-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-green-light hover:shadow-[0_8px_24px_rgba(101,209,0,0.4)] active:translate-y-0 active:bg-brand-green-dark active:shadow-none disabled:pointer-events-none disabled:opacity-50">
                View slides
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline/Schedule Navigation */}
      {schedule.length > 0 && (
        <section className="w-full overflow-x-auto bg-brand-card-dark px-6 py-4">
          <div className="mx-auto flex min-w-max max-w-[1200px] items-center justify-start gap-2 px-6 md:px-20">
            {schedule.map((slot) => {
              const isCurrentTalk = slot.time === startTime;
              return (
                <Link
                  key={`${slot.time}-${slot.permalink}`}
                  href={slot.permalink}
                  className={`flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 font-onest text-sm font-semibold tracking-oai no-underline transition-colors ${
                    isCurrentTalk
                      ? 'bg-brand-green text-brand-bg'
                      : 'bg-white/10 text-[color:var(--ifm-font-color-base)] hover:bg-white/20'
                  }`}
                >
                  {slot.time}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Footer */}
      <OaiFooter />
    </main>
  );
}
