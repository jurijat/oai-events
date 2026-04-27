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

  // Get all session times for timeline navigation
  const allSessions = Object.values(agenda)
    .flatMap((category) => Object.values(category).flat())
    .filter((s) => s.time);

  return (
    <main className="min-h-screen bg-brand-bg">
      {/* Hero Section with Event Card */}
      <section className="relative overflow-hidden pb-12 pt-16 md:pb-20 md:pt-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
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
      <section className="mx-auto mb-12 max-w-[1200px] px-6 md:px-20">
        <div className="flex h-[300px] w-full items-center justify-center rounded-4xl border border-white/10 bg-brand-card-dark md:h-[400px]">
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
          <h2 className="m-0 mb-6 font-onest text-[36px] font-bold leading-[110%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[48px]">
            Agenda
          </h2>

          {/* Date Filter Buttons */}
          {agendaDates.length > 1 && (
            <div className="mb-10 inline-flex items-center rounded-full bg-brand-card-dark p-0">
              {agendaDates.map((agendaDate) => {
                const isActive = selectedDate === agendaDate;
                return (
                  <button
                    key={agendaDate}
                    onClick={() => setSelectedDate(agendaDate)}
                    className={`cursor-pointer rounded-full border-none px-6 py-2 font-onest text-sm font-semibold tracking-oai transition-colors ${
                      isActive
                        ? 'bg-brand-green text-brand-bg'
                        : 'text-[color:var(--ifm-font-color-base)]/80 bg-transparent hover:text-[color:var(--ifm-font-color-base)]'
                    }`}
                  >
                    {agendaDate}
                  </button>
                );
              })}
            </div>
          )}

          <div className="space-y-10">
            {agendaCategories.map((category) => (
              <div key={category}>
                <h3 className="m-0 mb-6 font-onest text-2xl font-bold tracking-oai text-[color:var(--ifm-font-color-base)] md:text-3xl">
                  {category}
                </h3>
                <div className="space-y-4">
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
                      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        {/* Green accent bar */}
                        <div className="absolute -left-6 bottom-0 top-0 w-1 rounded-r-full bg-brand-green md:-left-8" />

                        <div className="min-w-0 flex-1">
                          <h4 className="m-0 mb-4 font-onest text-lg font-semibold leading-snug tracking-oai text-[color:var(--ifm-font-color-base)] md:text-xl">
                            {session.title}
                          </h4>
                          {sessionSpeakers.length > 0 && (
                            <div className="flex flex-wrap gap-x-8 gap-y-3">
                              {sessionSpeakers.map((sp, idx) => (
                                <div key={`${sp.name}-${idx}`} className="flex items-center gap-3">
                                  {sp.photo ? (
                                    <img
                                      src={sp.photo}
                                      alt={sp.name}
                                      className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-white/10" />
                                  )}
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="font-onest text-sm font-semibold tracking-oai text-[color:var(--ifm-font-color-base)]">
                                        {sp.name}
                                      </span>
                                      {sp.tag && (
                                        <span className="inline-flex items-center rounded-md bg-brand-green px-1.5 py-[2px] font-onest text-[10px] font-bold tracking-oai text-brand-bg">
                                          {sp.tag}
                                        </span>
                                      )}
                                    </div>
                                    {sp.position && (
                                      <span className="text-[color:var(--ifm-font-color-base)]/60 font-onest text-xs font-normal tracking-oai">
                                        {sp.position}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {session.time && (
                          <div className="text-[color:var(--ifm-font-color-base)]/80 flex flex-shrink-0 items-center gap-3 font-onest text-sm font-normal tracking-oai">
                            <svg
                              width="10"
                              height="12"
                              viewBox="0 0 10 12"
                              fill="#65D100"
                              aria-hidden
                            >
                              <path d="M1 1l7 5-7 5V1z" />
                            </svg>
                            <span>{startTime}</span>
                            <div className="w-16 border-t border-dashed border-white/25 md:w-20" />
                            <span>{endTime}</span>
                          </div>
                        )}
                      </div>
                    );

                    // Make clickable if it has a permalink (opens modal)
                    const Wrapper = session.permalink ? 'button' : 'div';
                    const wrapperProps = session.permalink
                      ? {
                          onClick: () => setSelectedSession(session),
                          className:
                            'block p-6 md:p-8 rounded-2xl bg-brand-card-dark hover:bg-brand-card-dark/80 transition-colors cursor-pointer relative overflow-hidden w-full text-left border-none',
                        }
                      : {
                          className:
                            'p-6 md:p-8 rounded-2xl bg-brand-card-dark relative overflow-hidden',
                        };

                    return (
                      <Wrapper key={i} {...wrapperProps}>
                        {sessionContent}
                      </Wrapper>
                    );

                    return (
                      <div
                        key={i}
                        className="relative overflow-hidden rounded-2xl bg-brand-card-dark p-6 md:p-8"
                      >
                        {sessionContent}
                      </div>
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
            className="boomi-bg pointer-events-none absolute left-1/2 block h-auto w-full max-w-[1728px] -translate-x-1/2 select-none"
          />
        </section>
      )}

      {/* Photos Section */}
      <section id="photos" className="mx-auto max-w-[1200px] px-6 py-16 md:px-20 md:py-20">
        <div className="mb-10">
          <h2 className="m-0 font-onest text-[36px] font-bold leading-[110%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[48px]">
            From Past Events
          </h2>
          <p className="m-0 mt-2 font-onest text-xl font-normal leading-[120%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[32px]">
            Highlights from events over the years
          </p>
        </div>

        <div className="flex flex-row gap-6 overflow-x-auto pb-4">
          {photos.map((src, i) => (
            <div
              key={i}
              className="h-[280px] w-[280px] flex-shrink-0 rounded-4xl bg-brand-card-dark bg-cover bg-center md:h-[384px] md:w-[400px]"
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>

        <div className="mt-12">
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            className="inline-flex cursor-pointer items-center rounded-[20px] border-none bg-brand-green px-6 py-4 font-onest text-lg font-bold tracking-oai text-brand-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-green-light hover:shadow-[0_8px_24px_rgba(101,209,0,0.4)] active:translate-y-0 active:bg-brand-green-dark active:shadow-none disabled:pointer-events-none disabled:opacity-50"
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

      {/* Footer */}
      <OaiFooter />

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* Talk Detail Modal */}
      {selectedSession && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedSession(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-4xl bg-brand-bg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedSession(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Modal content */}
            <div className="p-8 md:p-12">
              <div className="flex-1">
                {/* Timeline-style time indicator */}
                {selectedSession.time && (
                  <div className="mb-6 flex items-center gap-3">
                    {/* Green vertical line */}
                    <div className="h-8 w-[3px] flex-shrink-0 rounded-full bg-brand-green" />
                    {/* Gray connecting line */}
                    <div className="h-px w-16 bg-white/20" />
                    {/* Time as plain text */}
                    <span className="whitespace-nowrap font-onest text-sm font-semibold tracking-oai text-[color:var(--ifm-font-color-base)]">
                      {selectedSession.time}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h2 className="m-0 mb-6 font-onest text-[28px] font-bold leading-[110%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[40px]">
                  {selectedSession.title}
                </h2>

                {/* Description - using a placeholder since sessions don't have descriptions in agenda */}
                <p className="text-[color:var(--ifm-font-color-base)]/70 m-0 mb-8 font-onest text-base font-normal tracking-oai md:text-lg">
                  Join us for this session at {title}.
                </p>

                {/* Speakers and LinkedIn button */}
                <div className="mb-6 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                  {/* Speakers row */}
                  {(() => {
                    const sessionSpeakers =
                      selectedSession.speakers && selectedSession.speakers.length > 0
                        ? selectedSession.speakers
                        : selectedSession.speaker
                          ? [{ name: selectedSession.speaker }]
                          : [];
                    return sessionSpeakers.length > 0 ? (
                      <div className="flex flex-wrap gap-x-8 gap-y-4">
                        {sessionSpeakers.map((speaker, idx) => (
                          <div key={`${speaker.name}-${idx}`} className="flex items-center gap-3">
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
                    ) : null;
                  })()}

                  {/* LinkedIn button */}
                  {selectedSession.speakers && selectedSession.speakers.length > 0 && (
                    <a
                      href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(selectedSession.speakers![0].name)}`}
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
                <button className="w-fit cursor-pointer rounded-[20px] border-none bg-brand-green px-6 py-3 font-onest text-sm font-semibold tracking-oai text-brand-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-green-light hover:shadow-[0_8px_24px_rgba(101,209,0,0.4)] active:translate-y-0 active:bg-brand-green-dark active:shadow-none disabled:pointer-events-none disabled:opacity-50">
                  View slides
                </button>
              </div>

              {/* Timeline Navigation at bottom */}
              {allSessions.length > 0 && selectedSession.time && (
                <div className="flex flex-row items-center gap-3 border-t border-white/10 px-6 py-2">
                  {allSessions.map((session) => {
                    const sessionTime = session.time?.split(/\s*[—-]\s*/)[0] || '';
                    const isActive = sessionTime === selectedSession.time?.split(/\s*[—-]\s*/)[0];
                    return (
                      <button
                        key={`${session.time}-${session.title}`}
                        onClick={() => setSelectedSession(session)}
                        className={`flex-shrink-0 cursor-pointer whitespace-nowrap rounded-full border-none px-4 py-2 font-onest text-sm font-semibold tracking-oai transition-colors ${
                          isActive
                            ? 'bg-brand-green text-brand-bg'
                            : 'bg-white/10 text-[color:var(--ifm-font-color-base)] hover:bg-white/20'
                        }`}
                      >
                        {sessionTime}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
