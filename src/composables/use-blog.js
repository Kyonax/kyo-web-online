/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * use-blog.js — read the synced blog corpus.
 *
 * Two different loads, deliberately kept apart:
 *
 *   INDEX data (titles, dates, card images) comes from the manifest, which is
 *   metadata only and small enough to import eagerly.
 *
 *   POST BODIES come from one JSON file per post, resolved through
 *   import.meta.glob so each article is its OWN chunk. Importing them eagerly
 *   would put every article in the main bundle, and that budget is 180 KB
 *   gzipped for the whole site.
 *
 * The bodies are pre-rendered, pre-sanitized HTML from org2html (jsdom +
 * DOMPurify, sanitize-by-default), which is why the post view can v-html them
 * the same way privacy.vue v-htmls its i18n copy into .doc-rich.
 */

import {
  BLOG_MANIFEST,
  blogPageAt,
  blogPostAt,
  blogSiteUrl,
} from '@seo/blog-routes';

/* The RICH half of the corpus — titles, descriptions, card images, per-page
   item lists. Imported lazily and only by the archive view, so it lands in
   that view's chunk instead of the main bundle, which is budgeted at 180 KB
   gzipped for the whole site. */
const loadIndex = () => import('@data/blog/index.json').then((m) => m.default || m);

/* Lazy: one chunk per post. The keys are paths under src/data/blog/posts/. */
const BODIES = import.meta.glob('@data/blog/posts/*/*.json');

/*
 * The body file is DERIVED from the route, not stored on it.
 *
 * The routing manifest is imported eagerly by routes.js, so every field on a
 * post row costs main-bundle bytes for every visitor on every page. A body
 * path is ~40 bytes each — nothing at two posts, several kilobytes at two
 * hundred — and it is fully recoverable from the URL, so it is not stored.
 *
 * /es/blog/engineering/2026-05-01-x  ->  es/engineering__2026-05-01-x.json
 */
const bodyLoaderFor = (post) => {
  if (!post) {
    return null;
  }
  const base = BLOG_MANIFEST.base || '/blog';
  const prefix = post.locale === (BLOG_MANIFEST.defaultLocale || 'en')
    ? base
    : `/${post.locale}${base}`;
  const tail = post.url
    .slice(prefix.length)
    .replace(/^\//, '')
    .replace(/\//g, '__');
  const want = `/posts/${post.locale}/${tail}.json`;
  const key = Object.keys(BODIES).find((k) => k.endsWith(want));
  return key ? BODIES[key] : null;
};

/*
 * RELATIONS ARE DATA; ROUTES ARE THE HOST'S JOB [P-00].
 *
 * Every url the engine writes into relations.json is relative to the CORPUS
 * root (`/engineering/2026-05-01-x`), not to where this site mounts the blog.
 * Bound straight to an `href` they resolve to a path the router does not know,
 * and the 404 surface lands the reader on the landing page — which is what
 * previous/next, related reading and every series item were doing, in both
 * locales (Spanish lost `/es` as well as `/blog`).
 *
 * They are rewritten ONCE, here, so every component that renders navigation
 * stays dumb and no future component has to remember the rule.
 */
const siteRelations = (relations, locale) => {
  if (!relations) {
    return relations;
  }
  const link = (item) =>
    (item && item.url ? { ...item, url: blogSiteUrl(item.url, locale) } : item);
  return {
    ...relations,
    prev: link(relations.prev),
    next: link(relations.next),
    related: Array.isArray(relations.related) ? relations.related.map(link) : relations.related,
    series: relations.series
      ? {
        ...relations.series,
        items: Array.isArray(relations.series.items)
          ? relations.series.items.map(link)
          : relations.series.items,
      }
      : relations.series,
  };
};

/**
 * The full post at a path: metadata from the manifest, body + head + relations
 * from its own chunk. Returns null for a path that is not a post, so the view
 * can render a not-found state rather than throwing during prerender.
 */
export const loadBlogPost = async (path) => {
  const post = blogPostAt(path);
  const loader = bodyLoaderFor(post);
  if (!loader) {
    return null;
  }
  const mod = await loader();
  const body = mod.default || mod;
  /*
   * `description` is LIFTED OUT OF THE `seo` SIDECAR, and that is a real fix.
   *
   * The routing manifest carries url/locale/key and nothing else — the rich
   * index holds the descriptions and the archive view is the only thing that
   * loads it. So `post.description` was ALWAYS undefined here, and blog-post's
   * `useSeoHead({ description: post.description })` fell through to the
   * catalogue default: every article in both locales published the ARCHIVE's
   * meta description as its own, which is a duplicate-snippet defect across
   * the whole blog.
   *
   * The engine already emits the per-post one at `seo.description`, in the
   * body chunk this function has just loaded — so the fix costs no bytes and
   * no extra request.
   */
  return {
    ...post,
    ...body,
    description: body.description || body.seo?.description || '',
    relations: siteRelations(body.relations, post.locale),
  };
};

/* Resolve URLs against the rich index, order preserved. */
const rowsByUrl = (index, urls = []) => urls
  .map((u) => (index.posts || []).find((p) => p.url === u))
  .filter(Boolean);

/**
 * Everything an archive page renders: the featured post, the rest of that
 * page's posts, and its prev/next page links.
 */
export const loadBlogIndex = async (path) => {
  const page = blogPageAt(path);
  if (!page) {
    return null;
  }

  const index = await loadIndex();
  /* The routing manifest carries page numbers and neighbours; the item LISTS
     live in the rich index, so they are read here rather than eagerly. */
  const bucket = (index.pages?.[page.locale] || [])
    .find((b) => b.number === page.number);
  const posts = rowsByUrl(index, bucket ? bucket.items : []);

  /* The featured slot is the newest post, and only on page 1 — on later pages
     every post is an ordinary row, or the archive would repeat itself. */
  const featured = page.number === 1 ? posts[0] || null : null;
  const rest = featured ? posts.slice(1) : posts;

  return { ...page, featured, rest, posts };
};

export const blogLocales = () => BLOG_MANIFEST.locales || [];

export default { loadBlogPost, loadBlogIndex, blogLocales };
