import { cache } from "react";
import { site } from "@/lib/site";

export const getStarCount = cache(async (): Promise<number | null> => {
  try {
    const token = process.env.GITHUB_TOKEN;
    const response = await fetch(`https://api.github.com/repos/${site.repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "force-cache",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const { stargazers_count: stars } = (await response.json()) as {
      stargazers_count?: unknown;
    };
    return typeof stars === "number" ? stars : null;
  } catch {
    return null;
  }
});
