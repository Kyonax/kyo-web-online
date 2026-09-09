<script setup>
/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * The blog archive (/blog, /blog/page/N, and their /es twins).
 *
 * Three bands, in the order a reader scans them:
 *   1. the FEATURED post — the newest article, given the whole width
 *   2. RECENT articles — an image-led card row
 *   3. ALL POSTS — a dense, dated list, paginated
 *
 * PAGINATION IS PRERENDERED, not client-side. vite-ssg prerenders only what
 * router.getRoutes() enumerates and skips anything carrying a :param, so every
 * page is a real route with its own canonical and hreflang pair. A crawler can
 * reach the whole archive with JavaScript switched off, which is the entire
 * reason this blog renders through the site instead of shipping as static
 * HTML beside it.
 *
 * The featured slot only exists on page 1 — on later pages every post is an
 * ordinary row, or the newest article would repeat down the archive.
 */

import { loadBlogIndex } from '@composables/use-blog';
import useSeoHead from '@composables/use-seo-head';
import { BLOG_INDEX_URLS, blogAlternatesFor, blogUrlsFor } from '@seo/blog-routes';
import { buildBlogJsonLd } from '@seo/json-ld';
import { ROUTE_BY_LOCALE } from '@seo/routes';
import { useHead } from '@unhead/vue';
import BlogCard from '@views/components/blog/blog-card.vue';
import BlogPagination from '@views/components/blog/blog-pagination.vue';
import BlogSearch from '@views/components/blog/blog-search.vue';
import DocumentPage from '@views/components/document-page.vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { t, locale } = useI18n();
const route = useRoute();

/* Top-level await — <Suspense> in App.vue makes vite-ssg wait for it, so the
   archive ships as HTML rather than appearing after hydration. */
const page = await loadBlogIndex(route.path);

const landing_href = computed(() => ROUTE_BY_LOCALE[locale.value] || ROUTE_BY_LOCALE.en);
const blog_href = computed(() => BLOG_INDEX_URLS[locale.value] || BLOG_INDEX_URLS.en);

const crumbs = computed(() => {
  const trail = [
    { label: t('kyo-web.breadcrumb.home'), href: landing_href.value },
    { label: t('kyo-web.blog.breadcrumb'), href: blog_href.value },
  ];
  /* Page 1 IS the blog, so it must not appear twice in its own trail —
     UiBreadcrumbs requires every item but the last to carry an href. */
  if (page && page.number > 1) {
    return [
      { label: t('kyo-web.breadcrumb.home'), href: landing_href.value },
      { label: t('kyo-web.blog.breadcrumb'), href: blog_href.value },
      { label: `${t('kyo-web.blog.pagination-page')} ${page.number}` },
    ];
  }
  return trail;
});

useSeoHead({
  keyPrefix: 'kyo-web.blog.meta',
  urls: blogUrlsFor(route.path) || BLOG_INDEX_URLS,
  alternates: blogAlternatesFor(route.path),
  ogType: 'website',
});

useHead({
  script: [{
    key: 'kyo-site-jsonld',
    type: 'application/ld+json',
    innerHTML: computed(() => JSON.stringify(buildBlogJsonLd({ locale: locale.value }))),
  }],
});

const date_fmt = (iso) => {
  if (!iso) {
    return '';
  }
  /* From the ISO components, so the rendered day is the AUTHORED day in every
     timezone rather than UTC midnight shifted west. */
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(
    locale.value === 'es' ? 'es-CO' : 'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' },
  );
};

/* The card row shows the handful after the featured post; the dense list below
   carries the same page in full, which is what the reference layout does. */
const recent = computed(() => (page ? page.rest.slice(0, 4) : []));
</script>

<template>
  <DocumentPage
    id="main"
    width="sheet"
    align="left"
    :crumbs="crumbs"
    :crumbs-label="t('kyo-web.breadcrumb.aria')"
    :signoff="t('kyo-web.blog.signoff')"
  >
    <template #header>
      <h1 class="doc__title">
        {{ t('kyo-web.blog.title') }}
      </h1>
    </template>

    <p v-if="!page || page.posts.length === 0" class="doc-rich">
      {{ t('kyo-web.blog.empty') }}
    </p>

    <template v-else>
      <!-- 1. Featured -------------------------------------------------- -->
      <section v-if="page.featured" class="blog-featured" :aria-label="t('kyo-web.blog.featured')">
        <div class="blog-featured__body">
          <p class="blog-featured__date">
            <time :datetime="page.featured.date">{{ date_fmt(page.featured.date) }}</time>
          </p>
          <h2 class="blog-featured__title">
            <a :href="page.featured.url">{{ page.featured.title }}</a>
          </h2>
          <p class="blog-featured__excerpt">
            {{ page.featured.description }}
          </p>
          <a class="blog-featured__cta" :href="page.featured.url">
            {{ t('kyo-web.blog.read-more') }}
            <span aria-hidden="true" data-text="›" />
          </a>
        </div>
        <BlogCard
          v-if="page.featured.cardImage"
          class="blog-featured__media"
          :post="page.featured"
          media-only
        />
      </section>

      <!-- 2. Recent ---------------------------------------------------- -->
      <section v-if="recent.length" class="blog-recent" :aria-label="t('kyo-web.blog.recent')">
        <h2 class="blog-section__heading">
          {{ t('kyo-web.blog.recent') }}
        </h2>
        <div class="blog-recent__grid">
          <BlogCard v-for="post in recent" :key="post.url" :post="post" />
        </div>
      </section>

      <!-- 3. All posts ------------------------------------------------- -->
      <section class="blog-all" :aria-label="t('kyo-web.blog.all-posts')">
        <h2 class="blog-section__heading">
          {{ t('kyo-web.blog.all-posts') }}
        </h2>

        <BlogSearch :locale="locale" />

        <ul class="blog-all__list">
          <li v-for="post in page.posts" :key="post.url" class="blog-all__row">
            <a class="blog-all__link" :href="post.url">
              <span class="blog-all__text">
                <span class="blog-all__title">{{ post.title }}</span>
                <span class="blog-all__excerpt">{{ post.description }}</span>
              </span>
              <time class="blog-all__date" :datetime="post.date">{{ date_fmt(post.date) }}</time>
            </a>
          </li>
        </ul>

        <BlogPagination :page="page" />
      </section>
    </template>
  </DocumentPage>
</template>

<style lang="scss" scoped>
.blog-section__heading {
  margin: 3rem 0 1.25rem;
  font-size: var(--fs-400);
  letter-spacing: -0.03rem;
}

/* --- featured ----------------------------------------------------------- */

.blog-featured {
  display: grid;
  gap: 1.5rem;
  align-items: center;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--clr-border-100);

  @include min-media-query(md) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
    gap: 2.5rem;
  }
}

.blog-featured__date,
.blog-all__date {
  margin: 0;
  color: var(--clr-neutral-200);
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-200);
}

.blog-featured__title {
  margin: 0.5rem 0 0.75rem;
  font-size: var(--fs-600);
  line-height: 1.15;
  letter-spacing: -0.04rem;

  a {
    color: inherit;
    text-decoration: none;

    &:hover,
    &:focus-visible { color: var(--clr-primary-100); }
  }
}

.blog-featured__excerpt {
  margin: 0 0 1.25rem;
  max-width: var(--kyo-measure);
  color: var(--clr-neutral-100);
}

.blog-featured__cta {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.6rem 1.1rem;
  border: 1px solid var(--clr-border-100);
  border-radius: 999px;
  text-decoration: none;
  color: inherit;
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-200);

  span::before { content: attr(data-text); }

  &:hover,
  &:focus-visible {
    border-color: var(--clr-primary-100);
    color: var(--clr-primary-100);
  }
}

/* --- recent ------------------------------------------------------------- */

.blog-recent__grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;

  @include min-media-query(sm) { grid-template-columns: repeat(2, 1fr); }
  @include min-media-query(lg) { grid-template-columns: repeat(4, 1fr); }
}

/* --- all posts ---------------------------------------------------------- */

.blog-all__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.blog-all__row + .blog-all__row { border-top: 1px solid var(--clr-border-100); }

.blog-all__link {
  display: flex;
  gap: 1rem;
  align-items: baseline;
  justify-content: space-between;
  padding: 1.1rem 0;
  text-decoration: none;
  color: inherit;

  &:hover .blog-all__title,
  &:focus-visible .blog-all__title { color: var(--clr-primary-100); }
}

.blog-all__text {
  display: grid;
  gap: 0.3rem;
  min-width: 0;
}

.blog-all__title { font-size: var(--fs-300); }

.blog-all__excerpt {
  color: var(--clr-neutral-200);
  font-size: var(--fs-200);
  /* Two lines, then ellipsis — the rows stay scannable however long an
     excerpt is. */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.blog-all__date { flex: 0 0 auto; white-space: nowrap; }
</style>
