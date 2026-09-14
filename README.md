# Barfin Network Limited corporate website

Multilingual corporate landing page for `barfin.org`. Kazakh is the primary
language at `/`; Russian and English are available at `/ru` and `/en`.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

This starter does not use `wrangler.jsonc`.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: build and verify rendered localized pages
- `npm run db:generate`: generate Drizzle migrations after schema changes

The public production deployment is isolated from the BaniBanani application
and served from its own loopback port and Apache virtual host.
