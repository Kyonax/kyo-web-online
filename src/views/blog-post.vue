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
import ModalLoading from '@ui/modal-loading.vue';
import { useHead } from '@unhead/vue';
import BlogPostNav from '@views/components/blog/blog-post-nav.vue';
import BlogSeries from '@views/components/blog/blog-series.vue';
import DocumentPage from '@views/components/document-page.vue';
import { computed, defineAsyncComponent, nextTick, onMounted, ref, watch } from 'vue';
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

/*
 * THE RAIL'S SECTIONS COME OUT OF THE ARTICLE ITSELF.
 *
 * The body arrives as HTML from the engine, and the engine already gives every
 * top-level heading an id — the same ids its own table of contents links to. So
 * the rail reads the rendered document rather than being handed a second list
 * that could disagree with the headings on screen.
 *
 * Collected after the DOM exists, and again whenever the route changes, because
 * `v-html` content is not reactive and a client-side navigation between two
 * articles reuses this component.
 */
/*
 * ASYNC ON PURPOSE. The rail is shared with the landing page, so welding it into
 * the article chunk would ship it twice and put 1.5 KB of navigation ahead of
 * the words on a route whose whole job is the words. As its own chunk it is
 * fetched after the article renders, and both pages get the same copy.
 */
const SectionRail = defineAsyncComponent(() => import('@widgets/section-rail.vue'));

const prose_ref = ref(null);
const sections = ref([]);

const collectSections = async () => {
  await nextTick();
  const root = prose_ref.value;
  if (!root) {
    sections.value = [];
    return;
  }
  sections.value = Array.from(root.querySelectorAll('.org-section > .org-heading[id]'))
    .map((h) => ({ id: h.id, label: (h.textContent || '').trim() }))
    .filter((s) => s.id && s.label);
};

onMounted(collectSections);
watch(() => route.path, collectSections);

const blog_href = computed(() => BLOG_INDEX_URLS[locale.value] || BLOG_INDEX_URLS.en);

/* The trail starts at BLOG, not at Home. An article's parent is the archive;
   Home is the site, not a step on the way here, and the row was long enough
   that the crumb that matters — which section you are reading — was third. */
const crumbs = computed(() => [
  { label: t('kyo-web.blog.breadcrumb'), href: blog_href.value },
  { label: post ? post.title : t('kyo-web.blog.not-found') },
]);

/* An article's <title> is its headline plus a short brand suffix. Bare, it read
   "Why Org Mode" — twelve characters with nothing saying whose blog it is, on
   the only pages of this site a search result is likely to land on. The
   headline stays FRONT-LOADED, so a long one truncates in the suffix rather
   than in the words that matter. */
const seo_title = computed(() => (post ? `${post.title} - Kyonax Blog` : undefined));

useSeoHead({
  keyPrefix: 'kyo-web.blog.meta',
  title: seo_title.value,
  description: post ? post.description : undefined,
  urls: post ? blogUrlsFor(route.path) : BLOG_INDEX_URLS,
  alternates: post ? blogAlternatesFor(route.path) : [],
  ogType: 'article',
});

/* App.vue emits no graph for blog routes: a BlogPosting needs this article's
   own title, date and image, which only this view has loaded. Same head key,
   so there is exactly one JSON-LD block either way. */
/*
 * THE ENGINE'S OWN STYLE BOOK dresses the article body.
 *
 * `public/blog/style-book.css` is org2html's default `kwo` book, minified into
 * place by sync-blog.mjs. 837 of its rules are scoped under `.org-root`, which
 * the post body carries, so it styles the article and nothing else.
 *
 * THE BOOK IS PARAMETERISED, NOT OVERRIDDEN. Every value in it reads
 * `var(--host-X, <kwo default>)`, so the site hands it the site's own palette,
 * faces and scale through `--host-*` on the article shell and the book adapts.
 * That is the documented way to reskin it — fighting it with `!important`
 * would be the wrong layer, and its own header names this site's document
 * pages as the look it was built to match.
 *
 * AND ITS RUNTIME DRESSES THE BEHAVIOUR. `public/blog/o2h.js` is the same
 * book's interactive layer, minified in by sync-blog.mjs and loaded ONLY
 * here. It is what makes the YouTube and X embeds click to play: the engine
 * emits them as FACADES — a poster and a play target, with nothing from the
 * provider in the page — and this runtime swaps in the real frame on the
 * reader's click. Without it the facade degrades to a plain link, which is
 * correct but is not a player. `defer` because it enhances hooks the
 * prerendered HTML already carries, so it must never block the parse, and
 * nothing third-party is fetched until the reader asks for it.
 */
useHead({
  link: [{
    key: 'kyo-blog-style-book',
    rel: 'stylesheet',
    href: '/blog/style-book.css',
  }],
  script: [
    {
      key: 'kyo-site-jsonld',
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify(
        buildBlogJsonLd({ locale: locale.value, post }),
      )),
    },
    /*
     * WHAT THE RUNTIME MAY DO HERE, DECIDED BEFORE IT LOADS.
     *
     * An inline script is not deferred, so this always executes before the
     * deferred runtime below — which is the only ordering that works. Trying to
     * stand o2h's lightbox down after the fact is a race the site loses: its
     * initialisers set their own guard flags, and their listeners are anonymous,
     * so once it has bound an image nothing can unbind it. Two overlays opened
     * on one click.
     *
     * `lightbox: false` — this site has its own image viewer, the same
     *   `@ui/image-viewer` the landing page uses, wired through v-blog-lightbox.
     *   One viewer, one behaviour, everywhere.
     * `readProgress: false` — the owner does not want a reading-progress bar.
     * `backToTop: false` — the runtime's floating button sits in the SAME
     *   bottom-right corner the section rail's chip now occupies, and the
     *   chip both says where you are and jumps anywhere in the document.
     *   Two fixed controls stacked in one corner, the smaller one able to
     *   do strictly less, is worse than either alone. Owner's call.
     *
     * Everything else stays on, and the embed click-to-play this runtime was
     * loaded for is untouched.
     */
    {
      key: 'kyo-blog-o2h-config',
      innerHTML: 'window.O2H_CONFIG={lightbox:false,readProgress:false,backToTop:false};',
    },
    {
      key: 'kyo-blog-o2h',
      src: '/blog/o2h.js',
      defer: true,
    },
  ],
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
    width="article"
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
      <!-- Pre-sanitized by org2html at build time; see the header note. -->
      <!--
        ONE STYLESHEET GOVERNS THIS BODY, AND IT IS THE ENGINE'S.

        This carried `doc-rich blog-rich kyo-prose` and every one of those
        FOUGHT the Style Book. `.doc-rich` styles bare p/ul/li because privacy
        copy arrives from an i18n string with no classes to hook; `.kyo-prose`
        sets the face, line-height, tracking and colour for landing prose. Both
        are scoped, and a scoped class carries its `[data-v-*]` attribute, so
        `.doc-rich[data-v-x] p` (0,2,1) outranks the book's
        `.org-root .org-paragraph` (0,2,0) — the book's 24px paragraph rhythm
        was being overwritten with the site's 1.4rem, which is 16.8px at this
        12px root, while its 48px grid row-gap survived untouched. Tight text
        inside huge gaps: the article looked nothing like the book because it
        was only wearing a quarter of it.

        `blog-rich` stays for one rule — hiding the engine's duplicate header.
      -->
      <div
        ref="prose_ref"
        v-blog-lightbox="open_viewer"
        class="blog-rich"
        v-html="post.html"
      />

      <!-- An OVERLAY, not a column: it is fixed, so the article's measure is
           the same whether the rail is on the page or not. Rendered only when
           the document actually has sections to point at. -->
      <SectionRail
        v-if="sections.length > 1"
        :sections="sections"
        :label="t('kyo-web.landing.nav.on-this-page')"
      />

      <!--
        THE CLOSING ORDER IS THE OWNER'S, AND IT READS OUTWARD.

        Series first, because a reader who just finished part 3 wants part 4
        before anything else; then related reading; then the previous/next
        pager as the last, narrowest step. The series block used to sit ABOVE
        the article, which put a table of contents for six posts between the
        headline and the first sentence.

        Comments come after the pager when they arrive. They are PARKED on
        evidence today (see kyo-blog's README), so nothing is rendered for
        them rather than an empty shell being left behind.
      -->
      <BlogSeries v-if="post.relations && post.relations.series" :series="post.relations.series" />

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

<!--
  UNSCOPED, AND IT HAS TO BE.

  The Style Book resolves its whole palette on `:root` — 122 of its
  `var(--host-X, <default>)` reads live in that one rule — and a custom property
  is computed on the element that declares it, so handing it `--host-fg` further
  down the tree would be read too late and every token would silently keep its
  built-in default.

  This block still ships inside the blog-post CHUNK, so only an article route
  downloads it. The `--host-*` namespace is the book's alone; nothing else on
  the site reads these names, so declaring them at the root collides with
  nothing.

  Only the values the site actually owns are handed over. Everything the book
  decides for itself — spacing, rhythm, construct shapes, the state ramp — is
  left alone on purpose: overriding it here would be rebuilding the stylesheet
  this change exists to stop rebuilding.
-->
<style lang="scss">
:root {
  --host-fg: var(--clr-neutral-50);
  --host-bg: var(--clr-neutral-500);
  --host-dim: var(--clr-neutral-300);
  --host-accent: var(--clr-primary-100);
  /*
   * `--host-card` and `--host-code-bg` are NOT mapped, and that is the point.
   *
   * Pointing them at the site's `--clr-neutral-400` was a mistake: that token
   * is documented as a dark surface but sits at 37% lightness, while the
   * book's own card is 17.5% and its code well darker still. Every panel the
   * book draws — the series box, the TOC, code blocks — came out as a pale
   * grey slab against a near-black page.
   *
   * SURFACE DEPTH IS THE BOOK'S DECISION. Only values the SITE genuinely owns
   * are handed over: the ink, the ground, the accent and the two faces. The
   * book's own ladder is left alone.
   */
  --host-font-display: "Geomanist", sans-serif;
  --host-font-editorial: "Geomanist", sans-serif;
  --host-font-mono: "SpaceMono", monospace;
  /*
   * THE SHELL OWNS THE PAGE BOX, THE BOOK OWNS THE TYPE.
   *
   * `.org-root` is a three-track grid — gutter, content capped at the measure,
   * gutter — because a standalone document it converts IS the page and has to
   * keep itself off the screen edge. Embedded here it is not the page:
   * document-page.vue already applied both the gutter and the measure, so the
   * book's own pair applied them a SECOND time and every paragraph sat 40px
   * inside the masthead above it.
   *
   * Zeroed through the book's own host tokens rather than by overriding
   * `.org-root` — that is the seam it exposes for exactly this, and an
   * override would go stale the moment the grid changes.
   */
  --host-gutter: 0px;
  --host-measure: 100%;

  /*
   * THE READING SIZE, HANDED TO THE BOOK RATHER THAN FOUGHT.
   *
   * The shell's own `font-size` sets the `ch` the measure is counted in, but it
   * does NOT reach the prose: `.org-root` declares `font-size: var(--o2h-fs-body)`
   * for everything inside it. Widening the column without this made the line
   * LONGER in characters, not roomier — 688px of 15px type is 94 characters,
   * worse than the 85 it started at.
   *
   * `--host-fs-body` is the seam the book publishes for exactly this, so the size
   * is parameterised in rather than overridden. It is bound to the same token the
   * shell uses (`--fs-400`), which is what keeps the two in step: both are 18px
   * at the large tier and 15px below it, so the measure stays ~79 characters at
   * every breakpoint instead of being right at one and wrong at the others.
   */
  --host-fs-body: var(--fs-400);
}

/*
 * THE BOOK'S OWN LAW, ENFORCED — a defect in kwo, patched at the narrowest
 * point until it is fixed upstream.
 *
 * kwo states the rule in its own comment: "Every top-level block sits in the
 * centered content track; its outer block margins are dropped so row-gap owns
 * the vertical rhythm between sections", and writes
 * `.org-root > * { margin-block: 0 }` to do it. But
 * `.org-root .org-paragraph { margin: 0 0 24px }` is (0,2,0) against that
 * rule's (0,1,0), so it wins on every TOP-LEVEL paragraph and the 24px
 * compounds with the 48px row-gap — 72px between paragraphs. The sheet even
 * guards the same compounding one line later for a section's last child, so
 * the intent is not in question.
 *
 * It only shows on a document with no headings, where every paragraph is a
 * direct child of .org-root — which is exactly what the template post is.
 * Inside a section the 24px is correct and is left alone.
 *
 * `> p.org-paragraph` is (0,2,1), so it wins regardless of which stylesheet
 * the bundler emits first. THE DURABLE FIX IS ONE LINE IN kwo.css; this goes
 * when that lands.
 */
.org-root > p.org-paragraph { margin-block: 0; }

/*
 * A HEADING MUST BE ALLOWED TO BREAK A WORD — THE SAME STOPGAP SHAPE.
 *
 * `.org-heading` has no `overflow-wrap`, so a single word set at display size
 * on a narrow screen has nowhere legal to break and runs off the page, taking
 * the document's scroll width with it: measured 41px of sideways scroll on a
 * Spanish article at BOTH 320px and 342px — identical at both, which is the
 * signature of one fixed-size string rather than a layout that fails to
 * scale. Fixed at the source in kwo.css; this duplicates it so the fix ships
 * before the engine is republished, and it goes when that lands.
 *
 * `.doc__title` is the SITE's own h1 and is not the engine's to fix, so its
 * rule stays here permanently — it has exactly the same exposure.
 */
.org-root .org-heading,
.doc__title { overflow-wrap: anywhere; }

/*
 * THE READING-PROGRESS BAR IS NOT A FEATURE THIS SITE WANTS.
 *
 * o2h.js creates `div.org-read-progress` and appends it to <body> on every
 * boot, outside `.org-root` entirely — so this rule cannot be scoped and
 * cannot live in the book's own cascade.
 *
 * It also arrives BROKEN: the base sheet paints the track transparent and
 * only the `<i>` fill accent, but kwo re-declares the track itself as accent
 * at the same specificity and later in the cascade, so the reader gets a
 * permanent full-width yellow band instead of a progress indicator. That is
 * a real upstream defect and is fixed in kwo separately — but the owner does
 * not want the bar at all, so the site refuses it here rather than styling
 * something it will never show. Hidden, not deleted: the element is o2h's to
 * own, and removing it from the DOM would fight a runtime that re-creates it.
 */
.org-read-progress { display: none !important; }

/*
 * THE ZOOM CURSOR IS THE SITE'S JOB NOW.
 *
 * It used to arrive as an inline `style="cursor: zoom-in"` written by o2h's
 * lightbox. Standing that lightbox down took the cursor with it, and an image
 * that opens a viewer with no cursor change gives the reader nothing to go on.
 * `use-blog-lightbox` already marks every image it upgrades, so the mark is
 * what carries the affordance — which also means an image the viewer does NOT
 * claim (the hero, a facade poster) correctly keeps its own cursor.
 */
.org-root img[data-blog-lightbox="on"] { cursor: zoom-in; }
</style>

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
