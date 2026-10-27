import type { WikipediaSummary } from "../types/wikipedia";

export async function fetchWikipediaSummary(
  title: string,
): Promise<WikipediaSummary> {
  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
  );
  if (!response.ok) {
    throw new Error("Kunde inte hämta text från Wikipedia.");
  }
  return (await response.json()) as WikipediaSummary;
}
