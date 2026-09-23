# Deploying this blog to GitHub Pages

This repo is `thainaviadroski/blog`, so it's a **project page**, served at:

```
https://thainaviadroski.github.io/blog/
```

Everything needed to build and deploy is already set up. This file explains how it works and what to do when things change.

## One-time setup (do this once, in the GitHub UI)

1. Go to the repo on GitHub → **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions** (not "Deploy from a branch").
3. Push to `main`. The first push after this setting is applied will trigger the workflow and publish the site.

That's it — no `gh-pages` branch, no personal access tokens to manage.

## How deployment works

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) runs automatically on every push to `main` (and can also be triggered manually from the Actions tab):

1. Installs dependencies (`npm ci`).
2. Runs `npm run build -- --configuration production --base-href /blog/`, which:
   - Regenerates `src/assets/links.json` from the markdown files in `src/assets/` (via [scriptGenearateMarkdownListLinks.js](scriptGenearateMarkdownListLinks.js)).
   - Builds the Angular app for production, with `/blog/` baked in as the base href (required because the site is served from a sub-path, not the domain root).
3. Uploads `dist/my-blog/browser` as the Pages artifact and deploys it.

You don't need to build or push a `dist/` folder yourself — it's built fresh in CI every time.

## Publishing a new post

1. Add a new markdown file under `src/assets/<category>/`, following the existing format (see `src/assets/java/teste.md`):
   ```
   # Post Title

   description: One-line summary shown on the home page card.
   tags: tag1, tag2
   date: 2026-09-22
   img: cover.png

   Post body in markdown...
   ```
   - `title` (the `# H1` line), `description`, `tags` and `date` are required — the build script throws if any is missing.
   - `date` (`YYYY-MM-DD`) drives sorting on the home page.
   - `img` is optional — a filename in the same folder as the post, shown as the card thumbnail and the post's cover image. Omit the line entirely if there's no cover image.
2. Commit and push to `main`.
3. The workflow rebuilds `links.json` and redeploys automatically. No manual step needed.

## Building/previewing locally

```
npm install
npm start
```

This regenerates `links.json` and starts `ng serve` at `http://localhost:4200/` with the default `/` base href — no `/blog/` prefix needed locally.

To sanity-check the actual production build before pushing:

```
npm run build -- --configuration production --base-href /blog/
npx http-server dist/my-blog/browser
```

## Clean URLs (`/blog/post/slug`, no `#`) via the 404.html trick

Routing uses Angular's default path-based `PathLocationStrategy`, so URLs look like `/blog/post/some-slug` — no `#`.

The catch: GitHub Pages only serves static files, so it has no way to redirect an arbitrary path like `/blog/post/some-slug` back to `index.html` on its own — a direct link, bookmark, or page refresh on that URL would normally 404. This is solved with the well-known ["SPA GitHub Pages" trick](https://github.com/rafgraph/spa-github-pages), already wired up in this repo:

1. **[src/404.html](src/404.html)** — GitHub Pages serves this for any unrecognized path. It encodes the real path into a query string (e.g. `/blog/post/some-slug` → `/blog/?/post/some-slug`) and redirects there.
2. **[src/index.html](src/index.html)** — has an inline script that runs before Angular boots, decodes that query string, and uses `history.replaceState` to restore the real URL. The Angular Router then sees the correct path.
3. **[angular.json](angular.json)** — `src/404.html` is listed under `build.options.assets`, so it gets copied to `dist/my-blog/browser/404.html` on every build (right where GitHub Pages expects a custom 404 page).

You'll briefly see a 404 network request in the browser console on a cold hit to a deep link — that's expected and harmless; it's how the trick works, and the page corrects itself immediately.

`pathSegmentsToKeep = 1` in `src/404.html` assumes the site is served at a one-segment sub-path (`/blog/...`). If the repo is renamed or moved (see below), that number may need to change too.

## If the repo is ever renamed or moved

The base href (`/blog/`) is only set at build time via the `--base-href` flag — it's not hardcoded in `src/index.html`. If the repo name changes, or you move to a user page (`thainaviadroski.github.io`, served at the domain root), update:
- The `--base-href` value in [.github/workflows/deploy.yml](.github/workflows/deploy.yml):
  - Project page `thainaviadroski.github.io/<repo>/` → `--base-href /<repo>/`
  - User/root page `thainaviadroski.github.io/` → `--base-href /`
- `pathSegmentsToKeep` in [src/404.html](src/404.html) — `1` for a one-segment sub-path like `/blog/`, `0` for a root-served user page.

## Troubleshooting

- **Blank page / assets 404 after deploy**: usually a base-href mismatch — confirm it matches the actual sub-path the site is served from.
- **A direct link to a post 404s for real (doesn't recover)**: confirm `dist/my-blog/browser/404.html` exists after a build, and that `pathSegmentsToKeep` in `src/404.html` matches the site's actual sub-path depth.
- **Workflow fails on the build step**: check that every markdown file under `src/assets/` has `tags:`, `date:` and `description:` lines — the generator script throws if any is missing.
- **Pages isn't updating**: confirm Settings → Pages → Source is set to "GitHub Actions", and check the Actions tab for the workflow run status.
