/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * JSON-LD for the blog: a Blog for the archive, a BlogPosting for an article.
 *
 * WHY NOT org2html's structured-data.json. The engine writes one, but it is a
 * deliberately minimal blob — a hardcoded BlogPosting with no url, no image,
 * no publisher, no isPartOf and no breadcrumb, and it ignores #+SCHEMA_TYPE.
 * The graph a page needs here is the SITE's shape, reusing the site's own
 * Person and WebSite identities so an article merges into the one entity
 * rather than inventing a second author.
 *
 * WebSite is declared IN-DOCUMENT on purpose. @id resolution is per-document:
 * a bare isPartOf: { '@id': WEBSITE_ID } on a page that never declares WebSite
 * is a dangling reference, and scripts/seo-audit.mjs fails the build on one.
 *
 * The category crumb org2html leaves with url:null is filled here — the engine
 * cannot know whether /blog/<category> is a route on this site, and today it
 * is not, so the trail goes Home > Blog > Article.
 */

import { BLOG_INDEX_URLS } from '@seo/blog-routes';
import { absoluteUrl } from '@seo/routes';

import buildBreadcrumbJsonLd from './breadcrumb';
import { i18nString } from './i18n';
import { PERSON_ID, WEBSITE_ID } from './identifiers';
import buildWebSiteJsonLd from './website';

const indexUrl = (locale) => absoluteUrl(BLOG_INDEX_URLS[locale] || BLOG_INDEX_URLS.en || '/blog');

/* A reduced Person: the landing graph's makesOffer / hasCreatedWork / review
   nodes describe the profile page, not an article's author. */
const authorNode = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Cristian D. Moreno',
  alternateName: 'Kyonax',
  url: 'https://kyonax.com/',
});

/*
 * The post is passed IN rather than looked up: its title, date and image live
 * in the rich index that only the view loads, so App cannot build this graph
 * and the view owns it — the same division as useSeoHead.
 */
export const buildBlogJsonLd = ({ locale = 'en', post = null } = {}) => {
  /* ---------------------------------------------------------- an article -- */
  if (post) {
    const url = absoluteUrl(post.url);
    const crumbId = `${url}#breadcrumb`;

    const posting = {
      '@type': 'BlogPosting',
      '@id': `${url}#webpage`,
      url,
      mainEntityOfPage: { '@id': `${url}#webpage` },
      headline: post.title,
      description: post.description,
      inLanguage: post.locale || locale,
      isPartOf: { '@id': WEBSITE_ID },
      author: { '@id': PERSON_ID },
      publisher: { '@id': PERSON_ID },
      breadcrumb: { '@id': crumbId },
    };

    if (post.date) {
      posting.datePublished = post.date;
    }
    if (post.cardImage) {
      posting.image = absoluteUrl(post.cardImage);
    }
    if (post.wordCount) {
      posting.wordCount = post.wordCount;
    }
    if ((post.tags || []).length) {
      posting.keywords = post.tags.join(', ');
    }
    if ((post.categories || []).length) {
      [posting.articleSection] = post.categories;
    }
    /* The X post that announces the article, when the author declared one. */
    if (post.postUrl) {
      posting.discussionUrl = post.postUrl;
    }

    return {
      '@context': 'https://schema.org',
      '@graph': [
        buildWebSiteJsonLd(),
        authorNode(),
        posting,
        buildBreadcrumbJsonLd({
          id: crumbId,
          locale,
          currentKey: 'blog.breadcrumb',
        }),
      ],
    };
  }

  /* ------------------------------------------------------- the archive ---- */
  const url = indexUrl(locale);
  const crumbId = `${url}#breadcrumb`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildWebSiteJsonLd(),
      authorNode(),
      {
        '@type': 'Blog',
        '@id': `${url}#webpage`,
        url,
        name: i18nString(locale, 'blog.meta.title'),
        description: i18nString(locale, 'blog.meta.description'),
        inLanguage: locale,
        isPartOf: { '@id': WEBSITE_ID },
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        breadcrumb: { '@id': crumbId },
      },
      buildBreadcrumbJsonLd({
        id: crumbId,
        locale,
        currentKey: 'blog.breadcrumb',
      }),
    ],
  };
};

export default buildBlogJsonLd;
