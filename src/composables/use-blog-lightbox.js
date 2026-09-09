/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * use-blog-lightbox.js — make images inside generated prose openable.
 *
 * Every other lightbox on this site is an explicit <UiImageViewer> plus an
 * explicit click handler on a real <button>. Blog article bodies cannot work
 * that way: the markup arrives from org2html as a v-html string, so there is
 * no template to hang a handler on and no component to wrap the image in.
 *
 * So this delegates, exactly as document-page.vue already delegates its
 * [data-tip] tooltips and use-prose-links.js already hardens rel= on links
 * inside v-html output.
 *
 * ACCESSIBILITY. An <img> inside v-html is not an interactive element, and
 * this site's rule is that a hit area is always a real one. The directive
 * therefore UPGRADES each image in place — tabindex, role, an aria-label and
 * Enter/Space — rather than relying on a mouse-only click handler.
 *
 * The engine's own runtime (o2h.js) ships a lightbox that would do this too,
 * but it is deliberately never loaded on these routes: it sets inline cursor
 * styles, mutates documentElement.style.overflow, and appends a back-to-top
 * button and a read-progress bar to <body> that are never removed on an SPA
 * route change.
 */

import { warmImageViewer } from '@composables/use-warm-modal';
import { ref } from 'vue';

/* Images the engine emits for content. .org-hero-image is excluded: the hero
   is already presented at full width and is not a detail to zoom into. */
const SELECTOR = '.org-figure img, .org-image:not(.org-hero-image)';

const pictureFrom = (el) => {
  const src = el.currentSrc || el.getAttribute('src') || '';
  const name = src.split('/').pop() || 'image';
  const dot = name.lastIndexOf('.');
  return {
    /* UiImageViewer's `picture` prop is the raw-URL escape hatch — it takes
       URLs rather than build-manifest keys, which is what generated content
       has. `name`/`ext` only feed its decorative corner label. */
    name: dot > 0 ? name.slice(0, dot) : name,
    ext: dot > 0 ? name.slice(dot + 1) : '',
    fallback: src,
    avif: null,
    webp: null,
  };
};

/**
 * Reactive state for the viewer plus the handler the directive calls.
 * The VIEW renders <UiImageViewer>; a directive cannot.
 */
export const useBlogLightbox = () => {
  const picture = ref(null);
  const alt = ref('');

  const open = (payload) => {
    picture.value = payload.picture;
    alt.value = payload.alt;
  };

  const close = () => {
    picture.value = null;
    alt.value = '';
  };

  return { picture, alt, open, close };
};

const upgrade = (host, label) => {
  for (const img of host.querySelectorAll(SELECTOR)) {
    if (img.dataset.blogLightbox === 'on') {
      continue;
    }
    img.dataset.blogLightbox = 'on';
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    if (!img.getAttribute('aria-label')) {
      img.setAttribute('aria-label', img.getAttribute('alt') || label);
    }
  }
};

const handlerFor = (el) => {
  const open = el._blogLightboxOpen;
  return typeof open === 'function' ? open : null;
};

const activate = (el, target) => {
  const open = handlerFor(el);
  if (!open || !target) {
    return;
  }
  open({ picture: pictureFrom(target), alt: target.getAttribute('alt') || '' });
};

/**
 * v-blog-lightbox="openHandler"
 *
 * Bind on the prose container, not on each image — the images do not exist
 * until v-html has run, and they change whenever the body does.
 */
export const vBlogLightbox = {
  mounted(el, binding) {
    el._blogLightboxOpen = binding.value;
    el._blogLightboxLabel = 'Open image';

    el._blogLightboxClick = (e) => {
      const img = e.target.closest(SELECTOR);
      if (img && el.contains(img)) {
        activate(el, img);
      }
    };

    el._blogLightboxKey = (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') {
        return;
      }
      const img = e.target.closest(SELECTOR);
      if (img && el.contains(img)) {
        e.preventDefault();
        activate(el, img);
      }
    };

    /* Warm the async viewer chunk before it is needed, the same way the hero
       portrait and the project carousel do. */
    el._blogLightboxWarm = (e) => {
      if (e.target.closest(SELECTOR)) {
        warmImageViewer();
      }
    };

    el.addEventListener('click', el._blogLightboxClick);
    el.addEventListener('keydown', el._blogLightboxKey);
    el.addEventListener('pointerenter', el._blogLightboxWarm, true);
    upgrade(el, el._blogLightboxLabel);
  },

  updated(el, binding) {
    el._blogLightboxOpen = binding.value;
    upgrade(el, el._blogLightboxLabel);
  },

  unmounted(el) {
    el.removeEventListener('click', el._blogLightboxClick);
    el.removeEventListener('keydown', el._blogLightboxKey);
    el.removeEventListener('pointerenter', el._blogLightboxWarm, true);
  },
};

export default { useBlogLightbox, vBlogLightbox };
