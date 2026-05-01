import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EventDetail from '@/components/EventDetail';
import { eventDetails, getAllEventSlugs, getEventDetail } from '@/data/eventDetails';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllEventSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getEventDetail(slug);
  if (!detail) return { title: 'Event not found' };
  return {
    title: detail.metaTitle ?? detail.title,
    description: detail.metaDescription ?? detail.description,
  };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = getEventDetail(slug);
  if (!detail) notFound();

  return (
    <EventDetail
      title={detail.title}
      date={detail.date}
      location={detail.location}
      image={detail.image}
      type={detail.type}
      status={detail.status}
      description={detail.description}
      agenda={detail.agenda}
      sponsors={detail.sponsors}
    />
  );
}
