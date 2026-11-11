# Opiskelijaedut

An open, community-maintained list of what students in Finland get for free, plus the discounts worth knowing about. No ads, no sign-up, no tracking.

Avoin, yhteisön ylläpitämä lista siitä, mitä opiskelija saa Suomessa ilmaiseksi. Jokainen etu on yksi JSON-tiedosto, ja uuden edun voi lisätä pull requestilla. Ohjeet: [CONTRIBUTING.md](CONTRIBUTING.md).

## Add an offer

Every offer is a single file in [`content/offers`](content/offers). Copy an existing one, fill it in, and open a pull request. CI validates the file, and the offer goes live when the PR is merged. See [CONTRIBUTING.md](CONTRIBUTING.md) for the fields and the acceptance rules.

## Stack

- [Next.js](https://nextjs.org) App Router, exported as a fully static site (`output: "export"`)
- [Tailwind CSS v4](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com) components on Radix and Vaul
- [Zod](https://zod.dev) schema for offer files, also published as JSON Schema for editor autocompletion
- [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) static assets for hosting

## Development

Requires Node.js 22 or newer.

```sh
npm install
npm run dev
```

| Command            | What it does                                    |
| ------------------ | ----------------------------------------------- |
| `npm run dev`      | Start the dev server on http://localhost:3000   |
| `npm run validate` | Check every file in `content/offers`            |
| `npm run schema`   | Regenerate `content/offer.schema.json` from Zod |
| `npm run check`    | Validate, lint, typecheck and build             |
| `npm run preview`  | Build and serve the static output with Wrangler |
| `npm run deploy`   | Build and deploy to Cloudflare Workers          |

## Project structure

```
content/offers/      One JSON file per offer
content/offer.schema.json
scripts/             Offer validation and schema generation
src/app/[locale]/    Pages: catalogue, offer, contribute
src/components/      Site components, shadcn/ui primitives in ui/
src/i18n/            Finnish and English UI strings
src/lib/             Offer loading, schema, site config
```

## Configuration

Copy `.env.example` to `.env.local` and set:

| Variable                  | Purpose                                              |
| ------------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`    | Public URL, used for canonical links and the sitemap |
| `NEXT_PUBLIC_GITHUB_REPO` | `owner/repo`, used for the edit and contribute links |

## Generated at build time

- `/og.png`, the Open Graph image, is rendered by `src/app/og.png/route.tsx`. The offer count on it is rounded down to the nearest ten, so 51 offers show as "50+".
- The GitHub star count in the header and footer is fetched once per build. Set `GITHUB_TOKEN` to avoid API rate limits. If the request fails, the count is simply left out.

The deploy workflow rebuilds the site once a day so the star count stays current.

## Deployment

The site deploys as static assets on Cloudflare Workers. There is no Worker script, so requests are free and unlimited.

**From GitHub Actions.** Add these to the repository settings, and every push to `main` deploys:

- Secret `CLOUDFLARE_API_TOKEN`: an API token created from the "Edit Cloudflare Workers" template
- Secret `CLOUDFLARE_ACCOUNT_ID`: your Cloudflare account ID
- Variable `SITE_URL`: the public URL of the site

**From Cloudflare.** Alternatively, connect the repository under Workers & Pages → Create → Import a repository, with build command `npm run build` and deploy command `npx wrangler deploy`. In that case delete `.github/workflows/deploy.yml`.

## Disclaimer

Opiskelijaedut is not affiliated with any of the listed providers. Offers change, so always check the terms on the provider's own page.

## Licence

[MIT](LICENSE)
