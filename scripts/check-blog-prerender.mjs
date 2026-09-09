#!/usr/bin/env node
/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * check-blog-prerender.mjs — every blog route the manifest names must exist in
 * dist/ as real HTML, with the article text in it.
 *
 * WHY THIS EXISTS. Blog routes have to be registered in two independent places:
 * src/router.js (so vue-router knows them) and ssgOptions.includedRoutes in
 * vite.config.js (so vite-ssg prerenders them). Missing the second does NOT
 * error — the page still builds, and ships as an empty shell to crawlers. That
 * failure happened during this integration: the manifest was split in two, the
 * prerender list kept reading the old key, and every ARTICLE silently stopped
 * being prerendered while the archive pages kept working.
 *
 * A build that looks green while shipping empty pages to Google is the exact
 * class of silent-wrong-answer this whole pipeline is built to refuse.
 */

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { exitWith, fail, head, line, ok, REPO_ROOT } from './_lib.mjs';

const DIST = resolve(REPO_ROOT, 'dist');
const MANIFEST = resolve(REPO_ROOT, 'src/data/blog/manifest.json');

head('check-blog-prerender');

if (!existsSync(MANIFEST) || !existsSync(DIST)) {
  line('no blog manifest or no dist/ — nothing to check');
  process.exit(0);
}

const m = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const routes = [
  ...Object.values(m.pages || {}).flat().map((p) => p.url),
  ...(m.routes || []).map((p) => p.url),
];

if (routes.length === 0) {
  line('empty manifest — the blog contributes no routes');
  process.exit(0);
}

const failures = [];

for (const url of routes) {
  const file = resolve(DIST, `${url.replace(/^\//, '')}/index.html`);
  if (!existsSync(file)) {
    failures.push(`${url}: NOT prerendered (missing ${file.replace(`${REPO_ROOT}/`, '')})`);
    continue;
  }

  const html = readFileSync(file, 'utf8');

  /* An empty shell still has <html> and the app scripts. What proves the page
     was actually rendered is the app's own root content. */
  if (!html.includes('id="main"')) {
    failures.push(`${url}: prerendered but carries no <main> — an empty shell`);
  }

  /* Exactly one landmark. The engine's Vue SFC would have nested a second
     <main> inside DocumentPage's; the fragment path must not regress to that. */
  const mains = (html.match(/<main/g) || []).length;
  if (mains !== 1) {
    failures.push(`${url}: ${mains} <main> landmarks, expected exactly 1`);
  }
}

/* The articles must carry their body, not just their chrome. */
for (const row of m.routes || []) {
  const file = resolve(DIST, `${row.url.replace(/^\//, '')}/index.html`);
  if (!existsSync(file)) {
    continue;
  }
  if (!readFileSync(file, 'utf8').includes('org-root')) {
    failures.push(`${row.url}: no .org-root in the HTML — the article body did not render`);
  }
}

if (failures.length === 0) {
  ok(`${routes.length} blog route(s) prerendered with exactly one <main>`);
} else {
  /* Name every one: "2 issues" is not actionable at 03:00. */
  for (const f of failures) {
    fail(f);
  }
}

exitWith({ failures, name: 'check-blog-prerender' });
