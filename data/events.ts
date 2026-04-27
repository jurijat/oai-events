import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

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

const yamlPath = path.join(process.cwd(), 'data', 'events.yml');
const raw = fs.readFileSync(yamlPath, 'utf8');

export const events = yaml.load(raw) as EventItem[];

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}
