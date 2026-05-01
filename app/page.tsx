import type { Metadata } from 'next';
import EventsList from '@/components/EventsList';
import { events } from '@/data/events';

export const metadata: Metadata = {
  title: 'OpenAPI Events',
  description: 'OpenAPI events and conferences',
};

export default function Home() {
  const eventItems = events
    .filter((event) => event.status === 'active' || event.status === 'upcoming')
    .map((event) => ({
      title: event.title,
      permalink: event.permalink,
      date: event.event_date,
      location: event.location,
      type: event.type,
      status: event.status,
      image: event.image,
      speakers: event.speakers,
    }));

  return <EventsList items={eventItems} />;
}
