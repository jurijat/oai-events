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
}

export type AgendaByDate = {
  [date: string]: {
    [category: string]: AgendaSession[];
  };
};

export interface EventDetailData {
  title: string;
  date: string;
  location: string;
  image: string;
  type: string;
  status: 'active' | 'upcoming' | 'finished';
  description?: string;
  agenda?: AgendaByDate;
  sponsors?: { name: string; logo?: string }[];
  metaTitle?: string;
  metaDescription?: string;
}

export const eventDetails: Record<string, EventDetailData> = {
  'api-days-singapore': {
    title: 'API Days Singapore',
    date: 'April 14 — 15, 2026',
    location: 'Sands Expo & Convention Centre, Singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800',
    type: 'Event',
    status: 'upcoming',
    description: 'API Days Singapore brings together API practitioners from across Asia-Pacific.',
    metaDescription: 'Join us at API Days Singapore',
    agenda: {
      'April 14': {
        'Opening and keynote': [
          {
            title: 'From Zero to Spec: Here: Eliminating Lean Wastes When Adopting OpenAPI',
            speaker: 'Frank Kilcommins',
            time: '09:00 — 09:45',
            permalink: '/events/talks/singapore-zero-to-spec',
          },
        ],
        Design: [
          {
            title:
              'From REST to Events: API Workflow Testing and Modeling with a Single Arazzo Spec',
            speaker: 'Nina Patel',
            time: '10:00 — 10:45',
            permalink: '/events/talks/singapore-api-workflow',
          },
        ],
        Governance: [
          {
            title: 'Bridging SDMs, OpenAPI, and AI: Unified Schemas for AI-to-API Chaining',
            speaker: 'Alex Kumar',
            time: '13:00 — 13:45',
            permalink: '/events/talks/singapore-sdms-openapi-ai',
          },
        ],
      },
      'April 15': {
        'Opening and keynote': [
          {
            title: 'Advanced API Design Patterns',
            speaker: 'Frank Kilcommins',
            time: '09:00 — 09:45',
            permalink: '/events/talks/singapore-advanced-patterns',
          },
        ],
        Design: [
          {
            title: 'Building Developer-First APIs',
            speaker: 'Nina Patel',
            time: '10:00 — 10:45',
            permalink: '/events/talks/singapore-developer-first',
          },
        ],
      },
    },
    sponsors: [{ name: 'boomi' }],
  },

  'openapi-summit': {
    title: 'OpenAPI Summit at DeveloperWeek',
    date: 'May 19 — 20, 2026',
    location: 'Javits Convention Center, New York, NY',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800',
    type: 'Conference',
    status: 'active',
    description:
      'Join us at the OpenAPI Summit at DeveloperWeek for two days of talks, workshops, and networking.',
    metaDescription: 'Join us at the OpenAPI Summit',
    agenda: {
      'May 19': {
        'Opening and keynote': [
          {
            title: 'From Zero to Spec-Hero: Eliminating Lean Wastes When Adopting OpenAPI',
            time: '09:00 — 09:25',
            permalink: '/events/talks/summit-zero-to-spec',
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
            title:
              'How the Dutch Government Uses an OpenAPI-First Approach to Leverage Developer Experience',
            time: '09:30 — 09:55',
            permalink: '/events/talks/summit-dutch-gov',
            speakers: [
              {
                name: 'Naresh Jain',
                position: 'CEO / ConfEngine',
                photo:
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
              },
            ],
          },
        ],
        Design: [
          {
            title:
              'From REST to Events: API Workflow Testing and Mocking with a Single Arazzo Spec',
            time: '11:00 — 11:25',
            permalink: '/events/talks/summit-rest-to-events',
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
      },
      'May 20': {
        Governance: [
          {
            title: 'Bridging SDKs, OpenAPI, and AI: Unified Schemas for AI-to-API Chaining',
            time: '09:00 — 09:25',
            permalink: '/events/talks/summit-sdks-ai',
            speakers: [
              {
                name: 'Michael Rodriguez',
                position: 'Director of DX / Okta',
                photo:
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
                tag: 'OAI',
              },
            ],
          },
          {
            title: "APIs Weren't Built for AI, Now What?",
            time: '10:00 — 10:25',
            permalink: '/events/talks/summit-api-ai',
            speakers: [
              {
                name: 'Emma Watson',
                position: 'Principal Engineer / Acme',
                photo:
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
              },
            ],
          },
        ],
        Design: [
          {
            title: 'API Security Best Practices',
            time: '13:00 — 13:25',
            permalink: '/events/talks/summit-security',
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
      },
    },
    sponsors: [{ name: 'boomi' }],
  },

  'api-days-amsterdam': {
    title: 'API Days Amsterdam',
    date: 'June 10 — 11, 2026',
    location: 'Amsterdam RAI, Netherlands',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800',
    type: 'Masterclass',
    status: 'upcoming',
    description: 'Join our masterclass sessions at API Days Amsterdam.',
    metaDescription: 'Join us at API Days Amsterdam',
    agenda: {
      'June 10': {
        'Opening and keynote': [
          {
            title: 'From Zero to Spec-Hero: Eliminating Lean Wastes When Adopting OpenAPI',
            time: '09:00 — 09:25',
            permalink: '/events/talks/amsterdam-zero-to-spec',
            speakers: [
              {
                name: 'Marjukka Niinioja',
                position: 'Founding Partner / Osaango',
                photo:
                  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
              },
              {
                name: 'Erik Wilde',
                position: 'HDI Global SE',
                photo:
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
                tag: 'OAI',
              },
            ],
          },
          {
            title:
              'How the Dutch Government Uses an OpenAPI-First Approach to Leverage Developer Experience',
            time: '09:30 — 09:55',
            permalink: '/events/talks/amsterdam-dutch-government',
            speakers: [
              {
                name: 'Dimitri van Hees',
                position: 'Government of the Netherlands',
                photo:
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
              },
            ],
          },
          {
            title:
              'From REST to Events: API Workflow Testing and Mocking with a Single Arazzo Spec',
            time: '10:00 — 10:25',
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
            title: 'You may have OpenAPI, but is it AI-Ready?',
            time: '10:30 — 10:55',
            speakers: [
              {
                name: 'Frank Kilcommins',
                position: 'Head of Enterprise Architecture / Jentic',
                photo:
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
              },
            ],
          },
        ],
      },
      'June 11': {
        Governance: [
          {
            title: "APIs Weren't Built for AI, Now What?",
            time: '09:00 — 09:45',
            speakers: [
              {
                name: 'Emma Watson',
                position: 'Principal Engineer / Acme',
                photo:
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
              },
            ],
          },
          {
            title: 'Advanced Microservices with OpenAPI',
            time: '10:00 — 10:45',
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
      },
    },
    sponsors: [{ name: 'boomi' }],
  },

  'openapi-summit-ny': {
    title: 'OpenAPI Summit in New York',
    date: 'July 25 — 26, 2026',
    location: 'Javits Convention Center, New York, NY',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    type: 'Masterclass',
    status: 'upcoming',
    description: 'OpenAPI Summit returns to New York with masterclass sessions and talks.',
    metaDescription: 'Join us at OpenAPI Summit in New York',
    agenda: {
      'July 25': {
        'Opening and keynote': [
          {
            title: 'From Zero to Spec: Here: Eliminating Lean Wastes When Adopting OpenAPI',
            speaker: 'Dimitri van Hees',
            time: '09:00 — 09:45',
          },
        ],
        Design: [
          {
            title:
              'From REST to Events: API Workflow Testing and Modeling with a Single Arazzo Spec',
            speaker: 'David Park',
            time: '10:00 — 10:45',
          },
          { title: 'Brunch', time: '12:00 — 13:00' },
        ],
      },
      'July 26': {
        Governance: [
          {
            title: "APIs Weren't Built for AI, Now What?",
            speaker: 'Dimitri van Hees',
            time: '09:00 — 09:45',
          },
        ],
        Design: [
          {
            title: 'Building Scalable APIs',
            speaker: 'David Park',
            time: '10:00 — 10:45',
          },
        ],
      },
    },
    sponsors: [{ name: 'boomi' }],
  },
};

export function getEventDetail(slug: string): EventDetailData | undefined {
  return eventDetails[slug];
}

export function getAllEventSlugs(): string[] {
  return Object.keys(eventDetails);
}
