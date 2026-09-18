# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Shrey Tiwari's personal academic website: a single hand-written static page. No build step, no package manager, no tests, no framework. Three source files matter: `index.html` (all content), `styles.css` (all styling), `script.js` (theme toggle + mobile nav).

## Running locally

```bash
open index.html                 # good enough for most edits
python3 -m http.server 8000     # only if you need a real origin (e.g. testing CDN/CORS behavior)
```

## Deployment

GitHub Pages, repo `ShreyTiwari/shreytiwari.github.io`, custom domain `www.shreytiwari.com` via `CNAME`. **The live site is served from `master`** — pushing there publishes immediately. `main` (2022) and `dev` (2025) are stale; don't assume `main` is current despite git's default-branch hint.

## Architecture notes

**Content is the HTML.** There is no data file, CMS, or templating. Adding a publication, news item, or award means writing another `<div>` in `index.html` that mirrors the class structure of its siblings. The CSS keys off those class names, so copy an adjacent entry rather than inventing markup.

Section order in `index.html` is `hero → about → news → publications → projects → awards → mentoring → service → affiliates`; the nav `<ul class="nav-links">` anchors to a subset of these `id`s. Reordering or renaming a section means updating the nav too.

Per-section entry shapes (copy the neighbors):
- `.publication-item` — `.paper-title`, `.authors` (Shrey's name wrapped in `<strong>`), `.conference`, optional `.status` (`<em>Under Review</em>`) and `.award`, optional `.publication-links` (icon + label anchors), `.skill-tags`. Newest first.
- `.timeline-item` (news) — `.timeline-dot` + `.timeline-content` with `.timeline-date` and an `<h4>` that opens with an emoji. Newest first, with `<!-- YEAR --->` comment separators between years.
- `.award-item`, `.mentoring-item` — date column + content column. Award dates use trailing `&nbsp;` padding to align the column.

**Profile photo rotation.** `#about` shows one of `images/profile-*.jpg` chosen at random per page load. The list lives in a short inline `<script>` directly after the `<img id="profile-photo">` — inline on purpose, so the `src` is set before first paint; moving it to `script.js` (loaded at the end of `<body>`) would make the photo visibly swap after render and fetch two images. A `<noscript>` fallback and the `.profile-image img:not([src])` rule in `styles.css` cover the JS-off case.

To add a photo: crop it **square**, framed wide enough that the setting reads and not just the face — subject roughly a third of the frame height, centered so the circle doesn't clip them (the container is a 300px circle with `object-fit: cover`, so the corners are gone and content near the top/bottom edges is cut at the sides). Export ~800×800 JPEG, drop it in `images/`, and add the filename to that inline array. Full-resolution sources live in `images/originals/` (gitignored, not served) for re-cropping; HEIC files there are unusable in Chrome/Firefox, so anything from that folder must be converted to JPEG first.

**Theming.** `styles.css` defines every color as a custom property under `:root[data-theme="light"]` and `:root[data-theme="dark"]`. Never hardcode a color in a rule — add a token to *both* blocks and reference `var(--…)`. `script.js` sets `data-theme` on `<html>`, persists it to `localStorage` under the key `theme`, and swaps the toggle button's Font Awesome class between `fa-moon` and `fa-sun`.

**Responsive.** Single breakpoint: `@media (max-width: 768px)`. These blocks are scattered — each section's mobile overrides live immediately after that section's desktop rules, not in one collected block at the bottom. Put new overrides next to the rules they override. The mobile nav works by toggling `.nav-active` on `.nav-links` (see `script.js`).

**Affiliates marquee** (`#affiliates`) is a CSS-animated flex strip. Every logo appears **twice** in the HTML (second set marked `<!-- Duplicate items for seamless loop -->`), and the `@keyframes scroll` translate distance is hardcoded for 8 logos: `translateX(calc(-240px * 8 - 5px * 7))` desktop, `-166px * 8` in the mobile block. Adding or removing a logo requires editing the item twice *and* both keyframe formulas, or the loop visibly jumps.

**External dependencies** are CDN `<link>`s in `<head>`: Font Awesome 6 (`fas`/`fab`) and Academicons (`ai ai-google-scholar`). Fonts are the system stack headed by `"Avenir"` — the README's mention of Google Fonts / Nunito Sans is out of date. A Google Analytics `gtag` snippet is also inlined in `<head>`.

External links follow `target="_blank" rel="noopener"`.
