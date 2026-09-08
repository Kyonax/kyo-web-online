/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

import { blogRoutePaths, localeOfBlogPath } from '@seo/blog-routes';

import App from './App.vue';

export const ROUTES = [
  { path: '/',   name: 'home-en', component: App, meta: { locale: 'en' } },
  { path: '/es', name: 'home-es', component: App, meta: { locale: 'es' } },
  /* Prerendered resume pages. The CV PDFs are indexable but rank poorly and
     cannot carry hreflang, so the same content is published as crawlable HTML
     with the PDF offered as a download. Localised ES slug. */
  { path: '/resume',          name: 'resume-en', component: App, meta: { locale: 'en' } },
  { path: '/es/hoja-de-vida', name: 'resume-es', component: App, meta: { locale: 'es' } },
  /* Prerendered privacy policy. Was two standalone files in public/ with their
     own palette and no navigation; as routes they render through the same
     document shell as the resume. The ES slug stays "privacy" — the URLs were
     already published and indexed under it. */
  { path: '/privacy',    name: 'privacy-en', component: App, meta: { locale: 'en' } },
  { path: '/es/privacy', name: 'privacy-es', component: App, meta: { locale: 'es' } },

  /* The blog, derived from the manifest kyo-blog builds. Every post and every
     archive page is a STATIC route: vite-ssg prerenders only what
     router.getRoutes() enumerates and skips anything carrying a :param, so a
     parametric /blog/:slug would ship the whole archive as empty shells.
     Keep in lockstep with ssgOptions.includedRoutes in vite.config.js — both
     read the same manifest, so they cannot drift. */
  ...blogRoutePaths().map((path) => ({
    path,
    name: `blog:${path}`,
    component: App,
    meta: { locale: localeOfBlogPath(path) },
  })),
];

export default ROUTES;
