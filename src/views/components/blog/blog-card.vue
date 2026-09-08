<script setup>
/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * An image-led card for the archive.
 *
 * THE IMAGE IS THE ENGINE'S CHOICE, not ours. org2html ranks the card image
 * once — #+COVER_IMAGE, then a body figure marked `:main`, then #+OG_IMAGE —
 * and publishes the winner as `cardImage`. #+HERO_IMAGE is deliberately NOT in
 * that chain, so a post with only a hero has no card image and renders the
 * text-only variant rather than a broken frame.
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
});

const { locale } = useI18n();

const media = computed(() => blogCardImage(props.post));

const date_label = computed(() => {
  if (!props.post.date) {
    return '';
  }
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
      <span v-else class="blog-card__frame blog-card__frame--empty" aria-hidden="true" />

      <time class="blog-card__date" :datetime="post.date">{{ date_label }}</time>
      <h3 class="blog-card__title">{{ post.title }}</h3>
    </a>
  </article>
</template>

<style lang="scss" scoped>
.blog-card__link {
  display: grid;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;

  &:hover .blog-card__title,
  &:focus-visible .blog-card__title { color: var(--clr-primary-100); }
}

.blog-card__frame {
  display: block;
  overflow: hidden;
  border-radius: 8px;
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

  &--solo { aspect-ratio: 16/10; }
  &--empty { border: 1px solid var(--clr-border-100); }
}

.blog-card__date {
  color: var(--clr-neutral-200);
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-100);
}

.blog-card__title {
  margin: 0;
  font-size: var(--fs-300);
  line-height: 1.25;
  letter-spacing: -0.02rem;
}
</style>
