<script setup>
/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * The series a post belongs to, listed in reading order.
 *
 * The ORDER is the engine's, not ours: org2html sorts by #+SERIES_INDEX and
 * falls back to date ascending, because a series reads forward while the rest
 * of a blog reads newest-first. It also switches the post's prev/next to walk
 * the series instead of the timeline, so this block and the footer navigation
 * always agree.
 */

import { useI18n } from 'vue-i18n';

defineProps({
  /* relations.json's `series`: { name, position, total, items[] } */
  series: { type: Object, required: true },
});

const { t } = useI18n();
</script>

<template>
  <nav class="blog-series" :aria-label="series.name">
    <p class="blog-series__head">
      <span class="blog-series__label">{{ t('kyo-web.blog.series-label') }}</span>
      <span class="blog-series__name">{{ series.name }}</span>
      <span class="blog-series__count">
        {{ t('kyo-web.blog.series-position') }} {{ series.position }}/{{ series.total }}
      </span>
    </p>
    <ol class="blog-series__list">
      <li
        v-for="item in series.items"
        :key="item.url"
        class="blog-series__item"
        :class="{ 'is-current': item.current }"
      >
        <span class="blog-series__n">{{ item.position }}</span>
        <a v-if="!item.current" :href="item.url">{{ item.title }}</a>
        <span v-else aria-current="true">{{ item.title }}</span>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss" scoped>
.blog-series {
  margin-block: 2rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--clr-border-100);
  border-radius: 6px;
  background-color: var(--clr-neutral-400);
}

.blog-series__head {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: baseline;
  margin: 0 0 0.75rem;
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-200);
}

.blog-series__label {
  color: var(--clr-neutral-200);
  text-transform: uppercase;
  letter-spacing: 0.06rem;
}

.blog-series__name { color: var(--clr-primary-100); }
.blog-series__count { color: var(--clr-neutral-200); margin-left: auto; }

.blog-series__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.35rem;
}

.blog-series__item {
  display: flex;
  gap: 0.6rem;
  align-items: baseline;
  font-size: var(--fs-200);

  &.is-current { color: var(--clr-primary-100); }
}

.blog-series__n {
  flex: 0 0 auto;
  color: var(--clr-neutral-300);
  font-family: 'SpaceMono', monospace;
}
</style>
