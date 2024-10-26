# Edge-first Starter Kit

A full-stack starter kit for Edge-first applications built with React on top of Cloudflare Developer Platform.

> [!IMPORTANT]
> This is still in development, the authentication code included works but is not ready or complete, however app works just fine ignoring that.

## Features

- [x] Deploy to **[Cloudflare Workers](https://workers.cloudflare.com/)**
- [x] Test and manage packages with **[Bun](https://bun.sh/docs/cli/test)**
- [x] Styles with **[Tailwind](https://tailwindcss.com/)**
- [x] Code Quality (lint and format) checker with **[Biome](https://biomejs.dev)**
- [x] CI with **[GH Actions](https://github.com/features/actions)**
- [x] Router with **[React Router](https://reactrouter.com/dev)**
- [x] Database with **[Cloudflare D1](https://developers.cloudflare.com/d1/)**
- [x] Query builder and DB migrations with **[Drizzle](https://orm.drizzle.team)**
- [x] Queues with **[Cloudflare Queues](https://developers.cloudflare.com/queues/)**
- [x] Scheduled tasks with **[Cloudflare Workers Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/)**
- [x] KV storage and caching with **[Cloudflare Workers KV](https://developers.cloudflare.com/kv/)**
- [x] File storage with **[Cloudflare R2](https://developers.cloudflare.com/r2/)**
- [x] Run AI models with **[Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/)**
- [x] Use Puppeteer with **[Cloudflare Browser Rendering](https://developers.cloudflare.com/browser-rendering/)**
- [x] User profile backfilling with **[Gravatar API](https://docs.gravatar.com/)**
- [x] Prevent email spam with **[Verifier](https://verifier.meetchopra.com)**
- [x] Secure your users with **[HaveIBeenPwned API](https://haveibeenpwned.com/API/v3)**
- [ ] Authentication and authorization WIP
- More to come...

## Getting Started

Create a new React application using the Edge-first Starter Kit:

```sh
npx degit edgefirst-dev/starter-worker my-app
```

Then update your `wrangler.toml` to match your Cloudflare account and create a `.dev.vars` with these variables:

```txt
APP_ENV="development"

CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_DATABASE_ID=""
CLOUDFLARE_API_TOKEN=""

GRAVATAR_API_TOKEN=""

VERIFIER_API_KEY=""
```

## Author

- [Sergio Xalambrí](https://sergiodxa.com)
