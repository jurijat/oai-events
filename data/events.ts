import yaml from 'js-yaml';
// Bundled as a raw string by the webpack asset/source rule (next.config.ts) —
// the Cloudflare Workers runtime has no fs, so the YAML must ship in the bundle.
import rawEvents from './events.yml';

export interface Speaker {
  name: string;
  position: string;
  photo: string;
}

export interface EventItem {
  title: string;
  slug: string;
  event_date: string;
  location: string;
  type: string;
  status: 'active' | 'upcoming' | 'finished';
  image: string;
  time_start: string;
  time_end: string;
  description: string;
  permalink: string;
  speakers: Speaker[];
  tags: string[];
}

export const events = yaml.load(rawEvents) as EventItem[];

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}
