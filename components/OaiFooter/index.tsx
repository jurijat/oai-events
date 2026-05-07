'use client';

import React, { useState } from 'react';
import { asset } from '@/lib/basePath';

export default function OaiFooter() {
  const [email, setEmail] = useState('');

  const openSubscribe = () => {
    // Append the typed email as a query param so openapis.org can pick it up
    // if their form reads it. The hash keeps the user scrolled to the footer
    // form on arrival.
    const url = email
      ? `https://www.openapis.org/?email=${encodeURIComponent(email)}#footer-outer`
      : 'https://www.openapis.org/#footer-outer';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="px-6 pb-0" style={{ backgroundColor: 'var(--brand-footer-bg)' }}>
      {/* Subscribe Section */}
      <section className="mx-auto max-w-[1200px] py-16 md:px-20 md:py-20">
        <div className="flex items-start">
          <div className="flex-1">
            {/* Email icon */}
            <div className="mb-8 h-16 w-16">
              <img
                src={asset('/img/email.png')}
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
            </div>

            <h2 className="m-0 mb-4 font-onest text-[24px] font-bold leading-[110%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[48px]">
              Subscribe
            </h2>
            <p className="m-0 mb-8 max-w-[800px] font-onest text-base font-normal leading-[120%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[32px]">
              Receive notifications about all new events, registration openings and closings, and
              personal invitations
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                openSubscribe();
              }}
              className="flex w-full max-w-[612px] flex-col items-start gap-2 sm:flex-row"
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="placeholder:text-[color:var(--ifm-font-color-base)]/48 h-[56px] w-full rounded-[20px] border border-white/10 bg-brand-bg px-4 font-onest text-base font-normal tracking-oai text-[color:var(--ifm-font-color-base)] outline-none sm:w-[480px] md:h-[64px] md:px-6 md:text-lg"
              />
              <button
                type="submit"
                className="h-[56px] w-[124px] flex-shrink-0 cursor-pointer rounded-[20px] border-none bg-brand-green font-onest text-base font-semibold tracking-oai text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-green-light hover:shadow-[0_8px_24px_rgba(101,209,0,0.4)] active:translate-y-0 active:bg-brand-green-dark active:shadow-none disabled:pointer-events-none disabled:opacity-50 md:h-[64px] md:text-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="mx-auto max-w-[1200px] md:px-20">
        <div className="h-px bg-white/[0.04]" />
      </div>

      {/* Follow updates on social media */}
      <section className="mx-auto max-w-[1200px] py-16 md:px-20 md:py-20">
        <div className="flex items-start">
          <div className="flex-1">
            {/* Heart icon */}
            <div className="mb-8 h-16 w-16">
              <img
                src={asset('/img/heart.png')}
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
            </div>
            <h2 className="m-0 mb-10 font-onest text-[24px] font-bold leading-[110%] tracking-oai text-[color:var(--ifm-font-color-base)] md:text-[48px]">
              Follow updates on social media
            </h2>
            <div className="flex flex-row items-center gap-10">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/open-api-initiative/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--ifm-font-color-base)] text-[color:var(--brand-bg)] transition-colors hover:bg-brand-green hover:text-brand-bg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@OpenApi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--ifm-font-color-base)] text-[color:var(--brand-bg)] transition-colors hover:bg-brand-green hover:text-brand-bg"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 15l5.19-3L10 9v6zm11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
                </svg>
              </a>
              {/* Bluesky */}
              <a
                href="https://bsky.app/profile/openapis.org"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bluesky"
                className="text-[color:var(--ifm-font-color-base)] transition-colors hover:text-brand-green"
              >
                <svg width="28" height="28" viewBox="0 0 568 501" fill="currentColor">
                  <path d="M123.121 33.664C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.21C491.866-1.611 568-28.906 568 57.947c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748C507.222 323.8 536.444 388.56 473.333 453.32c-119.86 122.992-172.272-30.859-185.702-70.281-2.462-7.227-3.617-10.608-3.631-7.733-.014-2.875-1.169.506-3.631 7.733-13.43 39.422-65.842 193.273-185.702 70.281-63.111-64.76-33.89-129.52 81.986-149.071C110.931 315.433 37.051 296.953 16.776 224.5 10.944 203.658 1 75.291 1 57.946 1-28.907 77.133-1.612 124.121 33.664Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom footer bar */}
      <div className="border-t border-white/[0.04]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-4 py-6 md:flex-row md:items-center md:px-20">
          <span className="font-onest text-base font-normal tracking-oai text-brand-muted md:text-lg">
            For any questions about the OAI Track, please contact{' '}
            <a
              href="mailto:oai-track@openapis.org"
              className="text-brand-muted underline hover:text-[color:var(--ifm-font-color-base)]"
            >
              oai-track@openapis.org
            </a>
          </span>
          <div className="flex flex-row items-center gap-10">
            <a
              href="https://openapis.org"
              className="font-onest text-base font-normal tracking-oai text-brand-green no-underline hover:underline md:text-lg"
            >
              openapis.org
            </a>
            <a
              href="https://github.com/OAI/.github/blob/main/.github/CODE_OF_CONDUCT.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-onest text-base font-normal tracking-oai text-brand-green no-underline hover:underline md:text-lg"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="#65D100"
                strokeWidth="1.5"
              >
                <rect x="2" y="4" width="12" height="9" rx="1" />
                <path d="M5 2v3M11 2v3" />
              </svg>
              Code of Conduct
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
