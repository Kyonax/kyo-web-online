<script setup>
/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * A post card for the archive, built from the LANDING's project-card shape:
 * a bordered panel whose header row carries a monospace date on the left and
 * a `#NN` ordinal on the right, then the title in the display face, a `// `
 * subtitle, a dashed rule, and a footer row. A post card is a project card
 * with a date where the status chip goes.
 *
 * It was an image-and-title stack before, which is why the archive read as a
 * list of orphaned thumbnails rather than a board of entries — and why it
 * collapsed to bare text at the only post count the corpus actually has.
 *
 * THE IMAGE IS THE ENGINE'S CHOICE, not ours. org2html ranks the card image
 * once — #+COVER_IMAGE, then a body figure marked `:main`, then #+OG_IMAGE —
 * and publishes the winner as `cardImage`. #+HERO_IMAGE is deliberately NOT in
 * that chain, so a post with only a hero has no card image. The frame renders
 * ONLY when one resolves: a text-only card is a complete card here, not a card
 * missing its picture.
 *
 * `media-only` renders just the frame, for the featured band where the copy
 * is laid out separately beside it.
 */

import { blogCardImage } from '@composables/use-blog-images';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  post: { type: Object, required: true },
  mediaOnly: { type: Boolean, default: false },
  /* 1-based position in its band, rendered as the `#NN` ordinal. Decorative:
     it numbers the board, it does not identify the post. */
  index: { type: Number, default: 0 },
});

const { t, locale } = useI18n();

const media = computed(() => blogCardImage(props.post));

const ordinal = computed(() => (props.index
  ? `#${String(props.index).padStart(2, '0')}`
  : ''));

/* Categories are CONTROLLED VOCABULARY, which is why a content-side term is
   uppercased here — the one documented exception to the engine's "uppercase
   your OWN labels, never the author's words" rule. */
const category = computed(() => {
  const first = (props.post.categories || [])[0];
  return first ? `// ${String(first).toUpperCase()}` : '';
});

const date_label = computed(() => {
  if (!props.post.date) {
    return '';
  }
  /* From the ISO components, so the rendered day is the AUTHORED day in every
     timezone rather than UTC midnight shifted west. */
  const [y, m, d] = props.post.date.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(
    locale.value === 'es' ? 'es-CO' : 'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' },
  );
});
</script>

<template>
  <a
    v-if="mediaOnly"
    class="blog-card__frame blog-card__frame--solo"
    :href="post.url"
    tabindex="-1"
    aria-hidden="true"
  >
    <img
      v-if="media"
      :src="media.fallback"
      :width="media.width"
      :height="media.height"
      :alt="post.cardImageAlt || ''"
      loading="lazy"
      decoding="async"
    />
  </a>

  <article v-else class="blog-card">
    <a class="blog-card__link" :href="post.url">
      <span v-if="media" class="blog-card__frame">
        <img
          :src="media.fallback"
          :width="media.width"
          :height="media.height"
          :alt="post.cardImageAlt || ''"
          loading="lazy"
          decoding="async"
        />
      </span>

      <span class="blog-card__head">
        <time class="blog-card__date" :datetime="post.date">{{ date_label }}</time>
        <span
          v-if="ordinal"
          class="blog-card__ordinal"
          :data-text="ordinal"
          aria-hidden="true"
        />
      </span>

      <h3 class="blog-card__title">{{ post.title }}</h3>
      <span v-if="category" class="blog-card__category">{{ category }}</span>

      <span class="blog-card__foot">
        <span class="blog-card__cta">{{ t('kyo-web.blog.read-more') }}</span>
        <span class="blog-card__arrow" data-text="›" aria-hidden="true" />
      </span>
    </a>
  </article>
</template>

<style lang="scss" scoped>
/* Fills its grid cell in both axes. Without the width the flex child shrank
   to its own content and a four-up row rendered four different widths with
   ragged gaps between them; without the height a short card stopped above a
   tall neighbour's baseline. */
.blog-card {
  display: flex;
  width: 100%;
  height: 100%;
}

.blog-card__link {
  display: grid;
  /* The footer row is pinned to the bottom by the 1fr spacer above it, so a
     short title and a long one produce panels of the same height across the
     grid instead of a ragged row. */
  grid-template-rows: auto auto auto 1fr auto;
  gap: 0.5rem;
  width: 100%;
  padding: 1.1rem 1.1rem 0.9rem;
  border: 1px solid var(--clr-border-100);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease;

  &:hover,
  &:focus-visible {
    border-color: var(--clr-primary-100);

    .blog-card__title { color: var(--clr-primary-100); }
    .blog-card__arrow { transform: translateX(0.2rem); }
  }
}

.blog-card__frame {
  display: block;
  overflow: hidden;
  background-color: var(--clr-neutral-400);
  /* Space-stripped on purpose: vite-ssg's minifier collapses "16 / 9" inside a
     style attribute while Vue's client stringifyStyle keeps the spaces, which
     is a hydration mismatch. Declared in CSS here, so it is stable either way. */
  aspect-ratio: 16/9;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* The featured band's standalone frame: it sits beside the copy rather than
     above it, so it is free to be taller. */
  &--solo {
    aspect-ratio: 16/10;
    border: 1px solid var(--clr-border-100);
  }
}

.blog-card__head {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
}

.blog-card__date,
.blog-card__ordinal {
  color: var(--clr-neutral-200);
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-100);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.blog-card__ordinal { color: var(--clr-neutral-300); }

.blog-card__title {
  margin: 0;
  font-family: 'Geomanist', sans-serif;
  font-size: var(--fs-400);
  line-height: 1.2;
  letter-spacing: -0.02rem;
  color: var(--clr-neutral-100);
  transition: color 0.2s ease;
}

.blog-card__category {
  color: var(--clr-primary-100);
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-100);
  letter-spacing: 0.08em;
}

.blog-card__foot {
  display: flex;
  gap: 0.5rem;
  align-items: end;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding-top: 0.8rem;
  border-top: 1px dashed var(--clr-border-100);
  color: var(--clr-neutral-50);
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-100);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.blog-card__arrow { transition: transform 0.2s ease; }
</style>
