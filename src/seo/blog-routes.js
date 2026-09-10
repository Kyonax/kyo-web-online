/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * blog-routes.js — every blog route, derived from the synced manifest.
 *
 * routes.js says a localised page means "adding its map HERE and nowhere
 * else". That is right for a page you write by hand and impossible for a
 * blog: the archive grows without anyone editing this repo. So the shapes
 * routes.js declares by hand — a locale map per page, an hreflang row set
 * per page — are DERIVED here from src/data/blog/manifest.json, which
 * kyo-blog owns and scripts/sync-blog.mjs copies in.
 *
 * The manifest is small on purpose: metadata only. Post BODIES live in
 * src/data/blog/posts/ and are loaded per route, so importing this module
 * never pulls an article into the main bundle.
 *
 * An empty manifest (no blog checkout) makes every export here empty, and
 * every consumer degrades to "there is no blog" rather than breaking.
 */

import manifest from '@data/blog/manifest.json';

export const BLOG_MANIFEST = manifest;
export const BLOG_BASE = manifest.base || '/blog';
export const BLOG_DEFAULT_LOCALE = manifest.defaultLocale || 'en';
export const BLOG_LOCALES = manifest.locales || [];

const POSTS = manifest.routes || [];
const PAGES = manifest.pages || {};
const FAMILIES = manifest.families || {};
const ORIGIN = manifest.origin || '';

/* The site serves the default locale at the root and every other locale
   under /<locale> — the shape /resume and /es/hoja-de-vida already use. */
const prefixFor = (locale) =>
  (locale === BLOG_DEFAULT_LOCALE ? '' : `/${locale}`);

const indexUrlFor = (locale) => `${prefixFor(locale)}${BLOG_BASE}`;

/*
 * An ENGINE url -> a SITE route.
 *
 * relations.json is data, not navigation [P-00]: the engine writes every url in
 * it ROOT-RELATIVE to its own corpus (`/engineering/2026-05-01-x`), because it
 * does not know where the host mounts the blog or how the host spells a locale.
 * Rendering one of those straight into an `href` produces a path this router has
 * no route for, and the 404 surface sends the reader to the landing page — which
 * is exactly what previous/next, related reading and every series item did.
 *
 * So the base path and the locale prefix are added HERE, once, in the same shape
 * `indexUrlFor` already uses. Idempotent: a url that already carries the prefix
 * is returned untouched, so running it twice cannot double it.
 */
export const blogSiteUrl = (engineUrl, locale) => {
  if (!engineUrl || typeof engineUrl !== 'string' || !engineUrl.startsWith('/')) {
    return engineUrl;
  }
  const prefix = `${prefixFor(locale)}${BLOG_BASE}`;
  return engineUrl.startsWith(`${prefix}/`) || engineUrl === prefix
    ? engineUrl
    : `${prefix}${engineUrl}`;
};

/* Trailing slash is optional in the served URLs (Apache DirectorySlash
   Off), so every comparison accepts both — the rule routes.js applies to
   its own families. */
const strip = (p) => (p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p);

// -------------------------------------------------------------- lookup ----

const BY_URL = new Map();
for (const post of POSTS) {
  BY_URL.set(post.url, post);
}

/* Every archive page, flattened: /blog, /blog/page/2, /es/blog, … */
const PAGE_URLS = new Map();
for (const [locale, pages] of Object.entries(PAGES)) {
  for (const page of pages) {
    PAGE_URLS.set(page.url, { ...page, locale });
  }
}

export const blogPostAt = (path) => BY_URL.get(strip(path)) || null;
export const blogPageAt = (path) => PAGE_URLS.get(strip(path)) || null;

/* Every archive page for a locale, in order. The pagination renders NUMBERED
   links, so it needs the siblings and not just prev/next — and this reads the
   ROUTING manifest, which routes.js already imports eagerly, so it costs the
   bundle nothing over what is loaded on every page anyway. */
export const blogPagesFor = (locale) => PAGES[locale] || [];

export const BLOG_INDEX_URLS = Object.freeze(
  Object.fromEntries(BLOG_LOCALES.map((l) => [l, indexUrlFor(l)])),
);

// ---------------------------------------------------------- predicates ----

export const isBlogIndexPath = (path) => PAGE_URLS.has(strip(path));
export const isBlogPostPath = (path) => BY_URL.has(strip(path));

/*
 * A PREFIX test, not an exact-match table. routes.js's _matches() compares
 * whole paths against a frozen two-entry map, which cannot express an
 * archive — a post route is only known at build time. Anything under the
 * base is a blog path, including one the manifest does not name, so it
 * renders blog chrome rather than falling through to landing chrome with
 * dead section anchors.
 */
export const isBlogPath = (path) => {
  const p = strip(path);
  if (p === BLOG_BASE || p.startsWith(`${BLOG_BASE}/`)) {
    return true;
  }
  return BLOG_LOCALES.some((l) => {
    if (l === BLOG_DEFAULT_LOCALE) {
      return false;
    }
    const base = `/${l}${BLOG_BASE}`;
    return p === base || p.startsWith(`${base}/`);
  });
};

// ------------------------------------------------------------ families ----

/*
 * "Same page, other locale" — the question the language toggle asks.
 * Without this a visitor switching language on a post is bounced to the
 * landing, the exact bug the comment in routes.js warns about.
 */
export const blogLocaleSwapTarget = (path, targetLocale) => {
  const p = strip(path);

  const post = BY_URL.get(p);
  if (post) {
    const family = FAMILIES[post.key];
    return (family && family[targetLocale]) || indexUrlFor(targetLocale);
  }

  if (PAGE_URLS.has(p)) {
    /* Page N in one locale is not page N of the same posts in another —
       the archives are independent. Land on that locale's index rather
       than an invented page number. */
    const pages = PAGES[targetLocale] || [];
    return (pages[0] && pages[0].url) || indexUrlFor(targetLocale);
  }

  return indexUrlFor(targetLocale);
};

/*
 * The hreflang rows for a path, built from the translation groups. A post
 * pairs with its twin; an archive page pairs with the same page number in the
 * other locale, falling back to that locale's index.
 */
export const blogAlternatesFor = (path) => {
  const p = strip(path);

  const post = BY_URL.get(p);
  if (post) {
    const family = FAMILIES[post.key] || {};
    const rows = Object.entries(family)
      .map(([l, u]) => ({ hreflang: l, href: `${ORIGIN}${u}` }));
    const xd = family[BLOG_DEFAULT_LOCALE] || post.url;
    rows.push({ hreflang: 'x-default', href: `${ORIGIN}${xd}` });
    return rows;
  }

  const page = PAGE_URLS.get(p);
  if (!page) {
    return [];
  }

  const rows = BLOG_LOCALES
    .filter((l) => (PAGES[l] || []).length > 0)
    .map((l) => {
      const twin = (PAGES[l] || [])[page.number - 1];
      const href = page.number === 1 || !twin ? indexUrlFor(l) : twin.url;
      return { hreflang: l, href: `${ORIGIN}${href}` };
    });

  rows.push({
    hreflang: 'x-default',
    href: `${ORIGIN}${indexUrlFor(BLOG_DEFAULT_LOCALE)}`,
  });
  return rows;
};

/* The { en, es } canonical map useSeoHead expects. */
export const blogUrlsFor = (path) => Object.fromEntries(
  blogAlternatesFor(path)
    .filter((a) => a.hreflang !== 'x-default')
    .map((a) => [a.hreflang, a.href]),
);

// -------------------------------------------------------------- routes ----

/*
 * Every blog path this site serves. vite-ssg prerenders only what
 * router.getRoutes() enumerates and skips anything carrying a :param, so
 * every post and every archive page is registered as a STATIC route.
 */
export const blogRoutePaths = () => [...PAGE_URLS.keys(), ...BY_URL.keys()];

export const localeOfBlogPath = (path) => {
  const p = strip(path);
  const post = BY_URL.get(p);
  if (post) {
    return post.locale;
  }
  const page = PAGE_URLS.get(p);
  return (page && page.locale) || BLOG_DEFAULT_LOCALE;
};
