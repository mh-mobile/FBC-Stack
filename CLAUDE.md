# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FBC-Stack is a Next.js application that showcases services built by Fjord Boot Camp (FBC) graduates and their technology stacks, with optional AI-generated podcast summaries for each service.

## Tech Stack

- Next.js 15 (App Router, SSG) + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/postcss`)
- Node.js >= 24 (see `.nvmrc`)

## Common Development Commands

```bash
npm run dev              # Start dev server with HTTPS (copies posts/*.md to public/posts first)
npm run build            # Production build (prebuild copies posts/*.md to public/posts)
npm run start            # Start production server
npm run lint             # Run ESLint
npm run format           # Format with Prettier
npm run e2e              # Start server + run Cypress interactively
npm run e2e:headless     # Start server + run Cypress headlessly
npx cypress run --spec "cypress/e2e/navigation.cy.ts"  # Run a single spec (server must be running)
```

## Architecture

### Content Management

All content is file-based; there is no database.

- **Services**: `/posts/*.md` — frontmatter matches `PostData` (`types/postData.ts`): `date`, `title`, `author`, `website`, `blog`, `published`, `hasAudio`, `code` (GitHub repos with descriptions), and `stack` (categories with `name`/`version` tool entries). Markdown body is the service description.
- **Tools**: `/tools/*.md` — frontmatter matches `ToolData` (`types/toolData.ts`): `toolName`, `url`, optional `alias`. Tool names in a post's `stack` are matched to tool pages case-insensitively via `toolName` or `alias` (see `createToolPathInfo` in `app/lib/posts.ts`).
- **Podcast metadata**: `/podcast_data/*.json` keyed by post ID (`PodcastData` in `app/lib/podcast.ts`: audio URL, chapters, show notes, transcript URL). This directory is optional — all readers return `null`/`[]` when it is absent, so the site builds without it.

### Build Process

`predev`/`prebuild` copy `posts/*.md` into `public/posts/` (gitignored) so the markdown is also reachable client-side. No other generation steps run during build.

### App Structure (App Router)

- `app/page.tsx` — service list (top page)
- `app/posts/[id]/page.tsx` — service detail (stack, related services, podcast player when data exists)
- `app/tools/page.tsx`, `app/tools/[id]/page.tsx` — tool index and detail (services using the tool)
- `app/stats/page.tsx` — tool usage statistics and yearly rankings
- `app/about`, `app/privacy`, `app/terms`, `app/not-found.tsx`
- `app/api/check-audio/route.ts` — HEAD-checks audio existence at `https://fbc-stack-storage.com/<postId>.m4a`

### Data Loading (`app/lib/`)

- `posts.ts` / `tools.ts` — parse markdown with `gray-matter`; results are module-level cached to avoid repeated file I/O during build
- `podcast.ts` — reads `/podcast_data/*.json`, tolerant of missing files
- `related.ts` — related services by Jaccard similarity of tool stacks
- `stats.ts` — aggregates tool usage per year for the stats page
- `image.ts`, `gtag.ts` — image helpers and Google Analytics

### Podcast System

Audio files are hosted externally at `https://fbc-stack-storage.com/` (not in this repo). A post shows the audio player only when `hasAudio` is true and matching podcast JSON exists. Generation tooling and past data live in `/backup` (gitignored, local only).

## Environment Variables

Defined in `.env.local` (template: `.env.local.template`, values via 1Password):

- `NEXT_PUBLIC_BASE_URL`: Production URL (default: https://fbc-stack.vercel.app)
- `NEXT_PUBLIC_GA_ID`: Google Analytics tracking ID

## Testing

- Cypress E2E tests in `/cypress/e2e/`
- Tests expect the production server on `http://localhost:3000` (`npm run e2e` handles start + wait)

## Claude Code Skills

- `.claude/skills/add_service` — register a new service: analyzes a GitHub repo, generates `posts/<id>.md`, checks tool consistency, verifies the build, and opens a PR
- `.claude/commands/` — `sound_link_remove`, `tech_stack_create`

## Notes

- `/backup` (gitignored) holds local-only working data: podcast JSON, whisper transcripts, one-off scripts, and images. Do not reference it from application code.
