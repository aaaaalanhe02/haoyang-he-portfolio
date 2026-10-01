# Haoyang (Alan) He — Personal Website

Personal portfolio for a materials-science researcher, mountaineer and drummer.
Built with [Astro](https://astro.build), minimal/academic design, deployed to GitHub Pages.

A second site in the same style, aimed at **Financial Risk Analyst** roles, lives at
[`/risk/`](https://aaaaalanhe02.github.io/haoyang-he-portfolio/risk/) and deploys with the main one.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # -> dist/
npm run preview    # preview the production build
```

## Content

- **Projects** live in `src/content/projects/*.mdx` (research, engineering, data).
- **Risk site** (`/risk/`): page copy and CV data in `src/lib/risk.ts`, case studies in
  `src/content/risk/*.mdx`.
- **Photos/videos/PDFs** start as originals in `raw-assets/` (git-ignored) and are converted
  into web assets by:
  ```bash
  npm run assets    # HEIC/TIF/PDF -> src/assets + public/docs  (macOS `sips`)
  npm run videos    # MOV/MP4      -> public/videos             (needs `ffmpeg`)
  ```

## Deploy

Push to `main`; the GitHub Actions workflow builds and publishes to GitHub Pages
(set **Settings → Pages → Source = GitHub Actions**). See `CLAUDE.md` for the `base`-path
note when using a project-page repo.

## Structure

```
src/
  pages/          index + research/ + photography, adventures, music, about, 404
                  risk/ (index + experience/[...slug])  — Financial Risk Analyst site
  content/projects/*.mdx
  content/risk/*.mdx
  components/     Nav, Footer, ProjectCard, Gallery, VideoEmbed
  layouts/BaseLayout.astro
  lib/            site.ts (config + withBase + Profile), galleries.ts, cv.ts, risk.ts
  styles/global.css
  assets/         converted, optimized photos (committed)
public/
  docs/           CV + certificates + papers (PDF)
  videos/         transcoded MP4
scripts/          convert-assets.sh, convert-videos.sh, make-risk-cover.mjs
raw-assets/       original HEIC/MOV/PDF source (git-ignored)
```
