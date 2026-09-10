/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * use-active-section.js — "which section am I in?", answered once.
 *
 * This algorithm lived inside hud-nav.vue, which was fine while the nav was the
 * only thing that needed the answer. The section rail needs the same answer, and
 * two implementations of "where am I" drift into disagreeing — the nav
 * highlighting one section while the rail highlights its neighbour is worse than
 * either being slightly wrong on its own.
 *
 * THE RULE: the LAST section whose top has crossed above the threshold line.
 * Candidates are sorted by their current top, so iterating in page order and
 * keeping the last match gives the section actually filling the screen. The
 * obvious alternative — nearest section to some line — activates the next one
 * while it is still well below the fold, which reads as the highlight running
 * ahead of the reader.
 *
 * Reads layout only inside a rAF, and at most every `interval` ms, so a fast
 * scroll costs one measurement pass per frame budget rather than one per event.
 */

import { onBeforeUnmount, onMounted, ref, unref } from 'vue';

export default function useActiveSection(ids, options = {}) {
  const {
    /* Sections present in the DOM with no entry of their own, mapped to the
       nearest one that does — so scrolling through them does not blank the
       highlight. */
    aliases = {},
    /* Above this scroll position the first section always wins, so the page
       does not open with nothing marked. */
    topId = null,
    topOffset = 80,
    /* Fraction of the viewport height the section top must cross. */
    threshold = 0.5,
    interval = 100,
  } = options;

  const active = ref(topId || (unref(ids)[0] ?? null));

  let frame = 0;
  let last = 0;

  const read = () => {
    frame = 0;
    const now = Date.now();
    if (now - last < interval) {
      return;
    }
    last = now;

    if (topId && window.scrollY < topOffset) {
      active.value = topId;
      return;
    }

    const line = window.innerHeight * threshold;
    const candidates = [...unref(ids), ...Object.keys(aliases)]
      .map((id) => {
        const el = document.querySelector(`#${id}`);
        return el ? { id, top: el.getBoundingClientRect().top } : null;
      })
      .filter(Boolean)
      .sort((a, b) => a.top - b.top);

    let winner = null;
    for (const { id, top } of candidates) {
      if (top <= line) {
        winner = id;
      }
    }
    if (winner) {
      active.value = aliases[winner] ?? winner;
    }
  };

  const onScroll = () => {
    if (frame) {
      return;
    }
    frame = requestAnimationFrame(read);
  };

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    read();
  });

  onBeforeUnmount(() => {
    if (frame) {
      cancelAnimationFrame(frame);
    }
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  });

  return { active };
}
