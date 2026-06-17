---
name: convert-image
description: Convert an event cover, speaker avatar, or gallery photo to the site's best-fit size and WebP, saving it per-event under public/img/events/<event-slug>/ so the site serves repo-hosted copies instead of remote URLs. Use when adding or updating event images, speaker photos, or gallery shots, or when asked to optimize/resize/host an image locally.
---

# Convert images for the OpenAPI events site (per event)

Resizes images to the right dimensions for where they're used, converts to WebP,
and writes them **per event** under `public/img/events/<event-slug>/`. Accepts a
**local file path or a remote URL** (it downloads URLs). Backed by
`scripts/convert-image.mjs` (uses `sharp`).

## Where images live

Raw source images go in a **gitignored inbox**, converted WebP go in `public/img`:

```
source-images/<event-slug>/        ← raw inbox (gitignored, never committed)
  cover.jpg                         ← the event image (must be named cover.*)
  jane-doe.png                      ← name each speaker file after the speaker (kebab-case)
  frank-kilcommins.jpg
  gallery/                          ← optional event photos
    anything.jpg

public/img/events/<event-slug>/    ← committed output
  cover.webp
  speakers/jane-doe.webp
  speakers/frank-kilcommins.webp
  gallery/01.webp                   ← gallery files are renumbered in sorted order
```

**Naming convention:** the raw filename becomes the slug. Name a speaker's file
exactly after the speaker (`frank-kilcommins.jpg` → `/speakers/frank-kilcommins.webp`),
and name the event image `cover.*`.

## Usage

### Batch a whole event inbox (preferred)

Drop everything into `source-images/<event-slug>/`, then:

```bash
npm run img -- --event <event-slug> --all
```

Converts `cover.*` → `cover.webp`, every other top-level image → a speaker avatar,
and any `gallery/*` → numbered gallery images.

### Single image (path or URL)

```bash
npm run img -- <input> --event <event-slug> --kind <cover|avatar|gallery> [--name <slug>]
```

- `<input>` — local path or `https://…` URL.
- `--event` — the event slug; selects the destination folder. **Required.**
- `--kind` — `cover` (event image), `avatar` (speaker), or `gallery`.
- `--name` — output slug. For `avatar`/`gallery` from a URL, pass the speaker
  slug. For `cover` it defaults to `cover`.

The converted file's public path is printed (e.g.
`/img/events/api-days-tokyo/speakers/jane-doe.webp`) — paste it into `events.yml`.

## Sizes

| `--kind` | Used for | Output | Path |
|----------|----------|--------|------|
| `cover`  | event `image` (card/hero) | width 1200, aspect kept | `/img/events/<event>/cover.webp` |
| `avatar` | speaker `photo` (64px, square) | 320×320, center-cropped | `/img/events/<event>/speakers/<name>.webp` |
| `gallery`| event photo gallery / lightbox | width 1600, aspect kept | `/img/events/<event>/gallery/NN.webp` |

Images are never enlarged beyond their source resolution.

## Examples

```bash
# Whole event at once from the inbox
npm run img -- --event api-days-tokyo --all

# One speaker avatar from a URL
npm run img -- "https://i.pravatar.cc/512?img=11" --event api-days-tokyo --kind avatar --name frank-kilcommins

# Event cover from a local file
npm run img -- ./downloads/tokyo.jpg --event api-days-tokyo --kind cover
```

## Notes

- Requires dependencies installed (`npm ci`); `sharp` does the encoding.
- For higher quality, give a large source (pravatar `…/512`, unsplash `?w=2000`) —
  downscaling beats upscaling.
- `source-images/` is gitignored; only the converted WebP under `public/img/` is
  committed. See the `add-event` skill, which calls this for you.
