#!/usr/bin/env node
/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * sync-blog.mjs — pull the built blog corpus into this site.
 *
 * Blog CONTENT lives in the kyo-blog repository, not here. That repo builds the
 * .org sources with the published @kyonax/org2html and emits a manifest, one JSON
 * body per post, per-locale search indexes and the post media. This copies those
 * into the places the site's build reads them from.
 *
 * IT MUST NEVER BLOCK A BUILD. If the blog output is not present — a fresh clone,
 * a contributor with no interest in the blog, the existing deploy path before the
 * dispatch wiring lands — this writes an EMPTY manifest and everything downstream
 * becomes a no-op: no routes, no sitemap entries, no audit targets. The site builds
 * exactly as it did before the blog existed. It says which of the two it did.
 *
 *   BLOG_DIST=/path/to/kyo-blog/dist node scripts/sync-blog.mjs
 *
 * Default source is ../kyo-blog/dist, which is the layout on this machine and the
 * layout the deploy workflow creates when it checks the content repo out.
 */

import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { head, line, ok, REPO_ROOT, warn } from './_lib.mjs';

const SRC = resolve(process.env.BLOG_DIST || join(REPO_ROOT, '..', 'kyo-blog', 'dist'));

/* Generated, gitignored. Owned by kyo-blog; a copy here is a build artefact, not
   source, so it is never committed and never reviewed in this repo's PRs. */
const DEST_DATA = join(REPO_ROOT, 'src/data/blog');
const DEST_MANIFEST = join(DEST_DATA, 'manifest.json');
const DEST_POSTS = join(DEST_DATA, 'posts');

/* Served, not bundled: the search index is fetched on demand so it never counts
   against the main-bundle budget. */
const DEST_SEARCH = join(REPO_ROOT, 'public/blog-search');

/* Blog images join the site's own image pipeline, so convert-images.mjs emits their
   AVIF/WebP siblings and records intrinsic dimensions — which is what keeps the
   card grid inside the CLS <= 0.1 Lighthouse assertion. */
const DEST_MEDIA = join(REPO_ROOT, 'src/assets/blog');

const EMPTY = {
  generatedFrom: null,
  base: '/blog',
  origin: 'https://kyonax.com',
  defaultLocale: 'en',
  pageSize: 10,
  locales: [],
  counts: { posts: 0, families: 0, series: 0, pages: 0 },
  posts: [],
  families: {},
  featured: {},
  timeline: {},
  pages: {},
  categories: {},
  tags: {},
  series: {},
};

head('sync-blog');

mkdirSync(DEST_DATA, { recursive: true });

const manifestSrc = join(SRC, 'blog-manifest.json');

if (!existsSync(manifestSrc)) {
  writeFileSync(DEST_MANIFEST, `${JSON.stringify(EMPTY, null, 2)}\n`);
  writeFileSync(
    join(DEST_DATA, 'index.json'),
    `${JSON.stringify({ posts: [], featured: {}, timeline: {}, pages: {}, categories: {}, tags: {}, series: {} }, null, 2)}\n`,
  );
  rmSync(DEST_POSTS, { recursive: true, force: true });
  warn(`no blog build at ${SRC}`);
  line('wrote an EMPTY manifest — the blog contributes no routes to this build');
  line('set BLOG_DIST, or build kyo-blog first, to include it');
  process.exit(0);
}

/* Replace rather than merge: a post deleted in kyo-blog must disappear here, and a
   stale body file left behind would be a route the manifest no longer lists. */
rmSync(DEST_POSTS, { recursive: true, force: true });
rmSync(DEST_SEARCH, { recursive: true, force: true });

cpSync(manifestSrc, DEST_MANIFEST);

/* The rich half: titles, descriptions, card images, per-page item lists. Only
   the archive view imports it, so it lands in that view's chunk rather than in
   the main bundle. */
const indexSrc = join(SRC, 'blog-index.json');
if (existsSync(indexSrc)) {
  cpSync(indexSrc, join(DEST_DATA, 'index.json'));
}

if (existsSync(join(SRC, 'posts'))) {
  cpSync(join(SRC, 'posts'), DEST_POSTS, { recursive: true });
}

const m = JSON.parse(readFileSync(DEST_MANIFEST, 'utf8'));

mkdirSync(DEST_SEARCH, { recursive: true });
for (const locale of m.locales) {
  const f = join(SRC, `blog-search-${locale}.json`);
  if (existsSync(f)) {
    cpSync(f, join(DEST_SEARCH, `blog-search-${locale}.json`));
  }
}

if (existsSync(join(SRC, 'blog', 'media'))) {
  mkdirSync(DEST_MEDIA, { recursive: true });
  cpSync(join(SRC, 'blog', 'media'), DEST_MEDIA, { recursive: true });
}

ok(`synced ${m.counts.posts} post(s) from ${SRC}`);
line(`locales [${m.locales.join(', ')}] · ${m.counts.families} translation group(s) · ${m.counts.pages} archive page(s)`);
