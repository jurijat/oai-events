import { events } from '@/data/events';
import { talks } from '@/data/talks';

export interface SearchItem {
  title: string;
  description?: string;
  permalink: string;
  type: 'event' | 'talk' | 'page';
}

export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [
    { title: 'OpenAPI Events', description: 'Home', permalink: '/', type: 'page' },
    { title: 'Past Events', description: 'Archive', permalink: '/past-events', type: 'page' },
  ];

  for (const event of events) {
    items.push({
      title: event.title,
      description: `${event.event_date} · ${event.location}`,
      permalink: event.permalink,
      type: 'event',
    });
    for (const speaker of event.speakers ?? []) {
      items.push({
        title: speaker.name,
        description: `${speaker.position} · ${event.title}`,
        permalink: event.permalink,
        type: 'event',
      });
    }
  }

  for (const [slug, talk] of Object.entries(talks)) {
    items.push({
      title: talk.title,
      description: talk.eventTitle
        ? `${talk.eventTitle}${talk.time ? ' · ' + talk.time : ''}`
        : talk.description?.slice(0, 80),
      permalink: `/events/talks/${slug}`,
      type: 'talk',
    });
  }

  return items;
}
