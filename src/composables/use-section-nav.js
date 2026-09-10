/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * use-section-nav.js — everything the section navigator DOES, so the widget
 * only has to decide what it LOOKS like.
 *
 * It was written to hold six competing designs to one behaviour while they were
 * being compared, so that the comparison measured the designs rather than their
 * bugs. One design was kept — the chip — and everything the others needed is
 * deleted with them: the pointer-proximity reveal that opened a rail when the
 * cursor neared the right edge, its coarse-pointer fallback, and the focus
 * in/out pair that stood in for hover on a keyboard. A button needs none of it.
 *
 * The scroll-spy is delegated to `use-active-section`, which `hud-nav` also
 * reads, so the nav bar and the chip can never disagree about where the reader
 * is. That sharing is the reason this stays a composable rather than folding
 * into the widget.
 */

import useActiveSection from '@composables/use-active-section';
import { computed, onBeforeUnmount, onMounted, ref, unref } from 'vue';

export default function useSectionNav(sections, options = {}) {
  const { topId = null } = options;

  /* Accept a getter, a ref or a plain array. `unref` alone returns a getter
     unchanged, which then has no `.map` — the shape has to be resolved here or
     every caller has to remember which one this expects. */
  const list = () => (typeof sections === 'function' ? sections() : unref(sections)) || [];

  const ids = computed(() => list().map((s) => s.id));
  const { active } = useActiveSection(ids, { topId });

  const open = ref(false);

  const reduced = () => typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Escape closes the list wherever focus happens to be — including when it is
     still on the page behind it, which is where a mouse user leaves it. */
  const onKeydown = (event) => {
    if (event.key === 'Escape') {
      open.value = false;
    }
  };

  /*
   * Follow the anchor ourselves so the scroll can honour reduced motion and so
   * focus moves with it — a link that scrolls the page but leaves the keyboard
   * behind has only done half its job. Falling through to the browser when the
   * target is missing keeps the plain `href` honest.
   */
  const go = (event, id) => {
    const el = document.querySelector(`#${id}`);
    if (!el) {
      return;
    }
    event.preventDefault();
    el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
    open.value = false;
  };

  /*
   * The document top is NOT a section, so it cannot be reached through `go`.
   * `topId` names a real element on the landing (the hero) but nothing on an
   * article, where the first heading is already some way down the page —
   * which is exactly why the runtime's own back-to-top button existed.
   * Scroll to zero either way and let focus stay on the control, which is
   * fixed and so does not move out from under the reader.
   */
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' });
    open.value = false;
  };

  const position = computed(() => {
    const items = list();
    const i = items.findIndex((s) => s.id === active.value);
    return { index: i < 0 ? 0 : i, total: items.length };
  });

  onMounted(() => {
    document.addEventListener('keydown', onKeydown);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown);
  });

  return { active, open, go, toTop, position, reduced };
}
