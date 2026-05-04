'use client';

import React, { useState, useEffect } from 'react';
import EventCard from '../EventCard';
import OaiFooter from '../OaiFooter';
import PhotoLightbox from '../PhotoLightbox';
import { asset } from '@/lib/basePath';

interface Speaker {
  name: string;
  position: string;
  photo: string;
}

interface AgendaSpeaker {
  name: string;
  position?: string;
  photo?: string;
  tag?: string;
}

interface AgendaSession {
  title: string;
  speaker?: string;
  speakers?: AgendaSpeaker[];
  time?: string;
  date?: string;
  permalink?: string;
}

interface EventDetailProps {
  title: string;
  date: string;
  location: string;
  image: string;
  type: string;
  status: 'active' | 'upcoming' | 'finished';
  description?: string;
  agenda?: {
    [date: string]: {
      [category: string]: AgendaSession[];
    };
  };
  speakers?: Speaker[];
  sponsors?: { name: string; logo?: string }[];
}

export default function EventDetail({
  title,
  date,
  location,
  image,
  type,
  status,
  description,
  agenda = {},
  speakers = [],
  sponsors = [],
}: EventDetailProps) {
  const agendaDates = Object.keys(agenda);
  const [selectedDate, setSelectedDate] = useState(agendaDates[0] || '');
  const currentAgenda = agenda[selectedDate] || {};
  const agendaCategories = Object.keys(currentAgenda);
  const photos = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1600',
    'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=1600',
  ];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedSession, setSelectedSession] = useState<AgendaSession | null>(null);

  // Body scroll lock when modal is open
  useEffect(() => {
    if (selectedSession) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedSession]);

  // Get current-day sessions for timeline navigation, deduped by start time.
  const currentDaySessions = Object.values(agenda[selectedDate] || {})
    .flat()
    .filter((s) => s.time);
  const allSessions = currentDaySessions.filter(
    (s, i, arr) =>
      i === arr.findIndex((x) => (x.time?.split(/\s*[—-]\s*/)[0] || '') === (s.time?.split(/\s*[—-]\s*/)[0] || ''))
  );

  return (
    <main className="min-h-screen bg-brand-bg">
      {/* Hero Section with Event Card */}
      <section className="relative overflow-hidden pb-1 pt-16 md:pb-1.5 md:pt-24">
        <div className="mx-auto max-w-[1360px] px-6 md:px-20">
          <div className="mb-8">
            <EventCard
              title={title}
              date={date}
              location={location}
              image={image}
              type={type}
              permalink=""
              status={status}
              featured
            />
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="mx-auto mb-12 max-w-[1360px] px-6 md:px-20">
        <div className="flex h-[227px] w-full items-center justify-center rounded-[40px] bg-brand-card-dark md:h-[400px]">
          <div className="text-center">
            <span
              className="mb-4 block text-4xl"
              style={{ color: 'var(--ifm-font-color-base)', opacity: 0.2 }}
            >
              📍
            </span>
            <span
              className="font-onest text-lg font-semibold tracking-oai"
              style={{ color: 'var(--ifm-font-color-base)', opacity: 0.2 }}
            >
              Venue Map
            </span>
          </div>
        </div>
      </section>

      {/* Agenda Section */}
      {agendaCategories.length > 0 && (
        <section className="mx-auto mb-12 max-w-[1200px] px-6 md:px-20">
          <h2 className="m-0 mb-6 font-onest text-[40px] font-bold leading-[110%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[48px]">
            Agenda
          </h2>

          {/* Date Filter Buttons */}
          {agendaDates.length > 1 && (
            <div className="mb-10 inline-flex items-center rounded-[20px] bg-[rgba(21,25,28,0.08)] p-0">
              {agendaDates.map((agendaDate) => {
                const isActive = selectedDate === agendaDate;
                return (
                  <button
                    key={agendaDate}
                    onClick={() => setSelectedDate(agendaDate)}
                    className={`flex h-[32px] cursor-pointer items-center justify-center rounded-[20px] border-none px-3 py-5 font-onest text-[12px] font-semibold tracking-[-0.48px] transition-colors ${
                      isActive
                        ? 'bg-brand-green text-[#15191c]'
                        : 'bg-transparent text-[rgba(21,25,28,0.64)] hover:text-[#15191c]'
                    }`}
                  >
                    {agendaDate}
                  </button>
                );
              })}
            </div>
          )}

          <div className="space-y-12 md:space-y-20">
            {agendaCategories.map((category) => (
              <div key={category}>
                <h3 className="m-0 mb-6 font-onest text-[32px] font-bold leading-[1.1] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-3xl">
                  {category}
                </h3>
                <div className="space-y-2">
                  {currentAgenda[category].map((session, i) => {
                    const sessionSpeakers: AgendaSpeaker[] =
                      session.speakers && session.speakers.length > 0
                        ? session.speakers
                        : session.speaker
                          ? [{ name: session.speaker }]
                          : [];
                    const [startTime, endTime] = session.time
                      ? session.time.split(/\s*[—-]\s*/)
                      : ['', ''];

                    const sessionContent = (
                      <div className="flex flex-col gap-6">
                        {/* Time row */}
                        {session.time && (
                          <div className="flex max-w-[240px] items-center gap-5">
                            <div className="h-[10px] w-[5px] flex-shrink-0 rounded-[10px] bg-brand-green" />
                            <span className="font-onest text-base font-normal leading-[1.2] tracking-oai text-[#15191c]">
                              {startTime}
                            </span>
                            <div className="h-px flex-1 bg-[rgba(21,25,28,0.12)]" />
                            <span className="font-onest text-base font-normal leading-[1.2] tracking-oai text-[#15191c]">
                              {endTime}
                            </span>
                          </div>
                        )}

                        {/* Main */}
                        <div className="flex max-w-[800px] flex-col gap-6">
                          <h4 className="m-0 font-onest text-[24px] font-bold leading-[1.2] tracking-[-0.96px] text-[#15191c]">
                            {session.title}
                          </h4>

                          {sessionSpeakers.length > 0 && (
                            <div className="flex items-center gap-5">
                              <div className="h-6 w-[5px] flex-shrink-0 self-stretch rounded-[10px] bg-brand-green" />
                              <div className="flex flex-1 flex-col gap-2">
                                {sessionSpeakers.map((sp, idx) => (
                                  <div key={`${sp.name}-${idx}`} className="flex items-center gap-3">
                                    {sp.photo ? (
                                      <img
                                        src={sp.photo}
                                        alt={sp.name}
                                        className="h-16 w-16 flex-shrink-0 rounded-bl-[8px] rounded-br-[32px] rounded-tl-[8px] rounded-tr-[32px] object-cover"
                                      />
                                    ) : (
                                      <div className="h-16 w-16 flex-shrink-0 rounded-bl-[8px] rounded-br-[32px] rounded-tl-[8px] rounded-tr-[32px] bg-[#d9d9d9]" />
                                    )}
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-1">
                                        <span className="font-onest text-base font-bold leading-[1.2] tracking-oai text-[#15191c]">
                                          {sp.name}
                                        </span>
                                        {sp.tag && (
                                          <span className="inline-flex items-center rounded-bl-[10px] rounded-br-[2px] rounded-tl-[10px] rounded-tr-[2px] bg-brand-green px-1 py-[2px] font-onest text-[11px] font-bold leading-[1.2] tracking-oai text-white">
                                            {sp.tag}
                                          </span>
                                        )}
                                      </div>
                                      {sp.position && (
                                        <span className="font-onest text-base font-normal leading-[1.2] tracking-oai text-[#15191c]">
                                          {sp.position}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );

                    // Make clickable if it has a permalink (opens modal)
                    const Wrapper = session.permalink ? 'button' : 'div';
                    const wrapperProps = session.permalink
                      ? {
                          onClick: () => setSelectedSession(session),
                          className:
                            'block w-full text-left p-6 md:p-8 rounded-[40px] bg-white hover:bg-white/90 transition-colors cursor-pointer relative border-none',
                        }
                      : {
                          className:
                            'p-6 md:p-8 rounded-[40px] bg-white relative',
                        };

                    return (
                      <Wrapper key={i} {...wrapperProps}>
                        {sessionContent}
                      </Wrapper>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sponsor Section — same boomi SVG band as the events index page. */}
      {sponsors.length > 0 && (
        <section className="relative flex h-[600px] items-center justify-center overflow-hidden md:h-[765px]">
          <img
            src={asset('/img/background2.svg')}
            alt="Sponsored by Boomi — Powering the Data Economy"
            className="boomi-bg pointer-events-none absolute left-1/2 top-1/2 block h-auto w-full max-w-[1728px] -translate-x-1/2 -translate-y-[59.3%] select-none"
          />
          {/* Orange dot overlay — not affected by dark-mode invert */}
          <svg aria-hidden viewBox="0 0 1728 1728" className="pointer-events-none absolute left-1/2 top-1/2 block h-auto w-full max-w-[1728px] -translate-x-1/2 -translate-y-[59.3%] select-none">
            <circle cx="978.403" cy="1016.8" r="5.43" fill="#ff7c66" />
          </svg>
        </section>
      )}

      {/* Photos Section */}
      <section id="photos" className="relative z-10 mx-auto max-w-[1200px] px-6 py-16 md:px-20 md:py-20">
        <div className="mb-10">
          <h2 className="m-0 font-onest text-[40px] font-bold leading-[110%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[48px]">
            From Past Events
          </h2>
          <p className="m-0 mt-2 font-onest text-[24px] font-medium leading-[120%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[32px] md:font-normal">
            Highlights from events over the years
          </p>
        </div>

        <div className="flex flex-row gap-2 overflow-x-auto pb-4 md:gap-6">
          {photos.map((src, i) => {
            const widths = [
              'w-[345px] md:w-[400px]',
              'w-[345px] md:w-[400px]',
              'w-[192px] md:w-[400px]',
              'w-[438px] md:w-[400px]',
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
                className={`flex-shrink-0 ${widths[i] ?? 'w-[280px] md:w-[400px]'} ${rounded[i] ?? 'rounded-[40px]'} h-[260px] bg-brand-card-dark bg-cover bg-center md:h-[384px]`}
                style={{ backgroundImage: `url(${src})` }}
              />
            );
          })}
        </div>

        <div className="mt-12">
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
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

      {/* Footer */}
      <OaiFooter />

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* Talk Detail Modal — matches Figma desktop "Description Layer" (568:23259) */}
      {selectedSession &&
        (() => {
          const [startTime, endTime] = selectedSession.time
            ? selectedSession.time.split(/\s*[—-]\s*/)
            : ['', ''];
          const sessionSpeakers =
            selectedSession.speakers && selectedSession.speakers.length > 0
              ? selectedSession.speakers
              : selectedSession.speaker
                ? [{ name: selectedSession.speaker }]
                : [];

          return (
            <div
              className="fixed inset-0 z-50 flex flex-col items-center overflow-y-auto bg-[rgba(0,0,0,0.12)] px-4 py-6 md:px-12 md:py-6"
              onClick={() => setSelectedSession(null)}
            >
              {/* Close button — Figma 568:23271: 64×64, p-[20px], gap-[10px], rounded-[20px], bg transparent, top:24 right:24 */}
              <button
                onClick={() => setSelectedSession(null)}
                className="absolute right-6 top-6 z-10 flex h-16 w-16 cursor-pointer items-center justify-center gap-2.5 rounded-[20px] border-none bg-transparent p-5 text-[#15191c] transition-colors hover:bg-black/5"
                aria-label="Close"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="flex-shrink-0"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="my-auto flex w-full max-w-[1360px] flex-col items-center gap-3">
                {/* White content card */}
                <div
                  className="w-full rounded-[40px] bg-white px-6 py-8 md:px-20 md:py-12"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex max-w-[800px] flex-col gap-6">
                    {/* Top group: time row + title */}
                    <div className="flex flex-col gap-8 md:gap-12">
                      {selectedSession.time && (
                        <div className="flex max-w-[240px] items-center gap-6 py-2">
                          <div className="h-[10px] w-[5px] flex-shrink-0 rounded-[10px] bg-brand-green" />
                          <span className="font-onest text-base font-normal leading-[1.2] tracking-oai text-[#15191c] md:text-lg">
                            {startTime}
                          </span>
                          <div className="h-px flex-1 bg-[rgba(21,25,28,0.12)]" />
                          <span className="font-onest text-base font-normal leading-[1.2] tracking-oai text-[#15191c] md:text-lg">
                            {endTime}
                          </span>
                        </div>
                      )}

                      <h2 className="m-0 font-onest text-[32px] font-bold leading-[1.1] tracking-oai text-[#15191c] md:text-[48px] md:tracking-[-1.92px]">
                        {selectedSession.title}
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="m-0 font-onest text-base font-normal leading-[1.4] tracking-oai text-[#15191c] md:text-lg">
                      Join us for this session at {title}.
                    </p>

                    {/* Speakers section */}
                    {sessionSpeakers.length > 0 && (
                      <div className="pt-8 md:pt-12">
                        <div className="flex items-center gap-[27px]">
                          <div className="h-6 w-[5px] flex-shrink-0 self-stretch rounded-[10px] bg-brand-green" />
                          <div className="flex flex-1 flex-col gap-4">
                            {sessionSpeakers.map((sp, idx) => (
                              <div
                                key={`${sp.name}-${idx}`}
                                className="flex items-center gap-6"
                              >
                                <div className="flex flex-1 items-center gap-3">
                                  {sp.photo ? (
                                    <img
                                      src={sp.photo}
                                      alt={sp.name}
                                      className="h-16 w-16 flex-shrink-0 rounded-bl-[8px] rounded-br-[32px] rounded-tl-[8px] rounded-tr-[32px] object-cover"
                                    />
                                  ) : (
                                    <div className="h-16 w-16 flex-shrink-0 rounded-bl-[8px] rounded-br-[32px] rounded-tl-[8px] rounded-tr-[32px] bg-[#d9d9d9]" />
                                  )}
                                  <div className="flex min-w-0 flex-col gap-1">
                                    <span className="font-onest text-base font-bold leading-[1.2] tracking-oai text-[#15191c]">
                                      {sp.name}
                                    </span>
                                    {sp.position && (
                                      <span className="font-onest text-base font-normal leading-[1.2] tracking-oai text-[#15191c]">
                                        {sp.position}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <a
                                  href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(sp.name)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center text-[#15191c] transition-colors hover:text-brand-green"
                                  aria-label={`LinkedIn — ${sp.name}`}
                                >
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 0 1 2.063-2.065 2.062 2.062 0 0 1 2.062 2.065 2.062 2.062 0 0 1-2.062 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                                  </svg>
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* View slides button */}
                    <div className="pt-3">
                      <button
                        type="button"
                        className="inline-flex h-[56px] w-full cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-[20px] border-none bg-brand-green px-6 py-1.5 font-onest text-base font-bold tracking-oai text-[#15191c] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-green-light hover:shadow-[0_8px_24px_rgba(101,209,0,0.4)] active:translate-y-0 active:bg-brand-green-dark active:shadow-none disabled:pointer-events-none disabled:opacity-50 md:h-[64px] md:w-auto md:px-6 md:text-lg"
                      >
                        View slides
                      </button>
                    </div>
                  </div>
                </div>

                {/* Timeline pills below the card */}
                {allSessions.length > 0 && selectedSession.time && (
                  <div
                    className="flex w-full items-center justify-center overflow-x-auto pt-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="inline-flex items-center rounded-[20px] bg-[rgba(21,25,28,0.08)]">
                      {allSessions.map((session) => {
                        const sessionTime = session.time?.split(/\s*[—-]\s*/)[0] || '';
                        const isActive =
                          sessionTime === selectedSession.time?.split(/\s*[—-]\s*/)[0];
                        return (
                          <button
                            key={`${session.time}-${session.title}`}
                            onClick={() => setSelectedSession(session)}
                            className={`flex h-10 flex-shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[20px] border-none px-5 py-2 font-onest text-base font-semibold tracking-oai transition-colors ${
                              isActive
                                ? 'bg-brand-green text-[#15191c]'
                                : 'bg-transparent text-[rgba(21,25,28,0.64)] hover:text-[#15191c]'
                            }`}
                          >
                            {sessionTime}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })()}
    </main>
  );
}
