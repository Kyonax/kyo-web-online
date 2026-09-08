<script setup>
/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * Archive pagination. Every target is a real prerendered route, so these are
 * plain <a> links: a crawler follows them and a reader with no JavaScript
 * still reaches the whole archive.
 *
 * "Newer" and "Older" rather than "Previous" and "Next" — the archive is
 * ordered newest-first, and directional words are ambiguous in that order.
 */

import { useI18n } from 'vue-i18n';

defineProps({
  page: { type: Object, required: true },
});

const { t } = useI18n();
</script>

<template>
  <nav
    v-if="page.prev || page.next"
    class="blog-pagination"
    :aria-label="t('kyo-web.blog.pagination-aria')"
  >
    <a
      v-if="page.prev"
      class="blog-pagination__link"
      :href="page.prev"
      rel="prev"
    >
      <span aria-hidden="true" data-text="‹" />
      {{ t('kyo-web.blog.pagination-prev') }}
    </a>
    <span v-else />

    <span class="blog-pagination__page">
      {{ t('kyo-web.blog.pagination-page') }} {{ page.number }}
    </span>

    <a
      v-if="page.next"
      class="blog-pagination__link"
      :href="page.next"
      rel="next"
    >
      {{ t('kyo-web.blog.pagination-next') }}
      <span aria-hidden="true" data-text="›" />
    </a>
    <span v-else />
  </nav>
</template>

<style lang="scss" scoped>
.blog-pagination {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--clr-border-100);
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-200);
}

.blog-pagination__link {
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;
  text-decoration: none;
  color: inherit;

  span::before { content: attr(data-text); }

  &:hover,
  &:focus-visible { color: var(--clr-primary-100); }
}

.blog-pagination__page { color: var(--clr-neutral-200); }
</style>
