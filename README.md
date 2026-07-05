# Haoyang (Alan) He — Personal Website

Personal portfolio for a materials-science researcher, mountaineer and drummer.
Built with [Astro](https://astro.build), minimal/academic design, deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # -> dist/
npm run preview    # preview the production build
```

## Content

- **Projects** live in `src/content/projects/*.mdx` (research, engineering, data).
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
  pages/          index + research/ + adventures, music, about, 404
  content/projects/*.mdx
  components/     Nav, Footer, ProjectCard, Gallery, VideoEmbed
  layouts/BaseLayout.astro
  lib/            site.ts (config + withBase), galleries.ts, cv.ts
  styles/global.css
  assets/         converted, optimized photos (committed)
public/
  docs/           CV + certificates + papers (PDF)
  videos/         transcoded MP4
scripts/          convert-assets.sh, convert-videos.sh
raw-assets/       original HEIC/MOV/PDF source (git-ignored)
```
