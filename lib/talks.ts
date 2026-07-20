import { events, type ScheduleSlot, type TalkSpeaker } from './events';

// Talk data now lives nested under each event in data/events.yml. This module
// flattens it for the talk pages, deriving eventTitle/eventDate from the parent.
export type { ScheduleSlot, TalkSpeaker };

export interface TalkData {
  title: string;
  description: string;
  time?: string;
  category?: string;
  eventTitle?: string;
  eventDate?: string;
  speakers?: TalkSpeaker[];
  schedule?: ScheduleSlot[];
  metaTitle?: string;
}

export function getTalk(slug: string): TalkData | undefined {
  for (const event of events) {
    const talk = event.talks?.find((t) => t.slug === slug);
    if (talk) {
      return {
        title: talk.title,
        description: talk.description,
        time: talk.time,
        category: talk.category,
        eventTitle: event.title,
        eventDate: event.event_date,
        speakers: talk.speakers,
        schedule: talk.schedule,
        metaTitle: talk.metaTitle,
      };
    }
  }
  return undefined;
}

export function getAllTalkSlugs(): string[] {
  return events.flatMap((e) => (e.talks ?? []).map((t) => t.slug));
}
