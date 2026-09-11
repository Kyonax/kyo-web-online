/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * article.spec.js — the furniture around an article's words, measured.
 *
 * Every contract here is one the owner reported broken by looking at a phone:
 *   · the breadcrumb wrapped and started its second line with a bare "/";
 *   · the table of contents was one weight, one size, one indent;
 *   · a bar chart rendered its labels at about 4px — the figure kept the
 *     browser's 40px side margins, so it drew at 210px inside a 290px column;
 *   · the footnote back-links were a single glyph wide;
 *   · and the footer lost the line saying who built the blog.
 */

import { expect, test } from '@playwright/test';

import { settle } from './viewports.js';

const MATH_EN = '/blog/engineering/2026-07-17-mathematics-at-build-time';
const MATH_ES = '/es/blog/engineering/2026-07-17-matematicas-en-tiempo-de-compilacion';
const AST_EN = '/blog/engineering/2026-05-15-from-org-to-ast';

for (const width of [320, 390]) {
  test(`at ${width}px the breadcrumb stays on one line`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(MATH_ES);
    await settle(page);

    const m = await page.$eval('.ui-crumbs__list', (list) => {
      const line = Number.parseFloat(getComputedStyle(list).lineHeight);
      const tops = new Set([...list.children].map((li) => Math.round(li.getBoundingClientRect().top)));
      return { rows: tops.size, height: list.getBoundingClientRect().height, line };
    });
    expect(m.rows, `the trail broke onto ${m.rows} rows`).toBe(1);
    expect(m.height, `the trail is ${m.height}px tall for a ${m.line}px line`).toBeLessThan(m.line * 1.5);
  });

  test(`at ${width}px a chart fills its column and opens in the viewer`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(MATH_EN);
    await settle(page);

    const m = await page.evaluate(() => {
      const fig = document.querySelector('.org-chart').getBoundingClientRect();
      const p = document.querySelector('.org-root .org-paragraph').getBoundingClientRect();
      return { fig: fig.width, column: p.width };
    });
    expect(m.fig, `the chart is ${Math.round(m.fig)}px in a ${Math.round(m.column)}px column`)
      .toBeGreaterThanOrEqual(m.column - 1);

    await page.locator('.org-chart').first().scrollIntoViewIfNeeded();
    await page.locator('.org-chart .blog-chart-zoom').first().click();
    const img = page.locator('.image-viewer__img');
    await expect(img, 'the chart did not open in the image viewer').toBeVisible();
    expect(await img.getAttribute('src')).toMatch(/^data:image\/svg\+xml/);
  });
}

/*
 * A DOUBLE TAP HAS TO ZOOM ON A PHONE — and it zoomed, then un-zoomed at once.
 * A touch double tap fires touchstart/touchend twice AND a synthesized dblclick
 * after them; the viewer zoomed on the second touchend and the dblclick handler
 * — written for a mouse — saw a zoomed image and reset it. Playwright's touch
 * taps reproduce the browser's synthesized dblclick, so this catches it.
 */
test('a double tap zooms a chart in the viewer on a touch screen', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await page.goto(MATH_EN);
  await settle(page);

  await page.locator('.org-chart-svg').first().scrollIntoViewIfNeeded();
  await page.locator('.org-chart-svg').first().tap();
  const img = page.locator('.image-viewer__img');
  await expect(img).toBeVisible();
  await page.waitForTimeout(400);

  const box = await img.boundingBox();
  const x = box.x + box.width * 0.3;
  const y = box.y + box.height * 0.5;
  await page.touchscreen.tap(x, y);
  await page.waitForTimeout(60);
  await page.touchscreen.tap(x, y);
  await expect(page.locator('.image-viewer'), 'the double tap did not leave the chart zoomed').toHaveClass(/is-zoomed/);
  await context.close();
});

test('footnote back-links are a real target, not one glyph', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto(MATH_EN);
  await settle(page);

  const boxes = await page.$$eval('.org-footnote-back', (els) => els.map((a) => {
    const r = a.getBoundingClientRect();
    return { w: r.width, h: r.height };
  }));
  expect(boxes.length, 'the article rendered no footnote back-links').toBeGreaterThan(0);
  for (const b of boxes) {
    /* WCAG 2.5.8 (AA) sets 24 CSS px as the floor for a pointer target. */
    expect(Math.min(b.w, b.h), `a back-link is ${Math.round(b.w)}×${Math.round(b.h)}px`).toBeGreaterThanOrEqual(24);
  }
});

test('the table of contents starts on its label and ranks its levels', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(AST_EN);
  await settle(page);

  const m = await page.evaluate(() => {
    const toc = document.querySelector('.org-toc');
    const left = (el) => el.getBoundingClientRect().left;
    const top = toc.querySelector(':scope > ul > li > .org-toc-link');
    const nested = toc.querySelector('ul ul .org-toc-link');
    const size = (el) => Number.parseFloat(getComputedStyle(el).fontSize);
    return {
      offset: left(top) - left(toc.querySelector('.org-toc-title')),
      top: size(top),
      nested: nested ? size(nested) : null,
    };
  });
  expect(Math.abs(m.offset), `top-level entries start ${Math.round(m.offset)}px off the label`).toBeLessThanOrEqual(1);
  expect(m.nested, 'the article has no nested entries to rank').not.toBeNull();
  expect(m.nested, 'nested entries are set as large as the sections they sit under').toBeLessThan(m.top);
});

test('an article names its author', async ({ page }) => {
  for (const path of [MATH_EN, MATH_ES]) {
    await page.goto(path);
    await settle(page);
    await expect(page.locator('.blog-post__meta'), `${path} does not say who wrote it`).toContainText('Cristian D. Moreno');
  }
});

test('the table of contents speaks the article\'s language', async ({ page }) => {
  await page.goto(MATH_ES);
  await settle(page);
  await expect(page.locator('.org-toc-title')).toHaveText(/contenido/i);
  await expect(page.locator('nav.org-toc')).toHaveAttribute('aria-label', /contenido/i);
});

/*
 * THE ROW READS TITLE FIRST. The title was neutral-50 (76% lightness) at 15px
 * while the excerpt under it was neutral-200 — 78%, brighter — in the wider
 * monospace, so the eye landed on the description. The title must be both the
 * larger and the lighter of the two.
 */
test('an archive row reads title first, then description', async ({ page }) => {
  await page.goto('/blog/');
  await settle(page);
  const m = await page.evaluate(() => {
    const lightness = (c) => {
      const ok = c.match(/oklch\(\s*([\d.]+)(%?)/);
      if (ok) {
        return Number.parseFloat(ok[1]) / (ok[2] ? 100 : 1);
      }
      const [r, g, b] = c.match(/[\d.]+/g).map(Number);
      return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    };
    const read = (sel) => {
      const cs = getComputedStyle(document.querySelector(sel));
      return { size: Number.parseFloat(cs.fontSize), light: lightness(cs.color) };
    };
    return { title: read('.blog-all__title'), excerpt: read('.blog-all__excerpt') };
  });
  expect(m.title.size, 'the row title is not larger than its excerpt').toBeGreaterThan(m.excerpt.size);
  expect(m.title.light, 'the row title is not lighter than its excerpt').toBeGreaterThan(m.excerpt.light);
});

/*
 * TEMPORARY, with the switcher: three TOC designs on trial. A is what every
 * reader gets; `?toc-lab` opens the switcher, and each choice must actually
 * change the layout, not just an attribute. Goes when the owner has picked.
 */
test('the table-of-contents comparison switches between three designs', async ({ page }) => {
  const layout = () => page.evaluate(() => {
    const nav = document.querySelector('nav.org-toc');
    const ul = nav.querySelector(':scope > ul');
    return {
      design: document.documentElement.dataset.toc || null,
      list: getComputedStyle(ul).display,
      track: getComputedStyle(ul, '::before').content,
      ruled: getComputedStyle(nav).borderTopStyle,
      boxed: getComputedStyle(nav).borderLeftStyle,
    };
  });

  await page.goto(AST_EN);
  await settle(page);
  expect(await page.locator('.toc-lab').count(), 'the switcher showed without ?toc-lab').toBe(0);
  expect(await layout()).toMatchObject({ design: null, list: 'block', ruled: 'solid', boxed: 'none' });

  await page.goto(`${AST_EN}?toc-lab`);
  await settle(page);
  const lab = page.locator('.toc-lab');
  await expect(lab).toBeVisible();
  const pick = (id) => lab.locator('.toc-lab__cell').filter({ has: page.locator('.toc-lab__id', { hasText: new RegExp(`^${id}$`) }) });

  await pick('B').click();
  expect(await layout(), 'B is the track').toMatchObject({ design: 'b', list: 'block', track: '""', ruled: 'none' });
  await pick('C').click();
  expect(await layout(), 'C is the panel').toMatchObject({ design: 'c', list: 'grid', boxed: 'solid' });
  await pick('A').click();
  expect(await layout(), 'A is the ledger').toMatchObject({ design: 'a', list: 'block', ruled: 'solid', boxed: 'none' });

  await lab.locator('.toc-lab__close').click();
  await expect(lab).toHaveCount(0);
  expect((await layout()).design).toBeNull();
});

test('the footer names who built the blog and links to them', async ({ page }) => {
  await page.goto('/blog/');
  await settle(page);
  await expect(page.locator('.blog-footer__note a[href="https://x.com/kyonax_on_tech"]')).toHaveCount(1);
});
