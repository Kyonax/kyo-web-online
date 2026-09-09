/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * use-blog-images.js — resolve a post's card image to a real asset.
 *
 * org2html does NOT copy content images and --asset-base does not rewrite
 * their URLs; both are scoped to the assets the engine itself writes. So the
 * blog repo keeps its images in media/, scripts/sync-blog.mjs copies them into
 * src/assets/blog/, and the site's own pipeline (scripts/convert-images.mjs)
 * emits the AVIF/WebP siblings and records intrinsic dimensions.
 *
 * WIDTH AND HEIGHT ARE THE POINT. Without them the card grid reflows as each
 * image lands, and the Lighthouse assertion this site holds itself to is
 * cumulative-layout-shift <= 0.1 as an ERROR, not a warning.
 *
 * A local eager glob rather than use-image-manifest.js, following the
 * precedent in now-projects-section.vue: that manifest globs only
 * {app,testimonials}, and blog media is a separate, generated directory.
 */

import IMAGE_DIMENSIONS from '@data/image-dimensions.generated.json';

const FILES = import.meta.glob('@assets/blog/**/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const baseOf = (p) => String(p || '').split('/').pop() || '';
const stemOf = (name) => {
  const dot = name.lastIndexOf('.');
  return dot > 0 ? name.slice(0, dot) : name;
};

/* basename -> served URL, for every raster the sync copied in. */
const BY_NAME = new Map();
for (const [path, url] of Object.entries(FILES)) {
  BY_NAME.set(baseOf(path), url);
}

const pick = (name, ext) => BY_NAME.get(`${stemOf(name)}.${ext}`) || null;

/**
 * The card image for a post, or null when it has none — which is a normal
 * state, not an error: #+HERO_IMAGE is deliberately outside the engine's card
 * ranking, so a hero-only post renders the text variant.
 */
export const blogCardImage = (post) => {
  if (!post || !post.cardImage) {
    return null;
  }
  const name = baseOf(post.cardImage);
  const fallback = BY_NAME.get(name);
  if (!fallback) {
    return null;
  }
  const dims = IMAGE_DIMENSIONS[stemOf(name)] || null;
  return {
    fallback,
    avif: pick(name, 'avif'),
    webp: pick(name, 'webp'),
    width: dims ? dims.w : null,
    height: dims ? dims.h : null,
  };
};

export default { blogCardImage };
