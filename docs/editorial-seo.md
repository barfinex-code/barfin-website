# Corporate content and SEO

The corporate landing keeps its approved hero, manifesto, footer tagline and
contact flow. Three server-rendered sections explain the company's focus,
public projects and product-development approach in Kazakh, Russian and English.
The added content describes our own work, not an invented client portfolio or
an investment offering. No private strategy, architecture, credentials, client
names, performance figures, app-store availability or certifications are used.

## Editorial sources

- Existing Barfin corporate copy: company name, Astana, Kazakhstan, BIN and slogans.
- Barfinex public website: https://barfinex.com/ — market data, algorithmic
  research, decision support and risk controls; no guaranteed returns.
- BaniBanani public project: https://banibanani.com/ — family-oriented learning,
  illustrated stories, language versions and an account-free mini lesson.
- The company owner's approved high-level direction: software development,
  artificial intelligence, automation and the two product initiatives.

Product links are ordinary crawlable links. A product is represented as a Brand,
not as a separate legal subsidiary or a FinancialService. JSON-LD descriptions
come from the same localized copy visitors see. No fabricated ratings, prices,
SearchAction or FAQ rich-result claims are added.

## Search configuration

`lib/seo.ts` is the metadata and entity-graph source used by all three routes.
Canonical URLs, reciprocal language alternates, Open Graph and Twitter descriptions
are localized. Middleware sets the initial HTML language from the URL, without
browser-language redirects. Search robots can crawl public pages, not the API.
The sitemap contains only real canonical pages. Update `CONTENT_UPDATED_AT` only
when meaningful public content changes, not on every request or build.

This improves clarity and crawlability; it does not guarantee rankings, rich
results, AI citations or traffic. No extra AI schema or keyword-filled hidden
text is necessary. We intentionally do not create thin landing pages, copy
product articles onto the corporate site, or use meta keywords.

Reference guidance reviewed for this change:
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/appearance/structured-data/organization
- https://developers.google.com/search/docs/specialty/international/localized-versions
- https://developers.google.com/search/docs/appearance/ai-features

## Verification

`npm test` builds and checks actual server-rendered HTML, preserved slogans,
metadata, entity relationships, locale handling, robots, sitemap and 404 status.
The same tests can run against public HTTPS without a build:

```sh
BARFIN_BASE_URL=https://barfin.org node --test tests/site-contract.test.mjs
```

The Quality workflow additionally checks Chromium at 320, 390, 768, 1024 and
1440 pixels for each language, checks content without JavaScript and saves
screenshots. The main-branch public job waits up to six minutes for publication,
then checks the live site independently. This job only reads public pages;
it neither deploys nor needs SSH secrets.

Production publication currently uses the existing `Deploy Barfin corporate
website` workflow in the deployment repository. No changes to its credentials
or to the contact notification configuration are required for this content update.
