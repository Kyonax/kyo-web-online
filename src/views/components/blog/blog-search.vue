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
 *
 * THE SHAPE is the landing's framed panel, not a rounded form control: a `//`
 * label, a bordered field with a monospace `/` prefix, and results that reuse
 * the archive's own hairline row — so a search result and an archive entry
 * read as the same object rather than two different lists of links. The prefix
 * is plain ASCII on purpose; a Nerd Font glyph here would depend on the icon
 * subset actually reaching the browser, and a cached older copy renders tofu.
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
      {{ `// ${t('kyo-web.blog.search-label')}` }}
    </label>

    <div class="blog-search__field">
      <span class="blog-search__prefix" data-text="/" aria-hidden="true" />
      <input
        id="blog-search-input"
        v-model="query"
        class="blog-search__input"
        type="search"
        autocomplete="off"
        :placeholder="t('kyo-web.blog.search-placeholder')"
      />
    </div>

    <div v-if="results" class="blog-search__results" role="status">
      <p v-if="results.length === 0" class="blog-search__empty">
        {{ `// ${t('kyo-web.blog.search-empty')}` }}
      </p>
      <template v-else>
        <p class="blog-search__count">
          {{ `// ${results.length} ${t('kyo-web.blog.search-results')}` }}
        </p>
        <ul class="blog-search__list">
          <li v-for="row in results" :key="row.url" class="blog-search__row">
            <a class="blog-search__link" :href="row.url">
              <span class="blog-search__title">{{ row.title }}</span>
              <span class="blog-search__arrow" data-text="›" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog-search { margin-bottom: 2rem; }

.blog-search__label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--clr-primary-100);
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-100);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

/* The frame, not the input, carries the border and the focus ring — so the
   prefix and the field read as one control the way the landing's framed
   panels do, instead of a glyph parked beside a form element. */
.blog-search__field {
  display: flex;
  gap: 0.65rem;
  align-items: center;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--clr-border-100);
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: var(--clr-primary-100);
    outline: 1px solid var(--clr-primary-100);
    outline-offset: -2px;
  }
}

.blog-search__prefix {
  color: var(--clr-neutral-300);
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-200);
  line-height: 1;
}

.blog-search__input {
  flex: 1 1 auto;
  min-width: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-200);
  letter-spacing: 0.04em;

  /* The frame owns the focus affordance; a second ring inside it reads as two
     controls. Removing it is only safe BECAUSE :focus-within above is there. */
  &:focus,
  &:focus-visible { outline: none; }

  &::placeholder { color: var(--clr-neutral-300); }

  /* WebKit paints its own clear button in a colour the palette never chose. */
  &::-webkit-search-cancel-button { filter: grayscale(1); }
}

.blog-search__results { margin-top: 1rem; }

.blog-search__count,
.blog-search__empty {
  margin: 0 0 0.5rem;
  color: var(--clr-neutral-200);
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-100);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.blog-search__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.blog-search__row + .blog-search__row { border-top: 1px solid var(--clr-border-100); }

/* The archive row, at search scale — same hairline, same accent on hover, so
   a result and an entry are visibly the same kind of thing. */
.blog-search__link {
  display: flex;
  gap: 1rem;
  align-items: baseline;
  justify-content: space-between;
  padding: 0.7rem 0;
  text-decoration: none;
  color: inherit;

  &:hover,
  &:focus-visible {
    color: var(--clr-primary-100);

    .blog-search__arrow { transform: translateX(0.2rem); }
  }
}

.blog-search__title { font-size: var(--fs-300); }

.blog-search__arrow {
  flex: 0 0 auto;
  font-family: 'SpaceMono', monospace;
  transition: transform 0.2s ease;
}
</style>
