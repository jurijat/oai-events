import {
  events,
  type AgendaByDate,
  type AgendaSession,
  type AgendaSpeaker,
  type Sponsor,
} from './events';

// Detail-page data now lives in data/events.yml (per event). This module only
// adapts an event into the shape the EventDetail component expects.
export type { AgendaByDate, AgendaSession, AgendaSpeaker };

export interface EventDetailData {
  title: string;
  date: string;
  location: string;
  image: string;
  type: string;
  status: 'active' | 'upcoming' | 'finished';
  description?: string;
  agenda?: AgendaByDate;
  sponsors?: Sponsor[];
  metaTitle?: string;
  metaDescription?: string;
}

// Generic placeholder agenda for events that have no `agenda` in events.yml
// (mostly past events). This is the only non-YAML content left — drop it and
// past-event pages simply omit the agenda section.
function buildFallbackAgenda(): AgendaByDate {
  return {
    'Day 1': {
      'Opening and keynote': [
        {
          title: 'Welcome and State of OpenAPI',
          time: '09:00 — 09:25',
          speakers: [
            {
              name: 'Frank Kilcommins',
              position: 'Head of Enterprise Architecture / Jentic',
              photo:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
              tag: 'OAI',
            },
          ],
        },
        {
          title: 'API-First in Practice: Lessons from the Field',
          time: '09:30 — 09:55',
          speakers: [
            {
              name: 'Sarah Chen',
              position: 'Staff Engineer / Stripe',
              photo:
                'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop',
            },
          ],
        },
      ],
      Design: [
        {
          title: 'Designing Resilient APIs at Scale',
          time: '11:00 — 11:25',
          speakers: [
            {
              name: 'Priya Sharma',
              position: 'Principal Engineer / Netflix',
              photo:
                'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
            },
            {
              name: 'David Park',
              position: 'Senior Developer / Netflix',
              photo:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
            },
          ],
        },
        {
          title: 'OpenAPI and AsyncAPI Together',
          time: '13:00 — 13:25',
          speakers: [
            {
              name: 'Ahmed Hassan',
              position: 'Tech Lead / Shopify',
              photo:
                'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop',
            },
          ],
        },
      ],
      Tooling: [
        {
          title: 'Code Generation: From Spec to Production',
          time: '14:00 — 14:25',
          speakers: [
            {
              name: 'Tomáš Novák',
              position: 'Lead Developer / Apicurio',
              photo:
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
            },
          ],
        },
      ],
    },
    'Day 2': {
      Governance: [
        {
          title: 'Versioning Strategies That Survive Production',
          time: '09:00 — 09:25',
          speakers: [
            {
              name: 'Carlos Méndez',
              position: 'Staff Engineer / GitHub',
              photo:
                'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop',
            },
            {
              name: 'Yuki Tanaka',
              position: 'Senior Engineer / GitHub',
              photo:
                'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop',
            },
          ],
        },
        {
          title: 'Contract Testing for Microservices',
          time: '10:00 — 10:25',
          speakers: [
            {
              name: 'Olivia Brown',
              position: 'Test Architect / Pact',
              photo:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
            },
          ],
        },
      ],
      'AI & Future': [
        {
          title: 'AI Agents and the OpenAPI Toolchain',
          time: '13:00 — 13:25',
          speakers: [
            {
              name: 'Marcus Webb',
              position: 'Research Engineer / Anthropic',
              photo:
                'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop',
            },
            {
              name: 'Aisha Patel',
              position: 'Product Lead / OpenAI',
              photo:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
              tag: 'OAI',
            },
          ],
        },
        {
          title: 'Closing Keynote: Where OpenAPI Goes Next',
          time: '14:00 — 14:25',
          speakers: [
            {
              name: 'Frank Kilcommins',
              position: 'Head of Enterprise Architecture / Jentic',
              photo:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
              tag: 'OAI',
            },
          ],
        },
      ],
    },
  };
}

export function getEventDetail(slug: string): EventDetailData | undefined {
  const event = events.find((e) => e.slug === slug);
  if (!event) return undefined;
  return {
    title: event.title,
    date: event.event_date,
    location: event.location,
    image: event.image,
    type: event.type,
    status: event.status,
    description: event.description,
    agenda: event.agenda ?? buildFallbackAgenda(),
    sponsors: event.sponsors,
    metaTitle: event.metaTitle,
    metaDescription: event.metaDescription,
  };
}

export function getAllEventSlugs(): string[] {
  return events.map((e) => e.slug);
}
