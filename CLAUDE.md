# CLAUDE.md

## Deployment

GitHub Pages, repo `ShreyTiwari/shreytiwari.github.io`, custom domain `www.shreytiwari.com` via `CNAME`. **The live site is served from `master`** — pushing there publishes immediately. `main` (2022) and `dev` (2025) are stale; don't assume `main` is current despite git's default-branch hint.

## Architecture notes

**Content is the HTML.** There is no data file, CMS, or templating. Adding a publication, news item, or award means writing another `<div>` in `index.html` that mirrors the class structure of its siblings. The CSS keys off those class names, so copy an adjacent entry rather than inventing markup.

Section order in `index.html` is `hero → about → news → publications → projects → awards → mentoring → service → affiliates`; the nav `<ul class="nav-links">` anchors to a subset of these `id`s. Reordering or renaming a section means updating the nav too.

Publications and news are newest first; news has `<!-- YEAR --->` separators between years.

**Blog** (`blog/`): posts duplicate the homepage `<head>`, header, and footer, so a change to the shared head/nav/footer has to be made in `index.html` *and* every blog page. Before working on a post, read `blog/CLAUDE.md` (post mechanics and writing guidelines).

**Profile photo rotation.** `#about` shows one of `images/profile-*.jpg` chosen at random per page load. The list lives in a short inline `<script>` directly after the `<img id="profile-photo">` — inline on purpose, so the `src` is set before first paint; moving it to `script.js` (loaded at the end of `<body>`) would make the photo visibly swap after render and fetch two images. A `<noscript>` fallback and the `.profile-image img:not([src])` rule in `styles.css` cover the JS-off case.

**Theming.** `styles.css` defines every color as a custom property under `:root[data-theme="light"]` and `:root[data-theme="dark"]`. Never hardcode a color in a rule — add a token to *both* blocks and reference `var(--…)`. `script.js` sets `data-theme` on `<html>`, persists it to `localStorage` under the key `theme`, and swaps the toggle button's Font Awesome class between `fa-moon` and `fa-sun`.

**Responsive.** Single breakpoint: `@media (max-width: 768px)`. These blocks are scattered — each section's mobile overrides live immediately after that section's desktop rules, not in one collected block at the bottom. Put new overrides next to the rules they override. The mobile nav works by toggling `.nav-active` on `.nav-links` (see `script.js`).

**Affiliates marquee** (`#affiliates`) is a CSS-animated flex strip. Every logo appears **twice** in the HTML (second set marked `<!-- Duplicate items for seamless loop -->`), and the `@keyframes scroll` translate distance is hardcoded for 8 logos: `translateX(calc(-240px * 8 - 5px * 7))` desktop, `-166px * 8` in the mobile block. Adding or removing a logo requires editing the item twice *and* both keyframe formulas, or the loop visibly jumps.

Fonts are the system stack headed by `"Avenir"`; the README's mention of Google Fonts / Nunito Sans is out of date.

External links follow `target="_blank" rel="noopener"`.
