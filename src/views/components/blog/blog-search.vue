<script setup>
/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * Client-side archive search.
 *
 * The index is FETCHED, not imported: kyo-blog emits one small JSON per locale
 * carrying titles, excerpts and tags, and it is served from /blog-search/. An
 * import would bundle it into the page chunk and count against the site's
 * 180 KB main-bundle budget for every visitor, including the ones who never
 * type anything.
 *
 * It is also strictly PROGRESSIVE. The full archive is already on the page as
 * prerendered HTML; this only filters what is visible. With JavaScript off the
 * input never appears and the archive is untouched, which is why the control
 * is rendered only after the index has loaded.
 */

import { computed, onMounted,ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  locale: { type: [String, Object], required: true },
});

const { t } = useI18n();

const index = ref(null);
const query = ref('');

onMounted(async () => {
  const code = typeof props.locale === 'string' ? props.locale : props.locale.value;
  try {
    const res = await fetch(`/blog-search/blog-search-${code}.json`);
    if (res.ok) {
      index.value = await res.json();
    }
  } catch {
    /* No index, no search box. The archive below is unaffected. */
    index.value = null;
  }
});

const fold = (s) => String(s || '')
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .toLowerCase();

const results = computed(() => {
  if (!index.value || !query.value.trim()) {
    return null;
  }
  const q = fold(query.value.trim());
  return index.value.filter((row) => fold(row.title).includes(q)
    || fold(row.excerpt).includes(q)
    || (row.tags || []).some((tag) => fold(tag).includes(q)));
});
</script>

<template>
  <div v-if="index" class="blog-search">
    <label class="blog-search__label" for="blog-search-input">
      {{ t('kyo-web.blog.search-label') }}
    </label>
    <input
      id="blog-search-input"
      v-model="query"
      class="blog-search__input"
      type="search"
      autocomplete="off"
      :placeholder="t('kyo-web.blog.search-placeholder')"
    />

    <div v-if="results" class="blog-search__results" role="status">
      <p v-if="results.length === 0" class="blog-search__empty">
        {{ t('kyo-web.blog.search-empty') }}
      </p>
      <template v-else>
        <p class="blog-search__count">
          {{ results.length }} {{ t('kyo-web.blog.search-results') }}
        </p>
        <ul class="blog-search__list">
          <li v-for="row in results" :key="row.url">
            <a :href="row.url">{{ row.title }}</a>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog-search { margin-bottom: 1.5rem; }

.blog-search__label {
  display: block;
  margin-bottom: 0.4rem;
  color: var(--clr-neutral-200);
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-100);
  text-transform: uppercase;
  letter-spacing: 0.06rem;
}

.blog-search__input {
  width: 100%;
  padding: 0.65rem 0.9rem;
  border: 1px solid var(--clr-border-100);
  border-radius: 6px;
  background-color: var(--clr-neutral-400);
  color: inherit;
  font: inherit;

  &:focus-visible {
    outline: 2px solid var(--clr-primary-100);
    outline-offset: 2px;
  }
}

.blog-search__results { margin-top: 0.85rem; }

.blog-search__count,
.blog-search__empty {
  margin: 0 0 0.5rem;
  color: var(--clr-neutral-200);
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-200);
}

.blog-search__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.35rem;
}
</style>
