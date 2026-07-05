# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Haoyang "Alan" He's personal portfolio site — an **Astro** static site (materials-science
researcher, mountaineer, drummer). Deployed to **GitHub Pages**. Design is deliberately
minimal/academic (single accent blue, sans-serif system fonts, generous whitespace),
modeled loosely on `choraschan.github.io`.

## Commands

```bash
npm run dev        # local dev server (hot reload) at http://localhost:4321
npm run build      # production build -> dist/  (also optimizes all images to WebP)
npm run preview    # serve the built dist/ locally — closest to production
npm run assets     # re-run image/PDF pipeline: raw-assets/ -> src/assets + public/docs
npm run videos     # re-run video pipeline: raw-assets/ -> public/videos (needs ffmpeg)
```

There is no separate lint/test step. Treat a clean `npm run build` as the gate — it type-checks
content-collection frontmatter and fails on missing images or broken `image()` references.

## Asset pipeline (important, non-obvious)

Raw camera files can't ship to the web: **browsers can't display HEIC, and Astro's image
service (sharp) can't decode HEIC either**, so images are pre-converted before Astro ever
sees them. Videos (`.MOV`) likewise need transcoding.

Flow: `raw-assets/` (git-ignored source of truth) → conversion scripts → committed web assets.

- `scripts/convert-assets.sh` — uses macOS `sips` to convert HEIC/TIF → downscaled JPG/PNG
  into `src/assets/<section>/` (e.g. `kilimanjaro/`, `hyped/`, `biofilm/`), and copies PDFs
  (CV, honours thesis, UCL literature review, certificates) into `public/docs/`.
- `scripts/convert-videos.sh` — uses `ffmpeg` to transcode MOV/MP4 → web H.264 MP4 into
  `public/videos/`. **The `-nostdin` flag on ffmpeg is required** — without it ffmpeg eats the
  `while read` loop's stdin and corrupts subsequent filenames.

`raw-assets/` is `.gitignore`d; the converted outputs in `src/assets/` and `public/` ARE
committed, so CI/GitHub Pages builds without needing the originals. To add new photos: drop
them in the relevant `raw-assets/` folder and re-run `npm run assets` (and `npm run videos`).

## Architecture

**Content collection `projects`** (`src/content.config.ts`, entries in
`src/content/projects/*.mdx`) is the single source for research/engineering/data work.
Frontmatter drives everything; MDX body is just prose. Key fields:
- `cover` (image() — relative path into `src/assets/…`), `gallery` (a `src/assets/` subdir
  slug — detail page loads the whole folder), `videos` (filenames in `public/videos/`),
  `links`, `category` (`research|engineering|data`), `order`, `featured`.

**Routing / section map:**
- `/` — `src/pages/index.astro`: single-column academic homepage (hero → Interests →
  Education → Experience timeline → Selected work → Adventures preview). Pulls structured
  CV data from `src/lib/cv.ts`.
- `/research` + `/research/[...slug]` — project list + detail (renders MDX, gallery, videos, docs).
- `/adventures`, `/music`, `/about`, `/404`.

**Shared helpers:**
- `src/lib/site.ts` — `SITE` constants, `NAV`, and `withBase(path)`. **All internal links and
  `public/` asset URLs must go through `withBase`** so the site works regardless of the
  `base` path (see deployment).
- `src/lib/galleries.ts` — `getGallery(slug)` / `getCover(slug)` eager-glob `src/assets/**`
  and return `ImageMetadata[]` for `<Image>`/`<Gallery>`.
- `src/lib/cv.ts` — education, experience, skills, interests for the homepage.

**Components:** `BaseLayout` (full HTML doc + no-flash theme init), `Nav`/`Footer`,
`ProjectCard`, `Gallery` (each instance is self-contained — it renders its own lightbox and a
module-level `current` tracks only the open one, so multiple galleries per page don't fight over
keyboard nav), `VideoEmbed`.

**Design system:** all tokens are CSS variables in `src/styles/global.css` (colors, type scale,
spacing). Light + dark via `prefers-color-scheme` and a `data-theme` override toggled in `Nav`.

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml` builds with `withastro/action` and deploys via
`actions/deploy-pages` on push to `main`/`master`. In the repo, set **Settings → Pages →
Source = GitHub Actions**.

**Base path** in `astro.config.mjs`:
- User/organization page (`<user>.github.io` repo) or custom domain → keep `base: '/'`.
- Project page (any other repo name) → set `base: '/<repo>'` and update `site`. Because links
  use `withBase`, no other code changes are needed.
