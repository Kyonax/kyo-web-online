<script setup>
/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * Previous / next / related links under an article.
 *
 * All three come straight from relations.json. INSIDE a series prev and next
 * walk the SERIES rather than the timeline — org2html decides that, so this
 * component never has to know which case it is in.
 *
 * `related` is scored by the engine (shared tag x3, keyword x2, category x1)
 * and excludes series members, since the series block already lists them.
 */

import { useI18n } from 'vue-i18n';

defineProps({
  relations: { type: Object, required: true },
});

const { t } = useI18n();
</script>

<template>
  <div class="blog-post-nav">
    <nav
      v-if="relations.prev || relations.next"
      class="blog-post-nav__pager"
      :aria-label="t('kyo-web.blog.all-posts')"
    >
      <a v-if="relations.prev" class="blog-post-nav__link" :href="relations.prev.url">
        <span class="blog-post-nav__dir">{{ t('kyo-web.blog.prev-post') }}</span>
        <span class="blog-post-nav__title">{{ relations.prev.title }}</span>
      </a>
      <a
        v-if="relations.next"
        class="blog-post-nav__link blog-post-nav__link--next"
        :href="relations.next.url"
      >
        <span class="blog-post-nav__dir">{{ t('kyo-web.blog.next-post') }}</span>
        <span class="blog-post-nav__title">{{ relations.next.title }}</span>
      </a>
    </nav>

    <section v-if="relations.related && relations.related.length" class="blog-post-nav__related">
      <h2 class="blog-post-nav__heading">
        {{ t('kyo-web.blog.related') }}
      </h2>
      <ul class="blog-post-nav__list">
        <li v-for="item in relations.related" :key="item.url">
          <a :href="item.url">{{ item.title }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.blog-post-nav {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--clr-border-100);
}

.blog-post-nav__pager {
  display: grid;
  gap: 1rem;

  @include min-media-query(sm) {
    grid-template-columns: 1fr 1fr;
  }
}

.blog-post-nav__link {
  display: grid;
  gap: 0.25rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--clr-border-100);
  border-radius: 6px;
  text-decoration: none;
  color: inherit;

  &:hover,
  &:focus-visible { border-color: var(--clr-primary-100); }

  &--next { text-align: right; }
}

.blog-post-nav__dir {
  color: var(--clr-neutral-200);
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-100);
  text-transform: uppercase;
  letter-spacing: 0.06rem;
}

.blog-post-nav__title { font-size: var(--fs-300); }

.blog-post-nav__heading {
  margin: 2rem 0 0.75rem;
  font-size: var(--fs-300);
  color: var(--clr-neutral-200);
  text-transform: uppercase;
  letter-spacing: 0.06rem;
}

.blog-post-nav__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.4rem;
}
</style>
