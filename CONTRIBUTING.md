# Contributing

Thanks for helping students find what they are entitled to. Most contributions are a new offer or a correction to an existing one, and neither requires running the project locally.

Suomeksi: sama ohje löytyy sivustolta kohdasta **Lisää etu**.

## Add an offer

1. Create a file in `content/offers`. The file name becomes the address of the offer, so use lowercase kebab-case: `service-name.json`.
2. Copy the contents of an existing offer, such as [`notion-education.json`](content/offers/notion-education.json), and replace the values.
3. Open a pull request. CI runs `npm run validate` and tells you if something is missing.

You can do all of this in the browser with GitHub's **Add file → Create new file** button.

### Let an AI draft it

The **Add an offer** page on the site has ready-made instructions you can paste into Claude, ChatGPT or Gemini together with a link to the offer. The assistant reads the provider's page and returns a finished JSON file. Check the prices and terms yourself before opening the pull request. The instructions are generated in `src/lib/ai-prompt.ts`.

If you would rather not write JSON, [open an issue](../../issues/new?template=suggest-offer.yml) with the link.

### Fields

| Field          | Required | Description                                                                                                                         |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `name`         | yes      | Name of the offer or product, up to 60 characters                                                                                   |
| `provider`     | yes      | Company or organisation behind the offer                                                                                            |
| `url`          | yes      | Direct `https` link to the provider's own page                                                                                      |
| `category`     | yes      | `ai`, `development`, `design`, `productivity`, `entertainment`, `food`, `shopping`, `wellbeing`, `transport`, `finance`, `everyday` |
| `type`         | yes      | `free` if it costs students nothing, otherwise `discount`                                                                           |
| `region`       | no       | City or area in `fi` and `en` if the offer is local, for example Oulu                                                               |
| `value`        | yes      | Short badge in `fi` and `en`, up to 24 characters: "Ilmainen", "12 kk ilmaiseksi", "−50 %"                                          |
| `summary`      | yes      | One sentence in `fi` and `en`, up to 140 characters                                                                                 |
| `description`  | yes      | A few sentences in `fi` and `en`, up to 600 characters                                                                              |
| `perks`        | yes      | 1–6 concrete benefits, each in `fi` and `en`                                                                                        |
| `eligibility`  | yes      | Who qualifies, in `fi` and `en`                                                                                                     |
| `steps`        | yes      | 1–6 steps to claim the offer, each in `fi` and `en`                                                                                 |
| `verification` | yes      | One or more of `school-email`, `sheerid`, `unidays`, `student-card`, `document`, `provider-check`, `none`                           |
| `lastVerified` | yes      | The day you checked the details, `YYYY-MM-DD`                                                                                       |
| `expires`      | no       | The day the offer ends, `YYYY-MM-DD`. Expired offers are hidden automatically                                                       |

Keeping `"$schema": "../offer.schema.json"` at the top of the file gives you autocompletion and inline validation in most editors.

### What gets accepted

- The offer is available to people studying in Finland.
- It is free, or the discount is clearly significant.
- The link goes to the provider's own page. No affiliate links, referral codes or tracking parameters.
- Every claim can be confirmed on the provider's page, and you checked it the day you set `lastVerified`.
- Texts are short, factual and free of marketing language.

## Correct an offer

Every offer page has a **Suggest a correction** link that opens the right file in GitHub's editor. Update `lastVerified` when you have re-checked the details.

## Work on the site

```sh
npm install
npm run dev
```

Before opening a pull request, run `npm run check`. Format with `npm run format`.

- UI strings live in `src/i18n/fi.ts` and `src/i18n/en.ts`. Add new strings to both.
- Add shadcn/ui components with `npx shadcn@latest add <component>`.
- To add a category or verification method, extend the lists in `src/lib/offer-schema.ts`, add labels to both dictionaries, and run `npm run schema`.
