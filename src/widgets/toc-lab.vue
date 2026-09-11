<script setup>
/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * toc-lab.vue — TEMPORARY. The switcher for comparing three table-of-contents
 * designs on a real article, the way the section rail's six were compared.
 *
 * Opened by `?toc-lab` on any article, and remembered in localStorage so the
 * panel follows the owner from article to article until it is closed. It writes
 * `data-toc="a|b|c"` on <html>; design A lives in blog-post.vue (it is what
 * every reader sees meanwhile), and B and C live HERE, so they only ever reach a
 * browser that is comparing.
 *
 * WHEN THE OWNER PICKS: move the winning design into blog-post.vue unscoped,
 * delete this file, its size-limit entry, the `?toc-lab` hook in blog-post.vue
 * and the `html[data-toc]` scoping — in ONE change. size-limit fails on a glob
 * that matches nothing, so the budget entry cannot outlive the chunk.
 *
 * The labels are English and hard-coded on purpose: this is a review tool the
 * owner opens by hand, not something a reader is ever shown.
 */

import { onMounted, ref } from 'vue';

const emit = defineEmits(['close']);

const DESIGNS = [
  { id: 'a', name: 'Ledger' },
  { id: 'b', name: 'Track' },
  { id: 'c', name: 'Panel' },
];
const LAB_KEY = 'kyo:toc-lab';
const DESIGN_KEY = 'kyo:toc-design';

const current = ref('a');

const store = (key, value) => {
  try {
    if (value === null) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, value);
    }
  } catch {
    /* private mode */
  }
};

const choose = (id) => {
  current.value = id;
  document.documentElement.dataset.toc = id;
  store(DESIGN_KEY, id);
};

const close = () => {
  store(LAB_KEY, null);
  store(DESIGN_KEY, null);
  delete document.documentElement.dataset.toc;
  emit('close');
};

onMounted(() => {
  store(LAB_KEY, '1');
  let saved = 'a';
  try {
    saved = window.localStorage.getItem(DESIGN_KEY) || 'a';
  } catch {
    /* private mode */
  }
  choose(DESIGNS.some((d) => d.id === saved) ? saved : 'a');
});
</script>

<template>
  <aside class="toc-lab" aria-label="Table of contents designs">
    <span class="toc-lab__label">TOC</span>
    <button
      v-for="d in DESIGNS"
      :key="d.id"
      type="button"
      class="toc-lab__cell"
      :class="{ 'is-active': current === d.id }"
      :aria-pressed="String(current === d.id)"
      @click="choose(d.id)"
    >
      <span class="toc-lab__id">{{ d.id.toUpperCase() }}</span>
      <span class="toc-lab__name">{{ d.name }}</span>
    </button>
    <button
      type="button"
      class="toc-lab__cell toc-lab__close"
      aria-label="Close the comparison"
      @click="close"
    >
      ×
    </button>
  </aside>
</template>

<!-- The switcher itself: one bordered strip of cells, hero-data-feed's chip
     idiom, pinned under the nav bar so it never meets the chip in the corner. -->
<style lang="scss" scoped>
.toc-lab {
  position: fixed;
  top: 5.25rem;
  left: 0.75rem;
  z-index: 40;
  display: flex;
  align-items: stretch;
  border: 1px solid var(--clr-border-100);
  background: var(--clr-neutral-500);
  font-family: "SpaceMono", monospace;
  font-size: var(--fs-100);
  letter-spacing: 0.1em;
  text-transform: uppercase;

  &__label {
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
    color: var(--clr-neutral-300);
  }

  &__cell {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    padding: 0.6rem 0.75rem;
    border: 0;
    border-left: 1px solid var(--clr-border-100);
    background: transparent;
    color: var(--clr-neutral-50);
    font: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
    cursor: pointer;
    outline-offset: -2px;
    transition: background-color 0.15s ease, color 0.15s ease;

    &:hover,
    &:focus-visible { background: color-mix(in srgb, var(--clr-neutral-100) 6%, transparent); }

    &.is-active { color: var(--clr-primary-100); }
  }

  /* The name is what is being judged, so it shows wherever there is room; a
     phone gets the letters. */
  &__name {
    display: none;

    @include min-media-query(sm) { display: inline; }
  }
}
</style>

<!--
  B AND C — UNSCOPED, because they dress the engine's markup inside v-html, and
  keyed to `html[data-toc]` so they only apply while this switcher has chosen
  them. Both build on the shared reset in blog-post.vue.
-->
<style lang="scss">
/*
 * B — TRACK. The contents as a route through the article: one vertical hairline
 * with a square node per section, the way the landing's experience timeline
 * strings its roles — squared, because nothing on this site is round.
 * Subsections branch off the track on short ticks, a step down in size and tone.
 * The header is the article's own panel idiom: the code blocks' small square
 * mark before a mono label, and the count at the far end.
 */
html[data-toc="b"] .org-root nav.org-toc {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  column-gap: 1rem;

  .org-toc-title {
    display: flex;
    gap: 0.6rem;
    align-items: center;
    color: var(--o2h-ink);

    &::before {
      width: 0.5rem;
      height: 0.5rem;
      background: var(--o2h-accent);
      content: "";
    }
  }

  /* The count sits at the far end of the HEADER row; left to auto-placement it
     fell in after the list, under the last entry. */
  &::after {
    grid-row: 1;
    grid-column: 2;
    color: var(--o2h-mute);
    font-family: var(--o2h-font-mono);
    font-size: var(--o2h-label-size);
    letter-spacing: 0.14em;
    content: attr(data-count);
  }

  > ul {
    position: relative;
    grid-column: 1 / -1;
    margin-top: 1.25rem;
    padding-left: 1.75rem;

    &::before {
      position: absolute;
      top: 0.9rem;
      bottom: 0.9rem;
      left: 0.3rem;
      width: 1px;
      background: var(--o2h-line);
      content: "";
    }
  }

  > ul > li > .org-toc-link {
    position: relative;
    padding: 0.45rem 0;

    &::before {
      position: absolute;
      top: calc(0.45rem + 0.5lh - 0.3rem);
      left: -1.75rem;
      box-sizing: border-box;
      width: 0.6rem;
      height: 0.6rem;
      border: 1px solid var(--o2h-line-firm);
      background: var(--o2h-bg);
      transition: background-color 0.15s ease, border-color 0.15s ease;
      content: "";
    }
  }

  ul ul { margin: -0.1rem 0 0.4rem; }

  ul ul .org-toc-link {
    position: relative;
    padding: 0.22rem 0 0.22rem 1.1rem;

    &::before {
      position: absolute;
      top: calc(0.22rem + 0.5lh);
      left: -1.45rem;
      width: 2rem;
      height: 1px;
      background: var(--o2h-line);
      content: "";
    }
  }

  .org-toc-link:hover,
  .org-toc-link:focus-visible {
    background-color: var(--blog-toc-lift);
    box-shadow: 0.75rem 0 0 var(--blog-toc-lift);
    color: var(--o2h-accent);
  }

  > ul > li > .org-toc-link:hover::before,
  > ul > li > .org-toc-link:focus-visible::before {
    border-color: var(--o2h-accent);
    background: var(--o2h-accent);
  }
}

/*
 * C — PANEL. The contents as a HUD panel: a header bar with the article's square
 * mark, the label and the count, over a grid of section cells cut by hairlines —
 * the chip-strip and footer-block idiom, where every cell is framed by the same
 * 1px line. Each cell carries its section's number and title with the
 * subsections listed under it, so a long article reads as a map of blocks
 * rather than a column. Two cells a row from `sm`, one on a phone; an odd last
 * cell takes the whole row rather than leaving a hole.
 */
html[data-toc="c"] .org-root nav.org-toc {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  border: var(--o2h-border);
  counter-reset: toc;

  .org-toc-title {
    display: flex;
    gap: 0.6rem;
    align-items: center;
    padding: 0.85rem 1.25rem;
    color: var(--o2h-ink);

    &::before {
      width: 0.5rem;
      height: 0.5rem;
      background: var(--o2h-accent);
      content: "";
    }
  }

  &::after {
    grid-row: 1;
    grid-column: 2;
    padding: 0.85rem 1.25rem;
    color: var(--o2h-mute);
    font-family: var(--o2h-font-mono);
    font-size: var(--o2h-label-size);
    letter-spacing: 0.14em;
    content: attr(data-count);
  }

  > ul {
    display: grid;
    grid-column: 1 / -1;
    gap: 1px;
    border-top: var(--o2h-border);
    background: var(--o2h-line);

    @include min-media-query(sm) {
      grid-template-columns: repeat(2, minmax(0, 1fr));

      > li:last-child:nth-child(odd) { grid-column: 1 / -1; }
    }
  }

  > ul > li {
    padding: 1rem 1.25rem 1.1rem;
    background: var(--o2h-bg);
    counter-increment: toc;
    transition: background-color 0.15s ease;

    &:has(> .org-toc-link:hover, > .org-toc-link:focus-visible) {
      background: color-mix(in srgb, var(--clr-neutral-100) 3%, var(--o2h-bg));
    }
  }

  > ul > li > .org-toc-link {
    &::before {
      display: block;
      margin-bottom: 0.4rem;
      color: var(--o2h-mute);
      font-family: var(--o2h-font-mono);
      font-size: var(--o2h-label-size);
      letter-spacing: 0.08em;
      content: counter(toc, decimal-leading-zero);
    }

    &:hover,
    &:focus-visible {
      color: var(--o2h-accent);

      &::before { color: var(--o2h-accent); }
    }
  }

  ul ul { margin-top: 0.55rem; }

  ul ul .org-toc-link {
    padding: 0.15rem 0;

    &:hover,
    &:focus-visible { color: var(--o2h-accent); }
  }
}
</style>
