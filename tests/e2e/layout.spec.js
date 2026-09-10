/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * layout.spec.js — the horizontal-space contract, measured.
 *
 * THIS FILE EXISTS BECAUSE THE SAME DEFECT CAME BACK TWICE. Both times the
 * fix was a padding value someone eyeballed, and both times something else
 * cancelled it: a negative margin equal and opposite to the padding, clipped
 * by an `overflow: hidden` on the sheet, so the net inset was zero while the
 * stylesheet read as though it were 15px. A rule can look right and measure
 * wrong. These assertions measure.
 *
 * THREE CONTRACTS:
 *   1. No page scrolls sideways. Ever, at any width.
 *   2. Text keeps a real distance from the viewport edge — not a padding that
 *      something else takes back.
 *   3. The section rail sits inside the viewport and does not cover a link.
 */

import { expect, test } from '@playwright/test';

/*
 * 320 is the narrowest phone still worth supporting and the width the owner
 * asked about; 390 is a current iPhone; 768/1024/1200 are this site's own
 * breakpoints (`sm`/`md`/`lg` in _variables.scss, which resolve against the
 * UA's 16px root, NOT the page's 12px one); 1440 is the common laptop.
 */
const WIDTHS = [320, 360, 390, 768, 1024, 1280, 1440];

const ROUTES = [
  { name: 'landing', path: '/' },
  { name: 'archive EN', path: '/blog/' },
  { name: 'archive ES', path: '/es/blog/' },
  { name: 'article EN', path: '/blog/engineering/2026-08-14-shipping-a-static-site-that-stays-fast' },
  { name: 'article ES', path: '/es/blog/engineering/2026-08-14-publicar-un-sitio-estatico-que-siga-rapido' },
];

/*
 * The gutter the site promises. `.doc` steps 1.25rem → 2rem → 2.5rem across
 * the breakpoints on a 12px root, so the floor is 15px; assert a little under
 * it so a sub-pixel rounding difference is not a failure, but a cancelled
 * padding (which lands at 0) always is.
 */
const MIN_INSET = 12;

/** Elements whose TEXT must never sit on the page edge, per route kind. */
const TEXT_SELECTORS = {
  '/blog/': ['.blog-all__title', '.blog-all__excerpt', '.blog-search__field'],
  '/es/blog/': ['.blog-all__title', '.blog-all__excerpt', '.blog-search__field'],
  article: ['.blog-post-nav__list a', '.doc__title', '.org-root .org-paragraph'],
};

const settle = async (page) => {
  await page.waitForLoadState('networkidle');
  /* The rail and the scroll-spy mount after hydration; without this the rail
     assertions race a component that has not rendered yet. */
  await page.waitForTimeout(350);
};

for (const width of WIDTHS) {
  test.describe(`at ${width}px`, () => {
    for (const route of ROUTES) {
      test(`${route.name} does not scroll sideways`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route.path);
        await settle(page);

        const { scrollWidth, clientWidth, widest } = await page.evaluate(() => {
          const d = document.documentElement;
          /* Name the widest offender so a failure says WHAT overflowed, not
             just that something did. An element inside a scroller is fine —
             that is what the scroller is for — so skip those. */
          const scrolled = (el) => {
            for (let p = el.parentElement; p; p = p.parentElement) {
              const ox = getComputedStyle(p).overflowX;
              if (ox === 'auto' || ox === 'scroll') {
                return true;
              }
            }
            return false;
          };
          let worst = null;
          for (const el of document.querySelectorAll('body *')) {
            const r = el.getBoundingClientRect();
            if (r.right > d.clientWidth + 1 && !scrolled(el)) {
              if (!worst || r.right > worst.right) {
                worst = {
                  right: Math.round(r.right),
                  tag: el.tagName.toLowerCase(),
                  cls: String(el.className || '').slice(0, 60),
                };
              }
            }
          }
          return { scrollWidth: d.scrollWidth, clientWidth: d.clientWidth, widest: worst };
        });

        expect(
          scrollWidth,
          `${route.path} overflows by ${scrollWidth - clientWidth}px`
            + `${widest ? ` — widest: <${widest.tag} class="${widest.cls}"> reaching ${widest.right}px` : ''}`,
        ).toBeLessThanOrEqual(clientWidth + 1);
      });
    }

    test('blog text keeps a real gutter', async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });

      for (const path of ['/blog/', '/es/blog/']) {
        await page.goto(path);
        await settle(page);

        for (const selector of TEXT_SELECTORS[path]) {
          const boxes = await page.$$eval(selector, (els) => els.map((el) => {
            const r = el.getBoundingClientRect();
            return { left: r.left, right: r.right };
          }));
          expect(boxes.length, `${path} ${selector} rendered nothing to measure`)
            .toBeGreaterThan(0);

          for (const box of boxes) {
            expect(box.left, `${path} ${selector} left edge sits ${Math.round(box.left)}px from the viewport`)
              .toBeGreaterThanOrEqual(MIN_INSET);
            expect(width - box.right, `${path} ${selector} right edge sits ${Math.round(width - box.right)}px from the viewport`)
              .toBeGreaterThanOrEqual(MIN_INSET);
          }
        }
      }
    });

    test('article text keeps a real gutter', async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(ROUTES[3].path);
      await settle(page);

      for (const selector of TEXT_SELECTORS.article) {
        const boxes = await page.$$eval(selector, (els) => els.slice(0, 6).map((el) => {
          const r = el.getBoundingClientRect();
          return { left: r.left, right: r.right };
        }));
        expect(boxes.length, `${selector} rendered nothing to measure`).toBeGreaterThan(0);

        for (const box of boxes) {
          expect(box.left, `${selector} left edge sits ${Math.round(box.left)}px from the viewport`)
            .toBeGreaterThanOrEqual(MIN_INSET);
          expect(width - box.right, `${selector} right edge sits ${Math.round(width - box.right)}px from the viewport`)
            .toBeGreaterThanOrEqual(MIN_INSET);
        }
      }
    });

    test('the section rail stays inside the viewport and covers no link', async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(ROUTES[3].path);
      await settle(page);

      const rail = page.locator('.section-rail');
      await expect(rail).toBeVisible();

      const box = await rail.boundingBox();
      expect(box.x, 'the rail hangs off the left edge').toBeGreaterThanOrEqual(0);
      expect(box.x + box.width, 'the rail hangs off the right edge')
        .toBeLessThanOrEqual(width + 1);

      /* At the very bottom of the page the rail shares the corner with the
         footer. A fixed control that covers a link is a control that costs a
         click. */
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(250);

      const covered = await page.evaluate(() => {
        const r = document.querySelector('.section-rail').getBoundingClientRect();
        return [...document.querySelectorAll('.site-footer a, .blog-footer a')]
          .filter((a) => {
            const b = a.getBoundingClientRect();
            return b.width > 0 && !(b.right < r.left || b.left > r.right
              || b.bottom < r.top || b.top > r.bottom);
          })
          .map((a) => (a.textContent || '').trim().slice(0, 30));
      });
      expect(covered, `the rail covers footer link(s): ${covered.join(', ')}`).toEqual([]);
    });
  });
}
