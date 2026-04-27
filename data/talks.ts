export interface TalkSpeaker {
  name: string;
  position: string;
  photo: string;
}

export interface ScheduleSlot {
  time: string;
  title: string;
  permalink: string;
}

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

const singaporeSchedule: ScheduleSlot[] = [
  { time: '09:00', title: 'From Zero to Spec', permalink: '/events/talks/singapore-zero-to-spec' },
  { time: '09:30', title: 'From Zero to Spec', permalink: '/events/talks/singapore-zero-to-spec' },
  {
    time: '10:00',
    title: 'From REST to Events',
    permalink: '/events/talks/singapore-api-workflow',
  },
  {
    time: '10:30',
    title: 'From REST to Events',
    permalink: '/events/talks/singapore-api-workflow',
  },
  { time: '11:00', title: 'Workshop', permalink: '#' },
  { time: '11:30', title: 'Workshop', permalink: '#' },
  { time: '12:00', title: 'Lunch', permalink: '#' },
  { time: '12:30', title: 'Lunch', permalink: '#' },
  {
    time: '13:00',
    title: 'SDMs, OpenAPI & AI',
    permalink: '/events/talks/singapore-sdms-openapi-ai',
  },
  { time: '14:00', title: 'Q&A Panel', permalink: '#' },
  { time: '14:30', title: 'Networking', permalink: '#' },
  { time: '16:00', title: 'Closing', permalink: '#' },
];

const singaporeAdvancedSchedule: ScheduleSlot[] = [
  {
    time: '09:00',
    title: 'Advanced Patterns',
    permalink: '/events/talks/singapore-advanced-patterns',
  },
  {
    time: '09:30',
    title: 'Advanced Patterns',
    permalink: '/events/talks/singapore-advanced-patterns',
  },
  {
    time: '10:00',
    title: 'Developer-First APIs',
    permalink: '/events/talks/singapore-developer-first',
  },
  {
    time: '10:30',
    title: 'Developer-First APIs',
    permalink: '/events/talks/singapore-developer-first',
  },
  { time: '11:00', title: 'Workshop', permalink: '#' },
  { time: '11:30', title: 'Workshop', permalink: '#' },
  { time: '12:00', title: 'Lunch', permalink: '#' },
  { time: '12:30', title: 'Lunch', permalink: '#' },
  { time: '13:00', title: 'Deep Dive Session', permalink: '#' },
  { time: '14:00', title: 'Q&A Panel', permalink: '#' },
  { time: '14:30', title: 'Networking', permalink: '#' },
  { time: '16:00', title: 'Closing', permalink: '#' },
];

const summitSchedule: ScheduleSlot[] = [
  {
    time: '09:00',
    title: 'From Zero to Spec-Hero',
    permalink: '/events/talks/summit-zero-to-spec',
  },
  { time: '09:30', title: 'Dutch Government OpenAPI', permalink: '/events/talks/summit-dutch-gov' },
  { time: '11:00', title: 'REST to Events', permalink: '/events/talks/summit-rest-to-events' },
];

const summitDay2Schedule: ScheduleSlot[] = [
  { time: '09:00', title: 'SDKs and AI', permalink: '/events/talks/summit-sdks-ai' },
  { time: '10:00', title: 'APIs and AI', permalink: '/events/talks/summit-api-ai' },
  { time: '13:00', title: 'Security Best Practices', permalink: '/events/talks/summit-security' },
];

const amsterdamSchedule: ScheduleSlot[] = [
  {
    time: '09:00',
    title: 'From Zero to Spec-Hero',
    permalink: '/events/talks/amsterdam-zero-to-spec',
  },
  {
    time: '09:30',
    title: 'Dutch Government OpenAPI',
    permalink: '/events/talks/amsterdam-dutch-government',
  },
  { time: '10:00', title: 'REST to Events', permalink: '#' },
  { time: '10:30', title: 'AI-Ready OpenAPI', permalink: '#' },
  { time: '11:00', title: 'Coffee Break', permalink: '#' },
  { time: '11:30', title: 'Workshop Session', permalink: '#' },
];

export const talks: Record<string, TalkData> = {
  'singapore-zero-to-spec': {
    title: 'From Zero to Spec: Here: Eliminating Lean Wastes When Adopting OpenAPI',
    description:
      'Adopting OpenAPI can be challenging, but with the right approach, organizations can eliminate lean wastes and accelerate their API development lifecycle. This talk explores proven strategies for implementing OpenAPI in enterprise environments, focusing on eliminating unnecessary complexity and streamlining the specification process. Learn how to implement OpenAPI across teams and organizations effectively.',
    time: 'April 14, 09:00 — 09:45',
    category: 'Opening and keynote',
    eventTitle: 'API Days Singapore',
    eventDate: 'April 14 — 15, 2026',
    speakers: [
      {
        name: 'Frank Kilcommins',
        position: 'Head of Enterprise Architecture | Axtic',
        photo: 'https://i.pravatar.cc/180?img=11',
      },
    ],
    schedule: singaporeSchedule,
  },
  'singapore-api-workflow': {
    title: 'From REST to Events: API Workflow Testing and Modeling with a Single Arazzo Spec',
    description:
      'Arazzo is a new specification designed to describe and model API workflows and interactions. In this talk, discover how Arazzo complements OpenAPI to provide a comprehensive view of multi-step API interactions, event-driven architectures, and complex workflows. Learn how to use a single Arazzo spec to test, validate, and document your entire API workflow.',
    time: 'April 14, 10:00 — 10:45',
    category: 'Design',
    eventTitle: 'API Days Singapore',
    eventDate: 'April 14 — 15, 2026',
    speakers: [
      {
        name: 'Nina Patel',
        position: 'API Architect | Tech Innovations',
        photo: 'https://i.pravatar.cc/180?img=6',
      },
    ],
    schedule: singaporeSchedule,
  },
  'singapore-sdms-openapi-ai': {
    title: 'Bridging SDMs, OpenAPI, and AI: Unified Schemas for AI-to-API Chaining',
    description:
      'The convergence of AI, API management, and schema-driven development creates new opportunities for building intelligent API systems. This session explores how to bridge Service Data Models (SDMs), OpenAPI specifications, and AI technologies to create unified schemas that enable seamless AI-to-API chaining. Discover how organizations are leveraging these technologies together to build next-generation API ecosystems.',
    time: 'April 14, 13:00 — 13:45',
    category: 'Governance',
    eventTitle: 'API Days Singapore',
    eventDate: 'April 14 — 15, 2026',
    speakers: [
      {
        name: 'Alex Kumar',
        position: 'Principal Engineer | Cloud Systems',
        photo: 'https://i.pravatar.cc/180?img=9',
      },
    ],
    schedule: singaporeSchedule,
  },
  'singapore-advanced-patterns': {
    title: 'Advanced API Design Patterns',
    description:
      'Building on the fundamentals, this advanced session dives deep into sophisticated API design patterns used by leading organizations. Learn about versioning strategies, pagination approaches, error handling best practices, and security patterns that scale. Discover how to design APIs that are resilient, maintainable, and developer-friendly at enterprise scale.',
    time: 'April 15, 09:00 — 09:45',
    category: 'Opening and keynote',
    eventTitle: 'API Days Singapore',
    eventDate: 'April 14 — 15, 2026',
    speakers: [
      {
        name: 'Frank Kilcommins',
        position: 'Head of Enterprise Architecture | Axtic',
        photo: 'https://i.pravatar.cc/180?img=11',
      },
    ],
    schedule: singaporeAdvancedSchedule,
  },
  'singapore-developer-first': {
    title: 'Building Developer-First APIs',
    description:
      'Developer experience is the new competitive advantage. This talk explores how to design APIs that developers love to use, maintain, and integrate with. Learn about documentation best practices, sandbox environments, SDK generation, API versioning, and how to gather and act on developer feedback. Discover how companies like Stripe and Twilio prioritize DX in their API design.',
    time: 'April 15, 10:00 — 10:45',
    category: 'Design',
    eventTitle: 'API Days Singapore',
    eventDate: 'April 14 — 15, 2026',
    speakers: [
      {
        name: 'Nina Patel',
        position: 'API Architect | Tech Innovations',
        photo: 'https://i.pravatar.cc/180?img=6',
      },
    ],
    schedule: singaporeAdvancedSchedule,
  },
  'summit-zero-to-spec': {
    title: 'From Zero to Spec-Hero: Eliminating Lean Wastes When Adopting OpenAPI',
    description:
      'Adopting OpenAPI can be challenging, but with the right approach, organizations can eliminate lean wastes and accelerate their API development lifecycle. This talk explores proven strategies for implementing OpenAPI in enterprise environments, focusing on eliminating unnecessary complexity and streamlining the specification process.',
    time: '09:00 — 09:25',
    eventTitle: 'OpenAPI Summit at DeveloperWeek',
    eventDate: 'May 19 — 20, 2026',
    speakers: [
      {
        name: 'Frank Kilcommins',
        position: 'Head of Enterprise Architecture / Jentic',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      },
    ],
    schedule: summitSchedule,
  },
  'summit-dutch-gov': {
    title:
      'How the Dutch Government Uses an OpenAPI-First Approach to Leverage Developer Experience',
    description:
      "The Dutch government has pioneered an OpenAPI-first approach to building digital services that prioritizes developer experience. Learn how they've standardized API design across government agencies, improved collaboration between teams, and created a framework that encourages innovation while maintaining consistency.",
    time: '09:30 — 09:55',
    eventTitle: 'OpenAPI Summit at DeveloperWeek',
    eventDate: 'May 19 — 20, 2026',
    speakers: [
      {
        name: 'Naresh Jain',
        position: 'CEO / ConfEngine',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      },
    ],
    schedule: summitSchedule,
    metaTitle: 'How the Dutch Government Uses an OpenAPI-First Approach',
  },
  'summit-rest-to-events': {
    title: 'From REST to Events: API Workflow Testing and Mocking with a Single Arazzo Spec',
    description:
      'Explore how Arazzo specification extends OpenAPI to describe API workflows across multiple HTTP calls. Learn practical techniques for testing complex API sequences, generating realistic mocks, and validating end-to-end scenarios.',
    time: '11:00 — 11:25',
    eventTitle: 'OpenAPI Summit at DeveloperWeek',
    eventDate: 'May 19 — 20, 2026',
    speakers: [
      {
        name: 'Sarah Chen',
        position: 'Staff Engineer / Stripe',
        photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop',
      },
    ],
    schedule: summitSchedule,
    metaTitle: 'From REST to Events: API Workflow Testing',
  },
  'summit-sdks-ai': {
    title: 'Bridging SDKs, OpenAPI, and AI: Unified Schemas for AI-to-API Chaining',
    description:
      'Learn how to bridge the gap between AI systems and your APIs using OpenAPI specifications as the universal language. This session covers techniques for generating SDKs from specs, enabling LLMs to call your APIs reliably, and creating unified schemas that work across both traditional clients and AI agents.',
    time: '09:00 — 09:25',
    eventTitle: 'OpenAPI Summit at DeveloperWeek',
    eventDate: 'May 19 — 20, 2026',
    speakers: [
      {
        name: 'Michael Rodriguez',
        position: 'Director of DX / Okta',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      },
    ],
    schedule: summitDay2Schedule,
    metaTitle: 'Bridging SDKs, OpenAPI, and AI',
  },
  'summit-api-ai': {
    title: "APIs Weren't Built for AI, Now What?",
    description:
      'Most existing APIs were designed for human developers or traditional applications, not AI agents. This talk examines the gaps between current API design patterns and AI requirements, then proposes practical adaptations to make your APIs AI-ready without breaking existing clients.',
    time: '10:00 — 10:25',
    eventTitle: 'OpenAPI Summit at DeveloperWeek',
    eventDate: 'May 19 — 20, 2026',
    speakers: [
      {
        name: 'Emma Watson',
        position: 'Principal Engineer / Acme',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      },
    ],
    schedule: summitDay2Schedule,
  },
  'summit-security': {
    title: 'API Security Best Practices',
    description:
      'Security is critical for any API. Learn the latest best practices for securing your OpenAPI-defined APIs, including authentication flows, rate limiting, input validation, and how to document security requirements in your OpenAPI spec.',
    time: '13:00 — 13:25',
    eventTitle: 'OpenAPI Summit at DeveloperWeek',
    eventDate: 'May 19 — 20, 2026',
    speakers: [
      {
        name: 'Sarah Chen',
        position: 'Staff Engineer / Stripe',
        photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop',
      },
    ],
    schedule: summitDay2Schedule,
  },
  'amsterdam-zero-to-spec': {
    title: 'From Zero to Spec-Hero: Eliminating Lean Wastes When Adopting OpenAPI',
    description:
      'Adopting OpenAPI can be challenging, but with the right approach, organizations can eliminate lean wastes and accelerate their API development lifecycle. This talk explores proven strategies for implementing OpenAPI in enterprise environments, focusing on eliminating unnecessary complexity and streamlining the specification process.',
    time: '09:00 — 09:25',
    category: 'Opening and keynote',
    eventTitle: 'API Days Amsterdam',
    eventDate: 'June 10 — 11, 2026',
    speakers: [
      {
        name: 'Marjukka Niinioja',
        position: 'Founding Partner | Osaango',
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
      },
      {
        name: 'Erik Wilde',
        position: 'HDI Global SE',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      },
    ],
    schedule: amsterdamSchedule,
  },
  'amsterdam-dutch-government': {
    title:
      'How the Dutch Government Uses an OpenAPI-First Approach to Leverage Developer Experience',
    description:
      "The Dutch government has pioneered an OpenAPI-first approach to building digital services that prioritizes developer experience. Learn how they've standardized API design across government agencies, improved collaboration between teams, and created a framework that encourages innovation while maintaining consistency.",
    time: '09:30 — 09:55',
    category: 'Opening and keynote',
    eventTitle: 'API Days Amsterdam',
    eventDate: 'June 10 — 11, 2026',
    speakers: [
      {
        name: 'Dimitri van Hees',
        position: 'Government of the Netherlands',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
      },
    ],
    schedule: amsterdamSchedule,
  },
};

export function getTalk(slug: string): TalkData | undefined {
  return talks[slug];
}

export function getAllTalkSlugs(): string[] {
  return Object.keys(talks);
}
