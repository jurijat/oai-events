import React from 'react';

interface SpeakerCardProps {
  name: string;
  position: string;
  photo: string;
  variant?: 'dark' | 'light';
  tags?: string[];
}

export default function SpeakerCard({
  name,
  position,
  photo,
  variant = 'dark',
  tags = [],
}: SpeakerCardProps) {
  const isDark = variant === 'dark';

  return (
    <div
      className={`flex h-[180px] flex-row items-center overflow-hidden rounded-4xl border-2 ${
        isDark
          ? 'border-white/20 bg-brand-bg bg-gradient-to-t from-white/[0.04] to-white/[0.04]'
          : 'border-black/20 bg-white'
      }`}
    >
      {/* Text side */}
      <div className="flex h-full flex-1 flex-col items-start justify-center gap-2 px-6 py-4">
        <div className="flex flex-row items-center gap-2">
          <span
            className={`font-onest text-base font-bold leading-[120%] tracking-oai ${
              isDark ? 'text-[color:var(--ifm-font-color-base)]' : 'text-brand-bg'
            }`}
          >
            {name}
          </span>
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-[10px_2px_2px_10px] bg-brand-green px-1 py-[2px] font-onest text-[11px] font-bold leading-[120%] tracking-oai text-brand-bg"
            >
              {tag}
            </span>
          ))}
        </div>
        <span
          className={`font-onest text-base font-normal leading-[140%] tracking-oai ${
            isDark ? 'text-[color:var(--ifm-font-color-base)]' : 'text-brand-bg'
          }`}
        >
          {position}
        </span>
      </div>
      {/* Photo side */}
      <div
        className="h-[180px] w-[180px] flex-shrink-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${photo})`,
          borderRadius: '200px 0px 0px 200px',
        }}
      />
    </div>
  );
}
