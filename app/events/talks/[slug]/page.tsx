import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TalkDetail from '@/components/TalkDetail';
import { getAllTalkSlugs, getTalk } from '@/data/talks';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTalkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const talk = getTalk(slug);
  if (!talk) return { title: 'Talk not found' };
  return {
    title: talk.metaTitle ?? talk.title,
    description: talk.description,
  };
}

export default async function TalkPage({ params }: PageProps) {
  const { slug } = await params;
  const talk = getTalk(slug);
  if (!talk) notFound();

  return (
    <TalkDetail
      title={talk.title}
      description={talk.description}
      time={talk.time}
      category={talk.category}
      speakers={talk.speakers}
      eventTitle={talk.eventTitle}
      eventDate={talk.eventDate}
      schedule={talk.schedule}
    />
  );
}
