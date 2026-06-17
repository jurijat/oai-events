---
name: add-event
description: Add a new event (or speaker) to the OpenAPI events site by creating data/<slug>/event.yml, with speaker avatars and the event image converted to repo-hosted WebP. Use when asked to add/create a new event, conference, masterclass, or talk to the site, or to add a speaker to an existing event.
---

# Add an event to the OpenAPI events site

Each event is its own file: **`data/<event-slug>/event.yml`** (one event per
file, discovered and bundled at build time, typed by `EventItem` in
`data/events.ts`). Adding an event = creating that file **and** hosting its
images locally via the `convert-image` skill.

## Steps

1. **Gather the details** from the user (title, dates, location, type, times,
   description, speakers, image). Ask for anything missing — especially the
   event image and each speaker photo (local path or URL).

2. **Convert every image to a repo-hosted WebP** with the `convert-image` skill /
   `npm run img`. Images are stored per event under
   `public/img/events/<event-slug>/`. Do **not** put remote URLs
   (unsplash/pravatar) into new entries — host them locally.

   **Preferred — batch the inbox.** Have the user drop raw files into
   `source-images/<event-slug>/` (gitignored): the event image named `cover.*`,
   each speaker file named after the speaker (`jane-doe.jpg`), optional
   `gallery/` subfolder. Then:

   ```bash
   npm run img -- --event <event-slug> --all
   ```

   **Or one image at a time** (path or URL):

   ```bash
   npm run img -- "<url-or-path>" --event <event-slug> --kind cover
   npm run img -- "<url-or-path>" --event <event-slug> --kind avatar --name jane-doe
   ```

   Use the printed `/img/events/<event-slug>/...` paths as the field values.

3. **Create `data/<event-slug>/event.yml`** with the schema below (a single YAML
   mapping — no leading `-`, since it's one event per file).

4. **Ordering (optional).** Events are listed by date by default (upcoming
   soonest-first, past most-recent-first). To pin a specific order, add the slug
   to `data/events.order.yml` — that file is the primary order source; anything
   not listed falls back to date order.

5. **Verify**: `npm run typecheck` then `npm run build` (must emit `out/` cleanly).

## Schema — `data/<slug>/event.yml`

Required fields:

```yaml
title: 'API Days Tokyo' # display name
slug: api-days-tokyo # MUST equal the folder name; used in the URL
event_date: 'October 14 — 15, 2026' # human string; em dash (—) for ranges
location: 'Tokyo International Forum, Japan'
type: 'Event' # 'Event' | 'Conference' | 'Masterclass'
status: 'upcoming' # 'active' (featured) | 'upcoming' | 'finished'
image: '/img/events/api-days-tokyo/cover.webp' # repo-hosted WebP from step 2
time_start: '09:00'
time_end: '17:00'
description: 'One-line summary of the event.'
permalink: '/events/api-days-tokyo' # must be '/events/' + slug
speakers: # [] if none (e.g. past events)
  - name: Jane Doe
    position: 'Staff Engineer | Acme'
    photo: '/img/events/api-days-tokyo/speakers/jane-doe.webp' # from step 2
tags: [event] # lowercase of type, e.g. [conference]
```

Optional detail-page fields (omit if not known yet):

```yaml
metaTitle: 'API Days Tokyo' # SEO title override
metaDescription: 'Join us at API Days Tokyo'
sponsors:
  - name: boomi
agenda: # event-page schedule: date -> category -> sessions
  'October 14':
    'Opening and keynote':
      - title: 'Welcome'
        time: '09:00 — 09:25'
        permalink: /events/talks/tokyo-welcome # optional, links to a talk below
        speakers:
          - name: Jane Doe
            position: 'Staff Engineer | Acme'
            photo: '/img/events/api-days-tokyo/speakers/jane-doe.webp'
            tag: OAI # optional badge
talks: # individual talk pages at /events/talks/<slug>
  - slug: tokyo-welcome
    title: 'Welcome'
    description: 'Full talk description.'
    time: 'October 14, 09:00 — 09:25'
    category: 'Opening and keynote'
    speakers:
      - name: Jane Doe
        position: 'Staff Engineer | Acme'
        photo: '/img/events/api-days-tokyo/speakers/jane-doe.webp'
    schedule: # sidebar day schedule on the talk page
      - { time: '09:00', title: 'Welcome', permalink: /events/talks/tokyo-welcome }
```

`talks[]` do not repeat the event title/date — those are derived from the parent.

### Field rules

- **slug** — unique kebab-case, **equal to the folder name**; `permalink` must be
  `/events/<slug>`. For yearly past editions, suffix the year (e.g. `api-days-tokyo-2025`).
- **status** — `active` renders as the featured card; `upcoming` is a normal
  upcoming card; `finished` shows on the past-events page.
- **type / tags** — `tags` is the lowercased `type` in a list: `Event`→`[event]`,
  `Conference`→`[conference]`, `Masterclass`→`[masterclass]`.
- **speakers** — `[]` when none. Each needs `name`, `position`, local `photo`.
- **event_date** — uses an em dash `—` (not hyphen) for ranges; match existing rows.

## Adding a speaker to an existing event

Convert the avatar into that event's folder
(`npm run img -- "<url-or-path>" --event <event-slug> --kind avatar --name <speaker-slug>`),
then add an entry to that event's `speakers:` list in
`data/<event-slug>/event.yml` with the printed `/img/events/<event-slug>/speakers/...`
path. No new file.

## After adding

Confirm it validates (`npm run typecheck` / `npm run build`) and tell the user
the event URL (`/events/<slug>`). Both deploy targets pick it up: the GitHub
Pages build and the Cloudflare Worker build both bundle every `event.yml`.
