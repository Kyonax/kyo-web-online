<script setup>
/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * A single blog article (/blog/<section>/<date>-<slug>, /es/blog/...).
 *
 * THE BODY IS NOT WRITTEN HERE. It is pre-rendered, pre-sanitized HTML built
 * by the published @kyonax/org2html from an .org file in the kyo-blog repo,
 * loaded as its own chunk and v-html'd — the same shape privacy.vue uses for
 * its catalogue copy. org2html sanitizes by default (jsdom + DOMPurify), and
 * the corpus gate in that repo proves twelve injection vectors are stripped
 * while the engine's own task checkboxes survive.
 *
 * WHY NOT THE GENERATED .vue. org2html can emit a Vue SFC per document, but
 * that SFC wraps its content in its own <main> and <article> — a duplicate
 * landmark inside DocumentPage's <main> — never emits a `components:` key,
 * and declares component props inside setup() without returning them. The
 * rendered fragment plus the JSON sidecars is the better-behaved half of the
 * engine's "ONE HEAD, TWO OUTPUTS" law.
 *
 * The engine's own client runtime (o2h.js) is deliberately NOT loaded: it
 * would bind its own lightbox to every figure image, set inline cursor
 * styles, and append two fixed elements to <body> that survive route changes.
 * The site's UiImageViewer handles zoom instead, via v-blog-lightbox.
 *
 * TITLE AND DESCRIPTION are passed to useSeoHead as literals rather than i18n
 * keys: they are CONTENT, authored per article, and putting them in the
 * catalogue would demand one entry per post in every locale.
 *
 * NO `signoff`. DocumentPage's sign-off exists because /resume and /privacy
 * render no chrome below the sheet — a blog route does: App.vue renders
 * <BlogFooter> under every one of them. Passing both painted two footers.
 * BlogFooter is the one that stays; it is the owner's ask and it carries the
 * way back, which a sign-off line does not.
 */

import { loadBlogPost } from '@composables/use-blog';
import { useBlogLightbox, vBlogLightbox } from '@composables/use-blog-lightbox';
import useSeoHead from '@composables/use-seo-head';
import { BLOG_INDEX_URLS, blogAlternatesFor, blogUrlsFor } from '@seo/blog-routes';
import { buildBlogJsonLd } from '@seo/json-ld';
import { ROUTE_BY_LOCALE } from '@seo/routes';
import ModalLoading from '@ui/modal-loading.vue';
import { useHead } from '@unhead/vue';
import BlogPostNav from '@views/components/blog/blog-post-nav.vue';
import BlogSeries from '@views/components/blog/blog-series.vue';
import DocumentPage from '@views/components/document-page.vue';
import { computed, defineAsyncComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

/* Async, with the shared skeleton — the viewer is a chunk of its own and must
   never be pulled into the article's. */
const UiImageViewer = defineAsyncComponent({
  loader: () => import('@ui/image-viewer.vue'),
  loadingComponent: ModalLoading,
  delay: 0,
});

const { t, locale } = useI18n();
const route = useRoute();

const {
  picture: viewer_picture,
  alt: viewer_alt,
  open: open_viewer,
  close: close_viewer,
} = useBlogLightbox();

/* Top-level await. <Suspense> in App.vue is what makes vite-ssg wait for this
   during prerender, so the article ships inside the HTML for crawlers rather
   than appearing only after hydration. */
const post = await loadBlogPost(route.path);

const landing_href = computed(() => ROUTE_BY_LOCALE[locale.value] || ROUTE_BY_LOCALE.en);
const blog_href = computed(() => BLOG_INDEX_URLS[locale.value] || BLOG_INDEX_URLS.en);

const crumbs = computed(() => [
  { label: t('kyo-web.breadcrumb.home'), href: landing_href.value },
  { label: t('kyo-web.blog.breadcrumb'), href: blog_href.value },
  { label: post ? post.title : t('kyo-web.blog.not-found') },
]);

useSeoHead({
  keyPrefix: 'kyo-web.blog.meta',
  title: post ? post.title : undefined,
  description: post ? post.description : undefined,
  urls: post ? blogUrlsFor(route.path) : BLOG_INDEX_URLS,
  alternates: post ? blogAlternatesFor(route.path) : [],
  ogType: 'article',
});

/* App.vue emits no graph for blog routes: a BlogPosting needs this article's
   own title, date and image, which only this view has loaded. Same head key,
   so there is exactly one JSON-LD block either way. */
useHead({
  script: [{
    key: 'kyo-site-jsonld',
    type: 'application/ld+json',
    innerHTML: computed(() => JSON.stringify(
      buildBlogJsonLd({ locale: locale.value, post }),
    )),
  }],
});

const formatted_date = computed(() => {
  if (!post || !post.date) {
    return '';
  }
  /* Build from the ISO components so the rendered day is the AUTHORED day in
     every timezone — parsing "2026-05-01" as a Date yields UTC midnight, which
     is the previous day west of Greenwich. */
  const [y, m, d] = post.date.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(locale.value === 'es' ? 'es-CO' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
});
</script>

<template>
  <DocumentPage
    id="main"
    width="prose"
    align="left"
    :crumbs="crumbs"
    :crumbs-label="t('kyo-web.breadcrumb.aria')"
  >
    <template #header>
      <h1 class="doc__title">
        {{ post ? post.title : t('kyo-web.blog.not-found') }}
      </h1>
      <p v-if="post" class="blog-post__meta">
        <time :datetime="post.date">{{ formatted_date }}</time>
        <span
          v-if="post.readingTime"
          class="blog-post__dot"
          aria-hidden="true"
          data-text="·"
        />
        <span v-if="post.readingTime">
          {{ post.readingTime }} {{ t('kyo-web.blog.reading-time') }}
        </span>
      </p>
    </template>

    <template v-if="post">
      <BlogSeries v-if="post.relations && post.relations.series" :series="post.relations.series" />

      <!-- Pre-sanitized by org2html at build time; see the header note. -->
      <div
        v-blog-lightbox="open_viewer"
        class="doc-rich blog-rich kyo-prose"
        v-html="post.html"
      />

      <BlogPostNav v-if="post.relations" :relations="post.relations" />
    </template>

    <p v-else class="doc-rich">
      <a :href="blog_href">{{ t('kyo-web.blog.back-to-index') }}</a>
    </p>

    <UiImageViewer
      v-if="viewer_picture !== null"
      :is-open="true"
      :picture="viewer_picture"
      :alt="viewer_alt"
      :close-label="t('kyo-web.landing.modal.close')"
      @close="close_viewer"
    />
  </DocumentPage>
</template>

<style lang="scss" scoped>
/* The masthead carried no styling of its own — it was a bare <h1> inheriting
   the mono body face, and it read as a caption rather than a title. It is the
   display face at the archive's own scale now, one step down from the archive
   masthead because an article sits under it. */
.doc__title {
  margin: 0 0 0.75rem;
  font-family: 'Geomanist', sans-serif;
  font-size: var(--fs-600);
  line-height: 1.1;
  letter-spacing: -0.03rem;
  color: var(--clr-neutral-100);

  @include min-media-query(md) { font-size: var(--fs-700); }
}

.blog-post__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: baseline;
  margin: 0;
  color: var(--clr-neutral-200);
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-200);
  letter-spacing: -0.02rem;
}

.blog-post__dot::before {
  content: attr(data-text);
  color: var(--clr-neutral-300);
}
</style>
