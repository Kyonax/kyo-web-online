<script setup>
/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * The blog archive (/blog, /blog/page/N, and their /es twins).
 *
 * THREE MOVEMENTS, NO SECTION FURNITURE BETWEEN THEM:
 *   the LEAD article, given the page's full width and no card around it
 *   THREE more recent articles, a bare card row with no heading of its own
 *   ALL POSTS — the only labelled band: heading, search, list, pagination
 *
 * IT SPENDS NO ACCENT. The archive carried monospace ordinals, a corner tag and
 * a watermark, all in #f9cd26; the owner cut every one of them. The accent is
 * still the site's, and the ARTICLE still gets it from the engine's Style Book
 * — but an index of links is not a composition that needs a highlight.
 *
 * IT HAS EXACTLY TWO RULES, and that is a deliberate budget: one under the
 * page description, one under "All posts". A rule per band turned a list of
 * five links into five sections.
 *
 * NO BREADCRUMB. The archive is the top of its own section, so a trail here
 * says only "you are here" — the crumbs live on the articles, and they start
 * at Blog rather than at Home.
 *
 * PAGINATION IS PRERENDERED, not client-side. vite-ssg prerenders only what
 * router.getRoutes() enumerates and skips anything carrying a :param, so every
 * page is a real route with its own canonical and hreflang pair. A crawler can
 * reach the whole archive with JavaScript switched off, which is the entire
 * reason this blog renders through the site instead of shipping as static
 * HTML beside it.
 *
 * The lead slot only exists on page 1 — on later pages every post is an
 * ordinary row, or the newest article would repeat down the archive.
 */
import { loadBlogIndex } from '@composables/use-blog';
import useSeoHead from '@composables/use-seo-head';
import { BLOG_INDEX_URLS, blogAlternatesFor, blogUrlsFor } from '@seo/blog-routes';
import { buildBlogJsonLd } from '@seo/json-ld';
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

/* Three, not four: the row is what comes AFTER the lead, and the owner sized
   it against the reference. Page 1 only, and only from two up — `rest` is the
   whole page once there is no lead slot, so on page 2 the row would restate
   the list beneath it, and one card in a three-column grid reads as broken
   rather than short. */
const recent = computed(() => (page ? page.rest.slice(0, 3) : []));
const has_lead = computed(() => Boolean(page && page.featured));
const has_recent = computed(() => has_lead.value && recent.value.length >= 2);

/* The lead's two columns are opt-in and depend on media actually existing. THE
   DEFECT THIS FIXES: the grid was declared at md+ unconditionally while the
   media column rendered only for a post carrying `cardImage` — and no post
   carries one, because the engine ranks that image from #+COVER_IMAGE / a
   `:main` figure / #+OG_IMAGE and #+HERO_IMAGE is deliberately not in the
   chain. The result was ~700px of void beside a 300px ribbon of text. */
const lead_has_media = computed(() => Boolean(page && page.featured && page.featured.cardImage));


</script>

<template>
  <DocumentPage id="main" width="index" align="left">
    <template #header>
      <!-- The page head, and the archive's ONLY heading furniture besides
           "All posts". No ordinal: the tag is the band's accent mark and this
           page spends none. -->
      <UiSectionHeader
        level="1"
        class="blog-archive__masthead"
        :title="t('kyo-web.blog.title')"
        :subtitle="t('kyo-web.blog.meta.description')"
      />
    </template>

    <p v-if="!page || page.posts.length === 0" class="doc-rich blog-archive__empty">
      {{ t('kyo-web.blog.empty') }}
    </p>

    <template v-else>
      <!-- The LEAD article. Not a card: a card is a thing in a row of things,
           and this is the one piece the page is built around. -->
      <article
        v-if="has_lead"
        class="blog-lead"
        :class="{ 'blog-lead--media': lead_has_media }"
      >
        <div class="blog-lead__body">
          <time class="blog-lead__date" :datetime="page.featured.date">
            {{ date_fmt(page.featured.date) }}
          </time>
          <!-- NOT a link. The lead offers exactly one target, and it is the
               CTA below — a headline that is also a link gives the same
               destination two different affordances and neither reads as the
               action. -->
          <h2 class="blog-lead__title">
            {{ page.featured.title }}
          </h2>
          <p class="blog-lead__excerpt">
            {{ page.featured.description }}
          </p>
          <a
            class="blog-lead__cta"
            :href="page.featured.url"
            :aria-label="`${t('kyo-web.blog.read-more')}: ${page.featured.title}`"
          >
            {{ t('kyo-web.blog.read-more') }}
            <span class="blog-lead__arrow" data-text="›" aria-hidden="true" />
          </a>
        </div>

        <BlogCard
          v-if="lead_has_media"
          class="blog-lead__media"
          :post="page.featured"
          media-only
        />
      </article>

      <!-- Three more. No heading — they read as what follows the lead. -->
      <ul v-if="has_recent" class="blog-recent" role="list">
        <li v-for="post in recent" :key="post.url" class="blog-recent__item">
          <BlogCard :post="post" />
        </li>
      </ul>

      <!-- The one labelled band. -->
      <section class="blog-all" :aria-label="t('kyo-web.blog.all-posts')">
        <UiSectionHeader :title="t('kyo-web.blog.all-posts')" />

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
 * TWO RULES ON THE WHOLE PAGE. UiSectionHeader draws one under whatever it
 * heads, and the archive heads exactly two things — the page itself and "All
 * posts". Everything between them is spacing, which is why the lead and the
 * card row carry no header component at all.
 */

.blog-archive__empty { margin-top: 1rem; }

/* The page title outranks the band title. UiSectionHeader emits one size for
   every level, which is right on the landing where every band is a peer and
   wrong here, where the masthead is the document's <h1>.

   AT EVERY WIDTH, not only from `md`. Gated at `md`, the promise held on a
   desktop and broke on every phone: below 1024px the title fell back to the
   band's own `--fs-700` and the two were the same 28.5px. `--fs-800` already
   steps down by itself (72 → 48 → 37.5px), so it needs no breakpoint. */
.blog-archive__masthead {
  :deep(.ui-section-header__title) { font-size: var(--fs-800); }
}

/* --- the lead article --------------------------------------------------- */

/*
 * ONE COLUMN BY DEFAULT — the split is opt-in and depends on media actually
 * existing. No border, no padding, no panel: the lead is type on the page.
 */
.blog-lead {
  display: grid;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 4rem;

  &--media {
    @include min-media-query(md) {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
      gap: 3rem;
    }
  }
}

/*
 * THE COVER LEADS ON A PHONE.
 *
 * Below `md` the lead is a one-column grid, and auto-placement follows DOM
 * order — body first, media second — so the image landed under the CTA, which
 * is the last thing a reader should meet. Nothing in the markup said "text
 * first"; it was simply the order the elements were written in.
 *
 * The reset at `md` is NOT optional: above it the grid has explicit columns, and
 * a lingering `order: -1` would auto-place the media into column one and flip
 * the desktop layout. With the reset, the wide arrangement is unchanged.
 *
 * Safe to reorder visually: the media node is already `aria-hidden` with
 * `tabindex="-1"`, so there is no DOM-order versus focus-order mismatch to
 * introduce.
 */
.blog-lead__media {
  order: -1;

  @include min-media-query(md) { order: 0; }
}

.blog-lead__body {
  display: grid;
  gap: 0.75rem;
  justify-items: start;
  min-width: 0;
}

/*
 * A DATE IS CONTENT, NOT A FOOTNOTE.
 *
 * Both of these sat at `--fs-100` — 10.5px, the smallest step in the entire
 * scale — the lead's directly under a 72px title, which read as a caption
 * that had lost its picture. They step up: the lead's date answers a headline
 * and gets `--fs-300`, the row dates get `--fs-200`. Both stay well below
 * their own titles, which is the only relationship that has to hold.
 */
.blog-lead__date {
  margin: 0;
  color: var(--clr-neutral-200);
  font-family: "SpaceMono", monospace;
  font-size: var(--fs-300);
}

.blog-all__date {
  margin: 0;
  color: var(--clr-neutral-300);
  font-family: "SpaceMono", monospace;
  font-size: var(--fs-200);
}

/* The lead headline matches the page title at every width, as it does on a
   desktop — the same one-token rule as the masthead above. */
.blog-lead__title {
  margin: 0;
  font-family: "Geomanist", sans-serif;
  font-size: var(--fs-800);
  line-height: 1.1;
  letter-spacing: -0.04rem;

  color: var(--clr-neutral-100);
}

/* The measure caps the PARAGRAPH, not the column: without media the lead is
   the full board, and a deck running 1280px is unreadable. */
.blog-lead__excerpt {
  margin: 0;
  max-width: var(--kyo-measure);
  color: var(--clr-neutral-50);
}

/* A REAL CTA, not a text link. It is the lead's only target now, so it has to
   read as the thing you press: a bordered target on the accent, filling on
   hover. Accent on a STATE and on exactly one mark per composition is the
   book's own one-accent law. */
.blog-lead__cta {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  margin-top: 1rem;
  padding: 0.75rem 1.4rem;
  border: 1px solid var(--clr-primary-100);
  color: var(--clr-primary-100);
  text-decoration: none;
  font-family: "SpaceMono", monospace;
  font-size: var(--fs-200);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover,
  &:focus-visible {
    background-color: var(--clr-primary-100);
    color: var(--clr-neutral-500);

    .blog-lead__arrow { transform: translateX(0.25rem); }
  }

  /* The nudge is decoration; a reader who asked for less motion gets none. */
  @media (prefers-reduced-motion: reduce) {
    .blog-lead__arrow { transition: none; }
  }
}

/*
 * THE NUDGE IS HORIZONTAL, AND NOW IT LOOKS HORIZONTAL TOO.
 *
 * inline-block is what makes the translate apply at all — `transform` does not
 * apply to a non-replaced INLINE box. But the owner still saw the arrow move up
 * and down, and the box never did: sampled through the whole transition its
 * `top` held at 492.85px. The movement was in the PAINT. The arrow sits on a
 * fractional pixel, and Firefox rasterises a glyph differently once a transform
 * applies to it — measured in that browser, the glyph's vertical ink profile
 * moved a row the instant the hover began and moved back the instant it ended,
 * which reads as a vertical hop at both ends of a sideways nudge.
 *
 * So the arrow is transformed AT REST as well: `will-change` keeps it on the same
 * rendering path in both states, and the resting profile then already matches
 * the hovered one — measured, identical. Only X is left to change.
 */
.blog-lead__arrow {
  display: inline-block;
  font-family: "SpaceMono", monospace;
  line-height: 1;
  transform: translateX(0);
  will-change: transform;
  transition: transform 0.2s ease;
}

/* --- the three that follow ---------------------------------------------- */

.blog-recent {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  margin: 0 0 4rem;
  padding: 0;
  list-style: none;

  @include min-media-query(sm) { grid-template-columns: repeat(2, 1fr); }
  @include min-media-query(md) { grid-template-columns: repeat(3, 1fr); }
}

.blog-recent__item { display: flex; }

/* --- all posts ----------------------------------------------------------- */

/* UiSectionHeader's own 3rem gap put the search a full band away from the
   heading it belongs to. The heading, the field and the list are one control
   surface and they sit together. */
.blog-all :deep(.ui-section-header) { margin-bottom: 1.5rem; }

.blog-all__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.blog-all__row + .blog-all__row { border-top: 1px solid var(--clr-border-100); }

/*
 * THE WHOLE ROW IS THE TARGET, AND IT SAYS SO. The row only tinted its title
 * before, which is a very small signal on a very wide hit area — you could not
 * IT USED TO CARRY A NEGATIVE INLINE MARGIN so the fill could bleed past the
 * text column. That bought nothing and cost the entire gutter: the margin was
 * equal and opposite to the padding, so the row's own text inset was exactly
 * ZERO, and `.doc__sheet--index` has `overflow: hidden`, so the bleed it paid
 * for was clipped at the sheet edge anyway. Measured at 1440px before it was
 * removed: sheet edge at x=80, row text also at x=80. The padding is the
 * gutter now, and the fill still covers the whole row because the link is a
 * block that fills its own row box.
 */
.blog-all__link {
  display: flex;
  gap: 1.5rem;
  /* Centred, not baseline-aligned: the date is one line against a two-line
     text column, and on a baseline it sat pinned to the title while the
     excerpt hung below it. */
  align-items: center;
  justify-content: space-between;
  padding: 1.75rem 1.25rem;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.15s ease;

  /* A LIFT, NOT A SLAB. At 6% the fill read as a grey block dropped behind the
     text; the row only has to separate itself from its neighbours, and the
     generous padding is doing most of that work. */
  &:hover,
  &:focus-visible {
    background-color: color-mix(in srgb, var(--clr-neutral-100) 3%, transparent);

    .blog-all__title { color: var(--clr-primary-100); }
  }
}

.blog-all__text {
  display: grid;
  gap: 0.4rem;
  min-width: 0;
  /* The rows are the width of the BOARD; the measure caps the text, not the
     row, so the date stays pinned to the far edge. */
  max-width: var(--kyo-measure);
}

/*
 * THE ROW READS TITLE FIRST, THEN DESCRIPTION — it read the other way round.
 *
 * Measured: the title was neutral-50 (76% lightness) at `--fs-300`, and the
 * excerpt under it neutral-200 — 78%, BRIGHTER — in SpaceMono, whose wide
 * monospace carries more ink per line than the title's proportional face. So
 * the eye landed on the description and had to hunt back up for what the post
 * was called. The owner's reference is the plain hierarchy every news list
 * uses: a bright title, and a quieter description under it.
 *
 * So the title steps up a size and takes the brightest ink; the excerpt drops to
 * the muted tone and into the same proportional face, so the two differ by rank
 * rather than by typeface. Geomanist ships Regular and Bold only, and Bold at
 * this size shouts, so the lead is carried by size and brightness.
 */
.blog-all__title {
  font-family: "Geomanist", sans-serif;
  font-size: var(--fs-400);
  line-height: 1.3;
  color: var(--clr-neutral-100);
  transition: color 0.2s ease;
}

.blog-all__excerpt {
  font-family: "Geomanist", sans-serif;
  line-height: 1.5;
  color: var(--clr-neutral-300);
  font-size: var(--fs-300);
  /* Two lines, then ellipsis — the rows stay scannable however long an
     excerpt is. */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.blog-all__date {
  flex: 0 0 auto;
  white-space: nowrap;
  transition: color 0.2s ease;
}
</style>
