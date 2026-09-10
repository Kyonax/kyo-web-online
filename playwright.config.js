/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * playwright.config.js — the layout gate.
 *
 * WHY A REAL BROWSER, WHEN EVERY OTHER GATE IS A REGEX. `seo-audit.mjs` and
 * `check-blog-prerender.mjs` read `dist/**\/*.html` as strings, and `vitest`
 * runs under happy-dom, which simulates a DOM but performs no layout. None of
 * them can answer "is this row's text actually inset from its sheet edge",
 * because margin collapsing, `overflow: hidden` clipping and custom-property
 * resolution are runtime facts a layout engine produces. The horizontal gutter
 * has now been reported broken, fixed, and reported broken again twice — so it
 * gets a test that measures boxes instead of reading rules.
 *
 * IT RUNS AGAINST THE BUILT SITE, not the dev server: prerendered HTML plus the
 * real hashed CSS is what a visitor gets, and it is where the last regression
 * hid. `npm run build` must have run first; `webServer` below only serves it.
 */

import { defineConfig, devices } from '@playwright/test';

const PORT = 4180;

export default defineConfig({
  testDir: './tests/e2e',
  /* Layout is deterministic; a retry would only mask a real flake. */
  retries: 0,
  fullyParallel: true,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    /* A failure here is always "where exactly was the box", so keep the
       evidence rather than re-running by hand to find out. */
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: `npx vite preview --port ${PORT} --strictPort --host 127.0.0.1`,
    url: `http://127.0.0.1:${PORT}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
