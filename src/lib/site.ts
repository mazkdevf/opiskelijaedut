const repo = process.env.NEXT_PUBLIC_GITHUB_REPO ?? "mazkdevf/opiskelijaedut";
const branch = "main";

export const site = {
  name: "Opiskelijaedut",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://opiskelijaedut.example",
  repo,
  repoUrl: `https://github.com/${repo}`,
  offersDir: "content/offers",
} as const;

export const github = {
  editOffer: (slug: string) =>
    `${site.repoUrl}/edit/${branch}/${site.offersDir}/${slug}.json`,
  newOffer: (template: string) =>
    `${site.repoUrl}/new/${branch}/${site.offersDir}?${new URLSearchParams({
      filename: "palvelun-nimi.json",
      value: template,
    })}`,
  suggestOffer: `${site.repoUrl}/issues/new?template=suggest-offer.yml`,
  contributing: `${site.repoUrl}/blob/${branch}/CONTRIBUTING.md`,
} as const;
