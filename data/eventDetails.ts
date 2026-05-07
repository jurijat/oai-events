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
              {
                name: 'Lisa Müller',
                position: 'Head of Platform / Dutch Gov',
                photo:
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
              },
            ],
          },
          {
            title: 'OpenAPI 3.2: What\'s New and What\'s Next',
            time: '10:00 — 10:25',
            permalink: '/events/talks/summit-openapi-32',
            speakers: [
              {
                name: 'Darrel Miller',
                position: 'Principal API Architect / Microsoft',
                photo:
                  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop',
                tag: 'OAI',
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
              {
                name: 'David Park',
                position: 'Senior Developer / Stripe',
                photo:
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
              },
            ],
          },
          {
            title: 'Designing API-First Microservices at Scale',
            time: '11:30 — 11:55',
            permalink: '/events/talks/summit-microservices-scale',
            speakers: [
              {
                name: 'Priya Sharma',
                position: 'Principal Engineer / Netflix',
                photo:
                  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
              },
            ],
          },
          {
            title: 'GraphQL vs OpenAPI: Picking the Right Tool',
            time: '13:00 — 13:25',
            permalink: '/events/talks/summit-graphql-openapi',
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
            permalink: '/events/talks/summit-code-gen',
            speakers: [
              {
                name: 'Tomáš Novák',
                position: 'Lead Developer / Apicurio',
                photo:
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
              },
            ],
          },
          {
            title: 'Testing Your APIs: Contract-Driven Development',
            time: '14:30 — 14:55',
            permalink: '/events/talks/summit-contract-testing',
            speakers: [
              {
                name: 'Olivia Brown',
                position: 'Test Architect / Pact',
                photo:
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
              },
              {
                name: 'James Liu',
                position: 'QA Lead / Pact',
                photo:
                  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
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
            time: '09:30 — 09:55',
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
          {
            title: 'API Versioning Strategies That Actually Work',
            time: '10:00 — 10:25',
            permalink: '/events/talks/summit-versioning',
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
        ],
        Design: [
          {
            title: 'API Security Best Practices',
            time: '11:00 — 11:25',
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
          {
            title: 'Idempotency, Retries, and Resilient APIs',
            time: '11:30 — 11:55',
            permalink: '/events/talks/summit-idempotency',
            speakers: [
              {
                name: 'Rohan Gupta',
                position: 'Senior Engineer / AWS',
                photo:
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
              },
            ],
          },
        ],
        'AI & Future': [
          {
            title: 'AI Agents and the OpenAPI Toolchain',
            time: '13:00 — 13:25',
            permalink: '/events/talks/summit-ai-agents',
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
            title: 'Closing Keynote: The Next Decade of OpenAPI',
            time: '14:00 — 14:25',
            permalink: '/events/talks/summit-closing',
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
  if (eventDetails[slug]) return eventDetails[slug];

  // Fall back to basic event info from events.yml for any slug we don't have
  // a custom detail for (mostly past events).
  // Lazy require to avoid circular import at module init time.

  const { events } = require('./events') as typeof import('./events');
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
    agenda: buildFallbackAgenda(),
    sponsors: [{ name: 'boomi' }],
  };
}

export function getAllEventSlugs(): string[] {
  const customSlugs = Object.keys(eventDetails);
  // Lazy require for the same reason as above.

  const { events } = require('./events') as typeof import('./events');
  const yamlSlugs = events.map((e) => e.slug);
  return Array.from(new Set([...customSlugs, ...yamlSlugs]));
}
