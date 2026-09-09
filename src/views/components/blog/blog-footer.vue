<script setup>
/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * The blog's own footer.
 *
 * SiteFooter is landing-only (v-if="isLanding" in App.vue) and carries the
 * whole brand signature, socials and a runtime manifest — far more than an
 * article needs under it. This is the deliberate simpler replacement: where
 * you are, how to get back, and the licence line.
 *
 * role="contentinfo" is kept because it is the page's footer landmark; the
 * class is `site-footer` as well as `blog-footer` so hud-nav's INERT_TARGETS
 * still finds it if the mobile drawer ever opens on a blog route.
 */

import { BLOG_INDEX_URLS } from '@seo/blog-routes';
import { ROUTE_BY_LOCALE } from '@seo/routes';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const landing_href = computed(() => ROUTE_BY_LOCALE[locale.value] || ROUTE_BY_LOCALE.en);
const blog_href = computed(() => BLOG_INDEX_URLS[locale.value] || BLOG_INDEX_URLS.en);
const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer blog-footer" role="contentinfo">
    <nav class="blog-footer__nav" :aria-label="t('kyo-web.blog.nav-aria')">
      <a :href="blog_href">{{ t('kyo-web.blog.breadcrumb') }}</a>
      <a :href="landing_href">{{ t('kyo-web.breadcrumb.home') }}</a>
    </nav>
    <p class="blog-footer__sign">
      © {{ year }} Cristian D. Moreno — Kyonax
    </p>
  </footer>
</template>

<style lang="scss" scoped>
.blog-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
  align-items: center;
  justify-content: space-between;
  max-width: 58rem;
  margin: 0 auto;
  padding: 2rem var(--kyo-gutter, 1.25rem) 3rem;
  border-top: 1px solid var(--clr-border-100);
  color: var(--clr-neutral-200);
  font-family: 'SpaceMono', monospace;
  font-size: var(--fs-200);
}

.blog-footer__nav {
  display: flex;
  gap: 1.25rem;

  a {
    color: inherit;
    text-decoration: none;

    &:hover,
    &:focus-visible { color: var(--clr-primary-100); }
  }
}

.blog-footer__sign { margin: 0; }
</style>
