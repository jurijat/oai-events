import yaml from 'js-yaml';
// Each event is its own data/<year>/<slug>/event.yaml. They are discovered and
// bundled at build time (require.context below) — no runtime fs, since the
// Cloudflare Workers runtime has none. events.order.yml (bundled as a raw string
// by the webpack asset/source rule in next.config.ts) is the primary ordering
// source. Speakers are referenced by slug and rehydrated by ./speakers.
import rawOrder from '../../data/events.order.yml';
import { resolveSpeaker, type RawSpeakerRef, type ResolvedSpeaker } from './speakers';

export interface Speaker {
  name: string;
  position: string;
  photo: string;
}

// --- Event detail page (agenda) ---------------------------------------------
export interface AgendaSpeaker {
  name: string;
  position?: string;
  photo?: string;
  tag?: string;
}

export interface AgendaSession {
  title: string;
  speaker?: string;
  speakers?: AgendaSpeaker[];
  time?: string;
  date?: string;
  permalink?: string;
  slidesUrl?: string;
  videoUrl?: string;
}

export type AgendaByDate = {
  [date: string]: {
    [category: string]: AgendaSession[];
  };
};

export interface Sponsor {
  name: string;
  logo?: string;
}

// --- Talk pages (nested under each event) -----------------------------------
export interface ScheduleSlot {
  time: string;
  title: string;
  permalink: string;
}

export interface TalkSpeaker {
  name: string;
  position: string;
  photo: string;
}

export interface EventTalk {
  slug: string;
  title: string;
  description: string;
  time?: string;
  category?: string;
  speakers?: TalkSpeaker[];
  schedule?: ScheduleSlot[];
  slidesUrl?: string;
  videoUrl?: string;
  metaTitle?: string;
}

export interface EventItem {
  title: string;
  slug: string;
  event_date: string;
  location: string;
  type: string;
  status: 'active' | 'upcoming' | 'finished';
  image: string;
  time_start?: string;
  time_end?: string;
  description: string;
  permalink: string;
  speakers: Speaker[];
  tags: string[];
  // Optional detail-page data, present for events with a full program:
  metaTitle?: string;
  metaDescription?: string;
  sponsors?: Sponsor[];
  agenda?: AgendaByDate;
  talks?: EventTalk[];
}

// --- Raw (pre-hydration) shapes, as parsed straight from event.yaml ----------
// In the file, speakers are slug references (or {slug, tag}); the resolver turns
// them into the Speaker/AgendaSpeaker/TalkSpeaker shapes the components expect.
interface RawAgendaSession {
  title: string;
  speaker?: RawSpeakerRef; // single slug (legacy singular form)
  speakers?: RawSpeakerRef[];
  time?: string;
  date?: string;
  permalink?: string;
  slidesUrl?: string;
  videoUrl?: string;
}
type RawAgendaByDate = {
  [date: string]: { [category: string]: RawAgendaSession[] };
};
type RawTalk = Omit<EventTalk, 'speakers'> & { speakers?: RawSpeakerRef[] };
type RawEvent = Omit<EventItem, 'speakers' | 'agenda' | 'talks'> & {
  speakers?: RawSpeakerRef[];
  agenda?: RawAgendaByDate;
  talks?: RawTalk[];
};

function toSpeaker(s: ResolvedSpeaker): Speaker {
  return { name: s.name, position: s.position, photo: s.photo };
}

// Resolve every slug reference in an event into concrete speaker objects.
function hydrateEvent(raw: RawEvent): EventItem {
  const slug = raw.slug;

  const speakers: Speaker[] = (raw.speakers ?? []).map((ref) =>
    toSpeaker(resolveSpeaker(slug, ref)),
  );

  let agenda: AgendaByDate | undefined;
  if (raw.agenda) {
    agenda = {};
    for (const [date, categories] of Object.entries(raw.agenda)) {
      agenda[date] = {};
      for (const [category, sessions] of Object.entries(categories)) {
        agenda[date][category] = sessions.map((session) => {
          const refs: RawSpeakerRef[] =
            session.speakers ?? (session.speaker ? [session.speaker] : []);
          const resolved = refs.map((ref) => resolveSpeaker(slug, ref));
          return {
            title: session.title,
            time: session.time,
            date: session.date,
            permalink: session.permalink,
            slidesUrl: session.slidesUrl,
            videoUrl: session.videoUrl,
            speakers: resolved.map((s) => ({
              name: s.name,
              position: s.position,
              photo: s.photo,
              ...(s.tag ? { tag: s.tag } : {}),
            })),
          };
        });
      }
    }
  }

  const talks: EventTalk[] | undefined = raw.talks?.map((talk) => ({
    ...talk,
    speakers: (talk.speakers ?? []).map((ref) => toSpeaker(resolveSpeaker(slug, ref))),
  }));

  return { ...(raw as unknown as EventItem), speakers, agenda, talks };
}

// webpack require.context — globs every data/<year>/<slug>/event.yaml as a raw
// string (asset/source rule) and bundles them, so it works for both the static
// export and the Cloudflare Worker build. The two [^/]+ segments are the year
// folder and the event folder.
type RawModule = string | { default: string };
const ctx = (
  require as unknown as {
    context(
      dir: string,
      recursive: boolean,
      re: RegExp,
    ): { keys(): string[]; (id: string): RawModule };
  }
).context('../../data', true, /^\.\/[^/]+\/[^/]+\/event\.ya?ml$/);

const allEvents: EventItem[] = ctx.keys().map((key) => {
  const mod = ctx(key);
  return hydrateEvent(yaml.load(typeof mod === 'string' ? mod : mod.default) as RawEvent);
});

// Parse "September 5 — 7, 2024" → sortable timestamp of the event's first day.
const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];
function dateValue(e: EventItem): number {
  const m = /([A-Za-z]+)\s+(\d+).*?(\d{4})/.exec(e.event_date);
  if (!m) return 0;
  const month = MONTHS.indexOf(m[1].toLowerCase());
  return Date.UTC(Number(m[3]), month < 0 ? 0 : month, Number(m[2]));
}

const order = (yaml.load(rawOrder) as string[] | null) ?? [];
const orderIndex = new Map(order.map((slug, i) => [slug, i] as const));

// Order: events.order.yml first (its listed order), then everything else by
// date — past events most-recent-first, upcoming/active soonest-first.
export const events: EventItem[] = allEvents.sort((a, b) => {
  const ia = orderIndex.get(a.slug) ?? Infinity;
  const ib = orderIndex.get(b.slug) ?? Infinity;
  if (ia !== ib) return ia - ib;
  const bothFinished = a.status === 'finished' && b.status === 'finished';
  return bothFinished ? dateValue(b) - dateValue(a) : dateValue(a) - dateValue(b);
});

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}
