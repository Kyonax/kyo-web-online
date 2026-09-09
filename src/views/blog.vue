<script setup>
/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * The blog archive (/blog, /blog/page/N, and their /es twins).
 *
 * IT IS A BOARD, NOT A DOCUMENT. It used to render inside DocumentPage's 58rem
 * printed-CV sheet with bare <h2> rules, so an INDEX read as a page of writing.
 * It is assembled from the LANDING's vocabulary instead — the only design
 * reference this site has — and from the landing's own components, not copies:
 * UiSectionHeader opens each band with an ordinal, a display heading and a
 * one-line deck; UiHudDeco puts the chrome in the corners; BlogCard is the
 * project card with a date where the status chip goes.
 *
 * Three bands, in the order a reader scans them:
 *   // 01 the FEATURED post — the newest article, as one panel
 *   // 02 RECENT articles — the card row
 *   // 03 ALL POSTS — search, a dense dated list, pagination
 *
 * THE BANDS CARRY NO DECK, and that is a budget decision, not an oversight.
 * `UiSectionHeader`'s subtitle is optional; three one-line decks cost 118 B
 * gzipped in the eager i18n catalogue, which every visitor to every page
 * downloads, against ~130 B of headroom under an enforced 180 KB ceiling. The
 * ordinal and the display heading are the shape; the deck was filler.
 *
 * EACH BAND EARNS ITS PLACE OR DOES NOT RENDER, and the ordinals COUNT THE
 * BANDS THAT DID. The featured slot and the card row are both page-1-only —
 * on a later page every post is an ordinary row, or the archive repeats
 * itself — and the card row additionally needs two cards, because one card in
 * a four-column grid is not a short row, it is a broken one. Page 2 therefore
 * renders a single band, and it is numbered `// 01`, not `// 03`.
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
import UiHudDeco from '@ui/hud-deco.vue';
import UiSectionHeader from '@ui/section-header.vue';
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
   carries the same page in full, which is what the reference layout does — the
   archive holds every post on the page, the newest one included.

   PAGE 1 ONLY, and only from two cards up. `rest` is the whole page once there
   is no featured slot, so on page 2 the row would restate the list beneath it
   in full; and a single card in a four-column grid reads as broken rather than
   short. */
const recent = computed(() => (page ? page.rest.slice(0, 4) : []));
const has_featured = computed(() => Boolean(page && page.featured));
const has_recent = computed(() => has_featured.value && recent.value.length >= 2);

/* The band ordinals number what is ACTUALLY on the page. Hard-coded, page 2
   opened at `// 02` and read as a page missing its first section. */
const band_tag = (n) => `// ${String(n).padStart(2, '0')}`;
const all_posts_band = computed(
  () => 1 + (has_featured.value ? 1 : 0) + (has_recent.value ? 1 : 0),
);

/* The featured band only splits into two columns when there is something to
   put in the second one. THE DEFECT THIS FIXES: the grid was declared at md+
   unconditionally while the media column rendered only for a post carrying
   `cardImage` — and no post carries one, because the engine ranks that image
   from #+COVER_IMAGE / a `:main` figure / #+OG_IMAGE and #+HERO_IMAGE is
   deliberately not in the chain. The result was ~700px of void beside a
   300px ribbon of text. */
const featured_has_media = computed(() => Boolean(page && page.featured && page.featured.cardImage));

const featured_category = computed(() => {
  const first = page && page.featured ? (page.featured.categories || [])[0] : null;
  return first ? `// ${String(first).toUpperCase()}` : '';
});
</script>

<template>
  <DocumentPage
    id="main"
    width="index"
    align="left"
    :crumbs="crumbs"
    :crumbs-label="t('kyo-web.breadcrumb.aria')"
  >
    <template #header>
      <!-- The landing's band header, at h1. One <h1> on the page, which is
           what seo-audit expects and what the archive had before. -->
      <UiSectionHeader
        level="1"
        class="blog-archive__masthead"
        tag="// BLOG"
        :title="t('kyo-web.blog.title')"
        :subtitle="t('kyo-web.blog.meta.description')"
      />
    </template>

    <!--
      Chrome, and only where chrome fits. The landing can drop a watermark in
      any section because `.kyo-section` clips it and its cards sit on a solid
      panel; an archive is text at full width all the way down, so a watermark
      parked low landed ON the entries and a bottom-left tag landed on a row.
      Both are anchored to the masthead's empty right half instead, and the
      sheet clips them.
    -->
    <UiHudDeco variant="tr" text="// ARCHIVE :: OPEN" />
    <UiHudDeco variant="watermark" text="記録" class="blog-archive__watermark" />

    <p v-if="!page || page.posts.length === 0" class="doc-rich blog-archive__empty">
      {{ t('kyo-web.blog.empty') }}
    </p>

    <template v-else>
      <!-- // 01 Featured ---------------------------------------------------
           One panel. The media column exists only when the post actually has
           a card image; otherwise this is a single full-width column at every
           breakpoint, which is what closes the void. -->
      <section v-if="has_featured" class="blog-band" :aria-label="t('kyo-web.blog.featured')">
        <UiSectionHeader
          :tag="band_tag(1)"
          :title="t('kyo-web.blog.featured')"
        />

        <article
          class="blog-featured"
          :class="{ 'blog-featured--media': featured_has_media }"
        >
          <div class="blog-featured__body">
            <header class="blog-featured__head">
              <time class="blog-featured__date" :datetime="page.featured.date">
                {{ date_fmt(page.featured.date) }}
              </time>
              <span class="blog-featured__ordinal" data-text="#01" aria-hidden="true" />
            </header>

            <h3 class="blog-featured__title">
              <a :href="page.featured.url">{{ page.featured.title }}</a>
            </h3>
            <p v-if="featured_category" class="blog-featured__category">
              {{ featured_category }}
            </p>

            <p class="blog-featured__excerpt">
              {{ page.featured.description }}
            </p>

            <a class="blog-featured__cta" :href="page.featured.url">
              <span class="blog-featured__cta-text">{{ t('kyo-web.blog.read-more') }}</span>
              <span class="blog-featured__arrow" data-text="›" aria-hidden="true" />
            </a>
          </div>

          <BlogCard
            v-if="featured_has_media"
            class="blog-featured__media"
            :post="page.featured"
            media-only
          />
        </article>
      </section>

      <!-- // 02 Recent ------------------------------------------------------ -->
      <section v-if="has_recent" class="blog-band" :aria-label="t('kyo-web.blog.recent')">
        <UiSectionHeader
          :tag="band_tag(2)"
          :title="t('kyo-web.blog.recent')"
        />
        <ul class="blog-recent__grid" role="list">
          <li v-for="(post, idx) in recent" :key="post.url" class="blog-recent__item">
            <BlogCard :post="post" :index="idx + 1" />
          </li>
        </ul>
      </section>

      <!-- // 03 All posts --------------------------------------------------- -->
      <section class="blog-band" :aria-label="t('kyo-web.blog.all-posts')">
        <UiSectionHeader
          :tag="band_tag(all_posts_band)"
          :title="t('kyo-web.blog.all-posts')"
        />

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
/*
 * The band rhythm, matching the landing: UiSectionHeader already carries its
 * own hairline rule and bottom margin, so a band only has to space itself
 * from the one above it.
 */
.blog-band + .blog-band { margin-top: 4rem; }

.blog-archive__empty { margin-top: 1rem; }

/*
 * WIDE LAYOUTS ONLY. The HUD chrome needs a column the content is not using,
 * and below `md` the archive is one column edge to edge — the watermark landed
 * across the title and the corner tag sat on the breadcrumb. The landing gets
 * away with it because its sections are taller than their copy; an index is
 * not.
 */
:deep(.hud-deco) { display: none; }

@include min-media-query(md) {
  :deep(.hud-deco) { display: block; }
}

/* The masthead's right half is the one region of an archive that is reliably
   empty at every post count, which is why the watermark lives there and not
   where the landing puts it. */
.blog-archive__watermark {
  top: 3.5rem;
  right: 1rem;
  bottom: auto;
  line-height: 0.8;
}

/* The page title outranks the band titles. UiSectionHeader emits one size for
   every level, which is correct on the landing — every band there is a peer —
   and wrong here, where the masthead is the document's <h1> and the three
   bands sit under it. */
.blog-archive__masthead {
  :deep(.ui-section-header__title) {
    @include min-media-query(md) { font-size: var(--fs-800); }
  }
}

/* --- // 01 featured ----------------------------------------------------- */

/*
 * ONE COLUMN BY DEFAULT — the two-column split is opt-in and depends on media
 * actually existing. The previous rule declared the split unconditionally,
 * which is the whole ~700px void.
 */
.blog-featured {
  display: grid;
  gap: 1.5rem;
  align-items: start;
  padding: 1.4rem;
  border: 1px solid var(--clr-border-100);

  &--media {
    @include min-media-query(md) {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
      gap: 2.5rem;
      align-items: center;
    }
  }
}

.blog-featured__body {
  display: grid;
  gap: 0.6rem;
  min-width: 0;
}

.blog-featured__head {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
}

.blog-featured__date,
.blog-featured__ordinal,
.blog-all__date {
  margin: 0;
  color: var(--clr-neutral-200);
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-100);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.blog-featured__ordinal { color: var(--clr-neutral-300); }

.blog-featured__title {
  margin: 0;
  font-family: 'Geomanist', sans-serif;
  font-size: var(--fs-600);
  line-height: 1.15;
  letter-spacing: -0.04rem;

  a {
    color: var(--clr-neutral-100);
    text-decoration: none;

    &:hover,
    &:focus-visible { color: var(--clr-primary-100); }
  }
}

.blog-featured__category {
  margin: 0;
  color: var(--clr-primary-100);
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-100);
  letter-spacing: 0.08em;
}

/* The measure applies to the PARAGRAPH, not the panel: without media the panel
   is the full board and a deck running its whole width would be unreadable. */
.blog-featured__excerpt {
  margin: 0.4rem 0 0.5rem;
  max-width: var(--kyo-measure);
  color: var(--clr-neutral-50);
}

.blog-featured__cta {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  justify-self: start;
  padding-top: 0.9rem;
  border-top: 1px dashed var(--clr-border-100);
  width: 100%;
  justify-content: space-between;
  text-decoration: none;
  color: var(--clr-neutral-50);
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-100);
  letter-spacing: 0.08em;
  text-transform: uppercase;

  &:hover,
  &:focus-visible {
    color: var(--clr-primary-100);

    .blog-featured__arrow { transform: translateX(0.2rem); }
  }
}

.blog-featured__arrow { transition: transform 0.2s ease; }

/* --- // 02 recent ------------------------------------------------------- */

.blog-recent__grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;
  margin: 0;
  padding: 0;
  list-style: none;

  @include min-media-query(sm) { grid-template-columns: repeat(2, 1fr); }
  @include min-media-query(lg) { grid-template-columns: repeat(4, 1fr); }
}

.blog-recent__item { display: flex; }

/* --- // 03 all posts ---------------------------------------------------- */

.blog-all__list {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--clr-border-100);
}

.blog-all__row { border-bottom: 1px solid var(--clr-border-100); }

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
  /* The rows are the width of the BOARD, and a full-width line of body text at
     1280px is unreadable. The measure caps the text, not the row. */
  max-width: var(--kyo-measure);
}

.blog-all__title {
  font-family: 'Geomanist', sans-serif;
  font-size: var(--fs-400);
  color: var(--clr-neutral-100);
  transition: color 0.2s ease;
}

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
